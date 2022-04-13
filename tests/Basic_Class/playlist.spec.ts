import 'mocha';
import { expect } from 'chai';
import { Playlist } from '../../src/Basic_class/playlist';
import * as data from '../../src/Data/data';

describe('Comprobacion de la clase Playlist', () => {
  it('Los objetos declarados son de la clase Playlist', () => {
    expect(data.Heavy_ESP).to.be.instanceOf(Playlist)
    expect(data.Ryblues).to.be.instanceOf(Playlist)
    expect(data.K_Electro).to.be.instanceOf(Playlist)
    expect(data.Mix).to.be.instanceOf(Playlist)
  });
});

describe('Comprobacion de los atributos de Playlist', () => {
  it('Getter y Setter del nombre', () => {
    data.Heavy_ESP.setName('Rock y Metal');
    expect(data.Heavy_ESP.getName()).to.be.eql('Rock y Metal');
    data.Heavy_ESP.setName('Heavy & Fitipaldis');
  });

  it('Getter y Setter de la lista de canciones', () => {
    data.Ryblues.setSongs([data.Garabatos]);
    expect(data.Ryblues.getSongs()).to.be.eql([data.Garabatos]);
    data.Ryblues.setSongs([data.Industry_Baby, data.Montero, data.Sun_Goes_Down, data.Old_Town_Road, data.Holiday, data.Smile, data.Sunset, data.Superstition, data.So_what_the_fuss, data.Frankye_and_Johnny]);
  });

  it('Getter y Setter de la duracion de la lista', () => {
    data.K_Electro.setDuration(560);
    expect(data.K_Electro.getDuration()).to.be.eql(560);
    data.K_Electro.setDuration(2078);
  });

  it('Getter y Setter de los generos de la lista', () => {
    data.Mix.setGenders([data.Kpop, data.Rock_Esp]);
    expect(data.Mix.getGenders()).to.be.eql([data.Kpop, data.Rock_Esp]);
    data.Mix.setGenders([data.Pop, data.Bachata, data.Ost, data.Rap]);
  });

  it('Getter y Setter del usuario que ha creado la Playlist', () => {
    data.Mix.setUser('Jonay');
    expect(data.Mix.getUser()).to.be.eql('Jonay');
    data.Mix.setUser('Admin');
  });

  it('Añadir canciones a la lista', () => {
    expect(data.Heavy_ESP.addSong(data.vacaciones_pagadas)).to.be.true;
  });

  it('Eliminar una cancion añadida a la lista', () => {
    expect(data.Heavy_ESP.deleteSong('Vacaciones Pagadas')).to.be.true;
  });

  it('Añadir generos a la lista', () => {
    expect(data.K_Electro.addGender(data.RyB)).to.be.true;
  });

  it('Eliminar generos de la lista', () => {
    expect(data.K_Electro.deleteGender('R&B')).to.be.true;
  });
});