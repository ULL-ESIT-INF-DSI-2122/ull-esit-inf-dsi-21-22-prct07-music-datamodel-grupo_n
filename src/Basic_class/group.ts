import { Album, AlbumInterface } from "./album";
import { Song } from "./song";
import { MusicGender, MusicGenderInterface} from "./music_gender";
import { Artist, ArtistInterface } from "./artist";

export interface GroupInterface {
  name: string,
  gender: MusicGenderInterface[],
  avg: number,
  album: AlbumInterface[],
  band: ArtistInterface[]
}

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
    protected genders: MusicGender[], protected avg_monthly: number) {

  }

  /**
   * Retorna el nombre del grupo
   * @returns string
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Retorna  los compoenntes del grupo
   * @returns Artist[]
   */
  public getBand(): Artist[] {
    return this.band;
  }

  /**
   * Retorna los generos del grupo
   * @returns 
   */
  public getGender(): MusicGender[] {
   return this.genders;
  }

  /**
   * Retorna los oyentes mensuales del grupo
   * @returns 
   */
  public getAvgMonthly(): number {
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

  public static deserialize(group: GroupInterface[]): Group[] {
    let aux_array: Group[] = [];
    
    group.forEach((element) => {
      let aux_g: MusicGender[] = [];
      element.gender.forEach((item) => {aux_g.push(new MusicGender(item.gender))});
  
      let aux_band: Artist[] = [];
      element.band.forEach((item) =>{aux_band.push(new Artist(item.name, aux_g, item.avg))});
      
      aux_array.push(new Group(element.name, aux_band, aux_g, element.avg));
    });

    return aux_array;
  }
}