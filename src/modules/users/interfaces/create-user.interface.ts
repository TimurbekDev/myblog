import { UserRoles } from "../enums";

export declare interface IUserCreateRequest {

    full_name : string,
    email : string,
    password : string,
    role : UserRoles,
    image_url :  string
}