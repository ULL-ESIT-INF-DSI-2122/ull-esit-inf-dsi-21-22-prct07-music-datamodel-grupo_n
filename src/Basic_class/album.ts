import { Artist } from './artist';
import { MusicGender, MusicGenderInterface } from './music_gender';
import { Group } from './group';
import { Song, SongInterface} from './song';

/**
 * Interface que utiliza los atributos con los que se crean lso objetos de tipo Album
 */
export interface AlbumInterface {
  name: string,
  year: number, 
  gender: MusicGenderInterface[],
  song: SongInterface[]
}

/**
 * Clase que contiene y modifica lso atributos que tiene un album de musica
 */
export class Album {
  /**
   * Constructor de la clase Album
   * @param name nombre del album
   * @param genders generos a los que pertenece el album
   * @param album_songs canciones de las que esta compuesta el album
   */
  constructor(protected name: string, protected year: number,
    protected genders: MusicGender[], protected album_songs: Song[]) {

  }

  /**
   * Retorna el nombre del Album
   * @returns string
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Retorna el año de publicaciond el album
   * @returns number
   */
  public getYear(): number{
    return this.year;
  }
  /**
   * Retorna los generos a los que pertenece al album
   * @returns MusicGender[]
   */
  public getGender(): MusicGender[] {
    return this.genders;
  }

  /**
   * Retorna las consiones que componene el album
   * @returns Song[] 
   */
  public getAlbumSongs(): Song[] {
    return this.album_songs;
  }

  /**
   * Modifica el numbre del album
   * @param new_name nuevo nombre
   */
  setName(new_name: string) {
    this.name = new_name;
  }

  /**
   * Modifica el año de salida de una cancion
   * @param new_year nuevo año de lanzamiento
   */
  setYear(new_year: number){
    this.year = new_year;
  }
  /**
   * Modifica los generos a los que pertenece el album
   * @param new_genders nuevos generos 
   */
  setGender(new_genders: MusicGender[]) {
    this.genders = new_genders;
  }

  /**
   * Modifica las canciones que componen el album
   * @param new_songs nuevas canciones
   */
  setAlbumSongs(new_songs: Song[]) {
    this.album_songs = new_songs;
  }

  /**
   * Añade un Genero a los generos ya existentes
   * @param new_gender nuevo genero a agregar
   */
  addGender(new_gender: MusicGender): boolean {
    let aux: number = this.genders.length;
    this.genders.push(new_gender);
    return(aux != this.genders.length);
  }

  /**
   * Elimina un genero musical de un album
   * @param gender genero musical que se le da a la funcion para eliminar
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
   * Añade una cancion a las canciones existentes
   * @param new_song nueva cancion a agregar
   */
  addSong(new_song: Song): boolean {
    let aux: number = this.album_songs.length;
    this.album_songs.push(new_song);
    return(aux != this.album_songs.length);
  }

  /**
   * Elimina la ultima cancion añadida
   * @param song cancion a eliminar que se le pasa a la funcion
   * @returns boolean
   */
  deleteSong(song: string): boolean {
    let aux: number = this.album_songs.length;
    this.album_songs.forEach((item, index) => {
      if(item.getName() == song) {
        this.getAlbumSongs().splice(index, 1);
      }
    });
    return(aux != this.album_songs.length);
  }

  /**
   * Permite instanciar un vector de Album a partir de un vector de la interface AlbumINterface
   * @param album array sobre loq eu construiremos
   * @returns Album[]
   */
  public static deserialize(album: AlbumInterface[]): Album[] {
    let aux_array: Album[] = [];

    album.forEach((element) => {
      let aux_g: MusicGender[] = [];
      element.gender.forEach((item) => {aux_g.push(new MusicGender(item.gender))});
      
      let aux_s: Song[] = [];
      element.song.forEach((item) => {
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
    aux_array.push(new Album(element.name, element.year, aux_g, aux_s));
    });

    return aux_array;
  }
}