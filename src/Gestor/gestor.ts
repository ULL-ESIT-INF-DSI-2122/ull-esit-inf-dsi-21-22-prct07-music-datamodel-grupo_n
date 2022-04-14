import * as inquirer from 'inquirer';
import { Playlist } from '../Basic_class/playlist';
import { MusicGender } from '../Basic_class/music_gender';
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
  private songs: Song[];
  private genders: MusicGender[];

  /**
   * Constructor de la clase que inicializa las playlist 
   */
  constructor(private playlists: Playlist[] = [], private user_logged: string = '') {
    this.playlists = data.All_Playlist;
    this.user_logged = '';
    this.songs = data.All_Songs;
    this.genders = data.All_Genders;
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
    let hour: number = 0;
    let min: number = 0;
    let aux: number = 0;
    let seg: number = 0;

    this.playlists.forEach((item) => {
      console.log(`-> Nombre: ${item.getName()}`);
      console.log('-> Generos:');
      item.getGenders().forEach((gender) => {
        console.log(`\t <> ${gender.getMusicGender()}`);
      });
      hour = Math.floor(item.getDuration() / 3600);
      aux = item.getDuration()%3600;
      min = Math.floor(aux / 60);
      seg = aux % 60;
      console.log(`-> Duración: ${hour} horas, ${min} minutos y ${seg} segundos`);
      console.log();
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
    inquirer.prompt({
      type: 'list',
      name: 'order',
      message: 'Seleccione el orden: ',
      choices: ["Ascendiente", "Descendiente"]
    }).then(answers => {
      if(answers.order == 'Acendiente') {
        play.getSongs().sort((a, b) => a.getName() > b.getName() ? -1 : 1);
      } else {
        play.getSongs().sort((a, b) => a.getName() < b.getName() ? -1 : 1);
      }
      let min: number = 0;
      let seg: number = 0;
      play.getSongs().forEach((item) => {
        min = Math.floor(item.getDuration()/60);
        seg = (item.getDuration()%60); 
        console.log(`-> ${item.getName()} - ${item.getAuthor().getName()} - ${min} min y ${seg} seg`);
      });
    });
  }

  /**
   * Ordena las canciones de una playlist en concreto segun el autor de las mismas canciones
   */
  sortSongByAuthor(play: Playlist) {
    inquirer.prompt({
      type: 'list',
      name: 'order',
      message: 'Seleccione el orden: ',
      choices: ["Ascendiente", "Descendiente"]
    }).then(answers => {
      if(answers.order == 'Acendiente') {
        play.getSongs().sort((a, b) => a.getAuthor().getName() > b.getAuthor().getName() ? -1 : 1);
      } else {
        play.getSongs().sort((a, b) => a.getAuthor().getName() < b.getAuthor().getName() ? -1 : 1);
      }
      let min: number = 0;
      let seg: number = 0;
      play.getSongs().forEach((item) => {
        min = Math.floor(item.getDuration()/60);
        seg = (item.getDuration()%60); 
        console.log(`-> ${item.getName()} - ${item.getAuthor().getName()} - ${min} min y ${seg} seg`);
      });
    });
  }

  /**
   * Ordena las canciones de una playlist en concreto segun la duracion de las mismas
   */
  sortSongByDuration(play: Playlist) {
    inquirer.prompt({
      type: 'list',
      name: 'order',
      message: 'Seleccione el orden: ',
      choices: ["Ascendiente", "Descendiente"]
    }).then(answers => {
      if(answers.order == 'Acendiente') {
        play.getSongs().sort((a, b) => a.getDuration() > b.getDuration() ? -1 : 1);
      } else {
        play.getSongs().sort((a, b) => a.getDuration() < b.getDuration() ? -1 : 1);
      }
      let min: number = 0;
      let seg: number = 0;
      play.getSongs().forEach((item) => {
        min = Math.floor(item.getDuration()/60);
        seg = (item.getDuration()%60); 
        console.log(`-> ${item.getName()} - ${item.getAuthor().getName()} - ${min} min y ${seg} seg`);
      });
    });
  }

  /**
   * Funcion que ordena la playlist por el genero de las canciones
   */
  sortSongByGender(play: Playlist) {
    inquirer.prompt({
      type: 'list',
      name: 'order',
      message: 'Seleccione el orden: ',
      choices: ["Ascendiente", "Descendiente"]
    }).then(answers => {
      if(answers.order == 'Acendiente') {
        this.genders.sort((a, b) => a.getMusicGender() > b.getMusicGender() ? -1 : 1);
      } else {
        this.genders.sort((a, b) => a.getMusicGender() < b.getMusicGender() ? -1 : 1);
      }
      let min: number = 0;
      let seg: number = 0;
      this.genders.forEach((gender) => {
        play.getSongs().forEach((item) => {
          item.getGenders().forEach((element) => {
            if(gender.getMusicGender() == element.getMusicGender()) {
              console.log(`-> ${gender.getMusicGender()}: `);
              min = Math.floor(item.getDuration()/60);
              seg = (item.getDuration()%60); 
              console.log(`\t <> ${item.getName()} - ${item.getAuthor().getName()} - ${min} min y ${seg} seg`);
              console.log();
            }
          });
        });
      });
    });
  }

  /**
   * Funcion que nos permite ordenas las canciones de una playlist en concreto seguin las reporducciones de las canciones
   */
  sortSongByRepro(play: Playlist) {
    inquirer.prompt({
      type: 'list',
      name: 'order',
      message: 'Seleccione el orden: ',
      choices: ["Ascendiente", "Descendiente"]
    }).then(answers => {
      if(answers.order == 'Acendiente') {
        play.getSongs().sort((a, b) => a.getRepro() > b.getRepro() ? -1 : 1);
      } else {
        play.getSongs().sort((a, b) => a.getRepro() < b.getRepro() ? -1 : 1);
      } 
      let min: number = 0;
      let seg: number = 0;
      play.getSongs().forEach((item) => {
        min = Math.floor(item.getDuration()/60);
        seg = (item.getDuration()%60); 
        console.log(`-> ${item.getName()} - ${item.getAuthor().getName()} - ${min} min y ${seg} seg`);
      });
    });
  }

  /**
   * Funcion que nos permitira crear un nueva playlist
   */
  createPlaylist() {
    let name: string = "";
    let songs: Song[] = [];
    //let user: string = "";

    inquirer.prompt({
      type: "input",
      name: "name",
      message: "Indique el nombre de la playlist: "
    }).then(answers => {
      name = answers.name;
      inquirer.prompt({
        type: "input",
        name: "songs",
        message: "Indique las canciones de la playlist separadas por coma + espacio: "
      }).then(answers => {
        let aux_songs: string = answers.songs;
        let songs_vec: string[] = aux_songs.split(", ", aux_songs.length);
        songs_vec.forEach((item) => {
          this.songs.forEach((item2) => {
            if (item == item2.getName()) {
              songs.push(item2);
            }
          });
        });
        this.playlists.push(new Playlist(name, songs, this.user_logged));
        write.Write("playlist", this.playlists);
        this.viewAllPlaylist();
      });
    });
  }
  
  /**
   * Funcion que nos permite borrar una playlist
   */
  deletePlaylist() {
    let user: string = "";
    let finded: boolean = false;

    inquirer.prompt({
      type: "input",
      name: "playlist",
      message: "Indique el nombre de la playlist a eliminar: "
    }).then(answers => {
      this.playlists.forEach((item, index) => {
        if(item.getName() == answers.playlist) {
          if(item.getUser() == this.user_logged) {
            finded = true;
            console.log("[ Eliminando la playlist... ]");
            this.playlists.splice(index, 1);
            console.log("Se ha eliminado playlist correctamente");
          }
        } else {
          finded = false;
        }
      });

      if(finded == false) {
        console.log('-> Posibles errores:');
        console.log('\t <> No Tiene permiso de eliminacion para la playlist especificada');
        console.log('\t <> No existe la playlist en la base de datos');
      }
    });
    
    write.Write('playlist', this.playlists);
  }

  findPlaylist(name: string): Playlist {
    let pos: number = 0;
    console.log(name);
    this.playlists.forEach((item, index) => {
      if(item.getName() == name) {
        pos = index;
      }
    });
    return this.playlists[pos];
  }
}