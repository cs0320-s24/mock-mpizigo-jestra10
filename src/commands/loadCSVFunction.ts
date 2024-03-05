import { Dispatch, SetStateAction, useState} from 'react';
import { MockedDataMap } from './MockedDataMap.js';
import {REPLFunction} from './REPLFunction.js'
/**
 * This is the loadCSVfunction. It takes in the users passed in file path, and attempts
 * to load it in. If the file path is accepted, then it will set the loadedFile constant
 * to the file just loaded in. If the file path is not accepted then it will provide the
 * error on why it was not accepted.
 * 
 * @param args - arg passed in is file name
 * @param fileMap - hashMap of the file name and file content
 * @param loadedFile - the file that is currently loaded
 * @param setLoadedFile - setter that can change the file currently loaded
 * @returns string | string[][]
 */
const loadCSVFunction: REPLFunction = (args: Array<string>,
     fileMap: MockedDataMap,
      loadedFile: string[][],
       setLoadedFile: Dispatch<SetStateAction<(string[][])>>): string | string[][] => {
    //checks if a file path was passed in, if not provides informative error
    if (args.length == 0) {
        return 'Please include the file you want to load';
    } 
    //if a file path was provided
    else if (args.length == 1) {
        //checks if filepath exists in fileMap, if not provides informative error
        if (fileMap.getFile(args[0]) != null){
            //if the file trying to be uploaded is empty, ask the user to upload a non empty csv
            if (fileMap.getFile(args[0]).toString() === ""){
                return 'Please load a non-empty file'
            }
            //if the file trying to be uploaded is currently the loaded file, tell the user that
            //the file is already uploaded 
            if (fileMap.getFile(args[0]).toString() === loadedFile.toString()) {
                return 'File is already loaded';
            }
            //set the loaded file to the file the user requested and inform the user its been done
            setLoadedFile(fileMap.getFile(args[0]));
            return 'File successfully loaded';
        }
        return 'Please give a supported file path';
    }
    return 'You have inputted too many arguments';
}

export default loadCSVFunction;