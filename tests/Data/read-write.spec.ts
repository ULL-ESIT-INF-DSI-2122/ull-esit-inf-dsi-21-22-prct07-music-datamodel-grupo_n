import 'mocha';
import { expect } from 'chai';
import { Song } from '../../src/Basic_class/song';
import { Album } from '../../src/Basic_class/album';
import { Artist } from '../../src/Basic_class/artist';
import { Group } from '../../src/Basic_class/group';
import { MusicGender } from '../../src/Basic_class/music_gender';
import { Playlist } from '../../src/Basic_class/playlist';
import * as data from '../../src/Data/data';
import * as read from '../../src/Data/read';
import * as write from '../../src/Data/write';

describe('Comprobación de los métodos de lectura y escritura JSON', () => {
  it('Comprobamos que podemos leer y escribir canciones', () => {
    write.Write('song', data.All_Songs);
    expect(read.ReadSong()).to.be.eql(data.All_Songs);
  });
  it('Comprobamos que podemos leer y escribir artistas', () => {
    
  });
  it('Comprobamos que podemos leer y escribir grupos', () => {
    
  });
  it('Comprobamos que podemos leer y escribir albumes', () => {
    
  });
  it('Comprobamos que podemos leer y escribir generos musicales', () => {
    
  });
  it('Comprobamos que podemos leer y escribir playlist', () => {
    
  });
});