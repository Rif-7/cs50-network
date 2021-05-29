from django.contrib import admin
from .models import User, Posts

class PostsAdmin(admin.ModelAdmin):
    list_display = ("user", "content", "time", "like")

# Register your models here.
admin.site.register(User)
admin.site.register(Posts, PostsAdmin)