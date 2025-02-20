# Auth Shelf Group Project

Our client, **Emerging Digital Academy: Classroom 3**, has asked for an app to simulate the behavior of their shelf. That is, a list of items placed on the classroom shelf. More details about each of the desired features are listed below.

---

## Recommended Approach:

Within your assigned pods, we recommend pair programming for this project. Each pair could take on _one required feature at a time_. As a group, you will need to reason about the particular order in which you'll build out these features. Before dividing and conquering, you should also work together to implement all of the initial project set-up so that your `main` branch is a solid foundation for collaboration.

Use this **documentation** to guide you through this initial process:

<details>
  <summary>Documentation</summary>

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)
- [Nodemon](https://nodemon.io)
- [Postman](https://www.postman.com)

### Create Database and Tables

Create a new database named `auth_shelf`, then create the `user` and `item` tables using the queries found in `database.sql`.

- Note: `pool.js` is initially configured to connect to a database named `prime_app`. You'll need to modify this within `pool.js` so that it knows to connect a database `auth_shelf`.

### Initial Setup Instructions

- In this repo's **root directory**, run `npm install`.
- Create an `.env` file in the **root directory**, then paste this line into the file:
  ```plaintext
    SERVER_SESSION_SECRET=superDuperSecret
  ```
- While you're in your new `.env` file, take the time to replace `superDuperSecret` with some a random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure.
  - Here's a site that can help you: [Password Generator Plus](https://passwordsgenerator.net).
  - If you skip this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you'll get a big warning message each time you start your server.
- Run `npm run server` to start the server.
- Run `npm run client` to start the client.
- Navigate to `localhost:5173`.
  - Verify that you are able to:
    - Register as a new user.
    - Log out.
    - Log back in.
    - Log out.
- Congrats! You now have a starting line for the cool thing you're about to build. 🙂

### Lay of the Land

This repository is intentionally quite minimal. It features the same directory structure that you know and love:

- `src/`: The React application and Zustand store.
- `public/`: Static assets for the client-side. (In this case, just a `favicon.ico` file.)
- `server/`: The Express server.

Much of the code is descriptively commented. We recommend reading through the comments, getting a lay of the land, and becoming more comfortable with how it works before you start building on top of it.

For example, you're going to need to create new React Router Routes and Nav links as you build out your application. To do so, you'll first need a clear understanding of:

- How the `<Route>`s in `App.jsx` function.
- How the `<NavLink>`s in `Nav.jsx` function.

</details>

---

## Base Mode Requirements:

### Display All Items:

[] - The Shelf page should show all of the items stored in the database in a list or table. **This list should only be viewable to logged-in (authenticated) users.**

### Add Items to the Shelf:

[] - The Shelf page should allow a user to add a new item to the database (which should immediately appear in the list). **This view should only be viewable to logged-in (authenticated) users.**

> NOTE: Image url should be a full path to an existing image on the web. You should not attempt to implement image upload for this.

### Delete Items from the Shelf:

[] - An authenticated user should be able to delete items from the Shelf page, if they were the one who added the item to the shelf.

> NOTE: This should require client and server changes. An unauthenticated attacker from Postman should not be able to delete anything.

---

## Stretch Goals:

- Ability to edit an existing item on the shelf from the info page.
- Have anyone, not just logged-in users, be able to see what is on the shelf, but **not** edit, remove, or add.
- Add a new page to display all items for a specific user called "My Shelf". Only the items associated with the specific logged-in user should be displayed on this new page.
- Style the application! Maybe with MUI or some such tool?
- Use [multer](https://github.com/expressjs/multer) for image upload on the add page.
  - `multer` is a middleware library that allows your Express server to read incoming `req.body` data that has been encoded as `multipart/form-data`.
  - To send files to your server, you'll need to encode them as `multipart/form-data`, rather than the `axios` default of JSON encoding.
