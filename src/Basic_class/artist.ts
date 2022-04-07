import { Group } from "./group";
import { MusicGender, MusicGenderInterface} from "./music_gender";
import { Album, AlbumInterface } from "./album";

export interface ArtistInterface {
  name: string,
  gender: MusicGenderInterface[],
  avg: number,
  album: AlbumInterface[]
}

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
  public getName(): string {
    return this.name;
  }

  /**
   * Retorna los generos a los que pertenece el artista
   * @returns MusicGender[]
   */
  public getGenders(): MusicGender[] {
    return this.genders;
  }

  /**
   * Retorna los oyentes mensuales
   * @returns number
   */
  public getAvg_Montly(): number {
   return this.avg_monthly;
  }

  /**
   * Retorna los albumes
   * @returns 
   */
  public getAlbum(): Album[] {
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
        this.getGenders().splice(index, 1);
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
        this.getAlbum().splice(index, 1);
      }
    });
    return(aux != this.albums.length)
  }

}