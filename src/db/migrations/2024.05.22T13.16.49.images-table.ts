import { DataTypes, QueryInterface } from 'sequelize';
import type { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = async (params) => {
  await params.context.createTable('Images', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    filename: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
};

export const down: MigrationFn<QueryInterface> = async (params) => {
  await params.context.dropTable('Images');
};
