from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.db.utils import ProgrammingError
from django.http import HttpResponse, HttpResponseRedirect, request
from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import User, Posts, Like


def index(request):
    posts = Posts.objects.all().order_by('-time')
    liked_posts = []
    for post in posts:
        for p in post.liked_usr.all():
            for usr in p.liked_users.all():
                if usr == request.user:
                    liked_posts.append(post.id)

    print(liked_posts)
    return render(request, "network/index.html", {
        "posts": posts,
        "liked_posts": liked_posts,
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


def new_post(request):
    if request.method == "POST":
        post = Posts(user=request.user, content=request.POST["content"])
        post.save()
        return HttpResponseRedirect(reverse('index'))
    
    return HttpResponse("Error: This page only accepts post requests")

@csrf_exempt
def like_post(request, post_id):
    if request.method == "POST":
        try:
            post = Posts.objects.get(pk=post_id)
        except:
            return JsonResponse({"stat": "failed"}, status=404)
        
        try:
            l = Like.objects.filter(post=post).first()
            l = l.liked_users
        except:
            Like(post=post).save()
            l = Like.objects.filter(post=post).first()
            l = l.liked_users
        for usr in l.all():
            if request.user == usr:
                return JsonResponse({"stat": "Already Liked"}, status=200)
        l.add(request.user)
        post.like = l.count()
        post.save()
        
        return JsonResponse({"stat": "Success"}, status=200)
    
    return HttpResponse("This page only accepts Post requests")