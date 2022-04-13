import * as inquirer from 'inquirer';
import { Playlist } from '../Basic_class/playlist';
import { Song } from '../Basic_class/song';
import * as read from '../Data/read';
import * as data from '../Data/data';
import * as write from '../Data/write';

enum Options {
  all = 'Mostrar todas las Playlist y su contenido',
  songs = 'Mostrar las canciones de una Playlist',
  create = 'Crear una Playlist',
  del = 'Eliminar una Playlist'
}

enum Sort {

  name = 'Nombre',
  autor = 'Grupo / Artista',
  duration = 'Duracion',
  gender = 'Genero', 
  repro = 'Numero de reproducciones'
} 

/**
 * Clase que nos permite gestionar las plahylist existentes en la base de datos
 */
export class Gestor {

  /**
   * Constructor de la clase que inicializa las playlist 
   */
  constructor(private playlists: Playlist[] = [], private user_logged: string = '') {
    this.playlists = data.All_Playlist;
    this.user_logged = '';
  }

  /**
   * Inicia el menú  de interacion de la clase gestor para
   */
  start() {
    console.clear();
    inquirer.prompt({
      type: "input",
      name: "nombre",
      message: "Introduzca su nombre de usuario: "
    }).then(answers => {
      this.user_logged = answers.nombre;
      inquirer.prompt({
        type: "list",
        name: "action",
        message: "¿Que desea consultar?",
        choices: Object.values(Options)
      }).then(answers => {
        switch (answers["action"]) {
          case Options.all:
            this.viewAllPlaylist();
            break;

          case Options.songs:
            this.concretePlaylist();
            break;

          case Options.create:
            this.createPlaylist();
            break;
        
          case Options.del:
            this.deletePlaylist();
            break;
        }
      });
    });
  }

 /**
 * Funcion que nos permite ver todas las playlist, su nombre, generos y su duracion
 */
  viewAllPlaylist() {
    inquirer.prompt({
      type: "list",
      name: "sort",
      message: "Seleccione el metodo de ordenacion de las canciones: ",
      choices: Object.values(Sort)
    }).then(answers => {
      switch (answers["sort"]) {
        case Sort.name:
          this.playlists.forEach((item) => {
            this.sortSongByName(item);
          });
          break;
          
        case Sort.autor:
          this.playlists.forEach((item) => {
            this.sortSongByAuthor(item);
          });
          break;

        case Sort.duration:
          this.playlists.forEach((item) => {
            this.sortSongByDuration(item);
          });
          break;

        case Sort.gender:
          this.playlists.forEach((item) => {
            this.sortSongByGender(item);
          });
          break;
      
        case Sort.repro:
          this.playlists.forEach((item) => {
            this.sortSongByRepro(item);
          })
          break;
      }
    });
  }

  /**
   * Funcion que opera sobre una playlist concreta marcada por el usuario
   */
  concretePlaylist() {
    let aux_pl: Playlist;

    inquirer.prompt({
      type: 'input',
      name: 'show',
      message: "Introduzca el nombre de la playlist a mostrar"
    }).then(answers => {
      aux_pl = this.findPlaylist(answers.show);
      inquirer.prompt({
        type: 'list',
        name: 'sort',
        message: "Seleccione el metodo de ordenacion de las canciones: ",
        choices: Object.values(Sort)
      }).then(answers => {
        switch (answers["sort"]) {
          case Sort.name:
              this.sortSongByName(aux_pl);
            break;
            
          case Sort.autor:
              this.sortSongByAuthor(aux_pl);
            break;

          case Sort.duration:
              this.sortSongByDuration(aux_pl);
            break;

          case Sort.gender:
              this.sortSongByGender(aux_pl);
            break;
        
          case Sort.repro:
              this.sortSongByRepro(aux_pl);
            break;
          }
        });
      });
    }

  /**
   * Ordena las canciones de una playlist especifica por el nombre
   */
  sortSongByName(play: Playlist) {
    let order: boolean = false;
    inquirer.prompt({
      type: 'list',
      name: 'order',
      message: 'Seleccione el orden: ',
      choices: ["Ascendiente", "Descendiente"]
    }).then(answes => {
      //if()
    });
  }

  /**
   * Ordena las canciones de una playlist en concreto segun el autor de las mismas
   */
  sortSongByAuthor(play: Playlist) {

  }

  /**
   * Ordena las canciones de una playlist en concreto segun la duracion de las mismas
   */
  sortSongByDuration(play: Playlist) {
    
  }

  /**
   * Funcion que ordena la playlist por el genero de las canciones
   */
  sortSongByGender(play: Playlist) {

  }

  /**
   * Funcion que nos permite ordenas las canciones de una playlist en concreto seguin las reporducciones de las canciones
   */
  sortSongByRepro(play: Playlist) {

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

  findPlaylist(name: string): Playlist {
    let pos: number = 0;
    this.playlists.forEach((item, index) => {
      if(item.getName() == name) {
        pos = index;
      }
    });
    return this.playlists[pos];
  }
}