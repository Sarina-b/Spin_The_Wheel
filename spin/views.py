from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from spin.models import History

from spin.utils import spin_wheel_for_user


def history_page(request):
    history = History.objects.filter(user=request.user).order_by('-date')[:50]
    return render(request, 'spin/history_page.html', {'history': history})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def spin_api(request):
    segments = request.data.get("segments", [])
    spin_output = spin_wheel_for_user(request.user, segments)
    return Response(spin_output, status=status.HTTP_200_OK)


@login_required
def dashboard(request):
    profile = request.user.profile

    return render(request, "spin/dashboard.html", {
        "profile": profile,
        "history": request.user.history.all()
    })
