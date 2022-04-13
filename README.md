[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n?branch=main)<space><space>
[![Test](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/actions/workflows/node.js.yml)<space><space>
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n)<space><space>

# DESARROLLO DE SISTEMAS INFORMÁTICOS
## PRÁCTICA 07 - BIBLIOTECA MUSICAL

# **1) INTRODUCCIÓN**  


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
[-> music_gender.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Basic_class/music_gender.ts)

Por otro lado, tambien se realizaron pruebas sobre este código, para comprobar que los objetos instanciados son de la misma clase y para comprobar que se puede leer y modificar el atributo de la clase. Las pruebas pueden ser consuntadas en el siguiente enlace:  
[-> Pruebas](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/tests/Basic_Class/music_gender.spec.ts)

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

Para otras consultas sobre la clase, puede consultar el código completo en el siguiente link:  
[-> song.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Basic_class/song.ts)

Por otro lado, tambien se realizaron pruebas sobre este código, para comprobar que los objetos instanciados son de la misma clase y para comprobar que se puede leer y modificar el atributo de la clase. Las pruebas pueden ser consuntadas en el siguiente enlace:  
[-> Pruebas](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/tests/Basic_Class/song.spec.ts)

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
[-> album.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Basic_class/album.ts)

Por otro lado, tambien se realizaron pruebas sobre este código, para comprobar que los objetos instanciados son de la misma clase y para comprobar que se puede leer y modificar el atributo de la clase. Las pruebas pueden ser consuntadas en el siguiente enlace:  
[-> Pruebas](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/tests/Basic_Class/album.spec.ts)

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
[-> group.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Basic_class/group.ts)

Por otro lado, tambien se realizaron pruebas sobre este código, para comprobar que los objetos instanciados son de la misma clase y para comprobar que se puede leer y modificar el atributo de la clase. Las pruebas pueden ser consuntadas en el siguiente enlace:  
[-> Pruebas](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/tests/Basic_Class/group.spec.ts)

### **3.1.5) ARTIST**
### **3.1.6) PLAYLIST**

## **3.2) DECLARACIONES, ESCRITURA Y LECTURA**
### **3.2.1) DATA**
### **3.2.1) WRITE**
### **3.2.1) READ**

## **3.3) FUNCIONAMIENTO**

## **3.4) GESTOR**

## **4) NOTAS SOBRE LA PRACTICA**

## **5) REFERENCIAS**
