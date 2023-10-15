# LinkStash Server

LinkStash Server provides all the functionality of the web-application. It's functionality ranges from authentication (via JWT token), storing differently categorized web links, to provide the Open library list of all the public web links, providing dashboard data for overall analytics and admin panel controls.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Link Management:** Organize your web links into custom categories for easy access and retrieval.
- **Privacy Control:** Set the privacy settings for each link to keep them private, share them with specific users, or make them public.
- **Sharing:** Share your link collections with other users or make them publicly accessible.
- **Dashboard:** Get insights into your collections, including the number of links, their categories, and more.
- **User-Friendly:** A clean and intuitive interface for easy navigation and link management.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local server for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB set up and running.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/dev-002/Link-Library.git
   ```

2. Change into the project directory:

   ```bash
   cd server
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file based on the provided `.env.example` template and set your configuration variables.

5. Start the server:

   ```bash
   npm run dev
   ```

Your LinkStash server should now be up and running.

## Usage

Once the server is running, you can access the LinkStash web application through your browser(via running client). Use it to manage your links, set privacy preferences, and share your collections with others.
