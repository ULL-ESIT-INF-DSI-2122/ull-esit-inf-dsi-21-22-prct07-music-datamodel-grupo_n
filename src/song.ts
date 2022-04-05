import { MusicGender } from "./music_gender";
import { Artist } from "./artist";
import { Group } from "./group";

/**
 * Clase que representa una cancion
 */
export class Song {
  /**
   * Clase que define un objeto cancion
   * @param name nombre de la cancion
   * @param autor nombre del autor/autores de la cancion
   * @param duration tiempo de duracion de la cancion 
   * @param gender genero musical de la cancion
   * @param single flag para saber si ha salido como single o no
   * @param repro numero de reproducciones de la cancion
   */
  constructor(protected name: string, protected autor: Group|Artist, 
    protected duration: number, protected gender: MusicGender[], 
    protected single: boolean, protected repro: number){
  }

  /**
   * Retorna el nombre de la cancion
   * @returns name
   */
  getName(): string{
    return this.name;
  }

  /**
   * Retorna el artista o grupo autor de la cancion
   * @returns autor
   */
  getAutor(): Group|Artist {
    return this.autor;
  }

  /**
   * Retorna la duracion de la cancion
   * @returns duration
   */
  getDuration(): number{
    return this.duration;
  }

  /**
   * Retorna el genero/generos musical/musicales de la cancion
   * @returns gender
   */
  getGenders(): MusicGender[]{
    return this.gender;
  }

  /**
   * Retorna si la cancion fue lanzada como un single o no
   * @returns single
   */
  getSingle(): boolean{
    return this.single;
  }

  /**
   * Retorna el numero de reproducciones
   * @returns repro
   */ 
  getRepro(): number{
    return this.repro;
  }

  /**
   * Modifica el valor del nombre por otro nombre
   * @param new_name nuevo nombre
   */
  setName(new_name: string) {
    this.name = new_name;
  }

  /**
   * Modifica el valor del autor por otro autor
   * @param new_autor nuevo autor
   */
  setAutor(new_autor: Group|Artist) {
    this.autor = new_autor;
  }

  /**
   * Modifica el valor de la duracion por una nueva duracion
   * @param new_duration nueva duracion
   */
  setDuration(new_duration: number) {
    this.duration = new_duration;
  }

  /**
   * Modifica el valor de genders por otros generos
   * @param new_genders nuevo genero
   */
  setGenders(new_genders: MusicGender[]) {
    this.gender = new_genders;
  }

  /**
   * Modifica el valor de single para ver si es otro sigle
   * @param new_single nuevo single
   */
  setSingle(new_single: boolean) {
    this.single = new_single;
  }

  /**
   * Modifica el valor de repro por otro numero de reproducciones
   * @param new_repro nueva repro
   */
  setRepro(new_repro: number) {
    this.repro = new_repro;
  }

}