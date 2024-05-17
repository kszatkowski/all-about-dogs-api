import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from 'sequelize';
import sequelize from '../config';

export interface DogBreedAttributes {
  id: string;
  name: string;
  description: string;
  origin: string;
  size: string;
  lifespan: string;
  adaptability: number;
  trainability: number;
}

export interface DogBreedAttributesInput extends Optional<DogBreedAttributes, 'id'> {}

class DogBreed extends Model<DogBreedAttributes, DogBreedAttributesInput> implements DogBreedAttributes {
  declare id: string;
  declare name: string;
  declare description: string;
  declare origin: string;
  declare size: string;
  declare lifespan: string;
  declare adaptability: number;
  declare trainability: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

DogBreed.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    lifespan: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    adaptability: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trainability: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize
  }
);

export default DogBreed;
