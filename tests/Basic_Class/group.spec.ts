import 'mocha';
import { expect } from 'chai';
import { MusicGender } from '../../src/Basic_class/music_gender';
import { Artist } from '../../src/Basic_class/artist';
import { Group } from '../../src/Basic_class/group';
import * as data from '../../src/Data/data';

describe("Comprobación de la clase Group",() => {
  it("El objeto es instancia de la clase Group", () => {
    expect(data.Disturbed).to.be.instanceof(Group);
    expect(data.Fito_y_Fitipaldis).to.be.instanceof(Group);
    expect(data.Caravan_Palace).to.be.instanceof(Group);
    expect(data.MAMAMOO).to.be.instanceof(Group);
    expect(data.Locoplaya).to.be.instanceof(Group);
  });
});

describe("Comprobación de lso atributos de la clase Group", () => {
  it("Getter y Setter del nombre del grupo", () => {
    data.Disturbed.setName("David's Asylum");
    expect(data.Disturbed.getName()).to.be.eql("David's Asylum");
    data.Disturbed.setName("Disturbed");
  });

  it("Getter y Setter de los componendes del grupo", () => {
    let aux: Artist[] = [data.Fito, data.Javier_Azola, data.Jose_Bruno];
    data.Fito_y_Fitipaldis.setBand(aux);
    expect(data.Fito_y_Fitipaldis.getBand()).to.be.eql(aux);
  });

  it("Getter y Setter de las reproducciones mensuales", () => {
    let aux: number = data.Caravan_Palace.getAvgMonthly();
    data.Caravan_Palace.setAvgMonthy(80);
    expect(data.Caravan_Palace.getAvgMonthly()).to.be.eql(80);
    data.Caravan_Palace.setAvgMonthy(aux);
  });

  it("Getter y Setter de los generos musicales", () => {
    data.MAMAMOO.setGender([data.Heavy_Metal]);
    expect(data.MAMAMOO.getGender()).to.be.eql([data.Heavy_Metal]);
    data.MAMAMOO.setGender([data.Kpop]);
  });

  it("Getter y Setter de los Albumes", () => {
    data.Locoplaya.setAlbums([data.Nasarati]);
    expect(data.Locoplaya.getAlbums()).to.be.eql([data.Nasarati]);
  });

  it("Añadir artista al grupo", () => {
    let aux: Artist[] = [data.Fito, data.Javier_Azola, data.Jose_Bruno];
    aux.push(data.Ricardo_Cantera);
    data.Fito_y_Fitipaldis.addArtist(data.Ricardo_Cantera);
    expect(data.Fito_y_Fitipaldis.getBand()).to.be.eql(aux);
  });

  it("Añadir genero al grupo", () => {
    let aux: MusicGender[] = [data.Kpop, data.Blues];
    data.MAMAMOO.addGender(data.Blues);
    expect(data.MAMAMOO.getGender()).to.be.eql(aux);
  });

  it("Añadir album de a grupo", () => {
    expect(data.Locoplaya.addAlbum(data.Asylum)).to.be.eql(true);
  });

  it("Eliminar album de un grupo", () => {
    expect(data.Locoplaya.deleteLastAlbum()).to.be.eql(true);
  });

});