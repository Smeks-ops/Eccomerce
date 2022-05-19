# Ose-s e-commerce Server

## API Doc - https://oses-todo-app.herokuapp.com/api/v1/docs/

## HEROKU Link

## Getting the App Locally

1. Clone this repository with this command
```bash
git clone https://github.com/Smeks-ops/Eccomerce
```

## Installing The App

2. Install dependencies with this command
```bash
npm install
```

3. Ensure you have the local .env file for configuration parameters. A **sample.env** file is shown in the folder directory for guide.

4. Run the app in development environment using this command
```bash
npm run start:dev
```

## Running tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Routes

```
# documentation route
$ .../api/v1/docs/#/

# default route
$ .../api/v1/docs/#/default/AppController_getHello

# user sign up
$ .../api/v1/auth/register

# user login
$ .../api/v1/docs/#/auth/AuthController_createUser

# list of all sellers for buyer
$ .../api/v1/docs/#/user/UsersController_getAllSellers

# gets seller-catalog based on seller id
$ .../api/v1/docs/#/user/UsersController_getSellerById

# creates order for buyer
$ .../api/v1/docs/#/user/UsersController_selectProductFromCatalog

# list orders for a seller
$ .../api/v1/docs/#/user/UsersController_getAllOrdersForASeller

# creates catalog for a seller 
$ .../api/v1/docs/#/catalog/CatalogController_create

# creates a product for a seller
$ .../api/v1/docs/#/product/ProductController_create

```
