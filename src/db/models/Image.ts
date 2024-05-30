import { CreationOptional, DataTypes, Model, Optional, ForeignKey } from 'sequelize';
import sequelize from '../config';
import DogBreed from './DogBreed';

export interface ImageAttributes {
  id: number;
  filename: string;
  dogBreedId: ForeignKey<DogBreed['id']>;
}

export interface ImageAttributesInput extends Optional<ImageAttributes, 'id' | 'dogBreedId'> {}

class Image extends Model<ImageAttributes, ImageAttributesInput> implements ImageAttributes {
  declare id: number;
  declare filename: string;
  declare dogBreedId: ForeignKey<DogBreed['id']>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    filename: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Images',
  }
);

export default Image;
