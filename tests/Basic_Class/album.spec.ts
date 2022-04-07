import 'mocha';
import { expect } from 'chai';
import { Album } from '../../src/Basic_class/album';
import * as data from '../../src/data/data';

describe("Comprobacion de la clase Album", () => {
  it("El objeto es instancia de la clase Album", () => {
    expect(data.Asylum).to.be.instanceOf(Album);
    expect(data.Nasarati).to.be.instanceOf(Album);
    expect(data.Tribute_to_uncle_Ray).to.be.instanceOf(Album);
    expect(data.Lo_mas_lejos_a_tu_lado).to.be.instanceOf(Album);
    expect(data.Unorthodox_jukebox).to.be.instanceOf(Album);
    expect(data.La_llave_de_mi_corazon).to.be.instanceOf(Album);
    expect(data.Chronologic).to.be.instanceOf(Album);
    expect(data.Red_Moon).to.be.instanceOf(Album);
    expect(data.Undertale_Soundtrack).to.be.instanceOf(Album);
    expect(data.Que_Dice_la_Juventud).to.be.instanceOf(Album);
  });
});

describe("Comprobacion de los atributos de Album", () => {
  it("Getter y Setter del nombre del Album", () => {
    data.Asylum.setName("Asylum 2");
    expect(data.Asylum.getName()).to.be.eql("Asylum 2");
    data.Asylum.setName("Asylum");
  });

  it("Getter y Setter del año de salida de album", () => {
    data.Nasarati.setYear(2017);
    expect(data.Nasarati.getYear()).to.be.eql(2017);
    data.Nasarati.setYear(2018);
  });

  it("Getter y Setter de las canciones del album", () => {
    data.Nasarati.setAlbumSongs([data.Industry_Baby, data.Montero]);
    expect(data.Nasarati.getAlbumSongs()).to.be.eql([data.Industry_Baby, data.Montero]);
    data.Nasarati.setAlbumSongs([data.Industry_Baby, data.Montero, data.Sun_Goes_Down, data.Old_Town_Road, data.Holiday]);
  });

  it("Getter y Setter de los generos del album", () => {
    data.La_llave_de_mi_corazon.setGender([data.Kpop]);
    expect(data.La_llave_de_mi_corazon.getGender()).to.be.eql([data.Kpop]);
    data.La_llave_de_mi_corazon.setGender([data.Bachata]);
  });

  it("Añadir generos musical al album", () => {
    data.Chronologic.addGender(data.Rock_Esp);
    expect(data.Chronologic.getGender()).to.be.eql([data.Electro_Swing, data.Rock_Esp]);
    data.Chronologic.getGender().pop();
  });

  it("Añadir canciones al album", () => {
    expect(data.Undertale_Soundtrack.addSong(data.Montero)).to.be.eql(true);
  });

  it("Eliminar la ultima cancion añadida al album", () => {
    expect(data.Undertale_Soundtrack.deleteLastSong()).to.be.eql(true);
  });
});