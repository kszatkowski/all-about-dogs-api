import { createApp } from '@utils';
import { gracefulShutdown } from '@utils';

const app = createApp();

const server = app.listen(3000);

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  gracefulShutdown(server);
});

process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  gracefulShutdown(server);
});
