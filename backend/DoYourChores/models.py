from django.db import models

DAYS_OF_WEEK = (
    (0, 'Monday'),
    (1, 'Tuesday'),
    (2, 'Wednesday'),
    (3, 'Thursday'),
    (4, 'Friday'),
    (5, 'Saturday'),
    (6, 'Sunday'),
)


class HouseMate(models.Model):
    name = models.CharField(max_length=120)
    phone_number = models.CharField(max_length=120)
    current_chore_handler = models.BooleanField(default=False)
    available = models.BooleanField(default=False)

    def _str_(self):
        return self.name


class Chore(models.Model):
    name = models.CharField(max_length=120)
    day = models.CharField(max_length=1, choices=DAYS_OF_WEEK)
