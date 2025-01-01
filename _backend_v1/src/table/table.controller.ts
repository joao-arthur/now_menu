import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    Headers,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Query,
    Response,
    UseGuards,
} from "@nestjs/common";
import { Response as ExpressResponse } from "express";
import { TableService } from "./table.service.js";
import { CreateTableDTO } from "./table.dto.js";
import { JwtAuthGuard } from "../auth/jwt-auth.guard.js";
import { getJWTPayload } from "../auth/getJWTPayload.js";

@Controller("table")
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post()
    async createTables(
        @Body() tables: CreateTableDTO[],
        @Headers("authorization") authorization,
    ) {
        const payload = getJWTPayload(authorization);
        await this.tableService.createTables({ tables, payload });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getTables(@Headers("authorization") authorization) {
        const payload = getJWTPayload(authorization);
        return await this.tableService.getTables(payload);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id")
    async deleteTable(@Param() params) {
        await this.tableService.deleteTable(params.id);
    }

    @Header("content-type", "application/pdf")
    @Get("qrcode")
    async getPDF(
        @Response() res: ExpressResponse,
        @Query("userId") userId: string,
        @Query("origin") origin: string,
    ) {
        if (!userId || !origin) {
            throw new HttpException(
                "Unauthorized",
                HttpStatus.UNAUTHORIZED,
            );
        }
        return await this.tableService.getPDF({
            res,
            userId,
            origin,
        });
    }
}
