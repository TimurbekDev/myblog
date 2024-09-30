import { Body, Controller, Get, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto, UpdateArticleDto } from "./dtos";

@Controller('articles')
export class ArticleController{
    constructor(private readonly articleService : ArticleService){}

    @Post()
    async createArticle(@Body(new ValidationPipe) createArticleDto : CreateArticleDto){
        return await this.articleService.createArticle(createArticleDto)
    }

    @Get()
    async getAllArticles(){
        return await this.articleService.findAll()
    }

    @Get('/:articleId')
    async getArticleById(@Param('articleId') id:number){
        return await this.articleService.findById(id)
    }

    @Patch('/:articleId')
    async updateArticle(@Param('articleId') id:number, @Body(new ValidationPipe) updateArticleDto:UpdateArticleDto){
        return await this.articleService.updateById(id, updateArticleDto)
    }
}