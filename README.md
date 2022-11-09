# Angular Course Project - Recipe Book

Built with angular 14 for the frontend and firebase for the backend.

Recipe Book
----

* [Introduction](#introduction)
* [Requirements](#requirements)
* [Key Features](#key-features)
* [Used Technologies](#used-technologies)
* [Configuration and Setup](#configuration-and-setup)
* [Note Before Proceeding](#note-before-proceeding)
* [License](#license)

## Introduction
This project was done by following the [angular course](https://www.udemy.com/course/the-complete-guide-to-angular-2/) on [udemy](https://www.udemy.com/). It is a small but yet powerful one. It may not contain that many features from the client's perspective, but from the developer's POV, it uses some advanced features. This was done as part of the learning process in order to obtain the desired skills.

## Requirements
The user must have on his machine:
- Angular 14+
- NodeJS

## Key Features
- Validation
- Authentication
- Route Protection
- Adding, editing, and deleting recipes.
- Adding food items of a recipe to the cart and the ability to edit it.

## Used Technologies
This project was created using the following:

- Angular 14
- RXJS
- HTTP Client 
- Reactive Forms
- Angular Router
- Bootstrap 3
- Firebase Authentication
- Firebase Realtime database

## Configuration and Setup
In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.
- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Type "npm install" in the terminal without the double quotations and press enter then wait for the packages installation. (Assuming you already have nodejs)
- Now open your preferred browser and go the to firebase console then create new project. (Create a google account if you do not have one)
- Navigate to authentication and set the the sign-in method by adding the Email/Password provider. (Only Enable the Email/Password and not the Email Link)
- Navigate to the project setting and note down the Web API Key.
- Navigate to the realtime database and set it up (Test or Locked mode it does not matter since we are going to change it) then note down the database URL in the Data Tab. Now change the security rules in the RULES tab as the following:
    ```
    {
    "rules": {
        ".read": "auth != null",
        ".write": "auth != null",
        }
    }
    ```
- Back to your editor/IDE, navigate to src --> environment --> environment.ts then write the values of the following keys: firebaseAPIKey (Web API Key) and firebaseDatabaseUrl. (The URL)  
Make sure that the URL ends with a forward slash "``/``" when pasting it.
    ```
    export const environment = {
    production: false,
    firebaseAPIKey: 'YOUR_OWN_FIREBASE_WEB_API_KEY',
    firebaseDatabaseUrl: 'YOUR_OWN_FIREBASE_REALTIME_DATABASE_URL',
    };
    ```
- In the previously opened terminal, type "ng serve" without the double quotations then open the provided link. It is usually:
    ```
    http://localhost:4200
    ```

## Note Before Proceeding
This course project application may lack some features that can be added. Some optimizations already exist but the overall behavior can be improved.  
After adding, editing, or deleting a recipe, you need to save manually in order for the changes to take effect in the database (Manage --> Save). Otherwise, the changes are only done locally.  
You can add, edit, or delete a recipe without saving them then refetch them (Manage --> Fetch) and all the changes will be undone. (By refetching without saving, the new data will be overriden by the old data)  
The shopping a default of two items.

## License
- This project is [MIT](https://github.com/Hussein-AlSayyed/Recipe-Book/blob/main/LICENSE.md) licensed.