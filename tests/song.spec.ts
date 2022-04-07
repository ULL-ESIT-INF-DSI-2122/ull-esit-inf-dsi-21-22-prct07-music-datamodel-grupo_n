import 'mocha';
import { expect } from 'chai';
import { Song } from '../src/song';
import * as data from '../src/data';


describe('Comprobación de la clase Song', () => {
  it('Comprobamos que se puede instanciar el objeto', () => {
    expect(data.Down_with_the_sickness).to.be.an.instanceOf(Song);
    expect(data.Industry_Baby).to.be.an.instanceOf(Song);
    expect(data.Smile).to.be.an.instanceOf(Song);
    expect(data.La_casa_por_el_tejado).to.be.an.instanceOf(Song);
    expect(data.Just_the_way_you_are).to.be.an.instanceOf(Song);
    expect(data.El_niagara_en_bicicleta).to.be.an.instanceOf(Song);
    expect(data.wonderland).to.be.an.instanceOf(Song);
    expect(data.piano_man).to.be.an.instanceOf(Song);
    expect(data.death_by_glamour).to.be.an.instanceOf(Song);
    expect(data.crazy).to.be.an.instanceOf(Song);
  });
});

describe('Comprobación de los atributos de la clase Song', () => {
  it('Comprobamos que podemos acceder y modificar el atributo name', () => {
    expect(data.La_bilirrubina.getName()).to.be.eql('La bilirrubina');
    data.La_bilirrubina.setName('La serotonina');
    expect(data.La_bilirrubina.getName()).to.be.eql('La serotonina');
    data.La_bilirrubina.setName('La bilirrubina');
  });
  it('Comprobamos que podemos acceder y modificar el atributo author', () => {
    expect(data.haberlo_pensado_antes.getAuthor()).to.be.eql(data.Locoplaya);
    data.haberlo_pensado_antes.setAuthor(data.Juan_Luis_war);
    expect(data.haberlo_pensado_antes.getAuthor()).to.be.eql(data.Juan_Luis_war);
    data.haberlo_pensado_antes.setAuthor(data.Locoplaya);
  });
  it('Comprobamos que podemos acceder y modificar el atributo duration', () => {
    expect(data.Grenade.getDuration()).to.be.eql(204);
    data.Grenade.setDuration(20000);
    expect(data.Grenade.getDuration()).to.be.eql(20000);
    data.Grenade.setDuration(204);
  });
  it('Comprobamos que podemos acceder y modificar el atributo gender', () => {
    expect(data.lone_digger.getGenders()).to.be.eql([data.Electro_Swing]);
    data.lone_digger.setGenders([data.Rock_Esp]);
    expect(data.lone_digger.getGenders()).to.be.eql([data.Rock_Esp]);
    data.lone_digger.setGenders([data.Electro_Swing]);
  });
  it('Comprobamos que podemos acceder y modificar el atributo single', () => {
    expect(data.Soldadito_marinero.getSingle()).to.be.eql(true);
    data.Soldadito_marinero.setSingle(false);
    expect(data.Soldadito_marinero.getSingle()).to.be.eql(false);
    data.Soldadito_marinero.setSingle(true);
  });
  it('Comprobamos que podemos acceder y modificar el atributo repro', () => {
    expect(data.crazy.getRepro()).to.be.eql(12553334);
    data.crazy.setRepro(80);
    expect(data.crazy.getRepro()).to.be.eql(80);
    data.crazy.setRepro(12553334);
  });
});