# Airbean API

RESTful API for AirBean application. It provides endpoints to create users,check the menu and order from the menu.

## Developers

- [Shahin](https://www.github.com/shahfarzane)
- [Freija](https://www.github.com/FreijaL)
- [Linda](https://www.github.com/lindakahju)

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

**Server:** Node, Express , MongoDB, Bcrypt, Moment , Nodemon

## Endpoints

List of available Endpoints :

#### Get all the items from the menu

```http
  GET /api/beans/
```

#### to signup in the app

```http
  POST /api/user/signup
```

Example body object:

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

example body object:

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

```http
  POST /api/beans/orders
```

- To create an order as a registered user:

| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
| `userId`   | `string` | **Required**. Users ID               |
| `id`       | `string` | **Required**. Items ID from the menu |
| `quantity` | `number` | **Required**.                        |

Example body object:

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
