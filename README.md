# Brighte Eats Backend API

A Node.js backend API for managing leads and services, built with TypeScript and Microsoft SQL Server (MSSQL).

## Features
- Create leads with associated services
- View Lead / Leads with the services they are interested in

## Technologies
- Node.js & TypeScript
- Express.js
- Microsoft SQL Server (MSSQL)
- `mssql` package for database communication
- Jest for testing (optional)

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- Microsoft SQL Server instance
- npm or yarn package manager

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/minakarlo20/Brighte-Eats.git
   cd brighte-eats-node-backend

2. Install dependencies:

    npm install

3. Configure your MSSQL connection:

    Update config file located in Brighte-Eats\brighte-eats-node-backend\src\config\db.config.ts
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'db_brighte_eats',
    server: process.env.DB_SERVER || 'localhost',

4. Run database setup scripts:

    Run database script uploaded in the root folder of the repository

## Running the App

    npm run dev

### API Endpoints

    POST /leads

        request body example: 
        (json)
        
            {
                "Name": "Karlo Mina",
                "Email": "minakarlo20@gmail.com",
                "Mobile": "09761805183",
                "Postcode": 3015,
                "services": [1, 2, 3]
            }
        
    GET /leads

    GET /leads/1

    Also uploaded an exported collection for Postman

### Test

    npx test

## CONTACT

Karlo Mina — minakarlo20@gmail.com

### THANK YOU! ###