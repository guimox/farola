import { Pool } from "pg";

export const pool = new Pool({
    host: process.env.AUTH_DATABASE_HOST,
    port: process.env.AUTH_DATABASE_PORT ? parseInt(process.env.AUTH_DATABASE_PORT, 10) : undefined, // The 10 is to make it a Base10 integer
    database: process.env.AUTH_DATABASE_NAME,
    user: process.env.AUTH_DATABASE_USER,
    password: process.env.AUTH_DATABASE_PASSWORD,
});