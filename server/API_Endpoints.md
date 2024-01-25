# LinkStash Server API Endpoints

List of all the api endpoints for easy access for development and testing purpose.

- **Base URL http://localhost:5000/api/v1** - Add base url before every route

## Contact

- **POST /contact** - Send contact form

## Authentication

- **POST /auth/login** - User login
- **POST /auth/register** - User registration
- **POST /auth/logout** - User Logout

## User Management

- **GET /user/username** - Get a logged in username
- **GET /user** - Get user data
- **PUT /user** - Update the user details
- **GET /user/dashboard** - Get user dashboard data
- **POST /user/like** - Like a collection

## Collections

### Public Collections

- **GET /public** - Get a list of all collections
- **GET /public/:collectionName** - Get collection by collection name

### Private Collections

- **GET /private** - Get a list of users all collection
- **POST /private** - Create a Collection
- **DELETE /private/:collectionName** - Remove a Collection
- **PUT /private/:collectionName** - Update a Collection

- **GET /private/:collectionName** - Get collection by collection Name
- **POST /private/:collectionName/update** - Update collection link
- **DELETE /private/:collectionName/remove** - Delete collection link

### Report Collection

- **GET /report/:collectionName** - Report the collection or link

## Admin Panel

- **GET /admin/user** - Get a list of all users
- **GET /admin/user/:username** - Get specific user's detail and it's collection
- **POST /admin/userrole** - Update a user's role
- **DELETE /admin/banuser** - Ban a user and it's collection

- **GET /admin/contact** - List all the contacts made by all the users
- **DELETE /admin/contact** - Delete the contact form

- **GET /admin/collection/:collectionName** - Get Specific collection details
- **DELETE /admin/:collectionName** - Delete a collection or link
- **GET /admin/reports** - Get list of all the reports
