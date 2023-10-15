# LinkStash Server API Endpoints

List of all the api endpoints for easy access for development and testing purpose.

## Authentication

- **Base URL http://localhost:5000** - Add base url before every route

- **POST /auth/login** - User login
- **POST /auth/register** - User registration
- **POST /auth/logout** - User Logout

## User Management

- **GET /api/users** - Get a list of all users -Implement
- **GET /api/users/:id** - Get user by ID -Implement
- **PUT /api/users/:id** - Update user by ID -Implement
- **DELETE /api/users/:id** - Delete user by ID -Implement

## Link Management

- **GET /api/links/:id** - Get link by ID -Implement
- **GET /list/** - Get a list of all links
- **POST /list/add** - Create a new link
- **PUT /list/update** - Update link by ID
- **DELETE /list/remove** - Delete link by ID

## Collections

- **GET /api/collections** - Get a list of all collections -Implement
- **GET /api/collections/:id** - Get collection by ID -Implement
- **POST /api/collections** - Create a new collection -Implement
- **PUT /api/collections/:id** - Update collection by ID -Implement
- **DELETE /api/collections/:id** - Delete collection by ID -Implement

...
