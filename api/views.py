from django.shortcuts import render
from django.contrib import messages

from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import ViewTaskSerializer, CreateTaskSerializer
from .models import Task

# Create your views here.

@api_view(['GET'])
def tasks_api(request):
	tasks = Task.objects.all()
	serializer = ViewTaskSerializer(instance=tasks, many=True)

	return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_api(request):
	serializer = CreateTaskSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

		return Response(serializer.data, status=status.HTTP_200_OK)

	return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def update_api(request, pk):
	task = Task.objects.filter(id=pk).first()
	serializer = ViewTaskSerializer(instance=task, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def search_api(request, user_input):
	tasks = Task.objects.filter(title__icontains=user_input)
	serializer = ViewTaskSerializer(tasks, many=True)

	return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'DELETE'])
def delete_api(request, pk):
	task = Task.objects.filter(id=pk).first()
	task.delete()

	return Response(status=status.HTTP_200_OK)
