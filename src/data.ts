import { MusicGender } from "./music_gender";
import { Artist } from "./artist";
import { Group } from "./group";
import { Song } from './song';
import { Album } from "./album";
import { Playlist } from "./playlist";

// Music Gender
export let Heavy_Metal = new MusicGender('Heavy Metal');
export let RyB = new MusicGender('R&B');
export let Blues = new MusicGender('Blues');
export let Rock_Esp = new MusicGender('Rock Español');
export let Pop = new MusicGender('Pop');
export let Bachata = new MusicGender('Bachata');
export let Electro_Swing = new MusicGender('Electro Swing');
export let Kpop = new MusicGender('K-Pop');
export let Ost = new MusicGender('Banda Sonora');
export let Rap = new MusicGender('Rap');

//Artist
export let David_Draiman = new Artist("David Draiman", [Heavy_Metal], 539048);
export let John_Moyer = new Artist("John Moyer", [Heavy_Metal], 0);
export let Mike_Wengren = new Artist('Mike Wengren', [Heavy_Metal], 112);
export let Dan_Donegan = new Artist('Dan Donegan', [Heavy_Metal], 0);
export let Steve_Wonder = new Artist('Steve Wonder', [Blues], 15327758);
export let Lil_Nas_X = new Artist('Montero Lamar Hill', [RyB], 49522921);
export let Fito = new Artist('Fito Cabrales', [Rock_Esp], 0);
export let Javier_Azola = new Artist('Javier Azola', [Rock_Esp], 0);
export let Jose_Bruno = new Artist('Jose Bruno', [Rock_Esp], 0);
export let Ricardo_Cantera = new Artist('Ricardo Cantera', [Rock_Esp], 0);
export let Bruno_Mars = new Artist('Peter Gene Hernandez', [Pop], 52087795);
export let Juan_Luis_war = new Artist('Juan Luis Guerra', [Bachata], 7220793);
export let Zoe_Colotis = new Artist('Zoé Colotis', [Electro_Swing], 203);
export let Arnaud_Vial = new Artist('Arnaud Vial', [Electro_Swing], 0);
export let Hugues_Payen = new Artist('Hugues Payen', [Electro_Swing], 0);
export let Hwasa = new Artist('Hwasa', [Kpop], 2932958);
export let Solar = new Artist('Solar', [Kpop], 1230828);
export let Wheein = new Artist('Wheein', [Kpop], 832909);
export let Moonbyul = new Artist('Moonbyul', [Kpop], 705790);
export let Toby_fox = new Artist('Toby Fox', [Ost], 2516369);
export let Bejo = new Artist('Bejo', [Rap], 496464); // bejito el cantarin
export let Geni_Colegui = new Artist('Geni Colegui', [Rap], 19681);
export let Don_Patricio = new Artist('Don Patricio', [Rap], 2664439);


//Groups
export let Disturbed = new Group('Disturbed', [David_Draiman, John_Moyer, Mike_Wengren, Dan_Donegan], [Heavy_Metal], 8850577);
export let Fito_y_Fitipaldis = new Group('Fito y Fitipaldis', [Fito, Javier_Azola, Jose_Bruno, Ricardo_Cantera], [Rock_Esp], 2037838);
export let Caravan_Palace = new Group('Caravan Palace', [Zoe_Colotis, Arnaud_Vial, Hugues_Payen], [Electro_Swing], 1860398);
export let MAMAMOO = new Group('MAMAMOO', [Hwasa, Solar, Wheein, Moonbyul], [Kpop], 3111748);
export let Locoplaya = new Group('Locoplaya', [Bejo, Geni_Colegui, Don_Patricio], [Rap], 224151); 

//Song
export let Down_with_the_sickness = new Song('Down With The Sickness', Disturbed, 263, [Heavy_Metal], false, 516338655);
export let Numb = new Song('Numb', Disturbed, 207, [Heavy_Metal], false, 1640851);
export let Savior_of_nothig = new Song('Savior Of Nothing', Disturbed, 247, [Heavy_Metal], false, 2308077);
export let Want = new Song('Want', Disturbed, 195, [Heavy_Metal], false, 7256401);
export let Stupify = new Song('Stupify', Disturbed, 243, [Heavy_Metal], false, 27122910);
export let Industry_Baby = new Song('Industry Baby', Lil_Nas_X, 213, [RyB], false, 326199448);
export let Montero = new Song('Montero', Lil_Nas_X, 183, [RyB], false, 452879557);
export let Sun_Goes_Down = new Song('Sun Goes Down', Lil_Nas_X, 151, [RyB], false, 39485162);
export let Old_Town_Road = new Song('Old Town Road', Lil_Nas_X, 234, [RyB], false, 631858029);
export let Holiday = new Song('Holiday', Lil_Nas_X, 148, [RyB], false, 209931052);
export let Smile = new Song('Smile', Steve_Wonder, 192, [Blues], false, 30600);
export let Sunset = new Song('Sunset', Steve_Wonder, 189, [Blues], false, 54892);
export let Superstition = new Song('Superstition', Steve_Wonder, 255, [Blues], true, 19757336);
export let So_what_the_fuss = new Song('So What The Fuss', Steve_Wonder, 302, [Blues], true, 113159);
export let Frankye_and_Johnny = new Song('Frankye & Johnny', Steve_Wonder, 184, [Blues], false, 16503);
export let Garabatos = new Song('Garabatos', Fito_y_Fitipaldis, 264, [Rock_Esp], false, 7077525);
export let La_casa_por_el_tejado = new Song('La casa por el tejado', Fito_y_Fitipaldis, 241, [Rock_Esp], false, 23218193);
export let Me_equivocaria_otra_vez = new Song('Me equivocaria otra vez', Fito_y_Fitipaldis, 301, [Rock_Esp], false, 28197359);
export let Por_la_boca_vive_el_pez = new Song('Por la boca vive el pez', Fito_y_Fitipaldis, 258,[Rock_Esp], true, 58744450);
export let Soldadito_marinero = new Song('Soldadito marinero', Fito_y_Fitipaldis, 215 ,[Rock_Esp], true, 57833321);
export let Treasure = new Song('Treasure', Bruno_Mars, 186, [Pop], true, 637112893);
export let Grenade = new Song('Grenade', Bruno_Mars, 204, [Pop], true, 1073534484);
export let Just_the_way_you_are = new Song('Just the way you are', Bruno_Mars, 213, [Pop], true, 1704676116);
export let Uptown_Funk = new Song('Uptown Funk', Bruno_Mars, 258, [Pop], false, 4515115221);
export let Smoking_out_the_window = new Song('Smoking out the window', Bruno_Mars, 192,[Pop], false, 107032201);
export let Ojala_que_llueva_cafe = new Song('Ojala que llueva que cafe', Juan_Luis_war, 247, [Bachata], false, 1481024);
export let La_guagua = new Song('La guagua', Juan_Luis_war, 209 , [Bachata], false, 5160713);
export let La_bilirrubina = new Song('La bilirrubina', Juan_Luis_war, 243,[Bachata], false, 38323024);
export let Burbujas_de_amor = new Song('Burbujas de amor', Juan_Luis_war, 246, [Bachata], false, 85394327);
export let El_niagara_en_bicicleta = new Song('El niagara en bicicleta', Juan_Luis_war, 241 , [Bachata], false, 29704527);
export let wonderland = new Song('Wonderland', Caravan_Palace, 190, [Electro_Swing], false, 51994159);
export let melancolia = new Song('Melancolia', Caravan_Palace, 243, [Electro_Swing], false, 5000750);
export let miracle = new Song('Miracle', Caravan_Palace, 216, [Electro_Swing], false, 28790283);
export let lone_digger = new Song('Lone Digger', Caravan_Palace, 229, [Electro_Swing], false, 138620352);
export let plume = new Song('Plume', Caravan_Palace, 183, [Electro_Swing], false, 10622613);
export let wind_flower = new Song('Wind Flower', MAMAMOO, 236, [Kpop], false, 34723452);
export let piano_man = new Song('Piano Man', MAMAMOO, 195, [Kpop], true, 10164869);
export let egotistic = new Song('Egotistic', MAMAMOO, 196, [Kpop], false, 99981334);
export let hip = new Song('HIP', MAMAMOO, 195, [Kpop], false, 175734884);
export let gogobebe = new Song('Gogobebe', MAMAMOO, 195, [Kpop], false, 94616236);
export let megalovania = new Song('MEGALOVANIA', Toby_fox, 156, [Ost], false, 112608905);
export let his_theme = new Song('His Theme', Toby_fox, 125, [Ost], false, 14721484);
export let death_by_glamour = new Song('Death by Glamour', Toby_fox, 134, [Ost], false, 35193223);
export let hopes_and_dreams = new Song('Hopes and Dreams', Toby_fox, 181, [Ost], false, 27407100);
export let bonetrousle = new Song('Bonetrousle', Toby_fox, 57, [Ost], false, 22598024);
export let haberlo_pensado_antes = new Song('Haberlo Pensado Antes', Locoplaya, 200, [Rap], false, 460666);
export let vacaciones_pagadas = new Song('Vacaciones Pagadas', Locoplaya, 174, [Rap], true, 478386);
export let crazy = new Song('Crazy', Locoplaya, 237, [Rap], false, 12553334);
export let gigantes_o_molinos = new Song('Gigantes o Molinos?', Locoplaya, 202, [Rap], false, 475331);
export let el_paisaje = new Song('El Paisaje', Locoplaya, 227, [Rap], true, 2669480);


//Album
export let Asylum = new Album('Asylum', 2009, [Heavy_Metal], [Down_with_the_sickness, Numb, Savior_of_nothig, Want, Stupify]);
export let Nasarati = new Album ('Nasarati', 2018, [RyB], [Industry_Baby, Montero, Sun_Goes_Down, Old_Town_Road, Holiday]);
export let Tribute_to_uncle_Ray = new Album('Tribute To Uncle Ray', 1989, [Blues], [Smile, Sunset, Frankye_and_Johnny]);
export let Lo_mas_lejos_a_tu_lado = new Album('Lo mas lejos a tu lado', 2003, [Rock_Esp], [Garabatos, La_casa_por_el_tejado, Me_equivocaria_otra_vez]);
export let Unorthodox_jukebox = new Album('Unorthodox jukebox', 2012, [Pop], [Uptown_Funk, Smoking_out_the_window]);
export let La_llave_de_mi_corazon = new Album('La llave de mi corazon', 2007, [Bachata], [Ojala_que_llueva_cafe, La_guagua, La_bilirrubina, Burbujas_de_amor, El_niagara_en_bicicleta]);
export let Chronologic = new Album('Chronologic', 2019, [Electro_Swing], [wonderland, melancolia, miracle, lone_digger, plume]);
export let Red_Moon = new Album('Red Moon', 2018, [Kpop], [wind_flower, egotistic, hip, gogobebe]);
export let Undertale_Soundtrack = new Album('UNDERTALE Soundtrack', 2015, [Ost], [megalovania, his_theme, death_by_glamour, hopes_and_dreams, bonetrousle]);
export let Que_Dice_la_Juventud = new Album('Qué Dice la Juventud?', 2017, [Rap], [haberlo_pensado_antes, crazy, gigantes_o_molinos]);

//Asignacion de los albumnes a artistas y grupos
Disturbed.addAlbum(Asylum);
Fito_y_Fitipaldis.addAlbum(Lo_mas_lejos_a_tu_lado);
Caravan_Palace.addAlbum(Chronologic);
MAMAMOO.addAlbum(Red_Moon);
Locoplaya.addAlbum(Que_Dice_la_Juventud);
David_Draiman.addAlbum(Asylum);
John_Moyer.addAlbum(Asylum);
Mike_Wengren.addAlbum(Asylum);
Dan_Donegan.addAlbum(Asylum);
Steve_Wonder.addAlbum(Tribute_to_uncle_Ray);
Lil_Nas_X.addAlbum(Nasarati);
Fito.addAlbum(Lo_mas_lejos_a_tu_lado);
Javier_Azola.addAlbum(Lo_mas_lejos_a_tu_lado);
Jose_Bruno.addAlbum(Lo_mas_lejos_a_tu_lado);
Ricardo_Cantera.addAlbum(Lo_mas_lejos_a_tu_lado);
Bruno_Mars.addAlbum(Unorthodox_jukebox);
Juan_Luis_war.addAlbum(La_llave_de_mi_corazon);
Zoe_Colotis.addAlbum(Chronologic);
Arnaud_Vial.addAlbum(Chronologic);
Hugues_Payen.addAlbum(Chronologic);
Hwasa.addAlbum(Red_Moon);
Solar.addAlbum(Red_Moon);
Wheein.addAlbum(Red_Moon);
Moonbyul.addAlbum(Red_Moon);
Toby_fox.addAlbum(Undertale_Soundtrack);
Geni_Colegui.addAlbum(Que_Dice_la_Juventud);
Don_Patricio.addAlbum(Que_Dice_la_Juventud);

//Playlist

//Playlist de Heavy_Metal y Rock_ESP
export let Heavy_ESP = new Playlist('Heavy & Fipaldis', [Down_with_the_sickness, Numb, Savior_of_nothig, Want, Stupify, Garabatos, La_casa_por_el_tejado, Me_equivocaria_otra_vez, Soldadito_marinero, Por_la_boca_vive_el_pez], 2434, [Heavy_Metal, Rock_Esp]);

//Playlist de Ryb y Blues
export let Ryblues = new Playlist('RyBlues',[Industry_Baby, Montero, Sun_Goes_Down, Old_Town_Road, Holiday, Smile, Sunset, Superstition, So_what_the_fuss, Frankye_and_Johnny], 2051, [RyB, Blues]);
//Playlist Electro Swing y Kpop

export let K_Electro = new Playlist('K-Electro', [wonderland, melancolia, miracle, lone_digger, plume, wind_flower, egotistic, hip, gogobebe, piano_man], 2078, [Electro_Swing, Kpop]);
//Playlist Mix 
export let Mix = new Playlist('Mix', [Treasure, Grenade, Just_the_way_you_are, Uptown_Funk, Smoking_out_the_window, Ojala_que_llueva_cafe, La_guagua, La_bilirrubina, Burbujas_de_amor, El_niagara_en_bicicleta, megalovania, his_theme, death_by_glamour, hopes_and_dreams, bonetrousle, haberlo_pensado_antes, vacaciones_pagadas, crazy, gigantes_o_molinos, el_paisaje], 3933, [Pop, Bachata, Ost, Rap])

