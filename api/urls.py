from django.urls import path, include
from . import views

urlpatterns = [
    path('tasks/', views.tasks_api),
    path('create/', views.create_api),
    path('update/<int:pk>/', views.update_api),
    path('delete/<int:pk>/', views.delete_api),
    path('search/<str:user_input>', views.search_api),
]