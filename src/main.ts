import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { SwaggerTheme } from 'swagger-themes'

async function start() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      { cors: true }
  );

  const config = new DocumentBuilder()
      /*.addBearerAuth( { type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter JWT token',
            in: 'header', },
          'access_token',)*/
      .setTitle('Nedviga API')
      .setDescription('Документация REST API')
      .setVersion('1.0.0')
      .build()


  const document = SwaggerModule.createDocument(app, config,{
    // include:[UsersModule] если нужно подключить отдельные модули
  });

  const theme = new SwaggerTheme('v3');

  const options = {
    explorer: true,

   // customCss: theme.getBuffer("dark")
  };

  SwaggerModule.setup('/api/docs', app, document, options)

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
