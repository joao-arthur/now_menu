import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TableController } from "./table.controller.js";
import { TableService } from "./table.service.js";
import { Table, TableSchema } from "./table.entity.js";
import { AuthModule } from "../auth/auth.module.js";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Table.name,
            schema: TableSchema,
        }]),
        AuthModule,
    ],
    controllers: [TableController],
    providers: [TableService],
    exports: [
        MongooseModule.forFeature([{
            name: Table.name,
            schema: TableSchema,
        }]),
    ],
})
export class TableModule {}
