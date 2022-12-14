
# Envelope Budgeting API (OLD)


## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [API Reference](#api-reference)
  - [Get all envelopes](#get-all-envelopes)
  - [Get a single envelope by Id](#get-a-single-envelope-by-id)
  - [Add a new envelope](#add-a-new-envelope)
  - [Update an existing envelope](#update-an-existing-envelope)
  - [Delete an envelope by id](#delete-an-envelope-by-id)
  - [Transfer an amount from an envelope to another](#transfer-an-amount-from-an-envelope-to-another)
- [Acknowledgements](#acknowledgements)

## General info

A basic API that allows clients to create and manage their personal budget.  
Read more about Envelope Budgeting System at : https://www.thebalance.com/what-is-envelope-budgeting-1293682  



## Technologies
This API is created with:
* Node.js version: 16.15.0
* Express.js version: 4.18.1
* validator-js library version: 13.7.0

## Setup
To run this project, install it locally using npm:

```
$ cd ./envelope-budgeting-practice-project
$ npm install
$ npm start
```


## API Reference

#### Get all envelopes

```http
  GET /envelopes
```

#### Get a single envelope by Id

```http
  GET /envelopes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of envelope to fetch |

#### Add a new envelope

```http
  POST /envelopes
```

| Body field | Type       | Description                                 |
| :--------- | :----------| :-------------------------------------------|
| `category` | `string`   | **Required**. Category of the new envelope  |
| `amount`   | `number`   | Budget of the new envelope. 0 by **Default**|

#### Update an existing envelope

```http
  PUT /envelopes/${id}
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. Id of envelope to update |


| Body field | Type       | Description                                 |
| :--------- | :----------| :-------------------------------------------|
| `category` | `string`   | New envelope's category                     |
| `extract`  | `number`   | Amount to subtract from the existing balance|


#### Delete an envelope by id

```http
  DELETE /envelopes/${id}
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. Id of envelope to delete |

#### Transfer an amount from an envelope to another

```http
  POST /transfer
```

| Body field | Type       | Description                                 |
| :--------- | :----------| :-------------------------------------------|
| `from`     | `number`   | **Required**. Id of the sending envelope    |
| `to`       | `number`   | **Required**. Id of the receiving envelope  |
| `amount`   | `number`   | **Required**. The amount to transfer        |

## Acknowledgements

 - Shout-out to [Codecademy](https://www.codecademy.com/) for this cool project. It's a great plateform to learn to code, gain new skills and build a career.

