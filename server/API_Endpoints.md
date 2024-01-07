# LinkStash Server API Endpoints

List of all the api endpoints for easy access for development and testing purpose.

## Authentication

- **Base URL http://localhost:5000/api/v1** - Add base url before every route

- **POST /auth/login** - User login
- **POST /auth/register** - User registration
- **POST /auth/logout** - User Logout

## User Management

- **GET /user/** - Get a user basic data
- **GET /user/dashboard** - Get user data of categories and collections

## Collections

### Private Collections

- **GET /private/** - Get a list of users all collection
- **GET /private/:collectionName** - Get collection by collection Name
- **POST /private/add** - Create a new collection
- **POST /private/add/list** - Create a new collection link
- **PUT /private/update** - Update collection
- **DELETE /private/:collectionName** - Delete collection by collection Name
- **DELETE /private/remove** - Delete a list of collection

### Public Collections

- **GET /public/list** - Get a list of all collections category name
- **GET /public/list/:collectionName** - Get collection list by collection name

## Admin Panel

- **POST /admin/login** - Admin login panel
- **GET /admin/user** - Get the list of all the users
