# Datamine
This is a project that leverages on Magic Links to distribute datasets to pre-approved entities.

## Table of Contents
-----
1. [System Design](#System-Design)
    * [DDD Strategic Design](#DDD-Strategic-Design)
    * [DDD Tactical Design](#DDD-Tactical-Design)
    * [API Endpoints](#API-Endpoints)
    * [Capacity Estimation](#Capacity-Estimation)
    * [System Architecture](#System-Architecture)

## System Design
-----

### __DDD Strategic Design__

_The goal of strategic design is to formalize the language between stakeholders and can be categorized into 3 categories: __(1) Events; (2) Objects; (3) Transactions__._

_Events represent the past and act as the source of truth; they are stored in databases. Objects are models that represent the current state of the domain and are derived from the events that occur over time. Transactions work with objects within the domain to generate events that changes the various objects of the domain._

The domain of __```Datamine```__ is as follows:

<img src="./doc/strategic-design.png" alt="system-design" width="400"/>

| Events        | Objects       | Transactions
| ---           | ---           | ---
| UserUpdated   | User          | UpdateUser

The datasets are uploaded in an out-of-band manner by system administrators and is not within the scope of this project.

### __DDD Tactical Design__

<img src="./doc/tactical-design.png" alt="tactical-design" width="400"/>

Based on the events and objects identified in the _Strategic Design_ stage, the above Entity-Relationship diagram is drawn.

### __API Endpoints__
```
POST /api/v1/login/       # body: { email: string }
POST /api/v1/user/update  # body: { ...<user_attributes> }
GET /api/v1/user/?email={string}
GET /api/v1/dataset/
```
The endpoinds are derived from the needs of the personas identified in the _Strategic Design_ stage.
### __Capacity Estimation__ (Data Storage)

* __Int__: 4 bytes
* __Char__: 2 byte * size
* __Bool__: 1 byte
* __UserUpdatedEvent__: (32 bytes * 4) + (4 bytes * 5) + 2 bytes = 150 bytes

Assuming _100_ user updates per day, the database growth rate can be calculated as follows:

* 100 * 150 bytes
= __15KB / day__

By using Planet Scale database service, there is 5GB of storage available in the free tier:

* 5,000,000 KB / 15 KB = ~300,000 days = __~925 years__ sustained usage

### __System Architecture__
<img src="./doc/system-architecture.png" alt="system-architecture" width="1000"/>

### Data Scientist Flow

__A1__: User visits the WebApp hosted on Vercel's Content Distribution Network.

__A2__: User logins by entering their email address.

__A3__: System verifies if the email is valid by referencing the database, and generates a Magic Link.

__A4__: Upon successful validation, system triggers an email containing the Magic Link to the WebApp.

__A5__: User recieves the Magic Link in their mailbox and uses it to sign in to the WebApp.

__A6__: Upon clicking on a valid Magic Link, the user will be greeted with their profile information and a download dataset button.

__A7__: User triggers the download datasets.

__A8__: System validates the download request.

__A9__: System generates a short-lived pre-signed S3 URL.

__A10__: System generates a new UserUpdatedEvent, updating the download count.

__A11__: System forwards the pre-signed S3 URL to the user.

__A12__: User downloads the dataset using the given URL.

### Admin Flow

__B1__: User visits the WebApp hosted on Vercel's Content Distribution Network.

__B2__: User logins by entering their email address.

__B3__: System verifies if the email is valid by referencing the database, and generates a Magic Link.

__B4__: Upon successful validation, system triggers an email containing the Magic Link to the WebApp.

__B5__: User recieves the Magic Link in their mailbox and uses it to sign in to the WebApp.

__B6__: Upon clicking on a valid Magic Link, the user will be directed to the admin panel of the WebApp.

__B7__: User uploads csv file containing the list of users who can download the dataset.
