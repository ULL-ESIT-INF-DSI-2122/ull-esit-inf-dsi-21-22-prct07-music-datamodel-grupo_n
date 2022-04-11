import * as inquirer from 'inquirer';
import { Album } from '../Basic_class/album';
import { Artist } from '../Basic_class/artist';
import { Group } from '../Basic_class/group';
import { MusicGender } from '../Basic_class/music_gender';
import { Playlist } from '../Basic_class/playlist';
import { Song } from '../Basic_class/song';
import { SchemaInterface } from '../Data/write';
//import * as read from '../Data/read';
import * as data from '../Data/data';
import * as write from '../Data/write';

console.log("Gestion avanzada [Playlist]");

/**
 * Clase que nos permite gestionar las plahylist existentes en la base de datos
 */
export class Gestor {
  private playlist: Playlist[];

  /**
   * Constructor de la clase que inicializa las playlist 
   */
  constructor() {
    this.playlist = data.All_Playlist;
  }

  /**
   * Inicia el menú  de interacion de la clase gestor para
   */
  start() {

  }

  /**
 * Funcion que nos permite ver todas las playlist, su nombre, generos y su duracion
 */
  viewAllPlaylist() {

  }

  /**
   * Ordena las canciones de una playlist especifica por el nombre
   */
  sortSongByName() {

  }

  /**
   * Ordena las canciones de una playlist en concreto segun el autor de las mismas
   */
  sortSongByAuthor() {

  }

  /**
   * Funcion que ordena las canciones de la playlist por el año de salida
   */
  sortSongByYear() {

  }

  /**
   * Ordena las canciones de una playlist en concreto segun la duracion de las mismas
   */
  sortSongByDuration() {
    
  }

  /**
   * Funcion que ordena la playlist por el genero de las canciones
   */
  sortSongByGender() {

  }

  /**
   * Funcion que nos permite ordenas las canciones de una playlist en concreto seguin las reporducciones de las canciones
   */
  sortSongByRepro() {

  }

  /**
   * Funcion que nos permitira crear un nueva playlist
   */
  createPlaylist() {

  }

  /**
   * Funcion que nos permite borrar una playlist
   */
  deletePlaylist() {

  }
}