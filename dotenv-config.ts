import dotenv from 'dotenv';
import path from 'path';

// Load the .env file from the 'environment' folder
dotenv.config({ path: path.join(__dirname, 'environment', '.env') });