import 'dotenv/config';
import { SequelizeStorage, Umzug } from 'umzug';
import sequelize from './config';

const umzug = new Umzug({
  migrations: {
    glob: ['migrations/*.ts', { cwd: __dirname }],
  },
  storage: new SequelizeStorage({
		sequelize,
	}),
  context: sequelize.getQueryInterface(),
  logger: console,
});

export type Migration = typeof umzug._types.migration;

export default umzug;
