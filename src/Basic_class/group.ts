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
   * Retorna los generos del grupo
   * @returns 
   */
  getGender(): MusicGender[] {
   return this.genders;
  }

  /**
   * Retorna los albumes del grupo
   * @returns Album[]
   */
  getAlbums(): Album[] {
   return this.albums;
  }

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

  /**
   * Modifica el año de creacion del grupo
   * @param new_year nuevo año
   */
  setGender(new_gender: MusicGender[]) {
    this.genders = new_gender;
  }

  /**
   * Modifica los albunes del grupo
   * @param new_albums nueva coleccion de albunes
   */
  setAlbums(new_albums: Album[]) {
    this.albums = new_albums;
  }

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
  addArtist(new_artist: Artist): boolean {
    let aux = this.band.length;
    this.band.push(new_artist);
    return(aux != this.band.length);
  }

  /**
   * Elimina un artista en concreto del drupo musical
   * @param artist artista a eliminar
   * @returns boolean
   */
  deleteArtist(artist: string): boolean {
    let aux = this.band.length;
    this.band.forEach((item, index) => {
      if(item.getName() == artist) {
        this.getBand().splice(index, 1);
      }
    });
    return(aux != this.band.length);
  }

  /**
   * Añade un Genero a los generos ya existentes
   * @param new_gender nuevo genero a agregar
   */
   addGender(new_gender: MusicGender): boolean {
    let aux = this.genders.length;
    this.genders.push(new_gender);
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
        this.getGender().splice(index, 1);
      }
    });
    return(aux != this.genders.length);
  }


  /**
   * Añade un nuevo album
   * @param album nuevo album a añadir
   * @returns booleano que indica si se añadió correctamente
   */
  addAlbum(album: Album): boolean {
    let aux = this.albums.length;
    this.albums.push(album);
    return(aux != this.albums.length)
  }

  /**
   * Elimina el ultimo elemento insertado
   * @returns booleano que indica si se eliminó correctamente
   */
  deleteAlbum(album: string) : boolean {
    let aux = this.albums.length;
    this.albums.forEach((item, index) => {
      if(item.getName() == album) {
        this.getAlbums().splice(index, 1);
      }
    });
    return(aux != this.albums.length)
  }
}