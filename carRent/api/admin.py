from django.utils import timezone
from django.contrib import admin
import logging

from .utils import is_car_available
from .models import *
from django.urls import reverse
from django.db import transaction

# Register your models here.

admin.site.register(Category)
admin.site.register(CarFeature)
admin.site.register(PickupFeature)
admin.site.register(DefaultEquipment)
admin.site.register(Gallery)
admin.site.register(GalleryCategory)
admin.site.register(Contact)
admin.site.register(Inbox)

admin.site.site_title = "FN Drive"
admin.site.site_header = "FN Drive admin"
admin.site.index_title = "Welcome to the Admin Panel"

# Car Admin
class CarAdmin(admin.ModelAdmin):
    list_display = ('name', 'image_tag', 'model', 'year', 'price_per_day')  # Add fields you want to display
    search_fields = ('name', 'model', 'year')  # Optional: add search fields
    list_filter = ('year', 'category', 'transmission', 'fuel_type')  # Optional: add filters

admin.site.register(Car, CarAdmin)


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'created_at')
admin.site.register(Profile, ProfileAdmin)

class NewsLetterAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'created_at')
admin.site.register(NewsLetter, NewsLetterAdmin)

logger = logging.getLogger(__name__)
# Car Booking Admin
class CarBookingAdmin(admin.ModelAdmin):
    list_display = ('car_name', 'image_tag', 'user', 'pickup_datetime', 'dropoff_datetime', 'booking_status', 'created_at')  # Include the image tag
    read_only_fields = ['user']
    actions = ['mark_as_completed', 'mark_booking_car_active']
    


    def mark_booking_car_active(self, request, queryset):
        activated_count = 0
        for booking in queryset:
            if booking.booking_status == 'upcoming':
                # Log the current state of the car
                logger.info(f"Attempting to activate booking for {booking.car_name()} - Current status: {booking.car.is_available}")
                
                # Check if the car is available
                if booking.car.is_available:
                    with transaction.atomic():
                        # First set the booking status to active
                        booking.booking_status = 'active'
                        booking.save(update_fields=['booking_status'])
                        
                        # Create inbox for active booking
                        Inbox.objects.create(user=booking.user, inbox_type="is_active")
                        
                        # Then mark the car as unavailable
                        booking.car.is_available = False
                        booking.car.save(update_fields=['is_available'])
                        activated_count += 1
                else:
                    self.message_user(
                        request,
                        f"Cannot activate booking for {booking.car_name()} - car is not available.",
                        level='ERROR'
                    )
        
        if activated_count:
            self.message_user(
                request,
                f"{activated_count} booking(s) have been marked as active and their cars marked as unavailable."
            )
        else:
            self.message_user(
                request,
                "No bookings were activated. Only upcoming bookings can be marked as active.",
                level='WARNING'
            )

    mark_booking_car_active.short_description = "Mark selected bookings as active"

    def mark_as_completed(self, request, queryset):
        completed_count = 0
        for booking in queryset:
            if booking.booking_status == 'active':
                with transaction.atomic():
                    booking.booking_status = 'completed'
                    booking.save(update_fields=['booking_status'])
                    
                    # Make car available again
                    booking.car.is_available = True
                    # Update car location if destination2 exists
                    if booking.destination2:
                        booking.car.current_location = booking.destination2
                    booking.car.save()
                    completed_count += 1
        
        if completed_count > 0:
            self.message_user(
                request,
                f"{completed_count} booking(s) have been marked as completed and their cars marked as available."
            )
        else:
            self.message_user(
                request,
                "No bookings were completed. Only active bookings can be marked as completed.",
                level='WARNING'
            )

    mark_as_completed.short_description = "Mark selected bookings as completed"

admin.site.register(CarBooking, CarBookingAdmin)



class LatestOffersAdmin(admin.ModelAdmin):
    list_display = ('title', 'car', 'image_tag', 'price_per_day', 'created_at')
admin.site.register(LatestOffers, LatestOffersAdmin)

class ReviewsAdmin(admin.ModelAdmin):
    list_display = ('name', 'review', 'stars', 'country', 'created_at')
admin.site.register(Review, ReviewsAdmin)

class WishlistAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_image', 'is_added', 'created_at')
admin.site.register(Wishlist, WishlistAdmin)