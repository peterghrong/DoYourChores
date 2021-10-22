from rest_framework import serializers
from .models import HouseMate, Chore


class HouseMateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseMate
        fields = ('id', 'name', 'phone_number',
                  'current_chore_handler', "available")


class ChoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chore
        fields = ('id', 'name', 'day')
