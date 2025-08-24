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

- Node.js (v18.x or higher recommended)
- Microsoft SQL Server instance
- npm or yarn package manager

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/minakarlo20/Brighte-Eats.git

2. Install dependencies:

    npm install

3. Configure your MSSQL connection:

    Update config file located in Brighte-Eats\app.module.ts
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'root',
      password: 'root',
      database: 'db_brighte_eats',
      options: { encrypt: false },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, (I made a mistake in setting up the ORM sync and was unable to drop constraints so I just set it to false)

4. Run database setup scripts:

    Run database script uploaded (script.sql) in the root folder of the repository

## Running the App

    npm run start:dev

### GraphQL Playground

    Once the server is running, open:
    http://localhost:3000/graphql
    
## Example Query
    query {
        getAllLeads {
            LeadId
            Name
            Email
            Mobile
            Postcode
            CreatedAt
            UpdatedAt
            Services {
                ServiceId
                ServiceName
            }
        }
    }

## Query GetById
    query GetLead($LeadId: Int!){
        getLeadById(LeadId: $LeadId) {
                LeadId
            Name
            Email
            Mobile
            Postcode
            CreatedAt
            UpdatedAt
        }
    }
    
# Variables:
    {
        "LeadId": 8
    }

## Example Mutation
    mutation createLead($input: LeadsInput!) {
        createLead(input: $input) {
            LeadId
            Name
            Email
            Mobile
            Postcode
            CreatedAt
            UpdatedAt
            Services {
                ServiceId
                ServiceName
            }
        }
    }

# Variables:
    {
        "input": {
            "Name": "Jane Doe",
            "Email": "jane@example.com",
            "Mobile": "09123456789",
            "Postcode": "1234",
            "ServiceIds": [1, 2]
        }
    }

### Test

    npm run test

## CONTACT

Karlo Mina — minakarlo20@gmail.com

### THANK YOU! ###