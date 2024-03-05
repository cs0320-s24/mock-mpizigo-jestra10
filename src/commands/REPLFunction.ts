import { Dispatch, SetStateAction } from 'react';
import { MockedDataMap } from './MockedDataMap';

/**
 * A command-processor function for our REPL. The function returns a string or string[][], 
 * which is the value to print to history when the command is done executing.
 * 
 * @returns string | string[][] history output
 */
export interface REPLFunction {    
    (args: Array<string>,
        fileMap: MockedDataMap,
        loadedFile: string[][],
        setLoadedFile: Dispatch<SetStateAction<(string[][])>>,
        briefMode: boolean,
        setBriefMode: Dispatch<SetStateAction<boolean>>): string | string[][];
}
