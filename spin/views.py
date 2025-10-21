from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from spin.models import History

from spin.utils import spin_wheel_for_user


def history_page(request):
    history = History.objects.filter(user=request.user).order_by('-date')[:50]
    return render(request, 'spin/history_page.html', {'history': history})


@login_required
def spin_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request method"}, status=405)

    import json
    data = json.loads(request.body)
    segments = data.get("segments", [])

    spin_output = spin_wheel_for_user(request.user, segments)
    return JsonResponse(spin_output)


@login_required
def dashboard(request):
    profile = request.user.profile

    return render(request, "spin/dashboard.html", {
        "profile": profile,
        "history": request.user.history.all()
    })
