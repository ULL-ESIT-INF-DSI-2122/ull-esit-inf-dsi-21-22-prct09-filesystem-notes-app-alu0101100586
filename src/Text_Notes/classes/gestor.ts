import { Notes } from "./notes";
import * as chalk from 'chalk';
import * as fs from 'fs';

export class Gestor {
  private path: string;
  private slash: string;
  private ext: string;

  constructor() { 
    this.path = 'database/';
    this.slash = '/';
    this.ext = '.json';
  }

  /**
   * Funcion que añade una nueva nota y comprueba que existe un directorio donde 
   * se almacena y la crea, en caso de que no exista, se creará el directorio y 
   * se añadirá la nota
   * @param note Objeto de tipo nota que debemos añadir
   * @param user usuario que ha creado la nota
   */
  add(note: Notes, user: string) {
    if(fs.existsSync(this.path + user)) {
      if(fs.existsSync(this.path + user + this.slash + note.getTitle() + this.ext)) {
        console.log(chalk.red.inverse('ERROR: The Note Already Exits'));
      } else {
        let note_data = {"title": note.getTitle(), "text": note.getText(), "color": note.getColor()};
        let aux_note_data = JSON.stringify(note_data);
        fs.writeFileSync(this.path + user + this.slash + note.getTitle() + this.ext, aux_note_data);
        console.log(chalk.green.inverse('The Note Has Been Created Successfully'));
      }
    } else {
      fs.mkdirSync(this.path + user);
      let note_data = {"title": note.getTitle(), "text": note.getText(), "color": note.getColor()};
      let aux_note_data = JSON.stringify(note_data);
      fs.writeFileSync(this.path + user + this.slash + note.getTitle() + this.ext, aux_note_data);
      console.log(chalk.green.inverse('The Note Has Been Created Successfully'));
    }
  }

  /**
   * Funcion que permite modificar una nota y comprueba si el directorio y el 
   * fichero donde se almacena existan, y si es así elimina la anterior y pone 
   * la nueva informacion
   * @param note 
   * @param user 
   */
  modify(note: Notes, user: string) {
    if(fs.existsSync(this.path + user)) {
      if(fs.existsSync(this.path + user + this.slash + note.getTitle() + this.ext)) {
        fs.rmSync(this.path + user + this.slash + note.getTitle() + this.ext);
        let note_data = {"title": note.getTitle(), "text": note.getText(), "color": note.getColor()};
        let aux_note_data = JSON.stringify(note_data);
        fs.writeFileSync(this.path + user + this.slash + note.getTitle() + this.ext, aux_note_data);
        console.log(chalk.green.inverse('The Note Has Been Modified Successfully'));
      } else {
        console.log(chalk.red.inverse('ERROR: The Note Does Not Exist'));
      }
    } else {
      console.log(chalk.red.inverse('ERROR: The Path Does Not Exist'));
    }
  }

  /**
   * Funcion que permite eliminar una nota almacenada, si es que existe su 
   * directorio y fichero
   * @param note 
   * @param user 
   */
  remove(note_title: string, user: string) {
    if(fs.existsSync(this.path + user)) {
      if(fs.existsSync(this.path + user + this.slash + note_title + this.ext)) {
        fs.rmSync(this.path + user + this.slash + note_title + this.ext);
        console.log(chalk.green.inverse('The Note Has Been Successfully Deleted'))
      } else {
        console.log(chalk.red.inverse('ERROR: The Note Does Not Exist'));
      }
    } else {
      console.log(chalk.red.inverse('ERROR: The Path Does Not Exist'));
    }
  }

  /**
   * Lista los titulos de las notas del usuario en concreto
   * @param user
   */
  listHeads(user: string) {
    if(fs.existsSync(this.path + user)) {
      let notes_files = fs.readdirSync(this.path + user);
      notes_files.forEach((item) => {
        let single_note = fs.readFileSync(this.path + user + this.slash + item, 'utf-8');
        let aux_single_note = JSON.parse(single_note);
        let note = new Notes(aux_single_note['title'], aux_single_note['text'], aux_single_note['color']);
        note.printHead();
      });
    } else {
      console.log(chalk.red.inverse(`ERROR: User ${user} Has No Notes Created`));
    }
  }

  /**
   * Funcion que lee una nota en concreto de un usuario en concreto
   * @param note_title 
   * @param user 
   */
  read(note_title: string, user: string) {
    if(fs.existsSync(this.path + user)) {
      if(fs.existsSync(this.path + user + this.slash + note_title + this.ext)) {
        let single_note = fs.readFileSync(this.path + user + this.slash + note_title + this.ext, 'utf-8');
        let aux_single_note = JSON.parse(single_note);
        let note = new Notes(aux_single_note['title'], aux_single_note['text'], aux_single_note['color']);
        note.printHead();
        note.printText();
      } else {
        console.log(chalk.red.inverse('ERROR: The Note Does Not Exist'));
      }
    } else {
      console.log(chalk.red.inverse('ERROR: The Path Does Not Exist'));
    }
  }
}