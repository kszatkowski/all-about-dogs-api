import { DataTypes, QueryInterface, Sequelize } from 'sequelize';
import type { MigrationFn } from 'umzug';
import { DogBreedAttributes } from '../models/DogBreed';

export const up: MigrationFn<QueryInterface> = async (params) => {
    await params.context.addColumn('Images', 'dogBreedId', {
        type: DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
        references: {
            model: 'DogBreeds',
            key: 'id' as keyof DogBreedAttributes,
        },
    });
}

export const down: MigrationFn<QueryInterface> = async (params) => {
    await params.context.removeColumn('Images', 'dogBreedId');
}
