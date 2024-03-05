import {REPLFunction} from './REPLFunction.js'
import loadCSVFunction from './loadCSVFunction';
import viewCSVFunction from './viewCSVFunction';
import searchCSVFunction from './searchCSVFunction';
import modeFunction from './modeFunction';

/**
 * This is the CommandMap class. This creates a hashMap mapping valid commands to their corresponding
 * REPLFunction. It also allows for adding or removing commands, and has an addDefaultCommands
 * to facilitate the setup of the commands in the scope of the project.
 */
export class CommandMap {
    private hashMap: { [key: string]: REPLFunction } = {};

    /**
     * Gets a command by command key.
     * 
     * @param command the key/word of the command
     * @returns the REPLFunction object
     */
    getCommand(command: string): REPLFunction {
        return this.hashMap[command];
    }

    /**
     * Puts a command and its associated function into the hashmap.
     * 
     * @param command the word used to call on the command
     * @param func the associated REPLFunction function
     */
    addCommand(command: string, func: REPLFunction) {
        this.hashMap[command] = func;
    }

    /**
     * Removes a command from the hashmap.
     * 
     * @param command the keyword of the command to be removed.
     */
    removeCommand(command: string) {
        delete this.hashMap[command];
    }

    /**
     * Adds all the default commands for the Mock project.
     */
    addDefaultCommands() {
        this.hashMap['load'] = loadCSVFunction;
        this.hashMap['view'] = viewCSVFunction;
        this.hashMap['search'] = searchCSVFunction;
        this.hashMap['mode'] = modeFunction;
    }
}