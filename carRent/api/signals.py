from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CarBooking, Inbox

# Signal to create an Inbox when a CarBooking is created
@receiver(post_save, sender=CarBooking)
def create_inbox(sender, instance, created, **kwargs):
    inbox_type = "booking"
    if created and instance.user:
        Inbox.objects.create(user=instance.user, inbox_type=inbox_type)
