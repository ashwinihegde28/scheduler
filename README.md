# Interview Scheduler

Interview Scheduler is a Single Page Application for tracking student interviews. It allow appointments to be booked Mon-Fri between the hours of 12 pm -5pm. Scheduler is built with the latest tools and techniques for optimized user experience which includes add, edit and delete appointments in real time.The App utilizes React built-in and custom hooks and data is persisted by the API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format. For quality assurance, the project follows best practices of TDD (Test Driven Development), where individual Components are tested in isolation as well as End-to-End testing is performed.

## Project description in brief

1. Scheduler app allows users to book appointments and select interviewers from available interviewers from Mon-Fri between the hours of 12 pm -5pm.

2. Selected day of the week is highlighted and available slots are displayed.

3. Users can add the appointment using the "+" icon and save successfully only if the  name and interviewer accordingly.

4. Users can edit the existing appointment with validations.

5. App also provides a cancel option to delete an existing interview. A pop-up message will confirm the action before permanently deleting an interview.

6. Error message will pop up for any issues while saving or deleting an appointmnet .

7. No of slots ar updated according to Action add and cancel operations

## Setup

Install dependencies with `npm install`.

#### Dependencies include:

- axios: 0.20.0
- classnames: ^2.2.6
- normalize.css: ^8.0.1
- react: ^16.9.0
- react-dom: ^16.9.0
- react-hooks-testing-library: ^0.6.0
- react-scripts: 3.0.0
- Storybook
- Cypress: 9.7.0 , VcXSrv for WSL2 only.

## Running Webpack Development Server

1. Install dependencies with `npm install`.
2. Use the `psql -U development` command to login to the PostgreSQL server with the username `development` and the password `development`.
3. Create a database with the command `CREATE DATABASE scheduler_development;`.
4. Add the `.env.development` to the project with the following details

```
PGHOST=localhost
PGUSER=development
PGDATABASE=scheduler_development
PGPASSWORD=development
PGPORT=5432
```

5. Run the server and seed the Database using `npm start`
6. To rest database use `http://localhost:8001/api/debug/reset`.
7. To introduce failed save and dlete functionality the server must run with `npm run error` <br>

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

### Glimpses of the end result

#### Landing page.<b>

!['Add Appointmnet'](https://github.com/ashwinihegde28/scheduler/blob/master/docs/images/landingPage.png)<br><br>

#### Book an Appointment. <br>

!['book-an-appointment'](https://github.com/ashwinihegde28/scheduler/blob/master/docs/images/addAppointment.png)<br><br>

#### Validations while adding or editing the appointmnet.<br>

!['Validations2'](https://github.com/ashwinihegde28/scheduler/blob/master/docs/images/addValidation1.png)<br>
!['Validations2'](https://github.com/ashwinihegde28/scheduler/blob/master/docs/images/addPageValidation2.png)<br><br>

#### Deleting an appointment<br>

!['Delete appointment'](https://github.com/ashwinihegde28/scheduler/blob/master/docs/images/deleteConfirmation.png)<br><br>

#### Test Coverage <br>

!['Test Coverage'](https://github.com/ashwinihegde28/scheduler/blob/master/docs/images/testCoverage.png)<br><br>

### Main Technologies used

Front-End: React, Axios, JSX, HTML, SASS, JavaScript

Back-End: Express, Node.js, PostgreSQL

Testing: Storybook, Webpack Dev Server, Jest, Testing Library and Cypress
