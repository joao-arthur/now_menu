import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ItemService } from "./item.service.js";
import { CreateItemDTO } from "./item.dto.js";
import { JwtAuthGuard } from "../auth/jwt-auth.guard.js";
import { getJWTPayload } from "../auth/getJWTPayload.js";

type updateItemType = {
    name: string;
    description: string;
    prepareTime: number;
    price: number;
};

@Controller("item")
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post("menu")
    async createMenu(
        @Body() items: CreateItemDTO[],
        @Headers("authorization") authorization,
    ) {
        const payload = getJWTPayload(authorization);
        await this.itemService.createMenu({ items, payload });
    }

    @UseGuards(JwtAuthGuard)
    @Get("menu")
    async getMenu(@Headers("authorization") authorization) {
        const payload = getJWTPayload(authorization);
        return await this.itemService.getMenu(payload);
    }

    @Get("menu/:tableId")
    async getRestaurantMenu(@Param() params) {
        if (!params.tableId) {
            throw new HttpException(
                "Unauthorized",
                HttpStatus.UNAUTHORIZED,
            );
        }
        try {
            return await this.itemService.getRestaurantMenu(
                params.tableId,
            );
        } catch (e) {
            throw new HttpException(
                "Unauthorized",
                HttpStatus.UNAUTHORIZED,
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post()
    async createItem(
        @Body() item: CreateItemDTO,
        @Headers("authorization") authorization,
    ) {
        const payload = getJWTPayload(authorization);
        await this.itemService.createItem({ item, payload });
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id")
    async deleteItem(@Param() params) {
        await this.itemService.deleteItem(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getItem(@Param() params) {
        return await this.itemService.getItem(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async updateItem(
        @Param() params,
        @Body() itemToUpdate: updateItemType,
    ) {
        return await this.itemService.updateItem(
            params.id,
            itemToUpdate,
        );
    }
}
