/**
 * Interface que utiliza los atributos con los que se crean los objetos de tipo MusicGender
 */
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

  /**
   * Funcion que nos permite instanciar un nuevo objeto MusicGender a travez de la interfaz MusicGenderInterface 
   * @param music_gender array de tipo MusicGenderInterface
   * @returns MusicGender[]
   */
  public static deserialize(music_gender: MusicGenderInterface[]): MusicGender[] {
    let aux_array: MusicGender[] = [];
    music_gender.forEach((element) => {
      aux_array.push(new MusicGender(element.gender));
    });
    return aux_array;
  }
}