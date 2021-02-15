# Full Stack Developer Challenge

## Setup

**Frontend**

`cd ./frontend && npm i && npm run dev`

**Backend**

`cd ./api && npm i && npm run start`

The sql file itself is committed instead of using seed.

Login with `admin:admin`

## Teck Stack

### Frontend

1. Nuxt.js
2. Tailwind.css
3. Apollo client

### Backend

1. apollo-server
2. graphql
3. DB: typeorm-sqlite3
4. Auth: JWT-cookie

### Views

#### `/login/`

The initial View, the entry.

#### `/`

The assigned reviews and submitted feedbacks are presented.

#### `/post-feedback/:id/`

Where you can post your feedback to assigned review.

#### `/admin/`

The admin view, the dashboard.

#### `/admin/post-review/`

The admin view, where you can create or update review.

#### `/admin/review/:id/`

The admin view, read the review and feedbacks.

## Challenge Scope

- High level description of design and technologies used
- Server side API (using a programming language and/or framework of your choice)
  - Implementation of at least 3 API calls
  - Most full stack web developers at PayPay currently use Java, Ruby on Rails, or Node.js on the server(with MySQL for the database), but feel free to use other tech if you prefer
- Web app
  - Implementation of 2-5 web pages using a modern web framework (e.g. React or Angular) that talks to server side
    - This should integrate with your API, but it's fine to use static responses for some of it
- Document all assumptions made
- Complete solutions aren't required, but what you do submit needs to run.

## How to complete this challenge

- Fork this repo in github
- Complete the design and code as defined to the best of your abilities
- Place notes in your code to help with clarity where appropriate. Make it readable enough to present to the PayPay interview team
- Complete your work in your own github repo and send the results to us and/or present them during your interview

## What are we looking for? What does this prove?

- Assumptions you make given limited requirements
- Technology and design choices
- Identify areas of your strengths
