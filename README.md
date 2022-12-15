# Datamine
This is a project that leverages on Magic Links to distribute datasets to pre-approved entities.

Check it out [here](https://datam1ne.vercel.app/)!

## Table of Contents
-----
1. [System Design](#System-Design)
    * [DDD Strategic Design](#DDD-Strategic-Design)
    * [DDD Tactical Design](#DDD-Tactical-Design)
    * [API Endpoints](#API-Endpoints)
    * [Capacity Estimation](#Capacity-Estimation-(Data-Storage))
    * [Cost Estimation](#Cost-Estimation)
    * [System Architecture](#System-Architecture)
2. [Development](#Development)

## System Design
-----

### __DDD Strategic Design__

_The goal of strategic design is to formalize the language between stakeholders and can be categorized into 3 categories: __(1) Events; (2) Objects; (3) Transactions__._

_Events represent the past and act as the source of truth; they are stored in databases. Objects are models that represent the current state of the domain and are derived from the events that occur over time. Transactions work with objects within the domain to generate events that changes the various objects of the domain._

The domain of __```Datamine```__ is as follows:

<img src="./doc/strategic-design.png" alt="system-design" width="500"/>

| Events        | Objects       | Transactions
| ---           | ---           | ---
| UserEvent     | User          | UpdateUser
| DownloadEvent | -             | DownloadDataset

The datasets are uploaded in an out-of-band manner by system administrators and is not within the scope of this project.

### __DDD Tactical Design__

<img src="./doc/tactical-design.png" alt="tactical-design" width="800"/>

Based on the events and objects identified in the _Strategic Design_ stage, the above Entity-Relationship diagram is drawn.

### __API Endpoints__
```
POST /api/v1/login/
POST /api/v1/user/ 
POST /api/v1/user/update
POST /api/v1/dataset/
```
The endpoinds are derived from the needs of the personas identified in the _Strategic Design_ stage. The webapp will focus on server-side rendering any user content, while exposing API endpoints that are required by client-side during user interaction.
### __Capacity Estimation__ (Data Storage)

* __Int__: 4 bytes
* __Char__: 2 byte * size
* __Bool__: 1 byte
* __UserEvent__: (191 size * 2 bytes * 4) + (4 bytes * 4) + 2 bytes = 1546 bytes
* __DownloadEvent__: (191 size * 2 bytes * 2) + 4 bytes = 768 bytes

Assuming _100_ user updates per day, the database growth rate can be calculated as follows:

* 100 * (1546 + 768) bytes
= __231.4 KB / day__

By using Planet Scale database service, there is 5GB of storage available in the free tier:

* 5,000,000 KB / 231.4 KB = ~21,600 days = __~60 years sustained usage__

### __Cost Estimation__

__Assumptions:__
- Developer team size: 1 pax
- 100 daily active users
- 100 user updates per day
- 1 downloads per day
- 1 compressed dataset of size 36 GB that never changes
- 100 emails sent per day
- 1 GB of monthly email data sent 


__[Vercel Monthly Cost](https://vercel.com/pricing)__

| Type   | Cost (per month)
| ---    | ---
| __Hobby__  | __0.00 USD__
| Pro    | 20.00 USD per team member (max 10)

__[Planet Scale Monthly Cost](https://planetscale.com/pricing)__

| Type      | Cost (per month)
| ---       | ---
| __Free__      | __0.00 USD__
| Scalar    | 29.00 USD

__[Amazon S3 Monthly Cost](https://calculator.aws/#/addService/S3)__

| Type        | Calculation | Cost (per month)
| ---         | --- | ---
| Storage     | 36 GB * 0.025 USD | __1.00 USD__
| PUT request | 1 PUT Request * 0.000005 USD per request | __0.00 USD__
| GET request | (1 downloads per day) * (30 days) * (0.0000004 USD per request) | __0.000012 USD__
| Data Transfer     | (36 GB) * (30 days) x 0.12 USD | __129.60 USD__
| Total       | 1.00 USD + 129.60 USD | __130.60 USD__

__[Amazon SES Monthly Cost](https://calculator.aws/#/addService/SES)__

| Type          | Calculation | Cost (per month)
| ---           | --- | ---
| No. of Emails | 100 emails per day * 30 days x 0.0001 USD | __0.30 USD__
| Data sent     | 1 GB per month x 0.12 USD | __0.12 USD__
| Total         | 0.30 USD + 0.12 USD | __0.42 USD__

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

__A10__: System generates a new DownloadEvent, updating the download count.

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

## Product Walkthrough
-----
<img src="./doc/walkthrough.png" alt="walkthrough" width="1000"/>

__1__: User visits the WebApp and enters their email address.

__2__: User checks their inbox for the Magic Link.

__3__: User uses the Magic Link to login to the WebApp and is greeted with their profile page. This is where they can choose to download the dataset. If they are Admins, they can navigate to the Admin page to manage the users.

__4__: The Manage Users page shows the table of all currently active users. Admins can choose to update or add new users using the upload option. The format of the CSV file is as follows:
| email | name | affilation | maxDownloadCount | validFrom | validTo | isActive | isAdmin
| --- | --- | --- | --- | --- | --- | --- | ---
| _string_ | _string_ | _string_ | _number_ | _number_ | _number_ | _true / false_ | _true / false_ 

Note that the __validFrom__ and __validTo__ fields are _unix timestamps_ in _milliseconds_.

View a video of the walkthrough [here](https://youtu.be/A14_bz01IxI)!
## Development
-----

### __Quick Start__

Ensure you have the latest stable version installed for _[Node](https://nodejs.org/en/), [Python3 & pip](https://www.python.org/downloads/), and [Docker](https://www.docker.com/)_.

[ Optional ] You have installed _[LocalStack](https://github.com/localstack/localstack)_ using _```pip```_.

[ Optional ] You have the following extensions/plugins in your IDE installed:
_```ESLint, GitLens, Prisma, Tailwind CSS IntelliSense, CSS Modules```_

Clone the repository into your chosen directory and run the following commands:
```
// Install dependencies and setup the project.

yarn

// Start LocalStack in the background in a separate terminal
// Note that you may have to add the binary to your path. (~/.local/bin/localstack)
// LocalStack is not mandatory for local development, but is needed for simulating the downloading of dataset.

yarn localstack:start

// Start a local MySQL instance using Docker.

yarn db:start

// Start the development server. There will be some setup scripts executed before the dev server starts.
// App is usually hosted on http://localhost:3000

yarn dev

// Run all the tests in the project
// These tests should be run often as you develop on it, to catch bugs early.

yarn test
```

There are predefined users loaded into the database and you may inspect the data file at ```/src/tests/data/userEvent.json```.
You may choose any of the valid users defined there to login to the application locally. For instance, you may use ```admin@example.com```.

As the application requires interacting with external Amazon services, those functions are either stub out or depend on _LocalStack_ when developing locally. Important information needed for development can be found in the console where ```yarn dev``` was run. For instance, the login flow will print the _magic link_ onto the console for you to interact with it locally.

In case you wish to reset the local database, you may restart the dev server by running ```yarn dev``` again.

More commands can be found in the ```package.json``` file.
