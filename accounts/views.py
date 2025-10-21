from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from accounts.forms import SignupForm, LoginForm
from accounts.models import User


def auth_view(request):
    if request.method == "POST":
        if "signup" in request.POST:
            form = SignupForm(request.POST)
            if form.is_valid():
                username = form.cleaned_data["username"]
                email = form.cleaned_data["email"]
                password = form.cleaned_data["password"]
                country = form.cleaned_data["country"]

                user = User(username=username, email=email, country=country)
                user.set_password(password)
                user.save()

                login(request, user)
                messages.success(request, "You have successfully registered")
                return redirect("dashboard")
            else:
                for field, errors in form.errors.items():
                    for error in errors:
                        messages.error(request, f"{field}: {error}")

        elif "login" in request.POST:
            form = LoginForm(request.POST)
            if form.is_valid():
                username = form.cleaned_data["username"]
                password = form.cleaned_data["password"]
                user = authenticate(request, username=username, password=password)
                if user:
                    login(request, user)
                    messages.success(request, "You have successfully logged in")
                    return redirect("dashboard")
                else:
                    messages.error(request, "Invalid username or password")

    return render(request, "accounts/auth.html")


def logout_view(request):
    logout(request)
    messages.success(request, "You have successfully logged out.")
    return redirect("auth")


@login_required(login_url='auth')
def dashboard(request):
    profile = request.user.profile
    return render(request, "spin/dashboard.html", {
        "profile": profile
    })

