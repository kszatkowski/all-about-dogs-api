import { Association, CreationOptional, DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, NonAttribute, Optional } from 'sequelize';
import sequelize from '../config';
import Image from './Image';

export interface DogBreedAttributes {
  id: number;
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
  declare id: number;
  declare name: string;
  declare description: string;
  declare origin: string;
  declare size: string;
  declare lifespan: string;
  declare adaptability: number;
  declare trainability: number;

  declare images?: NonAttribute<Image[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  
  declare getImages: HasManyGetAssociationsMixin<Image>;
  declare addImage: HasManyAddAssociationMixin<Image, number>;
  declare addImages: HasManyAddAssociationsMixin<Image, number>;
  declare removeImage: HasManyRemoveAssociationMixin<Image, number>;
  declare removeImages: HasManyRemoveAssociationsMixin<Image, number>;
  declare hasImage: HasManyHasAssociationMixin<Image, number>;
  declare hasImages: HasManyHasAssociationsMixin<Image, number>;
  declare countImages: HasManyCountAssociationsMixin;
  declare static associations: {
    images: Association<DogBreed, Image>;
  };
}

export const initialize = DogBreed.init(
  {
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
  },
  {
    sequelize,
    tableName: 'DogBreeds',
    
  }
);

DogBreed.hasMany(Image, {
  sourceKey: 'id',
  foreignKey: 'dogBreedId',
  as: 'images'
});

Image.belongsTo(DogBreed, {
  foreignKey: 'dogBreedId',
});

export default DogBreed;
