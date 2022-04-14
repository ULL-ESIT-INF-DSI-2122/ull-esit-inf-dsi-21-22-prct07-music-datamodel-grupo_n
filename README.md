[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n?branch=main)<space><space>
[![Test](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/actions/workflows/node.js.yml)<space><space>
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n)<space><space>

# DESARROLLO DE SISTEMAS INFORMÁTICOS
## PRÁCTICA 07 - BIBLIOTECA MUSICAL

# **1) INTRODUCCIÓN**  
En esta práctica se han desarrollado clases básicas para declarar elementos básicos como las canciones, albums, artistas, etc. Además se han creado los métodos para escribir y leer de los ficheros de tipo **.json**, así como las clases que definen el menú interactivo con el que el usuario podrá editar, añadir, leer y modificar sobre la propia biblioteca mucial o las playlist que están creadas.  
  
# **2) MIEMBROS**
Esta práctica ha sido desarrollada por el **Grupo N**, el cual está compuesto por tres integrantes:  
  - Carla Cristina Olivares Rodríguez
  - Jose Miguel Hernández Santana
  - Jonay Estévez Díaz
  
# **3) CÓDIGO DESARROLLADO**
A la hora de desarrolar el código, se ha trabajado en una sola máquina virtual, y se trabajó en conjunto usando la herramienta **Live Share**, mientras que los commits y los push fueron realizados solo por el dueño de la máquina virtual, en este caso, los realizó **Jonay**.  
  
## **3.1) CLASES BÁSICAS**
### **3.1.1) MUSIC GENDER**
Dado el diseño que se optó, se creó una clase muy simple para la implementación, pues el único atributo de ésta es un string como identificador del género, el cual solo tendrá el nombre del mismo. Asimismo, se desarrollaron los métodos para obtener y modificar dicho atributo, en otras palabras, los métodos `getMusicGender()` y `setMusicGender()`. También se debe comentar, que para el uso de la herramienta **lowdb** se ha añadido una interface de nombre **MusicGenderInterface**, la cual tiene el siguiente aspecto.  

```typescript
export interface MusicGenderInterface {
  gender: string
}
```

Para terminar, se creó una nueva funcionalidad, para poder traducir de un fichero **.json** a un objeto de tipo **MusicGender**, utilizando como parametro una variable de tipo `MusicGenderInterface`. La funcionalidad es la siguiente:  

```typescript
  public static deserialize(music_gender: MusicGenderInterface[]): MusicGender[] {
    let aux_array: MusicGender[] = [];
    music_gender.forEach((element) => {
      aux_array.push(new MusicGender(element.gender));
    });
    return aux_array;
  }
```

Para otras consultas sobre la clase, puede consultar el código completo en el siguiente link:  
-> [music_gender.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Basic_class/music_gender.ts)  

Por otro lado, tambien se realizaron pruebas sobre este código, para comprobar que los objetos instanciados son de la misma clase y para comprobar que se puede leer y modificar el atributo de la clase. Las pruebas pueden ser consuntadas en el siguiente enlace:  
-> [Pruebas](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/tests/Basic_Class/music_gender.spec.ts)  
  
### **3.1.2) SONG**
Para las canciones se optó por un diseño donde tendremos el nombre, el autor, la duracion, así como los generos, un booleano para conocer si dicha cancion fue lanzada como single o no, y el numero de reproducciones que tiene la cancion. Con esta organizacion creamos las diferentes funciones que nos permitian interactuar con el objeto asi como obtener y modificar el nombre de la cancion (`getSong()` y `setSong()`), obtener y modificar el nombre del autor(`getAuthor()` y `setAuthor()`) y asi con los demas atributos: duracion, genero, single y numero de reproducciones.

Para el uso de la herramienta **lowdb** hemos de añadir una interfaz de nombre **SongInterface** la cual se ve de la siguiente manera:

```typescript
export interface SongInterface {
  name: string,
  author: GroupInterface|ArtistInterface,
  duration: number,
  gender: MusicGenderInterface[],
  single: boolean,
  repro: number
}
```

Esta interfaz contara con esos atributos, de los cuales algunos sera atributos cuyo tipo sera de la interfaz de otra clase como gender con lo cual tendremos un atributo de la interfaz MusicGenderInterface.

Como ultimo hemos creado una funcion llamada `deserialize()` la cual nos permite crear objetos a través de traducir de un fichero json y crear un objeto de tipo **Song** con esa informacion (utilizando como parametro un atributo de `SongInterface`). Esta funcion se ve de la siguiente manera:

```typescript
  public static deserialize(song: SongInterface[]): Song[] {
    let aux_array: Song[] = [];

    song.forEach((element) => {
      let aux_g: MusicGender[] = [];
      element.gender.forEach((item) => {aux_g.push(new MusicGender(item.gender))});

      if('band' in element.author) { 
        let aux_band: Artist[] = [];
        element.author.band.forEach((item) => {aux_band.push(new Artist(item.name, aux_g, item.avg))});
        let aux_author: Group = new Group(element.author.name, aux_band, aux_g, element.author.avg);
        aux_array.push(new Song(element.name, aux_author, element.duration, aux_g, element.single, element.repro));
        
      } else {
        let aux_author: Artist = new Artist(element.author.name, aux_g, element.author.avg);
        aux_array.push(new Song(element.name, aux_author, element.duration, aux_g, element.single, element.repro));
      }
    });

    return aux_array;
  }
```

En este deserialize hemos de comprobar si el autor de la cancion es un artista en solitario o un grupo, para ello se comprueba si **band** existe para el autor, si existe es que se trata de un grupo el autor de la cancion, si no es un artista en solitario el autor de la canción.

Para otras consultas sobre la clase, puede consultar el código completo en el siguiente link:  ->
-> 
[song.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Basic_class/song.ts)  

Por otro lado, tambien se realizaron pruebas sobre este código, para comprobar que los objetos instanciados son de la misma clase y para comprobar que se puede leer y modificar el atributo de la clase. Las pruebas pueden ser consuntadas en el siguiente enlace:  ->
-> 
[Pruebas](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/tests/Basic_Class/song.spec.ts)  
  
### **3.1.3) ALBUM**
Para los albums se opto por un diseño donde tendremos el nombre del album, el año de lanzamiento del album, los generos musicales que aparecen en el album y las canciones que tiene. Con esta organizacion contamos con funciones que nos permiten interactuar con esos atributos como `getName()` y `setName()`.

Tambien para el uso de la herramienta **lowdb** hemos de añadir una interfaz **AlbumInterface** la cual se ve de la siguiente manera:

```typescript
export interface AlbumInterface {
  name: string,
  year: number, 
  gender: MusicGenderInterface[],
  song: SongInterface[]
}
```

Como ultimo hemos creado una funcion llamada `deserialize()` la cual nos permite crear objetos a través de traducir de un fichero json y crear un objeto de tipo **Album** con esa informacion (utilizando como parametro un atributo de `AlbumInterface`). Esta funcion se ve de la siguiente manera:


```typescript
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
```

Aqui hemos de comprobar para cada album si este ha sido creado por un artista como autor o un grupo como autor del album, para ello comprobamos si el atributo `band` existe, con lo que diferenciaremos entre grupos y artistas.

Para otras consultas sobre la clase, puede consultar el código completo en el siguiente link:  
-> [album.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Basic_class/album.ts)  

Por otro lado, tambien se realizaron pruebas sobre este código, para comprobar que los objetos instanciados son de la misma clase y para comprobar que se puede leer y modificar el atributo de la clase. Las pruebas pueden ser consuntadas en el siguiente enlace:  
-> [Pruebas](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/tests/Basic_Class/album.spec.ts)  
  
### **3.1.4) GROUP**
Para los grupos se opto por un diseño donde tendremos el nombre del grupo, los integrantes del grupo, los generos musicales del grupo y sus numero de reproduccion mensual. Con esta organizacion contamos con funciones que nos permiten interactuar con esos atributos como `getBand()` y `setBand()`.

Para el uso de la herramienta **lowdb** se ha de crear una interfaz llamada **GroupInterface**, la cual se ve de la siguiente manera:

```typescript
export interface GroupInterface {
  name: string,
  gender: MusicGenderInterface[],
  avg: number,
  album: AlbumInterface[],
  band: ArtistInterface[]
}
```

Como ultimo hemos creado una funcion llamada `deserialize()` la cual nos permite crear objetos a través de traducir de un fichero json y crear un objeto de tipo **Group** con esa informacion (utilizando como parametro un atributo de `GroupInterface`). Esta funcion se ve de la siguiente manera:

```typescript
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
```

Para otras consultas sobre la clase, puede consultar el código completo en el siguiente link:  
-> [group.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Basic_class/group.ts)  

Por otro lado, tambien se realizaron pruebas sobre este código, para comprobar que los objetos instanciados son de la misma clase y para comprobar que se puede leer y modificar el atributo de la clase. Las pruebas pueden ser consuntadas en el siguiente enlace:  
-> [Pruebas](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/tests/Basic_Class/group.spec.ts)  
  
### **3.1.5) ARTIST**
Para los artistas se opto por el diseño donde tendremos el nombre del artista, los generos musicales del artista y el numero de reproducciones del artista. Con esta organizacion contamos con funciones que nos permiten interactuar con esos atributos como `getName()` y `setName()`.

Para el uso de la herramienta **lowdb** se ha de crear una interfaz llamada **ArtistInterface**, la cual se ve de la siguiente manera:

```typescript
export interface ArtistInterface {
  name: string,
  gender: MusicGenderInterface[],
  avg: number
}
```
Como ultimo hemos creado una funcion llamada `deserialize()` la cual nos permite crear objetos a través de traducir de un fichero json y crear un objeto de tipo **Artist** con esa informacion (utilizando como parametro un atributo de `ArtistInterface`). Esta funcion se ve de la siguiente manera:

```typescript
 public static deserialize (artist: ArtistInterface[]): Artist[] {
    let aux_array: Artist[] = [];

    artist.forEach((element) => {
      let aux_g: MusicGender[] = [];
      element.gender.forEach((item) => {aux_g.push(new MusicGender(item.gender))});

      aux_array.push(new Artist(element.name, aux_g, element.avg));
    });
    return aux_array;
  }
```

Para otras consultas sobre la clase, puede consultar el código completo en el siguiente link:  
->[artist.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Basic_class/artist.ts)  

Por otro lado, tambien se realizaron pruebas sobre este código, para comprobar que los objetos instanciados son de la misma clase y para comprobar que se puede leer y modificar el atributo de la clase. Las pruebas pueden ser consuntadas en el siguiente enlace:  
->[Pruebas](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/tests/Basic_Class/artist.spec.ts)  
  
### **3.1.6) PLAYLIST**
Para las playlist se opto por el siguiente diseño donde tenemos el nombre de la playlist, las canciones que estan dentro de la playlist, la duracion de la playlist, la lista de generos que hay dentro de la playlist y el nombre del usuario creador de la playlist. Con esta organizacion contamos con funciones que nos permiten interactuar con esos atributos como `getUser()` y `setUser()`.

Para el uso de la herramienta **lowdb** se ha de crear una interfaz llamada **ArtistInterface**, la cual se ve de la siguiente manera:

```typescript
export interface PlaylistInterface{
  name: string,
  songs: SongInterface[],
  duration: number,
  genders: MusicGenderInterface[],
  user: string
}
```

Como ultimo hemos creado una funcion llamada `deserialize()` la cual nos permite crear objetos a través de traducir de un fichero json y crear un objeto de tipo **Playlist** con esa informacion (utilizando como parametro un atributo de `PlaylistInterface`). Esta funcion se ve de la siguiente manera:

```typescript
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
```

Aqui volvemos a tener el atributo **band** para comprobar quien es autor de las canciones de dentro de la playlist, asi pues si **band** existe para autor se tratara de un grupo el autor de la cancion si no el autor sera un artista en solitario.

Para otras consultas sobre la clase, puede consultar el código completo en el siguiente link:  
-> [playlist.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Basic_class/playlist.ts)  

Por otro lado, tambien se realizaron pruebas sobre este código, para comprobar que los objetos instanciados son de la misma clase y para comprobar que se puede leer y modificar el atributo de la clase. Las pruebas pueden ser consuntadas en el siguiente enlace:  
-> [Pruebas](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/tests/Basic_Class/playlist.spec.ts)  
  
## **3.2) DECLARACIONES, ESCRITURA Y LECTURA**
### **3.2.1) DATA**
Este fichero cuenta con una declaracion de objetos de cada una de las clases que tenemos, es decir song, album,etc. Dicho asi en este fichero se encuentran todos eso objetos como si de una base de datos se tratara, para poder interactuar con todos los objetos desde cualquier fichero que llame a los atributos de este fichero.

Para otras consultas sobre la clase, puede consultar el código completo en el siguiente link:  
-> [data.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Data/data.ts)
  
### **3.2.1) WRITE**
El fichero write nos permitira almacena informacion dentro de un fichero JSON y se vera de la siguiente manera:

```typescript
export function Write(option: string, object: Album[]|Artist[]|Group[]|MusicGender[]|Song[]|Playlist[]) {
  const ext: string = '.json';
  const path: string = './database/';
  const db: lowdb.LowdbSync<SchemaInterface> = lowdb(new FileSync(path + option + ext));
  db.set(option, object).write();
}
```

En la funcion principa del fichero write desarrollaremos el donde vamos a guardar el fichero json que se creara a travez de las variables **path**, **ext** y **option**, siendo **option** el nombre del fichero que se le pasa a la funcion, **path** la direccion donde se creara el fichero y **ext** siendo la extension .json, para realizar esto llamaremos a una funcion de **lowdb** que nos permitira crear ese fichero con un schema que nosotros hemos definido y que se ve de la siguiente manera: 

```typescript
export interface SchemaInterface {
  album: AlbumInterface[],
  artist: ArtistInterface[],
  group: GroupInterface[],
  musicGender: MusicGenderInterface[],
  playlist: PlaylistInterface[],
  song: SongInterface[]
}
```

De esta manera se creara el fichero con la informacion distribuida con la informacion que es pasada a la funcion y que responde al `SchemaInterface`.

Para otras consultas sobre la clase, puede consultar el código completo en el siguiente link:  -> 
[write.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Data/write.ts)
  
### **3.2.1) READ**
El fichero read nos permitira leer el fichero json creado para mantener los datos en la base de datos y se ve de la siguiente manera:

```typescript
export function ReadSong(): Song[] {

  const db: lowdb.LowdbSync<SchemaInterface> = lowdb(new FileSync('./database/song.json'));
  const serializedSongs = db.get('song').value();
  
  return Song.deserialize(serializedSongs);  
}

```

La funcion lo que hace es recoger la informacion que se encuentre en el fichero .json que corresponda con el nombre indicado.

El resto de funciones corresponden al resto de clases tambien, el unico cambio significativo entre una funcion y otra es el nombre dell fichero del cual recogen la informacion

Para otras consultas sobre la clase, puede consultar el código completo en el siguiente link:  
-> [read.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Data/read.ts)  
  
## **3.3) FUNCIONAMIENTO**
Para el diseño de la clase funcionality tenemos una lista de canciones, una lista de artistas, una lista de grupos, una lista de albums y una lista de generos.

```typescript
  constructor(private songs: Song[] = [], private artist: Artist[] = [],
              private groups: Group[] = [], private albums: Album[] = [],
              private gender: MusicGender[] = []){   
    this.songs =  data.All_Songs;          //read.ReadSong();
    this.gender = data.All_Genders;        //read.ReadMusicGender();
    this.artist = data.All_artist;         //read.ReadArtist();
    this.albums = data.All_Albums;         //read.ReadAlbum();
    this.groups = data.All_Group;          //read.ReadGroup();
  }
```

A estos atributos accederemos a travez de la libreria **inquirer.js** para que sea una manera interactiva de busqueda de informacion para el usuario. Para esta interaccion primero hemos de definir unas cuantas opciones como son:

```typescript
enum Options {
  songs = "Canciones",
  artist = "Artistas",
  group = "Grupos",
  albums = "Albumes",
  gender = "Generos"
}
```

Estas opciones junto con otras mas que se encuentran en el fichero seran a las cuales mediante el prompt del **inquirer** el usuario podra añadir, borrar y modificar géneros, canciones, álbumes, grupos y artistas.

Para el funcionamiento crearemos un `start()` el cual convertira el prompt en interactivo de la siguiente manera:

```typescript
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
```

En esta funcion el usuario primero tendra que iniciar una biblioteca por defecto que enlaza con los datos de nuestra base de datos tanto de **Songs** como de el resto de clases, despues se le dara la opcion al usuario de que informacion quiere consultar haciendo uso de las opciones anteriormente mencionadas para poder acceder y consultar o modificar lo que quiera.

Dependiendo de a que quiera acceder se ira a una de esas funciones `option` la cual se vera asi:

```typescript
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
```

Cada opcion nos llevara a las diferentes funciones las cuales nos permitiran añadir canciones, artistas, grupos, albums o generos la base de datos, tambien nos permitira borrar de la base de dato lo que queramos, editar tanto canciones como el resto de atributos y ordenarlas de la manera dada en el informe de la practica:

-Alfabéticamente por título de la canción, ascendente y descendente.
-Alfabéticamente por nombre del álbum, ascendente y descendente.
-Alfabéticamente por nombre de la playlist, ascendente y descendente.
-Por año de lanzamiento del álbum, ascendente y descendente.
-Por número de reproducciones totales, ascendente y descendente.
-Filtrar para mostrar únicamente los singles lanzados.

**(Todas las funciones que se definen ahora seran sobre los objetoss `Song` pero todos los objetos como `Artista` tienen sus clases iguales y que hacen la misma funcion pero para cada objeto en especifico)**

Para empezar tenemos la funcion `addSong()` la cual nos permitira añadir una cancion nueva con cada uno de sus atributos, esta funcion se ve de la siguiente manera:

```typescript
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
```

En esta funcion se le preguntara al usuario que cosas añadir para crear la cancion y añadirla a la base de datos, tanto el artista como los generos se trataran unicamente de los que ya hay sobre la base de datos, para ello se usan los `findArtist()` y sus omonimos para cada objeto, esta funcion `findArtist()` se ve de la siguiente manera:

```typescript
findArtist(aux: string): Artist {
    let pos: number = 0;
    this.artist.forEach((item, index) => {
      if(item.getName() == aux) {
        pos = index;
      }
    });
    
    return this.artist[pos];
  }
```

Esta funcion lo que nos hara sera buscar por toda la base de datos si el artista existe y entonces es un artista que se puede poner como artista en la cancion que vayamos a añadir.

La siguiente funcion que usamos sera la `deleteSong()` que nos permitira borrar una cancion de la base de datos, esa funcion se vera de la siguiente manera:

```typescript
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
```

En esta funcion eliminaremos la cancion que el usuario diga de la base de datos buscando por el nombre de la cancion, si la cancion esta en la base de datos se eliminara la cancion y todos los atributos de esa cancion, si no nos dira que la cancion no existe en la base de datos.


La siguiente funcion sera la funcion `editSong()` que nos permitira editar todos los atributos que forman una cancion, esta funcion se ve asi: 

```typescript
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
```

Lo primero que se hara sera pedir el nombre de la cancion para ver si esta en la base de datos, si se encuentra en la base de datos despues el usuario podra decidir que cambiar si el nombre de la cancion, el artista de la cancion, la duracion de la cancion, el genero de la cancion, si la cancion es un single y el numero de reproduccion de la cancion, es decir se nos permitira cambiar todos los atributos de la cancion a eleccion del usuario

y para terminar nos queda la funcion `sortSong()` la cual nos permitira ordenar la informacion como se dijo con anterioridad, asi se ve esta funcion:

```typescript
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
```

En esta funcion se nos pedira el orden que queremos ordenar la cancion a travez del nombre, de manera ascendiente o descendente y si queremos ordenarlo por singles o por canciones que no son singles creando asi una lista de canciones que se le muestran al usuario, a su vez estas funciones de ordenacion se unen a las funciones tanto `editSong()` como `addSong()` para que se le muestre al usuario que esa cancion que añadio o edito se ha modificado con exito.

Para otras consultas sobre la clase, puede consultar el código completo en el siguiente link:  
-> [funcionality.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Funcionality/funcionality.ts)  

## **3.4) GESTOR**
Para el diseño de la clase **Gestor** hemos hecho uso de la herrramienta **Inquirer** al igual que en el apartado anterior. Además lña estructura de la clase es muy similar, pues el menú se inicia cuando hacemos la llamada el metodo de la clase de `start()`.  

```typescript
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
```

Para el uso de las opciones de los switches, hemos realizado dos enum, el primero para las opciones del menú principal y el otro para las opciones de ordenacion, las cuales están definidas de la siguiente manera.  

```typescript
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
```

Para ver todas las playlist que han sido creadas o estan almacenadas, se ha implementado el método `viewAllPlaylist()`, que muestra para cada playlist el nombre, los generos de las canciones que tiene, así como la duracion de la misma en horas minutos y segundos. El método es el siguiente:  

```typescript
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
```

Tambien se ha de comentar que se realizó un método para mostrar las canciones que tiene una playlist en concreto, mientras tambien se pregunta como quiere que se ordenen las canciones, haciendo uso el **enum Sort** anteriormente comentado. De esta manera el método `concretePlaylist()` se definió de la siguiente manera:  

```typescript
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
```

Para todos los metodos de ordenacion de las canciones, hemos creado `sortSongByName()`, `sortSongByAuthor()`, `sortSongByDuration()`, `sortSongByGender()` y `sortSongByRepro()`, donde haces practicamente lo mismo, algo que el item sobre el que se basa da ordenacion es la misma, para que se puedan hacer a la idea de como es la estructura de estos métodos, solo se pondrá el primer método.  

```typescript
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
```

Por otro lado, se ha realizado un método para crear una playlist, usando un menú interactivo, perguntando los atributois necesarios para crear un objeto de tipo plylist , el cual se añadirá al resto y sera escrito usaro al método `write()` para añadirlo. De esta manera, el método quedó de esta manera.  

```typescript
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
```

Por último, el método `deletePlaylist()` recorre las playlist almacenadas y busca por el nombre la playlist a eliminar, pero para poder eliminarla, el usuario logeado, tiene que sewr propietario de esa playlist. Es por ello que el método queda de la siguiente manera.  

```typescript
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
``` 

## **4) NOTAS SOBRE LA PRACTICA**

En primer lugar queremos aclarar que en esta práctica no hemos logrado hacer uso del `Read()` a pesar de todas las consultas que hicimos. El código se basa en el código que se nos ha proporcionado a través de GitHub Gist (ver referencias) pero no hemos sido capaz de incorporarlo a nuestro diseño. Por lo tanto el funcionamiento de nuestra práctica se basa en el `Write()`, para esto hacemos una declaración de datos por defecto (encontrados en el archivo **data.ts**)

```typescript 
class Funcionality {
  constructor(private songs: Song[] = [], private artist: Artist[] = [],
              private groups: Group[] = [], private albums: Album[] = [],
              private gender: MusicGender[] = []){   
    this.songs =  data.All_Songs;          //read.ReadSong();
    this.gender = data.All_Genders;        //read.ReadMusicGender();
    this.artist = data.All_artist;         //read.ReadArtist();
    this.albums = data.All_Albums;         //read.ReadAlbum();
    this.groups = data.All_Group;          //read.ReadGroup();
  }
```

Como podemos observar en los comentarios nuestra intención era construir los atributos de `Funcionality` en base al contenido de los archivos .json, por ello existe la opción de **poner los datos por defecto** ya que si no existían estos archivos o estaban vacíos podíamos rellenarlos a través de esa opción que se pregunta luego de elegir la Biblioteca de Música (en vez del gestor de Playlist):


```typescript
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
          . . .
```

Por lo tanto, ya que no pudimos desarrollar esta idea que mencionamos anteriormente porque no logramos el correcto funcionamiento del `Read()`, nuestra práctica solo escribe, entonces aunque exista esta opción de poner los datos por defecto siempre que se ejecute el programa los datos volverán a su forma por defecto, por ello recomendamos que si se quiere comprobar el funcionamiento de algo que no sale por pantalla inmediatamente después puede acceder a los archivos **.json** de la carpeta **/database** y comprobar el correcto funcionamiento antes de volver a ejecutar el programa para probar otras funcionalidades. 

Consideramos que esta práctica para todos ha sido más complicada de lo que realmente debería haber sido, y las dificultades no residen en los contenidos de **lowdb** y **inquirer** sino más bien en el propio diseño de la práctica, consideramos que muchas cosas no están muy meditadas y pedimos encarecidamente que no se repita el mismo patrón, las prácticas grupales por si mismas cargan con un monton de trabajo como para añadirles más dificultades que no sean los propios contenidos de la asignatura. 


## **5) REFERENCIAS**
Las referecias que hemos usado durante el desarrollo de la practica han sido:
 
->[Github Gist dado por el profesor](https://gist.github.com/esegredo/50068c3b3a55dd1a5b02bb695562f7e3)  
->[Github con ejemplos de lowdb](https://github.com/SBoudrias/Inquirer.js/blob/master/packages/inquirer/examples/pizza.js)  
->[Página de lowdb del informe de la práctica](https://www.npmjs.com/package/lowdb)  
->[Página de inquirer.js del informe de la práctica](https://www.npmjs.com/package/inquirer)  
->[Página de stackoverflow](https://es.stackoverflow.com)  