import * as inquirer from 'inquirer';
import { Funcionality } from "../Funcionality/funcionality";
import { Gestor } from "../Gestor/gestor";

inquirer.prompt({
  type: 'list',
  name: 'action',
  message: 'Seleccione lo que quiera consultar: ', 
  choices: ['Biblioteca Musical', 'Playlist']
}).then(answers => {
  if(answers.action == 'Biblioteca Musical') {
    const func: Funcionality = new Funcionality();
    func.start();
  } else {
    const gest: Gestor = new Gestor();
    gest.start();
  }
});