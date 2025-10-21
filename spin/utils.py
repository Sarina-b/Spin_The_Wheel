import random
from django.utils import timezone
from spin.models import History


def spin_wheel_for_user(user, segments):
    profile = user.profile
    if profile.remaining_spins_today <= 0:
        return {
            "status": "error",
            "message": "No spins left for today. Come back tomorrow!"
        }
    profile.remaining_spins_today -= 1

    if not segments:
        return {"error": "No options provided"}

    result_index = random.randint(0, len(segments) - 1)
    result_label = segments[result_index]

    History.objects.create(
        user=user,
        result=result_label,
        date=timezone.now()
    )
    profile.save()

    return {
        "status": "success",
        "result_index": result_index,
        "result_label": result_label,
        "remaining_spins_today": profile.remaining_spins_today
    }

