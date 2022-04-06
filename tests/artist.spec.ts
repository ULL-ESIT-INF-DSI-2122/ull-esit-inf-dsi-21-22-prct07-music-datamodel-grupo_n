import 'mocha';
import { expect } from 'chai';
import { MusicGender } from '../src/music_gender';
import { Artist } from '../src/artist';
import { Song } from '../src/song';
import { Group } from '../src/group';
import * as data from '../src/data';

describe('Comprobación de la clase Artist', () => {
  it('Comprobamos que se puede instanciar el objeto', () => {
    expect(data.David_Draiman).to.be.an.instanceOf(Artist);
    expect(data.John_Moyer).to.be.an.instanceOf(Artist);
    expect(data.Mike_Wengren).to.be.an.instanceOf(Artist);
    expect(data.Dan_Donegan).to.be.an.instanceOf(Artist);
    expect(data.Steve_Wonder).to.be.an.instanceOf(Artist);
    expect(data.Lil_Nas_X).to.be.an.instanceOf(Artist);
    expect(data.Fito).to.be.an.instanceOf(Artist);
    expect(data.Javier_Azola).to.be.an.instanceOf(Artist);
    expect(data.Jose_Bruno).to.be.an.instanceOf(Artist);
    expect(data.Ricardo_Cantera).to.be.an.instanceOf(Artist);
    expect(data.Bruno_Mars).to.be.an.instanceOf(Artist);
    expect(data.Juan_Luis_war).to.be.an.instanceOf(Artist);
    expect(data.Zoe_Colotis).to.be.an.instanceOf(Artist);
    expect(data.Arnaud_Vial).to.be.an.instanceOf(Artist);
    expect(data.Hugues_Payen).to.be.an.instanceOf(Artist);
    expect(data.Hwasa).to.be.an.instanceOf(Artist);
    expect(data.Solar).to.be.an.instanceOf(Artist);
    expect(data.Wheein).to.be.an.instanceOf(Artist);
    expect(data.Moonbyul).to.be.an.instanceOf(Artist);
    expect(data.Toby_fox).to.be.an.instanceOf(Artist);
    expect(data.Bejo).to.be.an.instanceOf(Artist);
    expect(data.Geni_Colegui).to.be.an.instanceOf(Artist);
    expect(data.Don_Patricio).to.be.an.instanceOf(Artist);
  });
});

describe('Comprobación de los atributos de la clase Artist', () => {
  it('Comprobamos el módulo calculateListener y el atributo avg_Montly', () => {
    // Disturbed
    data.David_Draiman.calculateListener([data.Disturbed]);
    expect(data.David_Draiman.getAvg_Montly()).to.be.eql(9389625);
    data.John_Moyer.calculateListener([data.Disturbed]);
    expect(data.John_Moyer.getAvg_Montly()).to.be.eql(8850577);
    data.Mike_Wengren.calculateListener([data.Disturbed]);
    expect(data.Mike_Wengren.getAvg_Montly()).to.be.eql(8850689);
    data.Dan_Donegan.calculateListener([data.Disturbed]);
    expect(data.Dan_Donegan.getAvg_Montly()).to.be.eql(8850577);
    
    // Fito y Fitipaldis
    data.Fito.calculateListener([data.Fito_y_Fitipaldis]);
    expect(data.Fito.getAvg_Montly()).to.be.eql(2037838);
    data.Javier_Azola.calculateListener([data.Fito_y_Fitipaldis]);
    expect(data.Javier_Azola.getAvg_Montly()).to.be.eql(2037838);
    data.Jose_Bruno.calculateListener([data.Fito_y_Fitipaldis]);
    expect(data.Jose_Bruno.getAvg_Montly()).to.be.eql(2037838);
    data.Ricardo_Cantera.calculateListener([data.Fito_y_Fitipaldis]);
    expect(data.Ricardo_Cantera.getAvg_Montly()).to.be.eql(2037838);
    
    // Caravan Palace
    data.Zoe_Colotis.calculateListener([data.Caravan_Palace]);
    expect(data.Zoe_Colotis.getAvg_Montly()).to.be.eql(1860601);
    data.Arnaud_Vial.calculateListener([data.Caravan_Palace]);
    expect(data.Arnaud_Vial.getAvg_Montly()).to.be.eql(1860398);
    data.Hugues_Payen.calculateListener([data.Caravan_Palace]);
    expect(data.Hugues_Payen.getAvg_Montly()).to.be.eql(1860398);

    // MAMAMOO
    data.Hwasa.calculateListener([data.MAMAMOO]);
    expect(data.Hwasa.getAvg_Montly()).to.be.eql(6044706);
    data.Solar.calculateListener([data.MAMAMOO]);
    expect(data.Solar.getAvg_Montly()).to.be.eql(4342576);
    data.Wheein.calculateListener([data.MAMAMOO]);
    expect(data.Wheein.getAvg_Montly()).to.be.eql(3944657);
    data.Moonbyul.calculateListener([data.MAMAMOO]);
    expect(data.Moonbyul.getAvg_Montly()).to.be.eql(3817538);

    // Locoplaya
    data.Bejo.calculateListener([data.Locoplaya]);
    expect(data.Bejo.getAvg_Montly()).to.be.eql(720615);
    data.Geni_Colegui.calculateListener([data.Locoplaya]);
    expect(data.Geni_Colegui.getAvg_Montly()).to.be.eql(243832);
    data.Don_Patricio.calculateListener([data.Locoplaya]);
    expect(data.Don_Patricio.getAvg_Montly()).to.be.eql(2888590);

    // Setter del atributo
    expect(data.Lil_Nas_X.getAvg_Montly()).to.be.eql(49522921);
    data.Lil_Nas_X.setAvg_Monthly(0);
    expect(data.Lil_Nas_X.getAvg_Montly()).to.be.eql(0);
    data.Lil_Nas_X.setAvg_Monthly(49522921);
    
  });
  it('Comprobamos que podemos acceder y modificar el atributo name', () => {
    expect(data.Bejo.getName()).to.be.eql('Bejo');
    data.Bejo.setName('Bejito el cantarín');
    expect(data.Bejo.getName()).to.be.eql('Bejito el cantarín');
    data.Bejo.setName('Bejo');
  });
  it('Comprobamos que podemos acceder y modificar el atributo genders', () => {
    expect(data.Hwasa.getGenders()).to.be.eql([data.Kpop]);
    data.Hwasa.setGenders([data.Kpop, data.Heavy_Metal]);
    expect(data.Hwasa.getGenders()).to.be.eql([data.Kpop, data.Heavy_Metal]);
    data.Hwasa.setGenders([data.Kpop]);
  });
  it('Comprobamos que podemos acceder y modificar el atributo albums', () => {
    expect(data.Toby_fox.getAlbum()).to.be.eql([data.Undertale_Soundtrack]);
    data.Toby_fox.setAlbum([data.Tribute_to_uncle_Ray]);
    expect(data.Toby_fox.getAlbum()).to.be.eql([data.Tribute_to_uncle_Ray]);
    data.Toby_fox.setAlbum([data.Undertale_Soundtrack]);
  });
  it('Comprobamos que podemos añadir y eliminar albumes', () => {
    expect(data.Juan_Luis_war.addAlbum(data.Chronologic)).to.be.eql(true);
    expect(data.Juan_Luis_war.deleteLastAlbum()).to.be.eql(true);
  }); 
});