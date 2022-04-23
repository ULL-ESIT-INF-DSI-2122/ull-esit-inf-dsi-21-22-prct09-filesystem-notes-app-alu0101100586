#!/usr/bin/env node
import { Notes } from "../classes/notes"
import { Gestor } from "../classes/gestor"
import * as yargs from 'yargs';

/**
 * Comando para añadir una nota
 */
yargs.command({
  command: 'add',
  describe: 'New note',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title',
      demandOption: true,
      type: 'string',
    },
    text: {
      describe: 'Text',
      demandOption: true,
      type: 'string'
    },
    color: {
      describe: 'Color',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' 
       && typeof argv.text === 'string' && typeof argv.color === 'string') {
      const note = new Notes(argv.title, argv.text, argv.color);
      const gestor = new Gestor();
      gestor.add(note, argv.user);
    }
  },
});

/**
 * Comando para modificar una nota
 */
yargs.command({
  command: 'mod',
  describe: 'Modify a Note',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title',
      demandOption: true,
      type: 'string',
    },
    text: {
      describe: 'Text',
      demandOption: true,
      type: 'string'
    },
    color: {
      describe: 'Color',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' 
       && typeof argv.text === 'string' && typeof argv.color === 'string') {
    const note = new Notes(argv.title, argv.text, argv.color);
    const gestor = new Gestor();
    gestor.modify(note, argv.user);
    }
  },
});

/**
 * Comando para eliminar una nota de un usuario
 */
 yargs.command({
  command: 'remove',
  describe: 'Delete a Note',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const gestor = new Gestor();
      gestor.remove(argv.title, argv.user);
    }
  },
});

/**
 * Comando para listar las notas de un usuario
 */
yargs.command({
  command: 'list',
  describe: 'List all notes titles',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
    const gestor = new Gestor();
    gestor.listHeads(argv.user);
    }
  },
});

/**
 * Comando para leer una nota de un usuario por terminal.
 * Se pasan por parametro en terminal, el usuario y el titulo.
 */
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
    const gestor = new Gestor();
    gestor.read(argv.title, argv.user);
    }
  },
});

yargs.parse();