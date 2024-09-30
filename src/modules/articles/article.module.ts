import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Article } from "./schemas";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { User, UserModule } from "../users";

@Module({
    imports: [
        SequelizeModule.forFeature([Article]),
        forwardRef(() => UserModule)
    ],
    controllers: [ArticleController],
    providers : [ArticleService],
})
export class ArticleModule{}