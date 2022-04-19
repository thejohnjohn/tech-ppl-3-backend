import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    port: string | number;
    database: {
        DATABASE_CONNECTION_STRING: string;
    };
    secret: string;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        DATABASE_CONNECTION_STRING: process.env.DATABASE_CONNECTION_STRING || ' ',
    },
    secret: process.env.SECRET || 'secret',
};

const production: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        DATABASE_CONNECTION_STRING: process.env.DATABASE_CONNECTION_STRING || 'mongodb://production_uri/',
    },
    secret: process.env.SECRET || 'secret',
};

const config: {
    [name: string]: IConfig;
} = {
    development,
    production,
};

export default config[NODE_ENV];
