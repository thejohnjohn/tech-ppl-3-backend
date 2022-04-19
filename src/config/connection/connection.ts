import { Sequelize, Options } from "sequelize";
import config from "../env/env";

const options: Options = { benchmark: true, logging: console.log }

export const sequelize: Sequelize 
    = new Sequelize(config.database.DATABASE_CONNECTION_STRING, options);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully..');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });