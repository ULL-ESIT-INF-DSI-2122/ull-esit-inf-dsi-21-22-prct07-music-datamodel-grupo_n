import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { Album, AlbumInterface } from '../Basic_class/album';
import { Artist, ArtistInterface } from '../Basic_class/artist';
import { Group, GroupInterface } from '../Basic_class/group';
import { MusicGender, MusicGenderInterface } from '../Basic_class/music_gender';
import { Playlist, PlaylistInterface } from '../Basic_class/playlist';
import { Song, SongInterface } from '../Basic_class/song';
import * as data from './data';

export interface SchemaInterface {
  album: AlbumInterface,
  artist: ArtistInterface,
  group: GroupInterface,
  musicGender: MusicGenderInterface,
  playlist: PlaylistInterface,
  song: SongInterface
}

/**
 * Duncion que nos permite escribir datos dentro del fichero json correspondiente
 * @param option String que sera el nombre del fichero sobre el que se escribira
 * @param object Objetos del cual se pasara la informacion a el json 
 */
export function Write(option: string, object: Album[]|Artist[]|Group[]|MusicGender[]|Song[]|Playlist[]) {
  const ext: string = '.json';
  const path: string = './database/';
  const db: lowdb.LowdbSync<SchemaInterface> = lowdb(new FileSync(path + option + ext));
  db.set(option, object).write();
}
