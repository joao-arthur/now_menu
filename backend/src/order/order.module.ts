import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../user/user.module.js";
import { AuthModule } from "../auth/auth.module.js";
import { TableModule } from "../table/table.module.js";
import { OrderController } from "./order.controller.js";
import { OrderService } from "./order.service.js";
import { Order, OrderSchema } from "./order.entity.js";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Order.name,
            schema: OrderSchema,
        }]),
        AuthModule,
        UserModule,
        TableModule,
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
