
export interface MusicGenderInterface {
  gender: string
}

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
  public getMusicGender(): string {
    return this.gender;
  }

  /**
   * Modifica el atributo del genero musical
   * @param new_gender nuevo genero
   */
  setMusicGender(new_gender: string) {
    this.gender = new_gender;
  }

  public static deserialize(music_gender: MusicGenderInterface[]): MusicGender[] {
    let aux_array: MusicGender[] = [];
    music_gender.forEach((element) => {
      aux_array.push(new MusicGender(element.gender));
    });
    return aux_array;
  }
}