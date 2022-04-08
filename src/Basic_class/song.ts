import { MusicGender, MusicGenderInterface } from "./music_gender";
import { Artist, ArtistInterface } from "./artist";
import { Group, GroupInterface } from "./group";


export interface SongInterface {
  name: string,
  author: GroupInterface|ArtistInterface,
  duration: number,
  gender: MusicGenderInterface[],
  single: boolean,
  repro: number
}
/**
 * Clase que representa una cancion
 */
export class Song {
  /**
   * Clase que define un objeto cancion
   * @param name nombre de la cancion
   * @param author nombre del autor/autores de la cancion
   * @param duration tiempo de duracion de la cancion 
   * @param gender genero musical de la cancion
   * @param single flag para saber si ha salido como single o no
   * @param repro numero de reproducciones de la cancion
   */
  constructor(protected name: string, protected author: Group|Artist, 
    protected duration: number, protected gender: MusicGender[], 
    protected single: boolean, protected repro: number) {
  }

  /**
   * Retorna el nombre de la cancion
   * @returns name
   */
  public getName(): string{
    return this.name;
  }

  /**
   * Retorna el artista o grupo autor de la cancion
   * @returns autor
   */
  public getAuthor(): Group|Artist {
    return this.author;
  }

  /**
   * Retorna la duracion de la cancion
   * @returns duration
   */
  public getDuration(): number{
    return this.duration;
  }

  /**
   * Retorna el genero/generos musical/musicales de la cancion
   * @returns gender
   */
  public getGenders(): MusicGender[]{
    return this.gender;
  }

  /**
   * Retorna si la cancion fue lanzada como un single o no
   * @returns single
   */
  public getSingle(): boolean{
    return this.single;
  }

  /**
   * Retorna el numero de reproducciones
   * @returns repro
   */ 
  public getRepro(): number{
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
  setAuthor(new_autor: Group|Artist) {
    this.author = new_autor;
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

  /**
   * Añadir un nuevo genero al conjunto de generos
   * @param gender nuevo genero a añadir
   */
   addGender(gender: MusicGender): boolean {
    let aux: number = this.gender.length;
    this.gender.push(gender);
    return(aux != this.gender.length);
  }

  /**
   * Elimina un genero atribuido al artista
   * @param gender genero a eliminar 
   * @returns boolean
   */
   deleteGender(gender: string): boolean {
    let aux: number = this.gender.length;
    this.gender.forEach((item, index) => {
      if(item.getMusicGender() == gender) {
        this.getGenders().splice(index, 1);
      }
    });
    return(aux != this.gender.length);
  }

  public static deserialize(song: SongInterface[]): Song[] {
    let aux_array: Song[] = [];

    song.forEach((element) => {
      let aux_g: MusicGender[] = [];
      element.gender.forEach((item) => {aux_g.push(new MusicGender(item.gender))});

      if('band' in element.author) { 
        let aux_band: Artist[] = [];
        element.author.band.forEach((item) => {aux_band.push(new Artist(item.name, aux_g, item.avg))});
        let aux_author: Group = new Group(element.author.name, aux_band, aux_g, element.author.avg);
        aux_array.push(new Song(element.name, aux_author, element.duration, aux_g, element.single, element.repro));
        
      } else {
        let aux_author: Artist = new Artist(element.author.name, aux_g, element.author.avg);
        aux_array.push(new Song(element.name, aux_author, element.duration, aux_g, element.single, element.repro));
      }
    });

    return aux_array;
  }
}