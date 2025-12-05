import { Pool } from "pg";

export const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_8mGXHWvZ7EbM@ep-withered-bird-a8t42su8-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require",
});

export const initDB = async () => {
  await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,       
                email VARCHAR(100) UNIQUE NOT NULL,  
                password TEXT NOT NULL,
                age INT,
                created_at TIMESTAMP DEFAULT NOW(),                
                updated_at TIMESTAMP DEFAULT NOW()
                )        
        `);

  console.log("connectd Database");
};
