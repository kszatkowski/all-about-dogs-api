import { Server } from 'http';
import sequelize from '@db/config';

export const gracefulShutdown = (server: Server) => {
  console.log('Closing http server.');

  server.close(async () => {
    console.log('Http server closed.');
    await sequelize.close();
    console.log('Connection to db closed.');
    process.exit(0);
  });
};
