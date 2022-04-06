import { Group } from "./group";
import { MusicGender } from "./music_gender";
import { Album } from "./album";

/**
 * Clase que representa un artista
 */
export class Artist {  
  /**
   * Clase que define a los artistas
   * @param name nombre del artista
   * @param genders generos musicales relacionados
   * @param albums albums del artista
   * @param songs canciones del artista
   * @param avg_monthly cantidad de oyentes mensuales
   */
  constructor(protected name: string, protected genders: MusicGender[], 
    protected avg_monthly: number, protected albums: Album[] = []) {
  }

  /**
   * Calculo de los oyentes mensuales
   * @param groups grupos con los que itrearemos para que con cada uno de esos grupo 
   * podamos coger la cantidad de oyentes de cada grupo
   * @param item.getAvg_Montly con esto recogeremos los oyentes de cada grupo y 
   * los iremos sumando a el avg_montly del artista con su propia cantidad de oyentes
   */
  calculateListener(groups: Group[]) {
    groups.forEach((grp) => {
        this.avg_monthly += grp.getAvgMonthly();
      });
  }

  /**
   * Retorna el nombre del artista
   * @returns string
   */
  getName(): string {
    return this.name;
  }

  /**
   * Retorna los generos a los que pertenece el artista
   * @returns MusicGender[]
   */
  getGenders(): MusicGender[] {
    return this.genders;
  }

  /**
   * Retorna los oyentes mensuales
   * @returns number
   */
  getAvg_Montly(): number {
   return this.avg_monthly;
  }

  /**
   * Retorna los albumes
   * @returns 
   */
  getAlbum(): Album[] {
    return this.albums;
  }

  /**
   * Modifica el nombre del artista
   * @param new_name nuevo nombre
   */
  setName(new_name: string){
    this.name = new_name;
  }

  /**
   * Modifica los generos con los que esta relacionado
   * @param new_genders nuevos generos
   */
  setGenders(new_genders: MusicGender[]){
    this.genders = new_genders;
  }

  /**
   * Modifica la cantidad de oyentes mensuales
   * @param new_avg nueva cantidad de oyentes mensuales
   */
  setAvg_Monthly(new_avg: number){
    this.avg_monthly = new_avg;
  }

  /**
   * Modifica los albumes
   * @param new_albums 
   */
  setAlbum(new_albums: Album[]) {
    this.albums = new_albums;
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
  deleteLastAlbum() : boolean {
    let aux = this.albums.length;
    this.albums.pop();
    
    return(aux != this.albums.length)
  }

}