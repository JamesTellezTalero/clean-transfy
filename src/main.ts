import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: "*", // Permite cualquier origen
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos HTTP permitidos
        allowedHeaders: "*" // Permite cualquier encabezado
    });

    // Configuración de Swagger
    const config = new DocumentBuilder()
        .setTitle("Clean Transfy API")
        .setDescription("Documentación de Clean Transfy API")
        .setVersion("1.0")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api-docs", app, document, {
        swaggerOptions: {
            tagsSorter: "alpha",
            operationsSorter: "method"
        },
        customSiteTitle: "Clean Transfy API Docs"
    });

    // Asegúrate de que el puerto sea un número
    const port = Number(process.env.PORT) || 4044;

    await app.listen(port, () =>
        console.log(`Listen On => http://localhost:${port}`)
    );
}
bootstrap();
