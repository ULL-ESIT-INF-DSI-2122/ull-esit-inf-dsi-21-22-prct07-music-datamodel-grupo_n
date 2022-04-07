import 'mocha';
import { expect } from 'chai';
import { MusicGender } from '../src/music_gender';
import * as data from '../src/data';

describe('Comprobación de la clase MusicGender', () => {
  it('Comprobamos que se puede instanciar el objeto', () => {
    expect(data.Heavy_Metal).to.be.an.instanceOf(MusicGender);
    expect(data.RyB).to.be.an.instanceOf(MusicGender);
    expect(data.Blues).to.be.an.instanceOf(MusicGender);
    expect(data.Rock_Esp).to.be.an.instanceOf(MusicGender);
    expect(data.Pop).to.be.an.instanceOf(MusicGender);
    expect(data.Bachata).to.be.an.instanceOf(MusicGender);
    expect(data.Bachata).to.be.an.instanceOf(MusicGender);
    expect(data.Electro_Swing).to.be.an.instanceOf(MusicGender);
    expect(data.Kpop).to.be.an.instanceOf(MusicGender);
    expect(data.Ost).to.be.an.instanceOf(MusicGender);
    expect(data.Rap).to.be.an.instanceOf(MusicGender);
  });
});

describe('Comprobación de los atributos de la clase MusicGender', () => {
  it('Comprobamos que se puede acceder y modificar el atributo gender', () => {
    expect(data.Heavy_Metal.getMusicGender()).to.be.eql('Heavy Metal');
    data.Heavy_Metal.setMusicGender('Jevi Metal');
    expect(data.Heavy_Metal.getMusicGender()).to.be.eql('Jevi Metal');
    data.Heavy_Metal.setMusicGender('Heavy Metal');
  });
});