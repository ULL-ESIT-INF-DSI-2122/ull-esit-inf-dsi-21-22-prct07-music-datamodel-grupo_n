import { Song } from "./song";
import { MusicGender } from "./music_gender";

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
  getName() : string {
    return this.name;
  }

  /**
   * Getter del atributo songs
   * @returns Canciones incluidas
   */
  getSongs() : Song[] {
    return this.songs;
  }

  /**
   * Getter del atributo duration
   * @returns Duración en segundos
   */
  getDuration() : number {
    return this.duration;
  }

  /**
   * Getter del atributo genders
   * @returns Generos dentro de la playlist
   */
  getGenders() : MusicGender[] {
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
   * Elimina la última cancion añadida
   * @returns boolean
   */
  deleteLastSong(): boolean {
    let aux: number = this.songs.length;
    this.songs.pop();
    return (aux != this.songs.length);
  }

  /**
   * Añadir un nuevo genero al conjunto de generos
   * @param gender nuevo genero a añadir
   */
  addGender(gender: MusicGender) {
    this.genders.push(gender);
  }

}