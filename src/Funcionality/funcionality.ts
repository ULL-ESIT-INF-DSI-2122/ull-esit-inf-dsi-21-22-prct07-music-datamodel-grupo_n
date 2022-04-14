export { Funcionality };
import * as inquirer from 'inquirer';
import { Album } from '../Basic_class/album';
import { Artist } from '../Basic_class/artist';
import { Group } from '../Basic_class/group';
import { MusicGender } from '../Basic_class/music_gender';
import { Song } from '../Basic_class/song';
import * as read from '../Data/read';
import * as data from '../Data/data';
import * as write from '../Data/write';

/**
 * Opciones que se le daran al usuario con el Promt para que pueda relizar las diferentes funciones
 */
enum Options {
  songs = "Canciones",
  artist = "Artistas",
  group = "Grupos",
  albums = "Albumes",
  gender = "Generos"
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

enum optionsArtist {
  name = "Nombre",
  genders = "Genero",
  avg_m = "Reproducciones"
}

enum optionGroups {
  name = "Nombre",
  band = "Integrantes",
  genders = "Genero",
  avg_m = "Reproducciones"
}

enum optionsAlbum {
  name = "Nombre",
  year = "Año de lanzamiento",
  genders = "Genero",
  songs = "Canciones"
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
    this.songs =  data.All_Songs;          //read.ReadSong();
    this.gender = data.All_Genders;        //read.ReadMusicGender();
    this.artist = data.All_artist;         //read.ReadArtist();
    this.albums = data.All_Albums;         //read.ReadAlbum();
    this.groups = data.All_Group;          //read.ReadGroup();
  }

  /**
   * Funcion start que iniciara el funcionamiento del prompt para el control por terminal del usuario
   * Eleccion de que quiere el usuario consultar: canciones, artistas, grupos o albums
   */
  start() {
    console.clear();
    inquirer.prompt({
      type: "list",
      name: "default",
      message: "Bienvenido a la biblioteca musical. ¿Desea iniciar una biblioteca por defecto?",
      choices: ["Sí", "No"]
    }).then(answers => {
      if (answers.default == "Sí") {
        this.songs = data.All_Songs;
        this.artist = data.All_artist;
        this.groups = data.All_Group;
        this.albums = data.All_Albums;
        this.gender = data.All_Genders;
      } 
      inquirer.prompt({
        type: "list",
        name: "action",
        message: "¿Qué datos de la biblioteca desea consultar?",
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
          
          case Options.gender:
            this.optionGender();
            break;
        }
      });
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
      name = answers.nombre;
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
              genders.push(item2);
            }
          });
        });
        inquirer.prompt({
          type: "input",
          name: "band",
          message: "Introduzca los artistas del grupo (separados por coma + espacio): "
        }).then(answers => {
          let aux_string2: string = answers.band;
          let aux_vec2: string[] = aux_string2.split(", ", aux_string2.length); 
          aux_vec2.forEach((item2) => {
            band.push(this.findArtist(item2));
          });
          inquirer.prompt({
            type: "input",
            name: "avg",
            message: "Introduzca las reproducciones mensuales del grupo: "
          }).then(answers => {
            avg_m = answers.avg;
            this.groups.push(new Group(name, band, genders, avg_m));
            console.log("Se ha añadido correctamente el grupo");
            write.Write("group", this.groups);
            this.sortGroups();
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
    let year: number = 0;
    let genders: MusicGender[] = [];
    let album_songs: Song[] = [];

    inquirer.prompt({
      type: "input",
      name: "name",
      message: "Introduzca el nombre del nuevo album: "
    }).then(answers => {
      name = answers.name;
      inquirer.prompt({
        type: "input",
        name: "year",
        message: "Introduzca el año de lanzamiento del nuevo album: "
      }).then(answers => {
        year = answers.year;
        inquirer.prompt({
          type: "input",
          name: "genders",
          message: "Introduzca el genero del album (si son varios sepárelos por coma + espacio): "
        }).then(answers => {
          let aux_string: string = answers.genders;
          let aux_vec: string[] = aux_string.split(", ", aux_string.length);
          aux_vec.forEach((item) => {
            this.gender.forEach((item2) => {
              if (item == item2.getMusicGender()) {
                genders.push(item2);
              }
            });
          });
          inquirer.prompt({
            type: "input",
            name: "songs",
            message: "Introduzca las canciones del album separadas por coma + espacio: "
          }).then(answers => {
            let aux_answer: string = answers.songs;
            let aux_songs: string[] = aux_answer.split(", ", aux_answer.length);
            aux_songs.forEach((item) => {
              this.songs.forEach((element) => {
                if (item == element.getName()) {
                  album_songs.push(element);
                }
              });
            });
            this.albums.push(new Album(name, year, genders, album_songs));
            console.log("Se ha añadido correctamente el album");
            write.Write("albums", this.albums);
            this.sortAlbums();
          });
        });
      });
    });
  }
  
  /**
   * Funcion que utiliza la interaccion con el usuario para añadir un nuevo genero musical a la base de datos
   */
  addGender() {
    inquirer.prompt({
      type: "input",
      name: "gender",
      message: "Introduzca el nombre del nuevo género: "
    }).then(answers => {
      this.gender.push(new MusicGender(answers.gender));
      console.log("Se ha añadido correctamente el género");
      write.Write("genders", this.gender);
      this.sortGender();
    });
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
        write.Write("song", this.songs);
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
        write.Write("group", this.groups);
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
        write.Write("albums", this.albums);
      } else {
        console.log("El album que ha ingresado no existe en la base de datos");
      }
    });
  }

  /**
   * Funcion que nos permite eliminar generos de la base de datos
   */
  deleteGender() {
    let del: boolean = false;

    inquirer.prompt({ 
      type: "input", 
      name: "name",
      message: "Introduzca el nombre del genero a eliminar: "
    }).then(answers => {  
      this.gender.forEach((item, index) => {
        if (item.getMusicGender() == answers.name) {
          this.gender.splice(index, 1);
          del = true;
        }
      });

      if(del) {
        console.log("Se ha eliminado correctamente el genero");
        write.Write("genders", this.gender);
      } else {
        console.log("El genero que ha ingresado no existe en la base de datos");
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
      if (aux_song != undefined) {
        console.log("[ Se encontró la canción a editar... ]");
      } else {
        console.log("No se pudo encontrar la canción");
      }
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
              message: "Indique el nuevo nombre de la canción: ",
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
    let artist_name: string;
    let aux_artist: Artist;
    let genders: MusicGender[] = [];

    inquirer.prompt({
      type: "input",
      name: "artist",
      message: "Indique el artista que desea editar: "
    }).then(answers => {
      artist_name = answers.artist;
      aux_artist = this.findArtist(artist_name);
      if (aux_artist != undefined) {
        console.log("[ Se encontró el artista a editar... ]");
      } else {
        console.log("No se pudo encontrar al artista");
      }
      inquirer.prompt({
        type: "list",
        name: "options",
        message: "¿Qué desea cambiar del artista?: ",
        choices: Object.values(optionsArtist)
      }).then(answers => {
        switch (answers["options"]) {
          case optionsArtist.name:
            inquirer.prompt({
              type: "input",
              name: "nombre",
              message: "Indique el nuevo nombre del artista: ",
            }).then(answers => {
              this.artist.forEach((item) => {
                if(item.getName() == artist_name) 
                  item.setName(answers.nombre)
              });
              console.log("Se ha editado el nombre del artista correctamente");
              write.Write("artist", this.artist);
              this.sortArtist();
            });
            break;

          case optionsArtist.genders:
            inquirer.prompt({
              type: "input",
              name: "genders",
              message: "Indique el nuevo género del artista (si son varios sepárelos por coma + espacio): ",
            }).then(answers => {
              let genders_string: string = answers.genders;
              let genders_vec: string[] = genders_string.split(", ", genders_string.length);
              genders_vec.forEach((item) => {
                this.gender.forEach((item2) => {
                  if (item == item2.getMusicGender()) {
                    genders.push(item2);
                  }
                });
              });
              this.artist.forEach((item) => {
                if(item.getName() == artist_name) 
                  item.setGenders(genders);
              });
              console.log("Se ha editado los generos del artista correctamente");
              write.Write("artist", this.artist);
              this.sortArtist();
            });
            break;

          case optionsArtist.avg_m:
            inquirer.prompt({
              type: "input",
              name: "avg",
              message: "Indique el nuevo numero de reproducciones del artista: ",
            }).then(answers => {
              this.artist.forEach((item) => {
                if(item.getName() == artist_name) 
                  item.setAvg_Monthly(answers.avg)
              });
              console.log("Se han editado las reproducciones del artista correctamente");
              write.Write("artist", this.artist);
              this.sortArtist();
            });
            break;      
        }
      });
    });
  }
  
  /**
   * Funcion que permite el usuario editar un grupo musical de la base de datos
   */
  editGroup() {
    let group_name: string;
    let aux_group: Group;
    let genders: MusicGender[] = [];
    let members: Artist[] = [];

    inquirer.prompt({
      type: "input",
      name: "group",
      message: "Indique el grupo que desea editar: "
    }).then(answers => {
      group_name = answers.group;
      aux_group = this.findGroup(group_name);
      if (aux_group != undefined) {
        console.log("[ Se encontró el grupo a editar... ]");
      } else {
        console.log("No se pudo encontrar el grupo");
      }
      inquirer.prompt({
        type: "list",
        name: "options",
        message: "¿Qué desea cambiar del grupo?: ",
        choices: Object.values(optionGroups)
      }).then(answers => {
        switch (answers["options"]) {
          case optionGroups.name:
            inquirer.prompt({
              type: "input",
              name: "nombre",
              message: "Indique el nuevo nombre del grupo: ",
            }).then(answers => {
              this.groups.forEach((item) => {
                if(item.getName() == group_name) 
                  item.setName(answers.nombre)
              });
              console.log("Se ha editado el nombre del grupo correctamente");
              write.Write("group", this.groups);
              this.sortGroups();
            });
            break;

          case optionGroups.band:
            inquirer.prompt({
              type: "input",
              name: "members",
              message: "Indique los nuevos integrantes del grupo (si son varios sepárelos por coma + espacio): ",
            }).then(answers => {
              let members_string: string = answers.members;
              let members_vec: string[] = members_string.split(", ", members_string.length);
              members_vec.forEach((item) => {
                this.artist.forEach((item2) => {
                  if (item == item2.getName()) {
                    members.push(item2);
                  }
                });
              });
              this.groups.forEach((item) => {
                if(item.getName() == group_name) 
                  item.setBand(members);
              });
              console.log("Se ha editado los generos del grupo correctamente");
              write.Write("group", this.groups);
              this.sortGroups();
            });
            break;

          case optionGroups.genders:
            inquirer.prompt({
              type: "input",
              name: "genders",
              message: "Indique el nuevo género del grupo (si son varios sepárelos por coma + espacio): ",
            }).then(answers => {
              let genders_string: string = answers.genders;
              let genders_vec: string[] = genders_string.split(", ", genders_string.length);
              genders_vec.forEach((item) => {
                this.gender.forEach((item2) => {
                  if (item == item2.getMusicGender()) {
                    genders.push(item2);
                  }
                });
              });
              this.groups.forEach((item) => {
                if(item.getName() == group_name) 
                  item.setGender(genders);
              });
              console.log("Se ha editado los generos del grupo correctamente");
              write.Write("group", this.groups);
              this.sortGroups();
            });
            break;

          case optionGroups.avg_m:
            inquirer.prompt({
              type: "input",
              name: "avg",
              message: "Indique el nuevo numero de reproducciones del grupo: ",
            }).then(answers => {
              this.groups.forEach((item) => {
                if(item.getName() == group_name) 
                  item.setAvgMonthy(answers.avg)
              });
              console.log("Se han editado las reproducciones del grupo correctamente");
              write.Write("group", this.groups);
              this.sortGroups();
            });
            break;
          
        }
       
      });
    });
  }

  /**
   * Funcion que permite editar un album de la base de datos
   */
  editAlbum() {
    // name, year, genders, songs
    let album_name: string;
    let aux_album: Group;
    let genders: MusicGender[] = [];
    let songs: Song[] = [];

    inquirer.prompt({
      type: "input",
      name: "album",
      message: "Indique el album que desea editar: ",
    }).then(answers => {
      album_name = answers.album;
      aux_album = this.findGroup(album_name);
      if (aux_album != undefined) {
        console.log("[ Se encontró el album a editar... ]");
      } else {
        console.log("No se pudo encontrar el album");
      }
      inquirer.prompt({
        type: "list",
        name: "options",
        message: "¿Qué desea cambiar del album?: ",
        choices: Object.values(optionsAlbum)
      }).then(answers => {
        switch (answers["options"]) {
          case optionsAlbum.name:
            inquirer.prompt({
              type: "input",
              name: "nombre",
              message: "Indique el nuevo nombre del album: ",
            }).then(answers => {
              this.albums.forEach((item) => {
                if(item.getName() == album_name) 
                  item.setName(answers.nombre)
              });
              console.log("Se ha editado el nombre del album correctamente");
              write.Write("albums", this.albums);
              this.sortAlbums();
            });
            break;

          case optionsAlbum.year:
            inquirer.prompt({
              type: "input",
              name: "year",
              message: "Indique el nuevo año de lanzamiento del album: ",
            }).then(answers => {
              this.albums.forEach((item) => {
                if(item.getName() == album_name) 
                  item.setYear(answers.year)
              });
              console.log("Se han editado el año de lanzamiento del album correctamente");
              write.Write("albums", this.albums);
              this.sortAlbums();
            });
            break;
        
          case optionsAlbum.genders:
            inquirer.prompt({
              type: "input",
              name: "genders",
              message: "Indique el nuevo géneros del album (si son varios sepárelos por coma + espacio): ",
            }).then(answers => {
              let genders_string: string = answers.genders;
              let genders_vec: string[] = genders_string.split(", ", genders_string.length);
              genders_vec.forEach((item) => {
                this.gender.forEach((item2) => {
                  if (item == item2.getMusicGender()) {
                    genders.push(item2);
                  }
                });
              });
              this.albums.forEach((item) => {
                if(item.getName() == album_name) 
                  item.setGender(genders);
              });
              console.log("Se ha editado los generos del album correctamente");
              write.Write("albums", this.albums);
              this.sortAlbums();
            });
            break;

          case optionsAlbum.songs:
            inquirer.prompt({
              type: "input",
              name: "songs",
              message: "Indique las nuevas canciones del album (si son varios sepárelos por coma + espacio): ",
            }).then(answers => {
              let songs_string: string = answers.songs;
              let songs_vec: string[] = songs_string.split(", ", songs_string.length);
              songs_vec.forEach((item) => {
                this.songs.forEach((item2) => {
                  if (item == item2.getName()) {
                    songs.push(item2);
                  }
                });
              });
              this.albums.forEach((item) => {
                if(item.getName() == album_name) 
                  item.setAlbumSongs(songs);
              });
              console.log("Se ha editado las canciones del album correctamente");
              write.Write("albums", this.albums);
              this.sortAlbums();
            });
            break;
        }
      });
    });
  }

  /**
   * Funcion que permite editar los generos de la base de datos
   */
  editGender() {
    let gender_name: string;
    let aux_gender: MusicGender;

    inquirer.prompt({
      type: "input",
      name: "gender",
      message: "Indique el genero que desea editar: "
    }).then(answers => {
      gender_name = answers.gender;
      aux_gender = this.findGender(gender_name);
      if (aux_gender != undefined) {
        console.log("[ Se encontró el genero a editar... ]");
      } else {
        console.log("No se pudo encontrar el genero");
      }
      inquirer.prompt({
        type: "input",
        name: "gendername",
        message: "Indique el nuevo nombre del genero: "
      }).then(answers => {
        this.gender.forEach((item) => {
          if(item.getMusicGender() == gender_name) 
            item.setMusicGender(answers.gendername);
        });
        console.log("Se ha editado el nombre del genero correctamente");
        write.Write("genders", this.gender);
        this.sortGender();
      });
    });
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
    //hay que preguntar si quiere hacer sort por nombre o por año de lanzamiento
    let order: boolean = false; // True = ascendiente, False = descendiente
    inquirer.prompt({
      type: "list",
      name: "order",
      message: "¿En que orden quiere ver la lista de albumes?: ",
      choices: ["Ascendiente", "Descendiente"]
    }).then(answers => {
      if (answers.order == "Ascendiente") {
        order = true;
      } else {
        order = false;
      }
      inquirer.prompt({ 
        type: "list",
        name: "sort",
        message: "¿Cómo desea organizar los albumes?: ",
        choices: ["Por nombre", "Por año de lanzamiento"]
      }).then(answers => {
        if (answers.sort == "Por nombre") {
          if (order) { // Ascendiente
            this.albums.sort((a, b) => a.getName() < b.getName() ? -1 : 1);
          } else { // Descendiente
            this.albums.sort((a, b) => a.getName() > b.getName() ? -1 : 1);
          }
        } else {
          if (order) { // Ascendiente
            this.albums.sort((a, b) => a.getYear() < b.getYear() ? -1 : 1);
          } else { // Descendiente
            this.albums.sort((a, b) => a.getYear() > b.getYear() ? -1 : 1);
          }
        }

        this.albums.forEach((item) => {
          console.log(`-> ${item.getName()} ( ${item.getYear()} ) `);
        });
      });
    });
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
        printable_string += ' ';
      });
      
      console.log(`${printable_string}`);
    });
  }

  /**
   * Ordena y muestra con la ordenacion de grupos 
   */
  sortGroups() {
    this.groups.sort((a, b) => a.getName() < b.getName() ? -1 : 1);

    let genders: MusicGender[] = [];
    let printable_genders: string[] = [];
    let printable_string: string = "";

    this.groups.forEach((item) => {
      genders = [];
      printable_genders = [];
      printable_string = "";

      genders = item.getGender();
      
      genders.forEach((element) => {
        printable_genders.push(element.getMusicGender());
      });

      printable_string = item.getName();
      printable_string += " - ";

      printable_genders.forEach((element) => {
        printable_string += element;
        printable_string += " ";
      });

      console.log(`${printable_string}`);
    });
  }

  /**
   * Funcion que nos permite ordenar los generos musicales de la base de datos
   */
  sortGender() {
    this.gender.sort((a, b) => a.getMusicGender() < b.getMusicGender() ? -1 : 1);

    this.gender.forEach((item) => {
      console.log(`${item.getMusicGender()}`);
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
      message: "Seleccione la acción que desea aplicar a los artistas: ",
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
      message: "Seleccione la acción que desea aplicar a los grupos: ",
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
          this.sortGroups();
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
      message: "Seleccione la acción que desea aplicar a los albumes: ",
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
          this.editAlbum();
          break;

        case changes.show:
          this.sortAlbums();
          break;        
      }

    });
  }

  optionGender() {
    console.clear();
    inquirer.prompt({
      type: "list",
      name: "genders",
      message: "Seleccione la acción que desea aplicar a los géneros: ",
      choices: Object.values(changes)

    }).then(answers => {
      switch (answers["genders"]) {
        case changes.add:
          this.addGender();  
          break;

        case changes.delete:
          this.deleteGender();
          break;

        case changes.edit:
          this.editGender();
          break;

        case changes.show:
          this.sortGender();
          break;        
      }

    });
  }
}