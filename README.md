# Airbean API - v2.0 with Admin Panel

RESTful API for AirBean application. It provides endpoints to create users,check the menu and order from the menu.

## Developers

- [Shahin](https://www.github.com/shahfarzane)

## Installation

Install Airbean-api with npm

```bash
  npm install

```

## Run Locally

Start the server

```bash
  npm run dev
```

## Tech Stack

**Server:** Node, Express , MongoDB, Bcrypt, Moment , Nodemon , JWt

## Endpoints : ADMIN PANEL

List of available Endpoints :

#### Sign up as an Admin and receive a JWT Token

```http
  POST /api/admin/signup
```

Example request body object:

```json
{
  "email": "name@email.com",
  "password": "1234"
}
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

- After the sign-up as an admin user has been successful, a token will be returned that can be used to authenticate the user as admin. This token can be used for creating,updating and deleting of entities.

#### Response:

```javascript
{
	"message": "Admin successfully created",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySdQiOiI2NDgxNzI5N2U5NjE2MjFiMDBjMDNjNmYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODYyMDUwNzksImV4cCI6MTY4NjgwOTg3OX0.kjDiq8Nk2NfZ0DEu1d_cfNmvXtvVTXwv4UT9Mcr5UR4"
}
```

#### Sign in as an Admin

```http
  POST /api/admin/login
```

Example request body object:

```json
{
  "email": "name@email.com",
  "password": "1234"
}
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Response:

```javascript
{
	"message": "succuss",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySdQiOiI2NDgxNzI5N2U5NjE2MjFiMDBjMDNjNmYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODYyMDUwNzksImV4cCI6MTY4NjgwOTg3OX0.kjDiq8Nk2NfZ0DEu1d_cfNmvXtvVTXwv4UT9Mcr5UR4"
}
```

#### Create a new item in the menu

```http
  POST /api/admin/create
```

Example request body object:

```json
{
  "name": "Item Name",
  "price": 89,
  "description": "Item Description"
}
```

| Parameter     | Type     | Description   |
| :------------ | :------- | :------------ |
| `name`        | `string` | **Required**. |
| `price`       | `number` | **Required**. |
| `description` | `string` | **Required**. |

#### Authorization

| Parameter       | Value                |
| :-------------- | :------------------- |
| `Content-Type`  | `application/json`   |
| `Authorization` | `Bearer <JWT TOKEN>` |

#### Update an existing item in the menu based on ID.

```http
  PUT /api/admin/update/${id}
```

Example request body object:

```json
{
  "name": "Item Name",
  "price": 89,
  "description": "Item Description"
}
```

| Parameter     | Type     | Description   |
| :------------ | :------- | :------------ |
| `name`        | `string` | **Required**. |
| `price`       | `number` | **Required**. |
| `description` | `string` | **Required**. |

#### Authorization

| Parameter       | Value                |
| :-------------- | :------------------- |
| `Content-Type`  | `application/json`   |
| `Authorization` | `Bearer <JWT TOKEN>` |

#### Create a Promotion Offer

```http
  POST /api/admin/create/promotion
```

Example request body object:

```json
{
  "promotionItems": ["Cortado","Caffè Doppio"], //items must be from the menu otherwise it will be rejected.
  "price": 99,
  "description": "Special campaign for selected products",
	"promotionName": "Doubling down"
```

| Parameter        | Type     | Description                                      |
| :--------------- | :------- | :----------------------------------------------- |
| `promotionItems` | `array`  | **Required**. Items that are already in the menu |
| `promotionName`  | `string` | **Required**. Name of the promotion              |
| `price`          | `number` | **Required**.                                    |
| `description`    | `string` | **Required**.                                    |

#### Authorization

| Parameter       | Value                |
| :-------------- | :------------------- |
| `Content-Type`  | `application/json`   |
| `Authorization` | `Bearer <JWT TOKEN>` |

#### Remove an item from the menu based on ID.

```http
  DELETE /api/admin/remove/${id}
```

#### Authorization

| Parameter       | Value                |
| :-------------- | :------------------- |
| `Content-Type`  | `application/json`   |
| `Authorization` | `Bearer <JWT TOKEN>` |

- If the product does not exist, an error response will be returned.

## Endpoints : GENERAL / CUSTOMERS

List of available Endpoints :

#### Get all the items from the menu

```http
  GET /api/beans/
```

#### to signup in the app

```http
  POST /api/user/signup
```

Example request body object:

```json
{
  "email": "name@email.com",
  "password": "1234"
}
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Login in the app:

```http
  POST /api/user/login
```

Example request body object:

```json
{
  "email": "name@email.com",
  "password": "1234"
}
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Create new orders:

- To create an order as a registered user:

```http
  POST /api/beans/orders
```

| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
| `userId`   | `string` | **Required**. Users ID               |
| `id`       | `string` | **Required**. Items ID from the menu |
| `quantity` | `number` | **Required**.                        |

Example request body object:

```json
{
  "userId": "6477483c98f2ef34a36b755c",
  "cart": [
    {
      "id": "6475a8dbbe0c82ff4cf1fc34",
      "quantity": 1
    },
    {
      "id": "6475a8dbbe0c82ff4cf1fc35",
      "quantity": 2
    }
  ]
}
```

- To create an order as a guest user:

| Parameter    | Type     | Description                            |
| :----------- | :------- | :------------------------------------- |
| `guestEmail` | `string` | **Required**. Add an email to checkout |
| `id`         | `string` | **Required**. Items ID from the menu   |
| `quantity`   | `number` | **Required**.                          |

Example body object:

```json
{
  "guestEmail": "guest@email.com",
  "cart": [
    {
      "id": "6475a8dbbe0c82ff4cf1fc30",
      "quantity": 2
    },
    {
      "id": "6475a8dbbe0c82ff4cf1fc31",
      "quantity": 5
    }
  ]
}
```

#### Get users order history

_to check the orders history you can use this method. You need to add the users id from Mongos database._

```http
  GET /api/user/${id}/history
```

Example url:

```bash
http://localhost:5000/api/user/6477483c98f2ef34a36b755c/history/

```

#### Check order status

```http
  GET /api/user/status/${id}"
```

_Each coffees delivery time is 10 minutes , so this route compares the current time with estimated delivery time and shows if the order has been delivered or still ongoing._

Example url:

```bash
http://localhost:5000/api/user/status/6477483c98f2ef34a36b755c



```

Example response:

![resonse example](https://raw.githubusercontent.com/AirbeanAPI-Ghost-Astronauts/Airbean-API/main/screenshots/screenshot1.png)
