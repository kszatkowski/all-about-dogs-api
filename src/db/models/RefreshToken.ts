import { CreationOptional, DataTypes, ForeignKey, Model, Optional } from 'sequelize';
import sequelize from '../config';
import User, { UserAttributes } from './User';

export interface RefreshTokenAttributes {
  id: string;
  token: string;
  userId: ForeignKey<User['id']>;
}

export interface RefreshTokenAttributesInput extends Optional<RefreshTokenAttributes, 'id' | 'userId'> {}

class RefreshToken extends Model<RefreshTokenAttributes, RefreshTokenAttributesInput> implements RefreshTokenAttributes {
  declare id: string;
  declare token: string;
  declare userId: ForeignKey<User['id']>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

RefreshToken.init(
  {
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
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id' as keyof UserAttributes,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'RefreshTokens',
    indexes: [
      {
        unique: true,
        fields: ['userId'],
        name: 'idx_userId',
      },
    ],
  }
);

User.hasOne(RefreshToken, {
  foreignKey: 'userId',
});
RefreshToken.belongsTo(User, {
  foreignKey: 'userId',
});

export default RefreshToken;
