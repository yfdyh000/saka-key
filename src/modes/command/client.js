import { Mode } from 'modes/mode/client';
import { commandTrie } from './commandTrie';
import { commands } from './commands';
import { isTextEditable } from 'lib/dom';

class Command extends Mode {
  onEnter = async (event) => {
    commandTrie.reset();
  }
  onExit = async (event) => {
    commandTrie.reset();
  }
  keydown = async (event) => {
    event.stopImmediatePropagation();
    return this.name;
  }
  keypress = async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const command = commandTrie.advance(event);
    if (command) {
      const nextMode = commands[command]();
      if (nextMode) {
        return nextMode;
      }
    }
    return this.name;
  }
  keyup = async (event) => {
    event.stopImmediatePropagation();
    return this.name;
  }
  focusin = async (event) => {
    if (isTextEditable(event.target)) {
      return 'TEXT';
    }
    return this.name;
  }
  focusout = async (event) => {
    return this.name;
  }
  click = async (event) => {
    return this.name;
  }
  mousedown = async (event) => {
    return this.name;
  }
  scroll = async (event) => {
    return this.name;
  }
  actions = {}
};

export const COMMAND = new Command('COMMAND');