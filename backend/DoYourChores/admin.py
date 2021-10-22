from django.contrib import admin
from .models import HouseMate, Chore


class HouseMateAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone_number',
                    'current_chore_handler', "available")


class ChoreAdmin(admin.ModelAdmin):
    list_display = ('name', 'day')


admin.site.register(HouseMate, HouseMateAdmin)
admin.site.register(Chore, ChoreAdmin)
