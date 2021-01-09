from django.views.generic import TemplateView
from django.urls import path
from . import views

urlpatterns = [
		path('', views.register, name='register'),
		path('database/', views.database, name='database'),
		path('database/assessor/<str:assessor>', views.assessor, name='assessor'),
		path('database/rrn/<str:rrn>', views.rrn, name='rrn'),
		path('login/', views.loginPage, name='login'),
		path('logoutUser/', views.logoutUser, name='logout'),
		path('registerUser/', views.registerUser, name='register_user'),]
