import { Artist } from "./artist";
// import { Album } from "./album";
// import { Song } from "./song";
import { Group } from "./group";

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
  getMusicGender(): string {
    return this.gender;
  }

  // /**
  //  * Retorna los artitas o gruos que conforman el genero
  //  * @returns (Group|Artist)[]
  //  */
  // getArtist(): (Group|Artist)[] {
  //   return this.artists;
  // }

  // /**
  //  * Retorna los albumes del genero
  //  * @returns Album[]
  //  */
  // getAlbums(): Album[] {
  //   return this.albums;
  // }

  // /**
  //  * Retorna las conciones que pertenecen al genero
  //  * @returns Song[]
  //  */
  // getSongs(): Song[] {
  //   return this.songs;
  // }

  /**
   * Modifica el atributo del genero musical
   * @param new_gender nuevo genero
   */
  setMusicGender(new_gender: string) {
    this.gender = new_gender;
  }

  // /**
  //  * Modifica los artistas
  //  * @param new_artists nuevos artistas
  //  */
  // setArtist(new_artists: (Group|Artist)[]) {
  //   this.artists = new_artists;
  // }

  // /**
  //  * Modifica los atributos que conforman el genero
  //  * @param new_albums nuevos albunes
  //  */
  // setAlbums(new_albums: Album[]) {
  //   this.albums = new_albums;
  // }

  // /**
  //  * Modifica las canciones del genero
  //  * @param new_songs nuevas canciones
  //  */
  // setSongs(new_songs: Song[]) {
  //   this.songs = new_songs;
  // }

  // /**
  //  * Añade un artista o un grupo al genero
  //  * @param new_artist nuevo artista o grupo
  //  */
  // addArtist(new_artist: Group|Artist) {
  //   this.artists.push(new_artist);
  // }

  // /**
  //  * Añade un album al genero
  //  * @param new_album nuevo album a añadir
  //  */
  // addAlbum(new_album: Album) {
  //   this.albums.push(new_album);
  // }

  // /**
  //  * Añade una cacion al genero
  //  * @param new_song nueva cancion
  //  */
  // addSong(new_song: Song) {
  //   this.songs.push(new_song);
  // }
}