# To-Do Backend Node Application

## Overview

This documentation outlines a Node.js backend application using Express.js. The application integrates with MongoDB for data storage and is designed for user and todo management.

## Routes

### User Routes (`/users`)

These routes are used for managing user data. They include registering new users, retrieving user information, updating user data, and deleting users.

- **User Registration (POST /users)**: Registers a user with username, password, first and last name, handling MongoDB validation errors.
- **Retrieve Users (GET /users)**: Returns first names of registered users.
- **Delete User (DELETE /users/:id)**: Deletes a user with the specified ID.
- **Edit User (PATCH /users/:id)**: Edits a user with the specified ID, returning a success message and user details, handles MongoDB validation errors.

### Todo Routes (`/todos`)

These routes handle todo items. They provide functionality for adding, retrieving, editing, and deleting todos. Authentication middleware is applied to certain routes.

- **Retrieve User's Todos (GET /users/:userId/todos)**: Returns todos for a specific user.
- **Add New Todo (POST /todos)**: Adds a new todo item.
- **Retrieve Todos (GET /todos)**: Retrieves all todo items.
- **Edit Todo (PATCH /todos/:id)**: Edits a specific todo item, requires authentication.
- **Delete Todo (DELETE /todos/:id)**: Deletes a specific todo item, requires authentication.

## Authentication

The application includes middleware for authentication, which is applied to specific routes to ensure secure access.

## Configuration and Setup

### Dependencies

The application requires the following dependencies:

- **Express**: A web framework for Node.js.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Dotenv**: A module to load environment variables from a .env file.

### Environment Variables

- **PORT**: Specifies the port number on which the server will run.

### Middleware

#### CORS

This middleware enables CORS for all routes in the application, allowing for cross-origin requests.

#### MongoDB Connection

The application connects to a MongoDB database named 'Tasks' located at `mongodb://localhost:27017`. It handles both successful connections and errors.

#### JSON Parsing

Express's built-in middleware to parse incoming JSON payloads is used, enabling the handling of JSON data in requests.

## Conclusion

This Node.js application provides structured routes and controllers for user and todo management, with scalability and maintenance in mind. The documentation covers its setup, middleware, and main features.
