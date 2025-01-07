import { CreationOptional, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config';
import bcrypt from 'bcrypt';

const saltRounds = 12;

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
}

export interface UserAttributesInput extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserAttributesInput> implements UserAttributes {
  declare id: string;
  declare email: string;
  declare password: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Users',
  }
);

User.beforeSave(async (user) => {
  try {
    const encryptedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = encryptedPassword;
  } catch (err) {
    throw new Error('Can not encrypt password.');
  }
});

export default User;
