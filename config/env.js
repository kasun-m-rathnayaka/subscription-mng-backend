import {config} from 'dotenv';

config({path:`.env.${process.env.NODE_ENV || 'development'}.local`});

export const {PORT,DB_URI, JWT_SECRET ,JWT_EXPIRE } = process.env; // 3000