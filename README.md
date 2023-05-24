# Project Plan (UPDATED 2023-05-24)

This is the project plan for Gustav Elmqvist (gusel725) and Gabriel Hult (gabhu204) in the course TDDD27

## Idea

A webpage which collects movies and series that are available to watch (could be made-up data or real, depends on what we manage to achieve and what is allowed with regards to ToS). A user will have all movies that they want to watch on that page and can then go to the corresponding website to watch it (Netflix, HBO, Disney+, etc.). It is basically a hub for these websites.

## Functions

These are some functionality that we would like to implement:

1. Use made-up data or real data (API) to store movies and series.
2. Use Firebase authentication to log-in and access account features such as watchlist and seenlist.
3. Use Firebase Realtime Database to store newly added watchlist and/or seenlist items. Streaming availability will also be stored if they aren't stored already.
4. Attempt to utilize persistant storage to save what movies and series the user has starred or liked. This is done by using sessionStorage and Firebase Realtime Database

## Frameworks

These are the frameworks we chose to work with during the project.

### React

We chose React because we felt that the framework best suited us with regards to experience using frontend frameworks, and its wide use in the industry

### Django

We chose Django as backend framework because of its easy-to-use nature and removes tedious work so that we can focus on the more important features. However, it is used more as the micro framework Flask since we utilize its routing capabilities. We also set the Django server up so that a proxy between React and Django can be established (so they can communicate when running separately). 

#### Django REST

To communicate between React and Django, Django REST framework will be used to send proper responses between them.

### Firebase

We use Firebase Authentication and Firebase Realtime Database to authenticate users via Google sign in and to store users watchlist/seenlist as well as streaming availability for movies.

### Heroku

We would like to try and use a deployment service and Heroku, according to our research, would work really well with Django. This is if we have the time.
UPDATE: This is most likely not be done due to focus on other technologies such as Redux and Firebase.

## How to run

### Using one terminal for Django and one for React

To start the React development server (executed inside client folder)

```zsh
npm start
```

To run the Django server (executed at top level)

```zsh
python3 manage.py runserver
```

### Only using Django server (currently bugged regarding login)

To build React version (executed inside client folder)

```zsh
npm run build
```

To run the Django server (executed at top level)

```zsh
python3 manage.py runserver
```

## Submission

Links to unlisted youtube videos containing screencasts

- [Project Screencast](https://youtu.be/em-PWKLoHRQ)
- [Gabriel Individual Code Screencast](https://google.com)
- [Gustav Individual Code Screencast](https://google.com)
