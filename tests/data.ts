import { MusicGender } from "../src/music_gender";
import { Artist } from "../src/artist";
import { Group } from "../src/group";
import { Song } from '../src/song';
import { Album } from "../src/album";
import { Playlist } from "../src/playlist";

// Music Gender
let Heavy_Metal = new MusicGender('Heavy Metal');
let RyB = new MusicGender('R&B');
let Blues = new MusicGender('Blues');
let Rock_Esp = new MusicGender('Rock Español');
let Pop = new MusicGender('Pop');
let Bachata = new MusicGender('Bachata');
let Electro_Swing = new MusicGender('Electro Swing');
let Kpop = new MusicGender('K-Pop');
let Ost = new MusicGender('Banda Sonora');
let Rap = new MusicGender('Rap');

//Artist
let David_Draiman = new Artist("David Draiman", [Heavy_Metal], 539048);
let John_Moyer = new Artist("John Moyer", [Heavy_Metal], 0);
let Mike_Wengren = new Artist('Mike Wengren', [Heavy_Metal], 112);
let Dan_Donegan = new Artist('Dan Donegan', [Heavy_Metal], 0);

let Steve_Wonder = new Artist('Steve Wonder', [Blues], 15327758);

let Lil_Nas_X = new Artist('Montero Lamar Hill', [RyB], 49522921);

let Fito = new Artist('Fito Cabrales', [Rock_Esp], 0);
let Javier_Azola = new Artist('Javier Azola', [Rock_Esp], 0);
let Jose_Bruno = new Artist('Jose Bruno', [Rock_Esp], 0);
let Ricardo_Cantera = new Artist('Ricardo Cantera', [Rock_Esp], 0);
let Bruno_Mars = new Artist('Peter Gene Hernandez', [Pop], 52087795);
let Juan_Luis_war = new Artist('Juan Luis Guerra', [Bachata], 7220793);

//Groups
let Disturbed = new Group('Disturbed', [David_Draiman, John_Moyer, Mike_Wengren, Dan_Donegan], [Heavy_Metal], 8850577);

let Fito_y_Fitipaldis = new Group('Fito y Fitipaldis', [Fito, Javier_Azola, Jose_Bruno, Ricardo_Cantera], [Rock_Esp], 2037838);

//Song
let Down_with_the_sickness = new Song('Down With The Sickness', Disturbed, 263.40, [Heavy_Metal], false, 516338655);
let Numb = new Song('Numb', Disturbed, 207.60, [Heavy_Metal], false, 1640851);
let Savior_of_nothig = new Song('Savior Of Nothing', Disturbed, 247.2, [Heavy_Metal], false, 2308077);
let Want = new Song('Want', Disturbed, 195, [Heavy_Metal], false, 7256401);
let Stupify = new Song('Stupify', Disturbed, 243, [Heavy_Metal], false, 27122910);

let Industry_Baby = new Song('Industry Baby', Lil_Nas_X, 213, [RyB], false, 326199448);
let Montero = new Song('Montero', Lil_Nas_X, 183, [RyB], false, 452879557);
let Sun_Goes_Down = new Song('Sun Goes Down', Lil_Nas_X, 151.2, [RyB], false, 39485162);
let Old_Town_Road = new Song('Old Town Road', Lil_Nas_X, 234, [RyB], false, 631858029);
let Holiday = new Song('Holiday', Lil_Nas_X, 148.7, [RyB], false, 209931052);

let Smile = new Song('Smile', Steve_Wonder, 192.7, [Blues], false, 30600);
let Sunset = new Song('Sunset', Steve_Wonder, 189, [Blues], false, 54892);
let Superstition = new Song('Superstition', Steve_Wonder, 255.6, [Blues], true, 19757336);
let So_what_the_fuss = new Song('So What The Fuss', Steve_Wonder, 302, [Blues], true, 113159);
let Frankye_and_Johnny = new Song('Frankye & Johnny', Steve_Wonder, 184, [Blues], false, 16503);

let Garabatos = new Song('Garabatos', Fito_y_Fitipaldis, 264, [Rock_Esp], false, 7077525);
let La_casa_por_el_tejado = new Song('La casa por el tejado', Fito_y_Fitipaldis, 241.8, [Rock_Esp], false, 23218193);
let Me_equivocaria_otra_vez = new Song('Me equivocaria otra vez', Fito_y_Fitipaldis, 301.8, [Rock_Esp], false, 28197359);
let Por_la_boca_vive_el_pez = new Song('Por la boca vive el pez', Fito_y_Fitipaldis, 258,[Rock_Esp], true, 58744450);
let Soldadito_marinero = new Song('Soldadito marinero', Fito_y_Fitipaldis, 215.4 ,[Rock_Esp], true, 57833321);

let Treasure = new Song('Treasure', Bruno_Mars, 186.6, [Pop], true, 637112893);
let Grenade = new Song('Grenade', Bruno_Mars, 204, [Pop], true, 1073534484);
let Just_the_way_you_are = new Song('Just the way you are', Bruno_Mars, 213.6, [Pop], true, 1704676116);
let Uptown_Funk = new Song('Uptown Funk', Bruno_Mars, 258, [Pop], false, 4515115221);
let Smoking_out_the_window = new Song('Smoking out the window', Bruno_Mars, 192,[Pop], false, 107032201);

let Ojala_que_llueva_cafe = new Song('Ojala que llueva que cafe', Juan_Luis_war, 247.8, [Bachata], false, 1481024);
let La_guagua = new Song('La guagua', Juan_Luis_war, 209.4 , [Bachata], false, 5160713);
let La_bilirrubina = new Song('La bilirrubina', Juan_Luis_war, 243,[Bachata], false, 38323024);
let Burbujas_de_amor = new Song('Burbujas de amor', Juan_Luis_war, 246, [Bachata], false, 85394327);
let El_niagara_en_bicicleta = new Song('El niagara en bicicleta', Juan_Luis_war, 241.2 , [Bachata], false, 29704527);


//Album
let Asylum = new Album('Asylum', 2009, [Heavy_Metal], [Down_with_the_sickness, Numb, Savior_of_nothig, Want, Stupify]);
let Nasarati = new Album ('Nasarati', 2018, [RyB], [Industry_Baby, Montero, Sun_Goes_Down, Old_Town_Road, Holiday]);
let Tribute_to_uncle_Ray = new Album('Tribute To Uncle Ray', 1989, [Blues], [Smile, Sunset, Frankye_and_Johnny]);


let Lo_mas_lejos_a_tu_lado = new Album('Lo mas lejos a tu lado', 2003, [Rock_Esp], [Garabatos, La_casa_por_el_tejado, Me_equivocaria_otra_vez]);
let Unorthodox_jukebox = new Album('Unorthodox jukebox', 2012, [Pop], [Uptown_Funk, Smoking_out_the_window]);
let La_llave_de_mi_corazon = new Album('La llave de mi corazon', 2007, [Bachata], [Ojala_que_llueva_cafe, La_guagua, La_bilirrubina, Burbujas_de_amor, El_niagara_en_bicicleta]);


//Playlist
