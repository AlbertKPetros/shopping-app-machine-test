# ShoppingApp

**Test application for machine test**

Shopping application includes buyer and seller registration, login,redirection to different dashboard based on user type.
This app was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9 for UI and for API with [json-server](https://www.npmjs.com/package/json-server) version 0.16.1.

## Installation

- `npm install -g @angular/cli` Angular CLI
- `npm install -g json-server` Json Server

## Development server

- Run `ng serve --open` for a dev server for UI. Navigate to `http://localhost:4200/`
- Run `json-server --watch users.json` for a dev server for API. Navigate to `http://localhost:3000/users`

## Routes

- [Registration](http://localhost:4200/register)
- [Login](http://localhost:4200/login)
- [DashBoard - Seller](http://localhost:4200/dashboard-seller)
- [DashBoard - buyer](http://localhost:4200/dashboard-seller)
- [404 Error](http://localhost:4200/not-found)

## Features

1. Register as buyer or seller (two types of users)
2. Login functionality
3. Different dashboard pages for each type of user and after logging in redirection to appropriate dashboard
