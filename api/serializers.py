from rest_framework import serializers
from .models import Task

class ViewTaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Task
		fields = ('id', 'title', 'description', 'completed', 'created')

class CreateTaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Task
		fields = ('title', 'description')