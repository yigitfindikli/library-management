## Database Setup

You can set up the PostgreSQL database using either Docker or the provided SQL file.

### Option 1: Docker Setup

    ```bash
    docker-compose up -d
    ```

### Option 2: Run the DDL Script

    ```bash

psql -U lib_admin -d library_management -f library_management_schema.sql

    ```

### Start the Development Server

```bash
npm run dev
```
