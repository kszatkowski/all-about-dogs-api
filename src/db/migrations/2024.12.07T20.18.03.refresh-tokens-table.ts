import { UserAttributes } from '@db/models';
import { DataTypes, QueryInterface, QueryInterfaceCreateTableOptions } from 'sequelize';
import type { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = async (params) => {
  await params.context.createTable('RefreshTokens', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT('tiny'),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id' as keyof UserAttributes,
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  await params.context.addIndex('RefreshTokens', ['userId'], {
    name: 'idx_userId',
    unique: true,
  });
};

export const down: MigrationFn<QueryInterface> = async (params) => {
  await params.context.dropTable('RefreshTokens');
  await params.context.removeIndex('RefreshTokens', 'idx_userId');
};
