from .twilio_api import TwilioAPI
from .models import HouseMate, Chore
from .serializers import HouseMateSerializer, ChoreSerializer
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.shortcuts import render


class HouseMateView(viewsets.ModelViewSet):
    serializer_class = HouseMateSerializer
    queryset = HouseMate.objects.all()


class ChoreView(viewsets.ModelViewSet):
    serializer_class = ChoreSerializer
    queryset = Chore.objects.all()

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        num_housemates = HouseMate.objects.count()

        # in there are people in the house then schedule tasks
        if num_housemates != 0:
            first_housemate = self.queryset[0]
            twilio_api = TwilioAPI()
            twilio_api.schedule_message(
                serializer.data, first_housemate)
            twilio_api.start()

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
