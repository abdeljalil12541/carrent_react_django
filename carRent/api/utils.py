from django.db.models import Q
from .models import CarBooking

def is_car_available(car, pickup_datetime, dropoff_datetime):
    # Check for any existing bookings that overlap with the requested times
    conflicting_bookings = CarBooking.objects.filter(
        car=car,
        booking_status__in=['upcoming', 'active'],  # Check only active or upcoming bookings
        pickup_datetime__lt=dropoff_datetime,
        dropoff_datetime__gt=pickup_datetime
    )

    # If there are conflicting bookings, the car is not available
    return not conflicting_bookings.exists()