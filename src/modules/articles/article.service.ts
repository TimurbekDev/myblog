import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Article } from "./schemas";
import { CreateArticleDto, UpdateArticleDto } from "./dtos";
import { User, UserService } from "../users";

@Injectable()
export class ArticleService {

    constructor(
        @InjectModel(Article) private articleModel:typeof Article,
        @Inject(forwardRef(() => UserService)) private userService: UserService,

    ) {}

    async createArticle(payload : CreateArticleDto):Promise<Article>{

        const user = await this.userService.findById(payload.user_id)
        if(!user)
            throw new NotFoundException('user not found')

        const article = await this.articleModel.create({
            title: payload.title,
            description : payload.description,
            image_url : payload.image_url,
            user_id : payload.user_id
        })

        return this.findById(article.id)
    }

    async findAll ():Promise<Article[]>{
        return this.articleModel.findAll({
            attributes : {
                exclude : ['user_id','createdAt','updatedAt']
            }
        })
    }

    async findById(id:number):Promise<Article>{

        const article = await this.articleModel.findByPk(id,{
            attributes : {
                exclude : ['user_id','createdAt','updatedAt']
            }
        })

        if(!article)
            throw new NotFoundException('article not found')

        return article
    }

    async updateById(id:number,payload:UpdateArticleDto):Promise<Article>{
        const article =  await this.findById(id)

        await article.update({
            title : payload.title,
            description : payload.description,
            image_url : payload.image_url
        })

        return await this.findById(article.id)
    }

    async deleteById(id:number):Promise<object>{
        const article = await this.findById(id)
        await article.destroy()

        return {
            message : 'Article Deleted'
        }
    }
}