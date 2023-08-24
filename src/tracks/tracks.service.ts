import { Injectable } from '@nestjs/common';
import { Track } from './interfaceTracks';


const Base_data = 'http://localhost:3030/posts/'

@Injectable()
export class TracksService {
    async updateTrackById(id: number, body: Track): Promise<void> {
        const isTrack = await this.getTracksById(id);//guarda el arreglo proveniente del método getTracks en la const isTrack
        if (!Object.keys(isTrack).length) return;// valida. si isTrack no es una matríz lo retorna. sino hace todo el resto
        const updatedTrack = {//se validan los campos para que no se pueda ingresar nada extraño desde fuera
          title: body.title,
          duration: body.duration,
          artist: body.artist,
        };
        const res = await fetch(Base_data + id, {//se realiza la promesa 
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTrack),
        });
      }
    async getTracks(): Promise<Track[]> {
        const res = await fetch(Base_data);
        const parsed = res.json();
        return parsed;
    }
    async getTracksById(id: number): Promise<Track> {
        const res = await fetch(Base_data + id);// toma la respuesta que viene de la url como formato json y le concatena el id
        const parsed = res.json();//parsea la respuesta
        return parsed;//devuelve el objeto json
    }
    async createTracks(tracks: Track): Promise<any> {
        const id = await this.setId();
        const { title, duration, artist } = tracks;
        const newTrack = { id, title, duration, artist };
        if (!Object.keys(newTrack).length) return;
        const res = await fetch(Base_data, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTrack),
        });
        if (res.status === 201) {
            // La respuesta del servidor indica que se creó correctamente (código 201).
            const createdTrack = await res.json();
            return createdTrack;
        } else {
            // Manejar otros casos de respuesta (por ejemplo, errores) según sea necesario.
            throw new Error(`Error al crear la pista. Código de estado: ${res.status}`);
        } 
    }
    async deleteTrackById(id: number) {
        const res = await fetch(Base_data + id, {
          method: 'DELETE',
        });
        const parsed = await res.json();
        return parsed;
      }
    private async setId(): Promise<number> {
        const tracks = await this.getTracks();
        const id = tracks.pop().id + 1;
        return id;
    }
    async deleteTracks(id: number) {
        const res = await fetch(Base_data + id, {
            method: 'DELETE',

        });

        const parsed = res.json();
        return parsed;
    }


}

