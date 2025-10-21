from django.contrib.auth.models import AbstractUser
from django.db import models

from Spin_The_Wheel import settings


class User(AbstractUser):
    country = models.CharField(max_length=100,null=True, blank=True)

    def __str__(self):
        return f' username: {self.username} \n' f' email: {self.email} \n' f' country: {self.country}'


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    last_login = models.DateTimeField(blank=True, null=True)
    total_spins_today = models.IntegerField(default=0, blank=True)
    remaining_spins_today = models.IntegerField(default=20)
    consecutive_days = models.IntegerField(default=0)
    last_spin_time = models.DateTimeField(blank=True, null=True)
    last_streak_reward = models.DateField(null=True, blank=True)

    def __str__(self):
        return (f'user: {self.user} \n last_login: {self.last_login}'
                f'\n total_spins_today: {self.total_spins_today}'
                f'\n remaining_spins_today: {self.remaining_spins_today}'
                f'\n consecutive_days: {self.consecutive_days}')

    def can_spin(self, cooldown_seconds=30):
        from django.utils import timezone
        if self.remaining_spins_today <= 0:
            return False, "no_remaining_spins_today"

        if self.last_spin_time:
            elapsed = (timezone.now() - self.last_spin_time).total_seconds()
            if elapsed < cooldown_seconds:
                return False, f"cooldown_{int(cooldown_seconds - elapsed)}"

        return True, None
from django.db import models

# Create your models here.
