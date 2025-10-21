from django.urls import path
from django.views.generic import TemplateView

from . import views
from .views import auth_view

urlpatterns = [
    path('', auth_view, name='auth'),
    path('privacy/', TemplateView.as_view(template_name='accounts/privacy.html'), name='privacy'),
    path('help/', TemplateView.as_view(template_name='accounts/help.html'), name='help'),
    path('logout/', views.logout_view, name='logout')
]
