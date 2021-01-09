from django.db import models


class Task(models.Model):
	title = models.CharField(max_length=150, blank=False)
	description = models.CharField(max_length=250, blank=True)
	completed = models.BooleanField(default=False)
	created = models.DateField(auto_now_add=True)

	def __str__(self):
		return self.title