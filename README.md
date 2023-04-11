# Project Plan

This is the project plan for Gustav Elmqvist (gusel725) and Gabriel Hult (gabhu204) in the course TDDD27

## Idea

A webpage which collects movies and series that are available to watch (could be made-up data or real, depends on what we manage to achieve and what is allowed with regards to ToS). A user will have all movies that they want to watch on that page and can then go to the corresponding website to watch it (Netflix, HBO, Disney+, etc.). It is basically a hub for these websites.

## Functions

These are some functionality that we would like to implement:

1. Use made-up data or real data (API) to store movies and series.
2. Use Django to authenticate log-in to access account features.
3. Use Django database to store user contributed information which will be searchable for other users.
4. Attempt to utilize persistant storage to save what movies and series the user has starred or liked.

## Frameworks

These are the frameworks we chose to work with during the project.

### React

We chose React because we felt that the framework best suited us with regards to experience using frontend frameworks, and its wide use in the industry

### Django

We chose Django as backend framework because of its easy-to-use nature and removes tedious work so that we can focus on the more important features.

### Heroku

We would like to try and use a deployment service and Heroku, according to our research, would work really well with Django. This is if we have the time.

## How to run

To build React version (executed inside client folder)

```zsh
npm run build
```

To run the Django server (executed at top level)

```zsh
python3 manage.py runserver
```
