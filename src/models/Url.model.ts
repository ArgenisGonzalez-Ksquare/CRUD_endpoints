import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";


export class Url2 extends Model<InferAttributes<Url2>, InferCreationAttributes<Url2>> {

    declare id: string;
    declare largeUrl: string;

}

export const initURLmodel = (sequelize: Sequelize) => {
    Url2.init({
    
        id: {
            type: DataTypes.STRING,
            autoIncrement: false,
            primaryKey: true

        },
        largeUrl: DataTypes.STRING
}, {
    sequelize // Instance of sequelize that reflects the connection
})
}
