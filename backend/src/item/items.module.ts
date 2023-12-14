import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ItemController } from "./item.controller.js";
import { ItemService } from "./item.service.js";
import { Item, ItemSchema } from "./item.entity.js";
import { AuthModule } from "../auth/auth.module.js";
import { TableModule } from "../table/table.module.js";
import { UserModule } from "../user/user.module.js";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Item.name,
            schema: ItemSchema,
        }]),
        AuthModule,
        TableModule,
        UserModule,
    ],
    controllers: [ItemController],
    providers: [ItemService],
})
export class ItemModule {}
