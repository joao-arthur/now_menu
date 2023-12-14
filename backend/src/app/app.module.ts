import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TableModule } from "../table/table.module.js";
import { ItemModule } from "../item/items.module.js";
import { UserModule } from "../user/user.module.js";
import { OrderModule } from "../order/order.module.js";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URI),
        UserModule,
        ItemModule,
        TableModule,
        OrderModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
