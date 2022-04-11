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

Para terminar, se creó una nueva funcionalidad, para poder crear objetos de tipo **MusicGender**, utilizando como parametro una variable de tipo `MusicGenderInterface`. La funcionalidad es la siguiente:  

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
-> [código](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/src/Basic_class/music_gender.ts)

Por otro lado, tambien se realizaron pruebas sobre este código, para comprobar que los objetos instanciados son de la misma clase y para comprobar que se puede leer y modificar el atributo de la clase. Las pruebas pueden ser consuntadas en el siguiente enlace:  
-> [Pruebas](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_n/blob/main/tests/Basic_Class/music_gender.spec.ts)

### **3.1.2) SONG**
Para las canciones se optó por un diseño donde tendremos el nombre, el autor, la duracion 

### **3.1.3) ALBUM**
### **3.1.4) GROUP**
### **3.1.5) ARTIST**
### **3.1.6) PLAYLIST**

## **3.2) DECLARACIONES, ESCRITURA Y LECTURA**
### **3.2.1) DATA**
### **3.2.1) WRITE**
### **3.2.1) READ**

## **3.3) FUNCIONAMIENTO**

## **3.4) GESTOR**

## **4) CONCLUSION**

## **5) REFERENCIAS**
