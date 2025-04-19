import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: "*", // Permite cualquier origen
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos HTTP permitidos
        allowedHeaders: "*" // Permite cualquier encabezado
    });

    // Asegúrate de que el puerto sea un número
    const port = Number(process.env.PORT) || 4044;

    await app.listen(port, () =>
        console.log(`Listen On => http://localhost:${port}`)
    );
}
bootstrap();
