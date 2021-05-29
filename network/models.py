from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Posts(models.Model):
    content = models.TextField(blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_posts")
    like = models.IntegerField(default=0)
    time = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user}: {self.content} @{self.time}. Likes: {self.like}"