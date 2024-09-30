import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from "sequelize-typescript";
import { User } from "src/modules/users";

@Table({
    tableName: 'articles',
    timestamps: true,
})
export class Article extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    image_url: string;

    @ForeignKey(() => User)  // Foreign key for the relationship
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    user_id: number;

    @BelongsTo(() => User)  // Belongs-to relationship
    user: User;
}
