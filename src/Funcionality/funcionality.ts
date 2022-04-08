export { Funcionality };
import * as inquirer from 'inquirer';
import { Album } from '../Basic_class/album';
import { Artist } from '../Basic_class/artist';
import { Group } from '../Basic_class/group';
import { MusicGender } from '../Basic_class/music_gender';
import { Playlist } from '../Basic_class/playlist';
import { Song } from '../Basic_class/song';
import { SchemaInterface } from '../Data/write';
import * as read from '../Data/read';
import * as data from '../Data/data';
import * as write from '../Data/write';

console.log('Gestion Avanzada [Music database]');

enum Options {
  songs = "Canciones",
  artist = "Artistas",
  group = "Grupos",
  albums = "Albumes"
}

enum changes {
  add = "Añadir",
  delete = "Eliminar",
  show = "Mostrar",
  edit = "Modificar"
}

enum optionsSong {
  name = "Nombre",
  author = "Autor",
  duration = "Duración",
  gender = "Genero",
  single = "¿Es un single?",
  repro = "Reproducciones"
}

class Funcionality {
  constructor(private songs: Song[] = [], private artist: Artist[] = [],
              private groups: Group[] = [], private albums: Album[] = [],
              private gender: MusicGender[] = []){   
    this.songs = read.ReadSong();
    this.artist = read.ReadArtist();
    this.groups = read.ReadGroup();
    this.albums = read.ReadAlbum();
    this.gender = read.ReadMusicGender();
  }

  start() {
    console.clear();
    inquirer.prompt({
      type: "list",
      name: "default",
      message: "Bienvenido a la Biblioteca. ¿Desea poner las listas por defecto?",
      choices: ["Sí", "No"]
    }).then(answers => {
      if (answers.default == "Sí") {
        this.songs = data.All_Songs;
        write.Write("song", this.songs);
        this.artist = data.All_artist;
        write.Write("artist", this.artist);
        this.groups = data.All_Group;
        write.Write("group", this.groups);
        this.albums = data.All_Albums;
        write.Write("albums", this.albums);
        this.gender = data.All_Genders;
        write.Write("gender", this.gender);
      } 
      inquirer.prompt({
        type: "list",
        name: "action",
        message: "¿Qué desea consultar?",
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
    });


  }

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
                write.Write("song", read.ReadSong());
                this.sortSongs();
              });
            });
          });
        });
      });
    });
    
  }

  addArtist() {

  }

  addGroup() {

  }

  addAlbum() {

  }

  addGender() {
    
  }

  findSong(aux: string): Song {
    let pos: number = 0;
    this.songs.forEach((item, index) => {
      if(item.getName() == aux) {
        pos = index;
      }
    });

    return this.songs[pos];
  }

  findAlbum(aux: string): Album {
    let pos: number = 0;
    this.albums.forEach((item, index) => {
      if(item.getName() == aux){
        pos = index;
      }
    })
    return this.albums[pos];
  }

  findGender(aux: string): MusicGender {
    let pos: number = 0;
    this.gender.forEach((item, index) => {
      if(item.getMusicGender() == aux) {
        pos = index;
      }
    });
    return this.gender[pos];
  }

  findArtist(aux: string): Artist {
    let pos: number = 0;
    this.artist.forEach((item, index) => {
      if(item.getName() == aux) {
        pos = index;
      }
    });
    
    return this.artist[pos];
  }

  findGroup(aux: string): Group {
    let aux2: number = 0;
    this.groups.forEach((item, index) => {
       if(item.getName() == aux){
         aux2 = index;
       }
      });
      return this.groups[aux2];
  } 

  deleteSong() {
    let song_name: string = "";
    let del: boolean = false;

    inquirer.prompt({
      type: "input", 
      name: "newName",
      message: "Introduzca el nombre de la canción a eliminar: "
    }).then(answers => {
      song_name = answers.newName;

      // Eliminar cancion desde SONGS
      read.ReadSong();

      this.songs.forEach((item, index) => {
        if(item.getName() == song_name) {
          this.songs.slice(index, 1);
          del = true;
        }
      });

      if(del) {
        console.log("Se ha eliminado correctamente la canción");
        write.Write("song", read.ReadSong());
      } else {
        console.log("La cancion que ha ingresado no existe en la base de datos");
      }

      
    });
  }

  deleteArtist() {

  }

  deleteGroup() {

  }

  deleteAlbum() {

  }

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
              aux_song.setName(answers.nombre);
              console.log("Se ha editado el nombre de la canción correctamente");
              write.Write("song", read.ReadSong());
              this.sortSongs();
            });
            break;

          case optionsSong.author:
            inquirer.prompt({
              type: "input",
              name: "author",
              message: "Indique el nuevo autor: ",
            }).then(answers => {
              aux_song.setAuthor(answers.author);
              console.log("Se ha editado el autor de la canción correctamente");
              write.Write("song", read.ReadSong());
              this.sortSongs();
            });
            break;

          case optionsSong.duration:
            inquirer.prompt({
              type: "input",
              name: "duration",
              message: "Indique la nueva duración: ",
            }).then(answers => {
              aux_song.setDuration(answers.duration);
              console.log("Se ha editado la duración de la canción correctamente");
              write.Write("song", read.ReadSong());
              this.sortSongs();
            });
            break;

          case optionsSong.gender:
            inquirer.prompt({
              type: "input",
              name: "gender",
              message: "Indique el nuevo genero: ",
            }).then(answers => {
              aux_song.setGenders(answers.gender);
              console.log("Se ha editado el género de la canción correctamente");
              write.Write("song", read.ReadSong());
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
              if(answers.single = "Sí") {
                aux_song.setSingle(true);
              }
              if(answers.single = "No") {
                aux_song.setSingle(false);
              }
              console.log("Se ha editado la característica de single de la canción correctamente");
              write.Write("song", read.ReadSong());
              this.sortSongs();
            });
            break;

          case optionsSong.repro:
            inquirer.prompt({
              type: "input",
              name: "repro",
              message: "Indique el nuevo número de reproducciones: "
            }).then(answers => {
              aux_song.setRepro(answers.repro);
              console.log("Se han editado las reproducciones de la canción correctamente");
              write.Write("song", read.ReadSong());
              this.sortSongs();
            });
            break;
        } 
      });
    });
    

  }

  editArtist() {

  }

  editGroup() {

  }


// Alfabéticamente por título de la canción, ascendente y descendente.
// Alfabéticamente por nombre del álbum, ascendente y descendente.
// Alfabéticamente por nombre de la playlist, ascendente y descendente.
// Por año de lanzamiento del álbum, ascendente y descendente.
// Por número de reproducciones totales, ascendente y descendente.
// Filtrar para mostrar únicamente los singles lanzados.

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

  sortAlbums() {

  }
  
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
          
          break;

        case changes.delete:
          
          break;

        case changes.edit:
          
          break;

        case changes.show:
          
          break;        
      }

    });
  }

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
          
          break;

        case changes.delete:
          
          break;

        case changes.edit:
          
          break;

        case changes.show:
          
          break;        
      }

    });
  }

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
          
          break;

        case changes.delete:
          
          break;

        case changes.edit:
          
          break;

        case changes.show:
          
          break;        
      }

    });
  }

}

let func: Funcionality = new Funcionality([], [], [], [], []); 
func.start();