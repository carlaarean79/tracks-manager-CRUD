import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracksController } from './tracks/tracks.controller';
import { TracksService } from './tracks/tracks.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'client')})
  ],
  controllers: [AppController, TracksController],
  providers: [AppService, TracksService],
})
export class AppModule {}
