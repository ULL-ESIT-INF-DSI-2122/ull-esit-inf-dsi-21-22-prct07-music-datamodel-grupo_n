import { Group } from "./group";
import { MusicGender } from "./music_gender";
import { Album } from "./album";
import { Song } from "./song";

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

  // /**
  //  * Retorn los grupos a los que pertenece el artista
  //  * @returns Group[]
  //  */
  // getGroup(): Group[] {
  //   return this.groups;
  // }

  /**
   * Retorna los generos a los que pertenece el artista
   * @returns MusicGender[]
   */
  getGenders(): MusicGender[] {
    return this.genders;
  }

  // /**
  //  * Retorna Los albums en los que ha participado
  //  * @returns Album[]
  //  */
  // getAlbums(): Album[] {
  //   return this.albums;
  // }

  // /**
  //  * Retorna las canciones publicadas
  //  * @returns Song[]
  //  */
  // getSongs(): Song[] {
  //   return this.songs;
  // }

  /**
   * Retorna los oyentes mensuales
   * @returns number
   */
  getAvg_Montly(): number {
   return this.avg_monthly;
  }

  /**
   * Modifica el nombre del artista
   * @param new_name nuevo nombre
   */
  setName(new_name: string){
    this.name = new_name;
  }

  // /**
  //  * Modifica el nombre de los grupos a los que pertenece
  //  * @param new_group nuevos grupos
  //  */
  // setGroup(new_group: Group[]){
  //   this.groups = new_group;
  // }

  /**
   * Modifica los generos con los que esta relacionado
   * @param new_genders nuevos generos
   */
  setGenders(new_genders: MusicGender[]){
    this.genders = new_genders;
  }

  // /**
  //  * Modifica los albums en los que ha participado
  //  * @param new_albums nuevos albums
  //  */
  // setAlbums(new_albums: Album[]){
  //   this.albums = new_albums;
  // }

  // /**
  //  * Modifica las canciones publicada
  //  * @param new_songs nuevas canciones
  //  */
  // setSongs(new_songs: Song[]){
  //   this.songs = new_songs;
  // }

  /**
   * Modifica la cantidad de oyentes mensuales
   * @param new_avg nueva cantidad de oyentes mensuales
   */
  setAvg_Monthly(new_avg: number){
    this.avg_monthly = new_avg;
  }
}