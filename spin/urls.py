from spin import views
from django.urls import path

urlpatterns = [
    path('api/spin/', views.spin_api, name='spin_api'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('history/', views.history_page, name='history_page'),

]
