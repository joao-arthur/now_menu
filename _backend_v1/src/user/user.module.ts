import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module.js";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { User, UserSchema } from "./user.entity.js";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema,
        }]),
        AuthModule,
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema,
        }]),
    ],
})
export class UserModule {}
