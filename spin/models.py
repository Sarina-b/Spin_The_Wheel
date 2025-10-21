from django.db import models

from accounts.models import User


# Create your models here.

class History(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='history')
    result = models.CharField(max_length=255, blank=True, null=True)  # اضافه شد
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'user: {self.user}, result: {self.result}, date: {self.date}'

