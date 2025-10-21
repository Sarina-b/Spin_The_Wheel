from django import forms
from django.core.exceptions import ValidationError
from accounts.models import User


class SignupForm(forms.Form):
    username = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "Username"})
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={"placeholder": "Email"})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={"placeholder": "Password"})
    )
    country = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "Country"})
    )

    def clean_email(self):
        email = self.cleaned_data["email"]
        if User.objects.filter(email=email).exists():
            raise ValidationError("Email already registered")
        return email

    def clean_password(self):
        password = self.cleaned_data["password"]
        if len(password) < 8:
            raise ValidationError("Password must be at least 8 characters")
        if not any(char.isdigit() for char in password):
            raise ValidationError("Password must contain at least one number")
        if not any(char.isalpha() for char in password):
            raise ValidationError("Password must contain at least one letter")
        return password


class LoginForm(forms.Form):
    username = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "Username"})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={"placeholder": "Password"})
    )
