from django.urls import path, include
from trips import views

urlpatterns = [
    path('', views.user_trips),
    path('<int:pk>/', views.update_trip_by_id),
]