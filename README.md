## Verify Demo Environment

This is a customizable demon environment for showcasing Twilio Verify capabilities.

![Example of the Platform with Segment Branding](https://i.imgur.com/xerH7Oy.png)

![enter image description here](https://i.imgur.com/74xUDFC.png)

## How to Start

1. Clone this repository
2. Run the command **npm install**
3. Open the .example.env and fill out your Twilio information. Also, rename the file to just ".env" . If you don't have a Verify Service, you will need to create one in the Twilio Console.
4. Run the command **npm start**
5. Open http://localhost:3000/ on your browser

## How to Demo

1. Insert your phone number
2. Choose a channel (SMS or WhatsApp)
3. Continue
4. You will receive a verification code on the number provided
5. Insert the code
6. Confirm

## How to Customize

### Fast Customization

Click on the company logo (default is the Twilio Logo) at the platform to open the customization menu. You can upload a new logo and change the platform's colors. It is all saved locally.

### Localization

Open the **website/text.js** file and alter the variables to the desired phrases and country codes.

### Advanced

All of the code is open source and created with vanilla HTML, CSS and Javascript. Feel free to add and update whatever you like. If you create anything awesome, please consider creating a pull request!
