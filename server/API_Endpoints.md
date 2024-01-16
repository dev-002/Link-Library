# LinkStash Server API Endpoints

List of all the api endpoints for easy access for development and testing purpose.

## Authentication

- **Base URL http://localhost:5000/api/v1** - Add base url before every route

- **POST /auth/login** - User login
- **POST /auth/register** - User registration
- **POST /auth/logout** - User Logout

## User Management

- **GET /user** - Get a list of user data
- **GET /user/dashboard** - Get user dashboard data

## Link Management

- **GET /api/links/:id** - Get link by ID -Implement
- **GET /list/** - Get a list of all links
- **POST /list/add** - Create a new link
- **PUT /list/update** - Update link by ID
- **DELETE /list/remove** - Delete link by ID

## Collections

### Private Collections

- **GET /private** - Get a list of users all collection
- **POST /private/add** - Create a Collection
- **DELETE /private/:collectionName** - Remove a Collection

- **GET /private/:collectionName** - Get collection by ID
- **POST /private/add/list** - Create a new Collection List
- **POST /private/update** - Update collection List
- **DELETE /private/remove** - Delete collection by ID

### Public Collections

- **GET /public/list** - Get a list of all collections -Implement
- **GET /public/list/:collectionName** - Get collection by ID -Implement

## Admin Panel
