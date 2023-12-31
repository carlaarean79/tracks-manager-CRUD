import { Controller, Get, Param, Post, Body, Delete, Put,HttpCode, Res, HttpStatus } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from './interfaceTracks';
import { response } from 'express';


@Controller('tracks/')
export class TracksController {
  constructor(private readonly trackService: TracksService){}
@Get()
getTracks(): Promise<Track[]>{
return this.trackService.getTracks();
}
@Get('/:id')
@HttpCode(200)
async getTracksById(@Res() response, @Param('id') id:number): Promise<any>{//@Param ayuda a leer los datos que se le pasa por param.
    const responseFromService = await this.trackService.getTracksById(id);
    if (Object.keys(responseFromService).length){//si el objeto responseFrom... es una matríz
      return response.status(HttpStatus.OK).json(responseFromService);//retorna un código de estado ok! 200
          } else {//sino está todo ok
            return response.status(HttpStatus.NOT_FOUND).json({message: 'Pista no encontrada'});
          }// lanza un código de error con un mensaje como respuesta
}
@Post()
createTracks (@Body() body) : Promise<any>{//@Body hace referencia al cuerpo de la solic.  body: JSON.stringify(newTrack),
return this.trackService.createTracks(body);
} 

@Delete('/:id')
deleteTracksById(@Param('id') id:number): Promise<any>{
 return this.trackService.deleteTrackById(id);
}
@Put('/:id')
@HttpCode(204)
updateTrackById(@Param('id') id: number, @Body() body): Promise<void> {
  return this.trackService.updateTrackById(id, body);
}
}


