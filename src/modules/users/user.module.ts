import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./schemas";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        MulterModule.register({
            storage: diskStorage({
              destination: path.join(process.cwd(),'src','uploads'),
              filename: (_, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = path.extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
              },
            }),
          }),
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}