
interface Config{
    NODE_ENV: string;
    PORT: number;
    MONGODB_URI: string;
    LOG_LEVEL: string;
}

const config: Config={
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '5000', 10),
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/books',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
}

export default config;