# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
import schedule
import time
from .models import HouseMate
import threading


# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
class TwilioAPI(threading.Thread):
    ACCOUNT_SID = ""
    AUTH_TOKEN = ""
    SENDER_NUMBER = ''
    client = Client(ACCOUNT_SID, AUTH_TOKEN)

    """"
    returns higher order function to schedule job on a specific day
    """

    def get_func(self, day):
        if day == "0":
            return schedule.every().monday
        elif day == "1":
            return schedule.every().tuesday
        elif day == "2":
            return schedule.every().wednesday
        elif day == "3":
            return schedule.every().thursday
        elif day == "4":
            return schedule.every().friday
        elif day == "5":
            return schedule.every().saturday
        else:
            return schedule.every().sunday

    """"
    Sending message utilizing Twilio api
    """

    def send_msg(self, chore, housemate):
        message = self.client.messages \
            .create(
                body=f"Reminder that {chore['name']} need to be done today :)",
                from_=self.SENDER_NUMBER,
                to=housemate.phone_number,
            )

        next_house_mate = HouseMate.objects.filter(id=housemate.id+1)
        if next_house_mate.count() == 0:
            next_house_mate = HouseMate.objects.all()[0]
        self.schedule_message(chore, next_house_mate)

    """
    schedule message sending
    """

    def schedule_message(self, chore, housemate):
        schedule_func = self.get_func(chore["day"])
        schedule_func.do(self.send_msg, chore, housemate)

    """
    Run background taks
    """

    def run(self):
        while True:
            schedule.run_pending()
            time.sleep(86400)
