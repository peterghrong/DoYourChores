# DoYourChores

## Introduction
Do you hate your roommates for not doing chores, well I don't because I have lovely roommates, but still I provide you with a solution.
DoYourChores is a SMS messaging app utilizing scheduling and twilio SMS API to send them reminders on the day where the task is scheduled.

<p align="center">
    <img src="https://user-images.githubusercontent.com/66083521/138386851-4d55f89b-371a-4096-843f-702b88c83394.png">
</p>

## Installation
1. `git clone git@github.com:peterghrong/DoYourChores.git`
2. `cd backend`
3. `pip install -r requirement.txt`
4. `cd ../frontend`
5. `npm install`
6. In the backend folder, run `python start runserver` to spin up the backend. 
7. In a seperate shell in the frontend folder, run `npm start` to spin up the frontend.
8. Go to `localhost:3000` in your browser.

## Usage
1. Adjust the following lines to the source file in /backend/DoYourChores/twilio_api.py
- ACCOUNT_SID
- AUTH_TOKEN
- SENDER_NUMBER

2. Add chores and housemates in the UI, note that the day in the week is defined as (0,6) representing Monday to Friday, future improvements can be made here.

## Example Usage
<p align="center">
    <img src="https://user-images.githubusercontent.com/66083521/138387960-498eb456-f3dc-4991-95d6-17e09f46e02d.png">
</p>
