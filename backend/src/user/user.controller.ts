import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service.js";
import {
    CreateUserDTO,
    LoginUserDTO,
    UpdateUserDTO,
} from "./user.dto.js";
import { AuthService } from "../auth/auth.service.js";
import { JwtAuthGuard } from "../auth/jwt-auth.guard.js";
import { getJWTPayload } from "../auth/getJWTPayload.js";

@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private authService: AuthService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserInfo(@Headers("authorization") authorization) {
        const payload = getJWTPayload(authorization);
        return this.userService.getUserInfo(payload.id);
    }

    @Post()
    async create(@Body() user: CreateUserDTO) {
        const createdUser = await this.userService.create(user);
        return this.authService.login(createdUser);
    }

    @Post("login")
    async login(@Body() user: LoginUserDTO) {
        const foundUser = await this.userService.login(user);
        return this.authService.login(foundUser);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(JwtAuthGuard)
    @Patch()
    async updateUserInfo(
        @Body() user: UpdateUserDTO,
        @Headers("authorization") authorization,
    ) {
        const payload = getJWTPayload(authorization);
        return this.userService.updateUserInfo(user, payload.id);
    }
}
