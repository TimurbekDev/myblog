import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./schemas";
import { IUserCreateRequest, IUserUpdateRequest } from "./interfaces";
import { Article } from "../articles";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userModel: typeof User) { }

    async createUser(payload: IUserCreateRequest): Promise<User> {

        const user = await this.userModel.create({
            full_name: payload.full_name,
            email: payload.email,
            password: payload.password,
            role: payload.role,
            image_url: payload.image_url
        });

        return this.findById(user.id)
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.findAll({
            attributes : {
                exclude : ['createdAt','updatedAt','password']
            },
            include : [Article]
        })
    }

    async findById(id:number):Promise<User>{

        const user = await this.userModel.findByPk(id,{
            attributes : {
                exclude : ['createdAt','updatedAt','password']
            }        
        })

        if(!user)
            throw new NotFoundException('user not found')

        return user
    }

    async updateById(id:number,payload:IUserUpdateRequest):Promise<User | object>{

        await this.userModel.update(
            {
                full_name: payload.full_name,
                email: payload.email,
                password : payload.password,
                image_url : payload.image_url
            },{
                where : {
                    id
                }
            }
        )

        return await this.findById(id)
    }

    async deleteById(id:number):Promise<object>{

        const user = await this.userModel.findByPk(id)

        if(!user)
            throw new NotFoundException('user not found')

        await user.destroy()

        return {
            message : 'User Deleted'
        }
    }
}