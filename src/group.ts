import { Album } from "./album";
import { MusicGender } from "./music_gender";
import { Artist } from "./artist";

/**
 * Clase que configura y conforma un grupo musica
 */
export class Group {
  /**
   * Constructor de la clase Group
   * @param name nombre del grupo
   * @param band artistas que componen el grupo
   * @param genders generis del album
   * @param avg_monthly media de oyentes mensuales
   */
  constructor(protected name: string, protected band: Artist[], 
    protected genders: MusicGender[], protected avg_monthly: number, 
    protected albums: Album[] = []) {

  }

  /**
   * Retorna el nombre del grupo
   * @returns string
   */
  getName(): string {
    return this.name;
  }

  /**
   * Retorna  los compoenntes del grupo
   * @returns Artist[]
   */
  getBand(): Artist[] {
    return this.band;
  }

  /**
   * Retorna el año de salida del grupo
   * @returns 
   */
  //getDeparture(): number {
  //  return this.departure;
  //}

  /**
   * Retorna los albumes del grupo
   * @returns Album[]
   */
  //getAlbums(): Album[] {
  //  return this.albums;
  //}

  /**
   * Retorna los oyentes mensuales del grupo
   * @returns 
   */
  getAvgMonthly(): number {
    return this.avg_monthly;
  }

  /**
   * Modifica el nombre del grupo
   * @param new_name nuevo nombre
   */
  setName(new_name: string) {
    this.name = new_name;
  }

  /**
   * Modifica los artista del grupo
   * @param new_band nuevos artistas
   */
  setBand(new_band: Artist[]) {
    this.band = new_band;
  }

  // /**
  //  * Modifica el año de creacion del grupo
  //  * @param new_year nuevo año
  //  */
  // setDeparture(new_year: number) {
  //   this.departure = new_year;
  // }

  // /**
  //  * Modifica los albunes del grupo
  //  * @param new_albums nueva coleccion de albunes
  //  */
  // setAlbums(new_albums: Album[]) {
  //   this.albums = new_albums;
  // }

  /**
   * Modifica la media de oyentes mensual
   * @param new_avg_monthly nueva media
   */
  setAvgMonthy(new_avg_monthly: number) {
    this.avg_monthly = new_avg_monthly;
  }

  /**
   * Añade artistas al grupo
   * @param new_artist nuevo integracion del grupo
   */
  addArtist(new_artist: Artist) {
    this.band.push(new_artist);
  }

  /**
   * Añade un nuevo genero al grupo 
   * @param new_gender nuevo genero
   */
  addGender(new_gender: MusicGender) {
    this.genders.push(new_gender);
  }

  // /**
  //  * Añade un album a la colection del grupo
  //  * @param new_album nuevo album
  //  */
  // addAlbum(new_album: Album) {
  //   this.albums.push(new_album);
  // }
}