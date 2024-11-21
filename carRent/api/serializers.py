from rest_framework import serializers
from .models import Car, CarBooking, CarFeature, Category, Contact, DefaultEquipment, Gallery, GalleryCategory, Inbox, LatestOffers, NewsLetter, PickupFeature, Profile, Review, Wishlist
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'  # Or specify the fields you want: ['field1', 'field2', etc.]
        
        
class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
        
        
        
from django.contrib.auth.password_validation import validate_password

class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value
    
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'slug']

class CarFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarFeature
        fields = ['id', 'name']

class PickupFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PickupFeature
        fields = ['id', 'name']

class DefaultEquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefaultEquipment
        fields = ['id', 'name']

class CarSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    car_features = CarFeatureSerializer(many=True)
    pickup_features = PickupFeatureSerializer(many=True)
    default_equipment = DefaultEquipmentSerializer(many=True)
    car_size_display = serializers.CharField(source='get_car_size_display', read_only=True)
    current_location = PickupFeatureSerializer()

    class Meta:
        model = Car
        fields = [
            'id', 'name', 'slug', 'car_size', 'image', 'is_available', 'car_size_display', 'brand', 'model', 'year',
            'category', 'car_features', 'pickup_features', 'default_equipment',
            'mileage', 'transmission', 'seats', 'passagers', 'fuel_type',
            'current_location', 'price_per_day', 'created_at'
        ]
        
        
        
        
class CarBookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = CarBooking
        fields = [
            'id', 'user', 'first_name', 'last_name', 'company_name', 'country', 'street_number_and_name',
            'region_department', 'postcode', 'phone_number', 'city', 'email_address', 'message', 'car',
            'pickup_datetime', 'dropoff_datetime', 'booking_status', 'destination1', 'destination2',
            'is_addon_1', 'is_addon_2', 'is_addon_3', 'total_price', 'created_at', 'updated_at'
        ]
        
        

    

class LatestOffersSerializer(serializers.ModelSerializer):
    car = CarSerializer()
    
    class Meta:
        model = LatestOffers
        fields = ('id', 'car', 'title', 'image', 'description', 'price_per_day')
        
        

class NewsLetterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = NewsLetter
        fields = ('id', 'email', 'created_at')
        
class GalleryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryCategory
        fields = ('id', 'title')
        
        
class GallerySerializer(serializers.ModelSerializer):
    category = GalleryCategorySerializer()
    
    class Meta:
        model = Gallery
        fields = ('id', 'title', 'category', 'image')
        
        
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('first_name', 'last_name', 'email', 'phone_number', 'message')
        
        
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'name', 'review', 'stars', 'country', 'created_at')
        
        
        
class WishlistSerializer(serializers.ModelSerializer):
    car = CarSerializer()
    
    class Meta:
        model = Wishlist
        fields = ('id', 'user', 'car', 'is_added', 'created_at')
        

# User Serializer (define if not already available)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Use your user model here if it's custom
        fields = ('id', 'username', 'email')  # Add any other fields you need
        
        
class InboxSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Inbox
        fields = ('id', 'user', 'inbox_type', 'is_read', 'created_at')
        
        
class CarBookingHistorySerializer(serializers.ModelSerializer):
    car = CarSerializer()
    class Meta:
        model = CarBooking
        fields = [
            'id', 'user', 'first_name', 'last_name', 'company_name', 'country', 'street_number_and_name',
            'region_department', 'postcode', 'phone_number', 'city', 'email_address', 'message', 'car',
            'pickup_datetime', 'dropoff_datetime', 'booking_status', 'destination1', 'destination2',
            'is_addon_1', 'is_addon_2', 'is_addon_3', 'total_price', 'created_at', 'updated_at'
        ]