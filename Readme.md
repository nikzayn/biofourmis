# Biofourmis Task
- In this task, I have to analyse the covid-19 open source api's and send an email to list of subscribers at 6 AM every morning with the following data.

## Overview
- System Requirements
- Design Thoughts
- Usage
- Technologies Required
- Issues
- Edge Cases
- API Usage
- Demo

### System Requirements
- Docker
- Docker Compose

### Design Thoughts
- First, there shuld be a server where all the cron job scheduler can be easily. For this, I would use docker system in my app.
- Then, I will first setup my nodejs server, in which I will also setup the database system in which I will store my subscriber's mail id.
- After, successfull connection and data stored in db. There would be public enpoint from where anyone can easily subscriber with their respective email id's.
- Furthermore, I will then setup the functionality from where I get the respective **coronavirus** cases in our country.
- I would setup a cron job for this task, so it will run accordingly on the given time.
- After that, I would query the data from db.
- I will create a functionality in which user's get their mail on their email id specificly gmail id's. So, in this I will put a check where it that db is stored or not.
- After all the process is done, I would check if the response say's "Thanks for subscribing!" and on console of terminal to check the response from nodemailer librabry.

### Usage
```
git clone https://github.com/nikzayn/biofourmis.git
cp sample.env .env
sudo docker-compose build
sudo docker-compose up
```
**Note** 
- When you copy the sample.env to .env file. Please update the email and password fields from the environemnt variables to get started with application.
- You can replace the dummy email and password with your email and password
- To send email using Gmail as a service from third-party apps like our nodejs app, we have to enable 'Allow less secure apps' in Gmail. Login in your Gmail account and navigate to "https://myaccount.google.com/lesssecureapps" and enable the 'Allow less secure apps'.


### Technologies Used
- Node.js
- Express
- Lodash
- Axios
- Nodemailer
- Node-Cron
- pg

### Issues
- So, actually I used the **deltaconfirmed** data which show the new covid cases in India. As mentioned in assignment you have the details to show the yesterday data.
- As I couldn't able to locate the yesterday data.
- Chances of getting issues with cron jobs.

### Edge Cases
- Used Docker for the code setup
- Used database for better storage functionality to follow.

### API Usage

| Endpoint                     | Result                                              |
|------------------------------|-----------------------------------------------------|
| /subscribers/list            | Submit the email address to subscribe               |


### Postman Usage
- Here's the image for better understanding of endpoint to trigger: ![postman](https://i.ibb.co/6v6VTJH/biofourmis.png)

### Demo
- Here's the image of demo: ![demo](https://i.ibb.co/k3xF4pv/demo.png)

