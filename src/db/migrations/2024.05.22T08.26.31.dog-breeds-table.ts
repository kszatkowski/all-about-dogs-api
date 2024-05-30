import { DataTypes, QueryInterface } from 'sequelize';
import type { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = async params => {
  await params.context.createTable('DogBreeds', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    origin: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    size: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    lifespan: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    adaptability: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trainability: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
};

export const down: MigrationFn<QueryInterface> = async (params) => {
  await params.context.dropTable('DogBreeds');
};
