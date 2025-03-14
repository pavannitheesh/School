# School API

## Overview
This project provides a REST API to manage school data using Node.js, Express.js, and MySQL. It allows users to add schools and retrieve a list of schools sorted by proximity to a given location.

## Features
- Add a new school to the database.
- List all schools sorted by proximity to a specified location.

## Technologies Used
- Node.js
- Express.js
- MySQL
- dotenv 
- cors 

## Database Setup
Create a MySQL database and table:

```sql
CREATE DATABASE school_db;
USE school_db;

CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd school-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure the database connection:
   ```sh
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=password
   DB_NAME=school_db
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### 1. Add a School
- **Endpoint:** `/addSchool`
- **Method:** POST
- **Request Body:**
  ```json
    {
        "name": "Central High School",
        "address": "123 Main St, Anytown, USA",
        "latitude": 40.7128,
        "longitude": -74.0060
    }
  ```
- **Response:**
  ```json
    {
        "success": true,
        "data": {
            "id": 1,
            "name": "Kokapet High School",
            "address": "golden mile road,Kokapet,Hyderabad",
            "latitude": 17.3955,
            "longitude": 78.336
        },
        "message": "School added successfully"
    }
  ```

### 2. List Schools by Proximity
- **Endpoint:** `/listSchools`
- **Method:** GET
- **Query Parameters:**
  - `latitude` (float) - User's latitude
  - `longitude` (float) - User's longitude
- **Example Request:**
  ```sh
  GET /listSchools?latitude=40.7128&longitude=74.0060
  ```
- **Response:**
  ```json
    {
        "success": true,
        "data": [
            {
                "id": 11,
                "name": "Delhi Public School",
                "address": "Plot No.44, Uppal Mandal, Durga Nagar, Nacharam, Hyderabad, Secunderabad, Telangana 500076",
                "latitude": 17.4403,
                "longitude": 78.5559,
                "distance": 2624.29
            },
            {
                "id": 9,
                "name": "Kokapet High School",
                "address": "golden mile road,Kokapet,Hyderabad",
                "latitude": 17.3955,
                "longitude": 78.336,
                "distance": 2625.8
            },
            {
                "id": 10,
                "name": "Viswabharati English Medium High School",
                "address": "Gudivada,AP",
                "latitude": 16.44,
                "longitude": 80.9969,
                "distance": 2781.59
            }
        ],
        "message": "Schools retrieved successfully"
    }
  ```

## Postman Collection
-[Postman Documentation](https://documenter.getpostman.com/view/42416029/2sAYk8wPKB)
