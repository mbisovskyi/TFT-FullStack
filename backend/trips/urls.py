from django.urls import path, include
from trips import views

urlpatterns = [
    path('', views.user_trips),
    path('<int:pk>/', views.trip_by_id),
]