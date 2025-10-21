from django.utils import timezone
from django.contrib.auth import user_logged_in
from django.db.models.signals import post_save
from django.dispatch import receiver

from accounts.models import Profile, User


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        update_profile(instance)


@receiver(user_logged_in)
def update_profile_on_login(sender, request, user, **kwargs):
    update_profile(user, request)


def update_profile(user, request=None):
    profile = user.profile
    now = timezone.now()

    if not profile.last_login:
        profile.consecutive_days = 1
        profile.remaining_spins_today = 20
    else:
        days_diff = (now.date() - profile.last_login.date()).days

        if days_diff >= 1:
            profile.remaining_spins_today = 20

            if days_diff == 1:
                profile.consecutive_days += 1
            else:
                profile.consecutive_days = 1

    profile.last_login = now
    profile.save()
