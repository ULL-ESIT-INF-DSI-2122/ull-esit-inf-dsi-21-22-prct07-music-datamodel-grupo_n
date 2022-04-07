import { Song, SongInterface } from "./song";
import { MusicGender, MusicGenderInterface } from "./music_gender";


export interface PlaylistInterface{
  name: string,
  songs: SongInterface[],
  duration: number,
  genders: MusicGenderInterface[]
}
/**
 * Clase que representa a una playlist
 */
export class Playlist {
  /**
   * Constructor de la clase Playlist
   * @param name Nombre de la playlist
   * @param songs Canciones incluidas dentro de la playlist
   * @param duration Duración en segundos de la playlist
   * @param genders Generos que se incluyen dentro de la playlist
   */
  constructor(protected name: string, protected songs: Song[], 
              protected duration: number, protected genders: MusicGender[]) {
  }

  /**
   * Getter del atributo name
   * @returns Nombre 
   */
  public getName() : string {
    return this.name;
  }

  /**
   * Getter del atributo songs
   * @returns Canciones incluidas
   */
  public getSongs() : Song[] {
    return this.songs;
  }

  /**
   * Getter del atributo duration
   * @returns Duración en segundos
   */
  public getDuration() : number {
    return this.duration;
  }

  /**
   * Getter del atributo genders
   * @returns Generos dentro de la playlist
   */
  public getGenders() : MusicGender[] {
    return this.genders;
  }

  /**
   * Setter del atributo name
   * @param name nuevo nombre
   */
  setName(name: string) {
    this.name = name;
  }

  /**
   * Setter del atributo songs
   * @param songs nuevo conjunto de canciones
   */
  setSongs(songs: Song[]) {
    this.songs = songs;
  }

  /**
   * Setter del atributo duration
   * @param duration nueva duracion de la playlist
   */
  setDuration(duration: number) {
    this.duration = duration;
  }

  /**
   * Setter del atributo genders
   * @param genders nuevo conjunto de generos incluidos
   */
  setGenders(genders: MusicGender[]) {
    this.genders = genders;
  }

  /**
   * Añadir una nueva cancion a la lista de canciones
   * @param song nueva cancion a añadir
   */
  addSong(song: Song): boolean{
    let aux: number = this.songs.length;
    this.songs.push(song);
    return (aux != this.songs.length);
  }

  /**
   * Elimina una cancion añadida
   * @returns boolean
   */
  deleteSong(song: string): boolean {
    let aux: number = this.songs.length;
    this.songs.forEach((item, index) => {
      if(item.getName() == song) {
        this.getSongs().splice(index, 1);
      }
    });
    return (aux != this.songs.length);
  }

  /**
   * Añadir un nuevo genero al conjunto de generos
   * @param gender nuevo genero a añadir
   */
  addGender(gender: MusicGender): boolean {
    let aux: number = this.genders.length;
    this.genders.push(gender);
    return(aux != this.genders.length);
  }

  /**
   * Elimina un genero atribuido al artista
   * @param gender genero a eliminar 
   * @returns boolean
   */
   deleteGender(gender: string): boolean {
    let aux: number = this.genders.length;
    this.genders.forEach((item, index) => {
      if(item.getMusicGender() == gender) {
        this.getGenders().splice(index, 1);
      }
    });
    return(aux != this.genders.length);
  }
}