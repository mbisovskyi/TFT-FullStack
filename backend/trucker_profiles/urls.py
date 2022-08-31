from django.urls import path, include
from trucker_profiles import views


urlpatterns = [
    path('', views.get_trucker_profile),
]