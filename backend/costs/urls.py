from django.urls import path, include
from costs import views

urlpatterns = [
    path('', views.add_costs),
    path('trip/<int:pk>/', views.get_trip_costs),
    path('cost/<int:cost_id>/', views.update_trip_cost_details),
    path('<int:cost_id>/trip/<int:trip_id>/', views.get_trip_cost_by_id),
]