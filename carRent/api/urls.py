from django.urls import path
from . import views

urlpatterns = [
    # Account
    path('user-creation/', views.CreateUserView.as_view(), name='user-creation'),
    path('user-login/', views.UserLoginView.as_view(), name='user-login'),
    path('user-info/', views.UserInfos.as_view(), name='user-info'),
    path('user-dashboard/', views.UserDashboard.as_view(), name='user-dashboard'),
    path('user-update/<str:username>/', views.UpdateUser.as_view(), name='user-update'),
    path('update-profile/<str:username>/', views.UpdateProfile.as_view(), name='update-profile'),
    path('update-password/', views.UpdatePassword.as_view(), name='update-password'),
    path('get-csrf-token/', views.GetCSRFToken.as_view(), name='get_csrf_token'),
    path('check_authentication/', views.CheckAuthenticatedView.as_view(), name='check_authentication'),
    path('csrf/', views.GetCSRFToken.as_view(), name='csrf'),
    path('logout/', views.LogoutView.as_view(), name='logout'),

    path('home-car-card/', views.CarView.as_view(), name='home-car-card'),
    path('categories/', views.CategoriesView.as_view(), name='categories'),
    path('pick-up-features/', views.PickupFeaturesView.as_view(), name='pick-up-features'),
    path('features/', views.FeaturesView.as_view(), name='features'),
    path('default-equipment/', views.DefaultEquipmentView.as_view(), name='default-equipment'),
    path('price-filter/', views.PriceFilter.as_view(), name='price-filter'),
    path('available-cars/', views.AvailableCarsView.as_view(), name='available-cars'),
    
    path('create-booking/', views.CreateCarBooking.as_view(), name='create-booking'),
    path('add-news-letter/', views.NewsLetterView.as_view(), name='add-news-letter'),
    path('latest-offers/', views.LatestOffersView.as_view(), name='latest-offers'),
    path('add-review/', views.AddReview.as_view(), name='add-review'),
    path('add-wishlist/', views.AddWishlist.as_view(), name='add-wishlist'),
    path('get-wishlist-status/<int:car_id>/<int:user_id>/', views.GetWishlistStatus.as_view(), name='get-wishlist-status'),
    path('remove-wishlist/<int:car_id>/<int:user_id>/', views.RemoveWishlist.as_view(), name='remove-wishlist'),
    path('get-wishlist-objects/', views.FetchWishlistObjects.as_view(), name='get-wishlist-objects'),
    path('gallery/', views.GalleriesView.as_view(), name='gallery'),
    path('gallery-categroy/', views.GalleriesCategoryView.as_view(), name='gallery-categroy'),
    path('contact-us/', views.ContactView.as_view(), name='contact-us'),
    
    path('get-inboxs/', views.FetchInboxsObjects.as_view(), name='get-inboxs'),
    path('get-notif-count/', views.GetNotifCount.as_view(), name='get-notif-count'),
    path('reset-notif-count/<int:user_id>/', views.ResetNotifCount.as_view(), name='reset-notif-count'),
    path('booking-info/', views.BookingUserInfo.as_view(), name='booking-info'),
]
