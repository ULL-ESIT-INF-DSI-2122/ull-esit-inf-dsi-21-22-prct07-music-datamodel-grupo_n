import { MusicGender } from "./music_gender";
import { Song } from "./song";

/**
 * Clase que contiene y modifica lso atributos que tiene un album de musica
 */
export class Album {
  /**
   * Constructor de la clase Album
   * @param name nombre del album
   * @param genders generos a los que pertenece el album
   * @param album_songs canciones de las que esta compuesta el album
   */
  constructor(protected name: string, protected year: number,
    protected genders: MusicGender[], protected album_songs: Song[]) {

  }

  /**
   * Retorna el nombre del Album
   * @returns string
   */
  getName(): string {
    return this.name;
  }

  /**
   * Retorna el año de publicaciond el album
   * @returns number
   */
  getYear(): number{
    return this.year;
  }
  /**
   * Retorna los generos a los que pertenece al album
   * @returns MusicGender[]
   */
  getGender(): MusicGender[] {
    return this.genders;
  }

  /**
   * Retorna las consiones que componene el album
   * @returns Song[] 
   */
  getAlbumSongs(): Song[] {
    return this.album_songs;
  }

  /**
   * Modifica el numbre del album
   * @param new_name nuevo nombre
   */
  setName(new_name: string) {
    this.name = new_name;
  }

  /**
   * Modifica el año de salida de una cancion
   * @param new_year nuevo año de lanzamiento
   */
  setYear(new_year: number){
    this.year = new_year;
  }
  /**
   * Modifica los generos a los que pertenece el album
   * @param new_genders nuevos generos 
   */
  setGender(new_genders: MusicGender[]) {
    this.genders = new_genders;
  }

  /**
   * Modifica las canciones que componen el album
   * @param new_songs nuevas canciones
   */
  setAlbumSongs(new_songs: Song[]) {
    this.album_songs = new_songs;
  }

  /**
   * Añade un Genero a los generos ya existentes
   * @param new_gender nuevo genero a agregar
   */
  addGender(new_gender: MusicGender) {
    this.genders.push(new_gender);
  }

  /**
   * Añade una cancion a las canciones existentes
   * @param new_song nueva cancion a agregar
   */
  addSong(new_song: Song): boolean {
    let aux: number = this.album_songs.length;
    this.album_songs.push(new_song);
    return(aux != this.album_songs.length);
  }

  /**
   * Elimina la ultima cancion añadida
   * @returns 
   */
  deleteLastSong(): boolean {
    let aux: number = this.album_songs.length;
    this.album_songs.pop();
    return(aux != this.album_songs.length);
  }
}