import { MockedDataMap } from './MockedDataMap.js';
import {REPLFunction} from './REPLFunction.js'
/**
 * This is the searchCSVfunction. It takes in the users argument of column and identifier and passes
 * it into the mockSearch method. If there is no currently loaded file or the undesired number of 
 * arguments are provided then it returns an informative message.
 * 
 * @param args - args passed in is the column identifier and the value being searched for in the csv
 * @param fileMap - hashMap of the file name and file content
 * @param loadedFile - the file that is currently loaded
 * @returns - string | string[][], returns what the method of mockSearch returns
 */
const searchCSVFunction: REPLFunction = (args: Array<string>, fileMap: MockedDataMap, loadedFile: string[][]): string | string[][] => {
    //checks if there is a non-empty file loaded in, if not provides an informative error
    if (loadedFile.toString() == ""){
        return 'Please load a non-empty csv before running the search command'
    }
    //checks if the desired number of arguments was passed in, if not provides an informative error
    if (args.length != 2) {
        return 'Error: undesired number of arguments. Please follow the format of \'search <column> <value>\''
    }
    //passes the arguments into mockSearch method.
    return fileMap.mockSearch(args[0], args[1], loadedFile);
}

export default searchCSVFunction;