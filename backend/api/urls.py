from django.urls import path
from . import views

urlpatterns = [
    path('plots/', views.get_plots, name='get-plots'),
    path('bookings/', views.submit_booking, name='submit-booking'),
]
