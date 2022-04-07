import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { Album } from '../Basic_class/album';
import { Artist } from '../Basic_class/artist';
import { Group } from '../Basic_class/group';
import { MusicGender } from '../Basic_class/music_gender';
import { Playlist } from '../Basic_class/playlist';
import { Song } from '../Basic_class/song';
import { SchemaInterface } from './write';

const db: lowdb.LowdbSync<SchemaInterface> = lowdb(new FileSync("song.json"));
const serializedSong = db.get("song").value();

const mySong = Song.deserialize(serializedSong);
console.log(mySong.getName());
console.log(mySong.getAuthor().getName());
