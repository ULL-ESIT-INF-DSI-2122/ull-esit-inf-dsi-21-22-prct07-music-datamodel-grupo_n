import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { Album } from '../Basic_class/album';
import { Artist } from '../Basic_class/artist';
import { Group } from '../Basic_class/group';
import { MusicGender } from '../Basic_class/music_gender';
import { Playlist } from '../Basic_class/playlist';
import { Song } from '../Basic_class/song';
import { SchemaInterface } from './write';

/**
 * Permite leer de un fichero json las canciones
 */
export function ReadSong(): Song[] {

  const db: lowdb.LowdbSync<SchemaInterface> = lowdb(new FileSync('./database/song.json'));
  const serializedSongs = db.get('song').value();
  
  return Song.deserialize(serializedSongs);  
}

/**
 * Permite leer de un ficehero json los albumnes almacenados
 * @returns Album[]
 */
export function ReadAlbum(): Album[] {
  const db: lowdb.LowdbSync<SchemaInterface> = lowdb(new FileSync("./database/albums.json"));
  const serializedOption = db.get('album').value();

  return Album.deserialize(serializedOption);;
}

/**
 * Permite leer de fichero json los artistas almacenados en dicho fichero
 * @returns Artist[]
 */
export function ReadArtist(): Artist[] {
  const db: lowdb.LowdbSync<SchemaInterface> = lowdb(new FileSync('./database/artist.json'));
  const serializedOption = db.get('artist').value();

  return Artist.deserialize(serializedOption);
}

/**
 * Permite la lectura de los grupos de la base de datod desde un fichero json
 * @returns Group[]
 */
export function ReadGroup(): Group[] {
  const db: lowdb.LowdbSync<SchemaInterface> = lowdb(new FileSync('./database/group.json'));
  const serializedGroup = db.get('group').value();
  
  return Group.deserialize(serializedGroup);
}

/**
 * Permite obtener los generos que estan almacenados en un fichero json
 * @returns 
 */
export function ReadMusicGender(): MusicGender[] {
  const db: lowdb.LowdbSync<SchemaInterface> = lowdb(new FileSync("./database/genders.json"));
  const serializedOption = db.get('genders').value();

  return MusicGender.deserialize(serializedOption);
}

/**
 * Permite leer las playlist declaradas en un fichero json
 * @returns 
 */
export function ReadPlaylsit(): Playlist[] {
  const db: lowdb.LowdbSync<SchemaInterface> = lowdb(new FileSync('./database/playlist.json'));
  const serializedOption = db.get('playlist').value();

  return Playlist.deserialize(serializedOption);
}