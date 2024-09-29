import { Column, DataType, Model, Table } from "sequelize-typescript";
import { UserRoles } from "../enums";

@Table({
    tableName : 'users',
    timestamps : true
})
export  class User extends Model{
    @Column({
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement : true
    })
    id : number

    @Column({
        type:DataType.STRING(100),
        allowNull : false
    })
    full_name : string

    @Column({
        type:DataType.STRING,
        allowNull : false
    })
    email : string

    @Column({
        type:DataType.STRING(100),
        allowNull : false
    })
    password : string

    @Column({
        type:DataType.ENUM,
        values : Object.values(UserRoles),
        allowNull : false
    })
    role : UserRoles

    @Column({
        type:DataType.STRING(100),
        allowNull : true
    })
    image_url : string
}
