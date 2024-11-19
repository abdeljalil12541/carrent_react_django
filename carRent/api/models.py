from django.db import models
from django.contrib.auth.models import User
from django.utils.safestring import mark_safe
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    avatar = models.ImageField(upload_to='profile_imgs', null=True, blank=True)
    phone_number = models.CharField(max_length=50, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    
    def __str__(self):
        return f'{self.user} Profile'



@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()



# Car Category model
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    slug = models.SlugField(unique=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name'] 
        verbose_name_plural = 'Categories'                               

    def __str__(self):
        return self.name
    
    

# Car Variations
class CarFeature(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class PickupFeature(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class DefaultEquipment(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name
    
    

# Car Model
class Car(models.Model):
    # Basic information
    name = models.CharField(max_length=50)
    slug = models.SlugField(null=True)
    image = models.ImageField(upload_to='cars')
    brand = models.ImageField(upload_to='brand_of_car', null=True, blank=True)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
    CAR_SIZE_CHOICES = [
        ('PETITE', 'Petite Voiture'),
        ('MOYENNE', 'Voiture Moyenne'),
        ('GRANDE', 'Grande Voiture'),
        ('SUV', 'SUV/4x4'),
        ('LUXE', 'Voiture de Luxe'),
    ]
    car_size = models.CharField(max_length=20, choices=CAR_SIZE_CHOICES, null=True)
    
    # ManyToMany relationships
    car_features = models.ManyToManyField(CarFeature, blank=True, related_name="cars")
    pickup_features = models.ManyToManyField(PickupFeature, blank=True, related_name="pickups")
    default_equipment = models.ManyToManyField(DefaultEquipment, blank=True, related_name="default_equipped_cars")
    
    # Home cards features
    mileage = models.PositiveIntegerField()
    transmission = models.CharField(max_length=20, choices=[('manual', 'Manual'), ('automatic', 'Automatic'), ('cvt', 'CVT')])
    seats = models.PositiveSmallIntegerField()
    passagers = models.PositiveIntegerField(null=True)
    fuel_type = models.CharField(max_length=20, choices=[('petrol', 'Petrol'), ('diesel', 'Diesel'), ('electric', 'Electric'), ('hybrid', 'Hybrid')])

    # Other fields
    is_available = models.BooleanField(default=True, null=True)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    current_location = models.ForeignKey(PickupFeature, on_delete=models.CASCADE, null=True, related_name="cars")
    
    def image_tag(self):
        return mark_safe(f'<img src="{self.image.url}" style="max-width: 100px; max-height: 100px;" />')

    def __str__(self):
        return f"{self.name} - {self.image} - {self.model} - ({self.year})"
    
    
    
    
    
    
    

class CarBooking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    first_name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50, null=True)
    company_name = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=50, null=True)
    street_number_and_name = models.CharField(max_length=50, null=True)
    city = models.CharField(max_length=50, null=True)
    region_department = models.CharField(max_length=50, null=True)
    postcode = models.CharField(max_length=50, null=True)
    phone_number = models.CharField(max_length=50, null=True)
    email_address = models.CharField(max_length=50, null=True)
    message = models.TextField(null=True, blank=True)
    
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name="bookings")
    pickup_datetime = models.DateTimeField()
    dropoff_datetime = models.DateTimeField()
    booking_status = models.CharField(
        max_length=20,
        choices=[('upcoming', 'Upcoming'), ('active', 'Active'), ('completed', 'Completed')],
        default='upcoming'
    )
    
    destination1 = models.ForeignKey(PickupFeature, on_delete=models.SET_NULL, null=True, blank=True, related_name="pickup_bookings")
    destination2 = models.ForeignKey(PickupFeature, on_delete=models.SET_NULL, null=True, blank=True, related_name="dropoff_bookings")
    
    is_addon_1 = models.BooleanField(default=False, null=True)
    is_addon_2 = models.BooleanField(default=False, null=True)
    is_addon_3 = models.BooleanField(default=False, null=True)

    total_price = models.IntegerField(null=True)
    
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    
    def car_name(self):
        return self.car.name
    
    def image_tag(self):
        return mark_safe(f'<img src="{self.car.image.url}" style="max-width: 100px; max-height: 100px;" />')

        
        
    
    
    
class LatestOffers(models.Model):
    title = models.CharField(max_length=50)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to='latest_offers')
    description = models.CharField(max_length=150)
    price_per_day = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    
    def __str__(self):
        return self.title
    
    def image_tag(self):
        return mark_safe(f'<img src="{self.image.url}" style="max-width: 100px; max-height: 100px;" />')
    
    
    
    
class GalleryCategory(models.Model):
    title = models.CharField(max_length=150)
    
    class Meta:
        verbose_name_plural = 'Gallery Categories'
        
    def __str__(self):
        return self.title
    
class Gallery(models.Model):
    title = models.CharField(max_length=150)
    category = models.ForeignKey(GalleryCategory, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='gallery')
    
    class Meta:
        verbose_name_plural = 'Galleries'
        
    def __str__(self):
        return f'{self.title} - {self.category}'
    
    
    

class Contact(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(max_length=150)
    phone_number = models.CharField(max_length=150)
    message = models.TextField()
    
    def __str__(self):
        return f'{self.email} - {self.first_name} - {self.last_name} - {self.phone_number}'
    
    
    
class Review(models.Model):
    name = models.CharField(max_length=50, null=True)
    review = models.CharField(max_length=230)
    stars = models.DecimalField(max_digits=3, decimal_places=1, null=True)  # Allows up to "10.0"
    country = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    
    
class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    is_added = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def get_image(self):
        return mark_safe(f'<img src="{self.car.image.url}" style="max-width: 100px; max-height: 100px;" />')
    
    
class Inbox(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    inbox_type = models.CharField(max_length=50, choices=[('signup', 'signup'), ('booking', 'booking'), ('is_active', 'is_active')])
    is_read = models.BooleanField(default=False, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.user} - {self.inbox_type}'
    
