# api/models.py
from django.db import models
from django.utils import timezone

class CarBooking(models.Model):
    car = models.ForeignKey('Car', on_delete=models.CASCADE, related_name='bookings')
    pickup_datetime = models.DateTimeField()
    dropoff_datetime = models.DateTimeField()
    booking_status = models.CharField(max_length=20, choices=[
        ('upcoming', 'Upcoming'),
        ('active', 'Active'),
        ('completed', 'Completed')
    ])
    
    def update_status(self):
        """
        Update booking status based on current time
        Returns True if status was changed
        """
        now = timezone.now()
        new_status = None
        
        if self.dropoff_datetime <= now:
            new_status = 'completed'
        elif self.pickup_datetime <= now < self.dropoff_datetime:
            new_status = 'active'
        elif now < self.pickup_datetime:
            new_status = 'upcoming'
            
        if new_status and new_status != self.booking_status:
            self.booking_status = new_status
            return True
        return False
    
    def save(self, *args, **kwargs):
        # Check if status needs to be updated
        status_changed = self.update_status()
        
        # If status changed to completed, update car availability
        if status_changed and self.booking_status == 'completed':
            self.car.is_available = True
            self.car.save()
            
        super().save(*args, **kwargs)

# api/tasks.py
from celery import shared_task
from django.utils import timezone
from django.db import transaction
from django.db.models import Q
from .models import CarBooking  # Import from local models
import logging

logger = logging.getLogger(__name__)

@shared_task
def update_availability_task():
    now = timezone.now()
    
    # Get all bookings that need status updates
    bookings_to_update = CarBooking.objects.filter(
        Q(dropoff_datetime__lte=now, booking_status='active') |  # Completed bookings
        Q(pickup_datetime__lte=now, dropoff_datetime__gt=now, booking_status='upcoming')  # Active bookings
    ).select_related('car')
    
    logger.info(f"Found {bookings_to_update.count()} bookings to update")
    
    for booking in bookings_to_update:
        with transaction.atomic():
            if booking.dropoff_datetime <= now and booking.booking_status == 'active':
                # Update completed bookings
                booking.booking_status = 'completed'
                booking.car.is_available = True
                booking.car.save()
                logger.info(f"Booking {booking.id} marked as completed")
            
            elif booking.pickup_datetime <= now and booking.booking_status == 'upcoming':
                # Update active bookings
                booking.booking_status = 'active'
                booking.car.is_available = False  # Ensure car is marked as unavailable
                booking.car.save()
                logger.info(f"Booking {booking.id} marked as active")
            
            booking.save()
