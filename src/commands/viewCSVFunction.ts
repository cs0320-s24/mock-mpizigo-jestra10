import { MockedDataMap } from './MockedDataMap.js';
import {REPLFunction} from './REPLFunction.js'
/**
 * This is the viewCSVFuntion. It checks if no arguments were passed in and if there is a non-empty
 * file loaded in. If it passes this, then it returns the loaded file that is currently loaded in.
 * This output will be converted into a HTML table in REPLHistory.
 * 
 * @param args - should be no passed in arguments
 * @param fileMap - hashMap of the file name and file content
 * @param loadedFile - the file that is currently loaded
 * @returns - string | string[][]
 */
const viewCSVFunction: REPLFunction = (args: Array<string>,
     fileMap: MockedDataMap,
      loadedFile: string[][]): string | string[][] => {
  //checks if any arguments were passed in, if there are arguments passed in then provides informative error
  if (args.length != 0){
    return 'You have inputted too many arguments'
  }
  //checks if the loaded file is empty, if so provides an informative error
  if(loadedFile.toString() === ""){
    return 'Please load a non-empty csv before running the view command'
  }
  //returns the currently loaded file to be converted into an HTML table in REPLHistory
  return loadedFile;
}

export default viewCSVFunction;