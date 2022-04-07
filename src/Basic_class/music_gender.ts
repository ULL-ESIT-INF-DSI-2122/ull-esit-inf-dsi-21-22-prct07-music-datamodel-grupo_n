import { Artist } from "./artist";
// import { Album } from "./album";
// import { Song } from "./song";
import { Group } from "./group";

/**
 * Clase que almacena y modifica los atributos que tiene un Genero musical.
 */
export class MusicGender {

  /**
   * Constructor de la clase MusicGender
   * @param gender string con el nombre del genero musical
   */
  constructor(protected gender: string) {  

  }

  /**
   * Retorna el genero musical
   * @returns string
   */
  getMusicGender(): string {
    return this.gender;
  }

  /**
   * Modifica el atributo del genero musical
   * @param new_gender nuevo genero
   */
  setMusicGender(new_gender: string) {
    this.gender = new_gender;
  }
}