from django.urls import path, include
from costs import views

urlpatterns = [
    path('', views.add_trip_costs),
    path('<int:pk>/', views.get_trip_costs),
    path('<int:cost_id>/trip/', views.update_trip_cost),
]