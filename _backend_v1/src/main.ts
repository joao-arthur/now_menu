import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app/app.module.js";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        {
            cors: true,
        },
    );
    await app.listen(process.env.PORT || 8080);
}

bootstrap();
