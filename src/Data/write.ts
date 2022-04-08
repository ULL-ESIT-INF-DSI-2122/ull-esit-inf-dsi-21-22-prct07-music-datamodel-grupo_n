import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { Album, AlbumInterface } from '../Basic_class/album';
import { Artist, ArtistInterface } from '../Basic_class/artist';
import { Group, GroupInterface } from '../Basic_class/group';
import { MusicGender, MusicGenderInterface } from '../Basic_class/music_gender';
//import { Playlist, PlaylistInterface } from '../Basic_class/playlist';
import { Song, SongInterface } from '../Basic_class/song';
import * as data from './data';
import { Read } from './read';

export interface SchemaInterface {
  album: AlbumInterface,
  artist: ArtistInterface,
  group: GroupInterface,
  musicGender: MusicGenderInterface,
  //playlist: PlaylistInterface,
  song: SongInterface
}

export function Write(option: string, object: Album[]|Artist[]|Group[]|MusicGender[]|Song[]) {
  const ext: string = '.json';
  const db: lowdb.LowdbSync<SchemaInterface> = lowdb(new FileSync(option + ext));
  db.set(option, object).write();
}

Write('group', data.All_Genders);