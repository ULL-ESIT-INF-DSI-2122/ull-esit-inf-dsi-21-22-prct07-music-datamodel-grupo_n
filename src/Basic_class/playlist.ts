import { Song, SongInterface } from "./song";
import { MusicGender, MusicGenderInterface } from "./music_gender";
import { Artist } from "./artist";
import { Group } from "./group";

/**
 * Interface que utiliza los atributos con los que se crean los objetos de tipo Playlist
 */
export interface PlaylistInterface{
  name: string,
  songs: SongInterface[],
  genders: MusicGenderInterface[],
  user: string
}

/**
 * Clase que representa a una playlist
 */
export class Playlist {
  /**
   * Constructor de la clase Playlist
   * @param name Nombre de la playlist
   * @param songs Canciones incluidas dentro de la playlist
   * @param duration Duración en segundos de la playlist
   * @param genders Generos que se incluyen dentro de la playlist
   * @param user Nombre del usuario que ha creado la lista
   */
  
  protected duration: number;
  protected genders: MusicGender[];
  
  constructor(protected name: string, protected songs: Song[], 
              protected user: string) {
    this.duration = 0;
    this.genders = [];
  }

  /**
   * Getter del atributo name
   * @returns Nombre 
   */
  public getName() : string {
    return this.name;
  }

  /**
   * Getter del atributo songs
   * @returns Canciones incluidas
   */
  public getSongs() : Song[] {
    return this.songs;
  }

  /**
   * Getter del atributo duration
   * @returns Duración en segundos
   */
  public getDuration() : number {
    let aux_duration: number = 0;
    this.songs.forEach((element) => {
      aux_duration += element.getDuration();
    });

    this.duration = aux_duration;
    return this.duration;
  }

  /**
   * Getter del atributo genders
   * @returns Generos dentro de la playlist
   */
  public getGenders() : MusicGender[] {
    this.genders = [];
    let aux_genders: MusicGender[] = [];
    let finded: boolean = false;

    this.songs.forEach((element) => {
      aux_genders = [];
      aux_genders = element.getGenders();
      aux_genders.forEach((item) => {
        finded = false;
        this.genders.forEach((item2) => {
          if (item2.getMusicGender() == item.getMusicGender()) {
            finded = true;
          }
        });
        if (!finded) {
          this.genders.push(item);
        }
      });
    });

    return this.genders;
  }

  /**
   * Retorna el nombre del usuario que ha creado esta playlist
   * @returns string
   */
  public getUser(): string {
    return this.user;
  }

  /**
   * Setter del atributo name
   * @param name nuevo nombre
   */
  setName(name: string) {
    this.name = name;
  }

  /**
   * Setter del atributo songs
   * @param songs nuevo conjunto de canciones
   */
  setSongs(songs: Song[]) {
    this.songs = songs;
  }

  /**
   * Modifica el nombre del usuario creador de la playliost
   * @param new_user nuevo nombre de usuario
   */
  setUser(new_user: string) {
    this.user = new_user;
  }

  /**
   * Añadir una nueva cancion a la lista de canciones
   * @param song nueva cancion a añadir
   */
  addSong(song: Song): boolean{
    let aux: number = this.songs.length;
    this.songs.push(song);
    return (aux != this.songs.length);
  }

  /**
   * Elimina una cancion añadida
   * @returns boolean
   */
  deleteSong(song: string): boolean {
    let aux: number = this.songs.length;
    this.songs.forEach((item, index) => {
      if(item.getName() == song) {
        this.getSongs().splice(index, 1);
      }
    });
    return (aux != this.songs.length);
  }

  /**
   * Añadir un nuevo genero al conjunto de generos
   * @param gender nuevo genero a añadir
   */
  addGender(gender: MusicGender): boolean {
    let aux: number = this.genders.length;
    this.genders.push(gender);
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
        this.genders.splice(index, 1);
      }
    });

    return(aux != this.genders.length);
  }
  
  /**
   * Funcion que permite crear un nuevo array de Playlist a traves de un array de PlaylistInterface
   * @param playlist array siobre el que trabajaremos
   * @returns Playlist[]
   */
  public static deserialize (playlist: PlaylistInterface[]): Playlist[] {
    let aux_array: Playlist[] = [];

    playlist.forEach((element) => {
      let aux_g: MusicGender[] = [];
      element.genders.forEach((item) => {aux_g.push(new MusicGender(item.gender))});
  
      let aux_s: Song[] = [];
      element.songs.forEach((item) => {
        if('band' in item.author) {
          let aux_band: Artist[] = [];
          item.author.band.forEach((item) => {aux_band.push(new Artist(item.name, aux_g, item.avg))});
          let aux_author: Group = new Group(item.author.name, aux_band, aux_g, item.author.avg);
          aux_s.push(new Song(item.name, aux_author, item.duration, aux_g, item.single, item.repro));
        } else {
          let aux_author: Artist = new Artist(item.author.name, aux_g, item.author.avg);
          aux_s.push(new Song(item.name, aux_author, item.duration, aux_g, item.single, item.repro));
        }
      });
      
      aux_array.push(new Playlist(element.name, aux_s, element.user));
    });
    
    return aux_array;
  }
}