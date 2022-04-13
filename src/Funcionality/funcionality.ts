export { Funcionality };
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

/**
 * Opciones que se le daran al usuario con el Promt para que pueda relizar las diferentes funciones
 */
enum Options {
  songs = "Canciones",
  artist = "Artistas",
  group = "Grupos",
  albums = "Albumes"
}

/**
 * Cambios que podra hacer el usuario sobre cada opcion dada
 */
enum changes {
  add = "Añadir",
  delete = "Eliminar",
  show = "Mostrar",
  edit = "Modificar"
}

/**
 * Cada zona que se puede cambiar de una cancion
 */
enum optionsSong {
  name = "Nombre",
  author = "Autor",
  duration = "Duración",
  gender = "Genero",
  single = "¿Es un single?",
  repro = "Reproducciones"
}

/**
 * Funcionamiento de la practica dada, interaccion y busqueda por filtros de canciones, albums, artistas, grupos y generos musicales
 */
class Funcionality {
  /**
   * Clase que representara el funcionamiento de la practica
   * @param songs Lista de canciones
   * @param artist Lista de artistas
   * @param groups lista de grupos
   * @param albums Lista de albums
   * @param gender Lista de generos
   */
  constructor(private songs: Song[] = [], private artist: Artist[] = [],
              private groups: Group[] = [], private albums: Album[] = [],
              private gender: MusicGender[] = []){   
    this.songs = data.All_Songs
    this.artist = data.All_artist;
    this.groups = data.All_Group;
    this.albums = data.All_Albums;
    this.gender = data.All_Genders;
  }

  /**
   * Funcion start que iniciara el funcionamiento del prompt para el control por terminal del usuario
   * Eleccion de que quiere el usuario consultar: canciones, artistas, grupos o albums
   */
  start() {
    console.clear();
    inquirer.prompt({
      type: "list",
      name: "action",
      message: "Bienvenido a la biblioteca musical ¿Qué desea consultar?",
      choices: Object.values(Options)

    }).then(answers => {
      switch (answers["action"]) {
        case Options.songs:
          this.optionSongs();
          break;

        case Options.artist:
          this.optionArtist();
          break;

        case Options.group:
          this.optionGroup();
          break;

        case Options.albums:
          this.optionAlbums();
          break;        
      }
    });
  }

  /**
   * Funcion que prefunta al usuario los datos necesarios para crear una nueva cancion y añadirla a la base de datos
   */
  addSong() {
    let name: string = "";
    let artist: string = "";
    let duration: number = 0;
    let gender: string = "";
    let single: boolean = false;
    let repro: number = 0;

    console.clear();

    inquirer.prompt({
      type: "input",
      name: "nombre",
      message: "Introduzca el nombre de la canción: "
    }).then(answers => {
      name = answers.nombre;
      inquirer.prompt({
        type: "input",
        name: "artista",
        message: "Introduzca el artista al que pertenece la canción: "
      }).then(answers => {
        artist = answers.artista;
        inquirer.prompt({
          type: "input",
          name: "duracion",
          message: "Introduzca la duración de la canción: "
        }).then(answers => {
          duration = answers.duracion;
          inquirer.prompt({
            type: "input",
            name: "genero",
            message: "Introduzca el genero de la canción: "
          }).then(answers => {
            gender = answers.genero;
            inquirer.prompt({
              type: "list",
              name: "isSingle",
              message: "¿Es la cancion un single?: ",
              choices: ["Sí", "No"]
            }).then(answers => {
              if (answers.isSingle == "Sí") {
                single = true;
              }
              inquirer.prompt({
                type: "input",
                name: "reproducciones",
                message: "Introduzca el numero de reproducciones de la canción: "
              }).then(answers => {
                repro = answers.reproducciones;
                this.songs.push(new Song(name, this.findArtist(artist), duration, [this.findGender(gender)], single, repro));
                console.log("Se ha añadido correctamente la canción");
                write.Write("song", this.songs);
                this.sortSongs();
              });
            });
          });
        });
      });
    });
    
  }

  /**
   * Funcion que a traves de la interacion del usuario crea y añade un nuevo artista a la base de datos
   */
  addArtist() {
    let name: string = "";
    let genders: MusicGender[] = [];
    let avg_m: number = 0;

    inquirer.prompt({
      type: "input",
      name: "nombre",
      message: "Introduzca el nombre del artista: "
    }).then(answers => {
      name = answers.nombre;
      inquirer.prompt({
        type: "input",
        name: "genero",
        message: "Introduzca el genero del artista (si son varios sepárelos por coma + espacio): "
      }).then(answers => {
        let aux_string: string = answers.genero;
        let aux_vec: string[] = aux_string.split(", ", aux_string.length);
        aux_vec.forEach((item) => {
          this.gender.forEach((item2) => {
            if (item == item2.getMusicGender()) {
              genders.push(new MusicGender(item));
            }
          });
        });
        inquirer.prompt({
          type: "input",
          name: "avg",
          message: "Introduzca el numero de reproducciones que tiene el artista: "
        }).then(answers => {
          avg_m = answers.avg;
          this.artist.push(new Artist(name, genders, avg_m));
          console.log("Se ha añadido correctamente el artista");
          write.Write("artist", this.artist);
          this.sortArtist();
        });
      });
    });
    
  }

  /**
   * Funcion que utiliza la interaccion con el usuario para añadir un nuev grupo musical 
   */
  addGroup() {
    let name: string = "";
    let genders: MusicGender[] = [];
    let avg_m: number = 0;
    let band: Artist[] = [];

    inquirer.prompt({
      type: "input",
      name: "nombre",
      message: "Introduzca nombre del grupo: "
    }).then(answers => {
      inquirer.prompt({
        type: "input",
        name: "genero",
        message: "Introduzca el genero de la banda (si son varios sepárelos por coma + espacio): "
      }).then(answers => {
        let aux_string: string = answers.genero;
        let aux_vec: string[] = aux_string.split(", ", aux_string.length);
        aux_vec.forEach((item) => {
          this.gender.forEach((item2) => {
            if (item == item2.getMusicGender()) {
              genders.push(new MusicGender(item));
            }
          });
        });


      });
    });
  }

  /**
   * Funcion que utiliza la interaccion del usuario para crear un nuevo album de musica en la base de datos
   */
  addAlbum() {
    let name: string = '';
    
  }
  
  /**
   * Funcion que utiliza la interaccion con el usuario para añadir un nuevo genero musical a la base de datos
   */
  addGender() {
    let aux: string = "";
    
  }

  /**
   * Función que a traves de un string, busca y retorna la cancion buscada
   * @param aux string con el que se realizará la busqueda
   * @returns Song
   */
  findSong(aux: string): Song {
    let pos: number = 0;
    this.songs.forEach((item, index) => {
      if(item.getName() == aux) {
        pos = index;
      }
    });

    return this.songs[pos];
  }

  /**
   * Funcion que buscara un album a travez de una string dada por el usuario que tendra que ser igual a el nombre del album
   * @param aux string para realizar la busqueda
   * @returns Album
   */
  findAlbum(aux: string): Album {
    let pos: number = 0;
    this.albums.forEach((item, index) => {
      if(item.getName() == aux){
        pos = index;
      }
    })
    return this.albums[pos];
  }

  /**
   * Funcion que a traves de un string busca y retorna un Genero musical en especifico
   * @param aux string a buscar
   * @returns MusicGender
   */
  findGender(aux: string): MusicGender {
    let pos: number = 0;
    this.gender.forEach((item, index) => {
      if(item.getMusicGender() == aux) {
        pos = index;
      }
    });
    return this.gender[pos];
  }

  /**
   * Funcion que buscara un artista a travez de una string dada por el usuario que tendra que ser igual que el nombre del artista
   * @param aux string para llevar a cabo la busqueda del artista
   * @reutrns Artist
   */
  findArtist(aux: string): Artist {
    let pos: number = 0;
    this.artist.forEach((item, index) => {
      if(item.getName() == aux) {
        pos = index;
      }
    });
    
    return this.artist[pos];
  }

  /**
   * Busca mediante la utilización de un string para retornar el grupo que se necesita
   * @param aux string sobre el que se va a buscar el grupo
   * @returns Group
   */
  findGroup(aux: string): Group {
    let aux2: number = 0;
    this.groups.forEach((item, index) => {
       if(item.getName() == aux){
         aux2 = index;
       }
      });
      return this.groups[aux2];
  } 

  /**
   * Funcion que nos permite eliminar una cancion dado los parametros del usuario
   */
  deleteSong() {
    let song_name: string = "";
    let del: boolean = false;

    inquirer.prompt({ 
      type: "input", 
      name: "newName",
      message: "Introduzca el nombre de la canción a eliminar: "
    }).then(answers => {
      song_name = answers.newName;
      
      this.songs.forEach((item, index) => {
        if(item.getName() == song_name) {
          this.songs.splice(index, 1);
          del = true;
        }
      });


      if(del) {
        console.log("Se ha eliminado correctamente la canción");
        write.Write("song",this.songs);
      } else {
        console.log("La cancion que ha ingresado no existe en la base de datos");
      }
    });
  }

  /**
   * Funcion que nos permite eliminar un artista con los parametros dado por el usuario
   */
  deleteArtist() {
    let artist_name: string = "";
    let del: boolean = false;

    inquirer.prompt({ 
      type: "input", 
      name: "newName",
      message: "Introduzca el nombre del Artista a eliminar: "
    }).then(answers => {
      artist_name = answers.newName;

      this.artist.forEach((item, index) => {
        if(item.getName() == artist_name) {
          this.artist.splice(index, 1);
          del = true;
        }
      });


      if(del) {
        console.log("Se ha eliminado correctamente el artista");
        write.Write("artist", this.artist);
      } else {
        console.log("El Artista que ha ingresado no existe en la base de datos");
      }
    });
  }

  /**
   * Funcion que eliminina un grupo de la base de datos
   */
  deleteGroup() {
    let group_name: string = "";
    let del: boolean = false;

    inquirer.prompt({ 
      type: "input", 
      name: "newName",
      message: "Introduzca el nombre del grupo a eliminar: "
    }).then(answers => {
      group_name = answers.newName;

      this.groups.forEach((item, index) => {
        if(item.getName() == group_name) {
          this.groups.splice(index, 1);
          del = true;
        }
      });


      if(del) {
        console.log("Se ha eliminado correctamente el grupo");
        write.Write("group",this.groups);
      } else {
        console.log("El grupo que ha ingresado no existe en la base de datos");
      }
    });
  }

  /**
   * Funcion que elimina un album dado las opciones del usuario de la base de datos
   */
  deleteAlbum() {
    let album_name: string = "";
    let del: boolean = false;

    inquirer.prompt({ 
      type: "input", 
      name: "newName",
      message: "Introduzca el nombre del album a eliminar: "
    }).then(answers => {
      album_name = answers.newName;

      this.albums.forEach((item, index) => {
        if(item.getName() == album_name) {
          this.albums.splice(index, 1);
          del = true;
        }
      });


      if(del) {
        console.log("Se ha eliminado correctamente el album");
        write.Write("albums",this.albums);
      } else {
        console.log("El album que ha ingresado no existe en la base de datos");
      }
    });
  }

  /**
   * Funcion que nos permite editar los parametros de: Nombre, autor, duracion, genero, si es un single, reproduccion, en general el parametro que el usuario quiera cambiar de una cancion
   */
  editSong() {
    let find_name: string = "";
    let aux_song: Song;

    inquirer.prompt({
      type: "input",
      name: "edit",
      message: "Introduzca el nombre de la cancion que desea editar: ",
    }).then(answers => {
      find_name = answers.edit;
      aux_song = this.findSong(find_name);
      inquirer.prompt({
        type: "list",
        name: "edit2",
        message: "¿Qué desea cambiar de la cancion?: ",
        choices: Object.values(optionsSong)
      }).then(answers => {
        switch (answers["edit2"]) {
          case optionsSong.name:
            inquirer.prompt({
              type: "input",
              name: "nombre",
              message: "Indique el nuevo nombre: ",
            }).then(answers => {
              this.songs.forEach((item) => {if(item.getName() == find_name) item.setName(answers.nombre)});
              //aux_song.setName(answers.nombre);
              console.log("Se ha editado el nombre de la canción correctamente");
              write.Write("song", this.songs);
              this.sortSongs();
            });
            break;

          case optionsSong.author:
            inquirer.prompt({
              type: "input",
              name: "author",
              message: "Indique el nuevo autor: ",
            }).then(answers => {
              let del: boolean = false;
              data.All_Group.forEach((item) => {if(item.getName() == answers.author){aux_song.setAuthor(item); del = true}});
              data.All_artist.forEach((item) => {if(item.getName() == answers.author){aux_song.setAuthor(item); del = true}});
              this.songs.forEach((item) => {if(item.getName() == aux_song.getName()) item.setAuthor(aux_song.getAuthor())});
              if(del) {
                console.log("Se ha editado el autor de la canción correctamente");
              } else {
                console.log("No existe en la base de datos el Autor que ha especificado");
              }
              write.Write("song", this.songs);
              this.sortSongs();
            });
            break;

          case optionsSong.duration:
            inquirer.prompt({
              type: "input",
              name: "duration",
              message: "Indique la nueva duración: ",
            }).then(answers => {
              this.songs.forEach((item) => {if(item.getName() == find_name) item.setDuration(answers.duration)});
              console.log("Se ha editado la duración de la canción correctamente");
              write.Write("song", this.songs);
              this.sortSongs();
            });
            break;

          case optionsSong.gender:
            inquirer.prompt({
              type: "input",
              name: "gender",
              message: "Indique el nuevo genero: ",
            }).then(answers => {
              this.songs.forEach((item) => {
                if(item.getName() == find_name){
                  data.All_Genders.forEach((gender) => {if(gender.getMusicGender() == answers.gender) item.setGenders([gender])});
                }});
              //aux_song.setGenders(new MusicGender(answers.gender));
              console.log("Se ha editado el género de la canción correctamente");
              write.Write("song", this.songs);
              this.sortSongs();
            });
            break;

          case optionsSong.single:
            inquirer.prompt({
              type: "list",
              name: "single",
              message: "Indique si quiere que sea un single: ",
              choices: ["Sí", "No"]
            }).then(answers => {
              this.songs.forEach((item) => {
                if(item.getName() == find_name) {
                  if(answers.single == 'Sí') {
                    item.setSingle(true);
                  } else {
                    item.setSingle(false);
                  }
                }
              });
              console.log("Se ha editado la característica de single de la canción correctamente");
              write.Write("song", this.songs);
              this.sortSongs();
            });
            break;

          case optionsSong.repro:
            inquirer.prompt({
              type: "input",
              name: "repro",
              message: "Indique el nuevo número de reproducciones: "
            }).then(answers => {
              this.songs.forEach((item) => {if(item.getName() == find_name) item.setRepro(answers.repro)});
              console.log("Se han editado las reproducciones de la canción correctamente");
              write.Write("song", this.songs);
              this.sortSongs();
            });
            break;
        } 
      });
    });
    

  }

  /**
   * Funcion que permite al usuario editar un artista de la base de datos
   */
  editArtist() {

  }
  
  /**
   * Funcion que permite el usuario editar un grupo musical de la base de datos
   */
  editGroup() {

  }

  /**
   * Funcion que permite editar un album de la base de datos
   */
  editAlbum(){

  }

  /**
   * Funcion que muestra la lista ordenada en ordesn ascendiente o descendente dependiendo de lo que quiera el usuario y tambien mostrando ls canciones que son single o no
   */
  sortSongs() {
    inquirer.prompt({
      type: "list",
      name: "order",
      message: "¿En que orden quiere ver la lista de canciones?: ",
      choices: ["Ascendiente", "Descendiente"]
    }).then(answers => {
      if (answers.order == "Ascendiente") {
        // Ascendientes
        this.songs.sort((a, b) => a.getName() < b.getName() ? -1 : 1);
      } else {
        // Descendientes
        this.songs.sort((a, b) => a.getName() > b.getName() ? -1 : 1);
      }
      inquirer.prompt({
        type: "list",
        name: "unicSingle",
        message: "¿Quiere ver unicamente los single?: ",
        choices: ["Sí", "No"]
      }).then(answers => {
        if (answers.unicSingle == "Sí") {
          this.songs.forEach((item) => {
            if (item.getSingle()) {
              console.log(`-> ${item.getName()} - ${item.getAuthor().getName()}`);
            }
          });
        } else {
          this.songs.forEach((item) => {
            console.log(`-> ${item.getName()} - ${item.getAuthor().getName()}`);
          });
        }
      });
    });
  }

  /**
   * Ordena y muestra ordenado las albums
   */
  sortAlbums() {
    
  }

  /**
   * Ordena y muestra con la ordenacion los Artistas
   */
  sortArtist() {
    this.artist.sort((a, b) => a.getName() < b.getName() ? -1 : 1);

    let genders: MusicGender[] = [];
    let printable_genders: string[] = [];
    let printable_string: string = "";

    this.artist.forEach((item) => {
      genders = [];
      printable_genders = [];
      printable_string = "";

      genders = item.getGenders();
      
      genders.forEach((item2) => {
        printable_genders.push(item2.getMusicGender());
      });

      printable_string = item.getName();
      printable_string += " - ";
      
      printable_genders.forEach((item3) => {
        printable_string += item3;
      });
      
      console.log(`${printable_string}`);
    });
  }
  
  /**
   * Muestra las opciones con las que podemos consultar las canciones
   */
  optionSongs() {
    console.clear();
    inquirer.prompt({
      type: "list",
      name: "songs",
      message: "Seleccione la acción que desea aplicar a la lista de canciones: ",
      choices: Object.values(changes)

    }).then(answers => {
      switch (answers["songs"]) {
        case changes.add:
          this.addSong();
          break;

        case changes.delete:
          this.deleteSong();
          break;

        case changes.edit:
          this.editSong();
          break;

        case changes.show:
          this.sortSongs();
          break;        
      }

    });
  }

  /**
   * Mustra las opciones que se pueden consultar de los artistas
   */
  optionArtist() {
    console.clear();
    inquirer.prompt({
      type: "list",
      name: "artist",
      message: "Seleccione la acción que desea aplicar a la lista de canciones: ",
      choices: Object.values(changes)

    }).then(answers => {
      switch (answers["artist"]) {
        case changes.add:
          this.addArtist();
          break;

        case changes.delete:
          this.deleteArtist();
          break;

        case changes.edit:
          this.editArtist();
          break;

        case changes.show:
          this.sortArtist();
          break;        
      }

    });
  }

  /**
   * Muestra las opciones con las que se pueden consultar a los grupos
   */
  optionGroup() {
    console.clear();
    inquirer.prompt({
      type: "list",
      name: "group",
      message: "Seleccione la acción que desea aplicar a la lista de canciones: ",
      choices: Object.values(changes)

    }).then(answers => {
      switch (answers["group"]) {
        case changes.add:
          this.addGroup();
          break;

        case changes.delete:
          this.deleteGroup();
          break;

        case changes.edit:
          this.editGroup();
          break;

        case changes.show:
          //this.sortGroup();
          break;        
      }

    });
  }

  /**
   * Muestra las opciones con las que podemos consultar los albums
   */
  optionAlbums() {
    console.clear();
    inquirer.prompt({
      type: "list",
      name: "albums",
      message: "Seleccione la acción que desea aplicar a la lista de canciones: ",
      choices: Object.values(changes)

    }).then(answers => {
      switch (answers["albums"]) {
        case changes.add:
          this.addAlbum();  
          break;

        case changes.delete:
          this.deleteAlbum();
          break;

        case changes.edit:
          //this.editAlbum();
          break;

        case changes.show:
          this.sortAlbums();
          break;        
      }

    });
  }

}
let funct: Funcionality = new Funcionality();
funct.start();