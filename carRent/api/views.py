from django.contrib.auth.models import User
from .models import Car, CarBooking, CarFeature, Category, DefaultEquipment, Gallery, GalleryCategory, Inbox, LatestOffers, PickupFeature, Profile, Wishlist
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.views import APIView
from django.utils import timezone
from django.contrib import auth
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

from django.shortcuts import get_object_or_404
from .serializers import CarBookingHistorySerializer, CarBookingSerializer, CarSerializer, ContactSerializer, GalleryCategorySerializer, GallerySerializer, InboxSerializer, LatestOffersSerializer, ReviewSerializer, UpdateUserSerializer, ProfileSerializer, ChangePasswordSerializer, CategorySerializer, PickupFeatureSerializer, CarFeatureSerializer, DefaultEquipmentSerializer, WishlistSerializer

# Create your views here.
            
            

class CreateUserView(APIView):
    def post(self, request, format=None):
        userName = request.data.get('username', None)
        userPass = request.data.get('password', None)
        userMail = request.data.get('email', None)
        userFullName = request.data.get('full_name', None)

        if userName and userPass and userMail:
            # Check if the username already exists
            if User.objects.filter(username=userName).exists():
                return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

            # Split full_name into first_name and last_name (optional logic)
            first_name, last_name = userFullName.split(' ', 1) if userFullName else ("", "")

            # Create user
            user = User.objects.create_user(username=userName, email=userMail, password=userPass)
            user.first_name = first_name
            user.last_name = last_name
            user.save()

            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    def post(self, request, format=None):
        userMail = request.data.get('loginEmail')
        userPass = request.data.get('loginPassword')
        
        if not userMail or not userPass:
            return Response(
                {"error": "Both email and password are required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = User.objects.get(email=userMail)  # Get user by email
            if user.check_password(userPass):  # Check password
                auth.login(request, user)  # Log the user in
                return Response({"message": "User Authenticated Successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            
    from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib import auth
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        print("User:", request.user)  # Log the user object
        print("Is Authenticated:", request.user.is_authenticated)  # Log authentication status
        if request.user.is_authenticated:
            return Response({'isAuthenticated': True}, status=status.HTTP_200_OK)
        return Response({'isAuthenticated': False}, status=status.HTTP_200_OK)
# Set CSRF token
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = []
    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'}, status=status.HTTP_200_OK)
    
# User logout view
@method_decorator(ensure_csrf_cookie, name='dispatch')
class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': "Logged out successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class UserInfos(APIView):
    def get(self, request, format=None):
        if request.user.is_authenticated:
            user = request.user
            try:
                # Try to get the user profile
                user_profile = Profile.objects.get(user=request.user)
                profile_serializer = ProfileSerializer(user_profile)
                profile_data = profile_serializer.data
                
                # Safely get created_at from the serialized data or the model instance
                created_at = profile_data.get('created_at') or user_profile.created_at
            except Profile.DoesNotExist:
                # Handle case where profile doesn't exist
                profile_data = None
            
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'user_profile': profile_data,
                'created_at': created_at
            }
            
            return Response({
                'user': user_data, 
                'success': "fetch user successfully"
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "error": "User not authenticated"
            }, status=status.HTTP_401_UNAUTHORIZED)



class UserDashboard(APIView):
    def get(self, request, format=None):
        if request.user.is_authenticated:
            user = request.user
            try:
                user_profile = Profile.objects.get(user=user)
                profile_serializer = ProfileSerializer(user_profile)
                profile_data = profile_serializer.data
            except Profile.DoesNotExist:
                profile_data = None
                
            user_data = {
                'username': user.username,
                'email': user.email,
                'user_profile': profile_data
            }
            
            return Response({"user_data": user_data, "success": "user dashboard fetching data successfully"}, status=status.HTTP_200_OK)
        return Response({"error": "user is not authenticated"}, status=status.HTTP_407_PROXY_AUTHENTICATION_REQUIRED)
    
    
    
@method_decorator(csrf_protect, name='dispatch')
class UpdateUser(generics.UpdateAPIView):
    serializer_class = UpdateUserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_object(self):
        username = self.kwargs.get('username')
        # Add check to ensure user can only update their own profile
        if self.request.user.username != username:
            raise permissions.PermissionDenied("You can only update your own profile")
        return get_object_or_404(User, username=username)

    def put(self, request, *args, **kwargs):
        user_instance = self.get_object()
        
        data = {
            'username': request.data.get('username'),
            'email': request.data.get('email'),
        }

        serializer = UpdateUserSerializer(user_instance, data=data, partial=True)
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class UpdateProfile(generics.UpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_object(self):
        username = self.kwargs.get('username')
        if self.request.user.username != username:
            raise permissions.PermissionDenied("You can only update your own profile")
        return get_object_or_404(Profile, user__username=username)  # Changed to use user__username

    def put(self, request, *args, **kwargs):
        profile_instance = self.get_object()
        
        # Create a mutable copy of request.data
        data = request.data.copy()
        
        # Ensure the user field is set correctly
        data['user'] = profile_instance.user.id
        
        serializer = ProfileSerializer(profile_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Profile updated successfully',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
from django.contrib.auth import update_session_auth_hash

class UpdatePassword(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get_object(self):
        # Simply return the authenticated user
        return self.request.user

    def put(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            user = self.request.user  # Get the authenticated user
            # Check old password
            if not user.check_password(serializer.data.get("old_password")):
                return Response(
                    {"old_password": "Current password is incorrect"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # set_password also hashes the password
            user.set_password(serializer.data.get("new_password"))
            user.save()
            
            # Update the session with the new password hash to keep the user logged in
            update_session_auth_hash(request, user)
            
            return Response(
                {"message": "Password updated successfully"}, 
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
    

class CarView(APIView):
    def get(self, request, format=None):
        # Use prefetch_related to optimize queries for related fields
        queryset = Car.objects.all().prefetch_related(
            'category',
            'car_features',
            'pickup_features',
            'default_equipment'
        )
        
        # Use the new CarSerializer instead of HomeCarCard
        serializer = CarSerializer(queryset, many=True)
        
        return Response(
            {
                'success': "Fetching home car card data successfully",
                'data': serializer.data
            },
            status=status.HTTP_200_OK
        )
        
class CategoriesView(APIView):
    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        
        return Response({'seccess': "fetching categories", 'data': serializer.data}, status=status.HTTP_200_OK)
    
    
class PickupFeaturesView(APIView):
    def get(self, request, format=None):
        pickup_features = PickupFeature.objects.all()
        serializer = PickupFeatureSerializer(pickup_features, many=True)
        
        return Response({'seccess': "fetching pick up features", 'data': serializer.data}, status=status.HTTP_200_OK)
    
        
class FeaturesView(APIView):
    def get(self, request, format=None):
        features = CarFeature.objects.all()
        serializer = CarFeatureSerializer(features, many=True)
        
        return Response({'seccess': "fetching features", 'data': serializer.data}, status=status.HTTP_200_OK)
    
    
class DefaultEquipmentView(APIView):
    def get(self, request, format=None):
        default_equipments = DefaultEquipment.objects.all()
        serializer = DefaultEquipmentSerializer(default_equipments, many=True)
        
        return Response({'seccess': "fetching default equipment", 'data': serializer.data}, status=status.HTTP_200_OK)
    

from django.db.models import Max, Min
class PriceFilter(APIView):
    def get(self, request, format=None):
        max_price = Car.objects.aggregate(Max('price_per_day'))['price_per_day__max']
        min_price = Car.objects.aggregate(Min('price_per_day'))['price_per_day__min']
        return Response({'success': 'getting max price', 'max_price': max_price, 'min_price': min_price})
    
    
    
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CarBookingSerializer

class CreateCarBooking(CreateAPIView):
    serializer_class = CarBookingSerializer

    def post(self, request, format=None):
        data = request.data.copy()
        print("Booking Data:", data)

        # Set user if authenticated
        if request.user.is_authenticated:
            data['user'] = request.user.id
        else:
            data['user'] = None

        # Always set initial booking status as upcoming
        data['booking_status'] = 'upcoming'

        # Check car availability for overlapping active bookings only
        try:
            car = Car.objects.get(id=data.get('car'))
            if not is_car_available(car, data.get('pickup_datetime'), data.get('dropoff_datetime')):
                return Response(
                    {"error": "Car is not available for the selected time period"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Car.DoesNotExist:
            return Response(
                {"error": "Car not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(data=data)
        
        if serializer.is_valid():
            # Create booking without changing car availability
            booking = serializer.save()
            print("Booking created with user:", serializer.data.get('user'))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer Errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





def create_booking(car, pickup_datetime, dropoff_datetime):
    if is_car_available(car, pickup_datetime, dropoff_datetime):
        booking = CarBooking.objects.create(
            car=car,
            pickup_datetime=pickup_datetime,
            dropoff_datetime=dropoff_datetime,
            booking_status='upcoming'
        )
        car.is_available = False
        car.save()
        return booking
    else:
        raise Exception("Car is not available for the selected time period.")


from .utils import is_car_available
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=CarBooking)
def update_car_availability(sender, instance, **kwargs):
    # Check if the booking's drop-off time has passed
    if instance.dropoff_datetime <= timezone.now():
        instance.car.is_available = True
        instance.car.save()




def get_available_cars(pickup_datetime, dropoff_datetime):
    # Filter cars that have no conflicting bookings within the requested period
    available_cars = Car.objects.filter(
        is_available=True
    ).exclude(
        bookings__pickup_datetime__lt=dropoff_datetime,
        bookings__dropoff_datetime__gt=pickup_datetime
    )
    return available_cars


@receiver(post_save, sender=CarBooking)
def update_booking_status(sender, instance, created, **kwargs):
    # Only handle completion of bookings, not activation
    now = timezone.now()
    
    if instance.dropoff_datetime <= now and instance.booking_status == 'active':
        # Only update to completed if it was active and time has passed
        instance.booking_status = 'completed'
        instance.car.is_available = True
        if instance.destination2:
            instance.car.current_location = instance.destination2
            instance.car.save(update_fields=['current_location', 'is_available'])
        instance.save(update_fields=['booking_status'])
        logger.info(f"Booking {instance.id} automatically marked as completed")


from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from django.utils.timezone import make_aware
from datetime import datetime
from .models import Car, CarBooking  # Adjust the import according to your app structure
import logging

def is_car_available(car, pickup_datetime, dropoff_datetime):
    # Only check for overlapping active bookings
    conflicting_bookings = CarBooking.objects.filter(
        car=car,
        booking_status='active',  # Only check active bookings
        pickup_datetime__lt=dropoff_datetime,
        dropoff_datetime__gt=pickup_datetime
    )
    return not conflicting_bookings.exists()



logger = logging.getLogger(__name__)

class AvailableCarsView(APIView):
    def get(self, request):
        pickup_datetime_str = request.query_params.get('pickup_datetime')
        dropoff_datetime_str = request.query_params.get('dropoff_datetime')
        logger.info(f"Received pickup_datetime: {pickup_datetime_str}, dropoff_datetime: {dropoff_datetime_str}")
        print('timee', pickup_datetime_str, dropoff_datetime_str)
        # Validate input
        if not pickup_datetime_str or not dropoff_datetime_str:
            return Response({'error': 'pickup_datetime and dropoff_datetime are required'}, status=400)

        try:
            # Parse the datetime strings and make them timezone aware
            pickup_datetime = make_aware(datetime.fromisoformat(pickup_datetime_str.rstrip('Z')))  # Remove 'Z'
            dropoff_datetime = make_aware(datetime.fromisoformat(dropoff_datetime_str.rstrip('Z')))  # Remove 'Z'
        except ValueError:
            return Response({'error': 'Invalid date format'}, status=400)

        # Get available cars
        available_cars = [
            car for car in Car.objects.all() if is_car_available(car, pickup_datetime, dropoff_datetime)
        ]

        # Serialize the available cars
        cars_data = [{"id": car.id, "name": car.name, "price_per_day": str(car.price_per_day)} for car in available_cars]
        return Response({"available_cars": cars_data})




class LatestOffersView(APIView):
    def get(self, request, format=None):
        queryset = LatestOffers.objects.all()
        serializer = LatestOffersSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class GalleriesView(APIView):
    def get(self, request, format=None):
        try:
            queryset = Gallery.objects.all()
            serializer_class = GallerySerializer(queryset, many=True)
            return Response(serializer_class.data, status=status.HTTP_200_OK)
        except:
            return Response({'error', 'galleries not found'}, status=status.HTTP_404_NOT_FOUND)
        
class GalleriesCategoryView(APIView):
    def get(self, request, format=None):
        try:
            queryset = GalleryCategory.objects.all()
            serializer_class = GalleryCategorySerializer(queryset, many=True)
            return Response(serializer_class.data, status=status.HTTP_200_OK)
        except:
            return Response({'error', 'galleries not found'}, status=status.HTTP_404_NOT_FOUND)





class BookingUserInfo(APIView):
    def get(self, request, format=None):
        try:
            queryset = CarBooking.objects.filter(user=request.user)
            serializer_class = CarBookingHistorySerializer(queryset, many=True)
            return Response(serializer_class.data, status=status.HTTP_200_OK)
        except:
            return Response(serializer_class.errors, status=status.HTTP_404_NOT_FOUND)
            


class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors)  # Log the errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
        
class AddReview(APIView):
    def post(self, request, format=None):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
        
class AddWishlist(APIView):
    def post(self, request, format=None):
        user = request.data.get('user')
        car = request.data.get('car')

        # Check if the wishlist item exists
        wishlist_item, created = Wishlist.objects.get_or_create(user_id=user, car_id=car)

        if created:
            # Item added to wishlist
            wishlist_item.is_added = True
            wishlist_item.save()
            serializer = WishlistSerializer(wishlist_item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Toggle the 'is_added' state
            wishlist_item.is_added = not wishlist_item.is_added
            wishlist_item.save()
            serializer = WishlistSerializer(wishlist_item)
            return Response(serializer.data, status=status.HTTP_200_OK if wishlist_item.is_added else status.HTTP_204_NO_CONTENT)
        
class GetWishlistStatus(APIView):
    def get(self, request, car_id, user_id, format=None):
        try:
            wishlist_item = Wishlist.objects.get(car_id=car_id, user_id=user_id)
            return Response({"is_added": wishlist_item.is_added}, status=status.HTTP_200_OK)
        except Wishlist.DoesNotExist:
            return Response({"is_added": False}, status=status.HTTP_200_OK)
        

class RemoveWishlist(APIView):
    def delete(self, request, car_id, user_id, format=None):
        try:
            # Find the wishlist item for the specific user and car
            wishlist_item = Wishlist.objects.get(car_id=car_id, user_id=user_id)
            wishlist_item.delete()  # Delete the item from the wishlist
            return Response({"message": "Removed from wishlist"}, status=status.HTTP_200_OK)
        except Wishlist.DoesNotExist:
            return Response({"message": "Item not found in wishlist"}, status=status.HTTP_404_NOT_FOUND)
        
class FetchWishlistObjects(APIView):
    def get(self, request, format=None):
        try:
            queryset = Wishlist.objects.filter(user=request.user)
            serializer = WishlistSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Wishlist.DoesNotExist:
            return Response({"message": "Item not found in wishlist"}, status=status.HTTP_404_NOT_FOUND)
        
        
class FetchInboxsObjects(APIView):
    def get(self, request, format=None):
        try:
            queryset = Inbox.objects.filter(user=request.user)
            serializer = InboxSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Wishlist.DoesNotExist:
            return Response({"message": "Item not found in wishlist"}, status=status.HTTP_404_NOT_FOUND)
        
class GetNotifCount(APIView):
    def get(self, request, format=None):
        queryset = Inbox.objects.filter(user=request.user, is_read=False)  # Assuming is_read marks unread notifications
        serializer = InboxSerializer(queryset, many=True)
        notif_count = queryset.count()  # Get count directly
        data = {
            'data': serializer.data,
            'notif_count': notif_count
        }
        return Response(data, status=status.HTTP_200_OK)
    
        
class ResetNotifCount(APIView):
    def post(self, request, user_id, format=None):
        # Set all user inbox notifications as read
        Inbox.objects.filter(user=user_id).update(is_read=True)  # Set all notifications as read
        return Response({"message": "Notifications reset successfully", "notif_count": 0}, status=status.HTTP_200_OK)