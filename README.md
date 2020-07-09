# Using the Google Translate API With ReactJS and Axios.

## Introduction

This app uses Axios to send a request to google cloud translate API.
Depending on the parameters of the request the response will contain the translated text.
This app can switch languages from drop downs with the click of the react image.

## Prerequirements
```
Node.js
npm 
create-react-app
axios ( npm install react-axios )
google-translate package (npm install google-translate --save)
```


## .env
You will need to create a .env file for this  to work  with the API in the .env file.
You can use the example from below in your .env file.


REACT_APP_GOOGLE_TRANSLATE_API_KEY="PUT_YOUR_API_KEY_HERE"

## Styling
I was playing with styling a bit in this by using flex box. I also dove into using animations.
If you click on the react app symbol this will flip the language being translated From/To.


Current Version does not support browser language detection and does not suggest/correct misspelled words

