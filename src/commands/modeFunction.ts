import { MockedDataMap } from './MockedDataMap.js';
import { REPLFunction } from './REPLFunction.js'
import { Dispatch, SetStateAction} from 'react';

/**
 * This is the modeFuntion. It handles the switching of modes between brief and verbose, by setting the
 * setState of briefMode, and returning an informative message that will be prined out in REPLHistory. 
 * It also ensures that it is getting the correct amount of arguments.
 * This output will be converted into a HTML table in REPLHistory.
 * 
 * @param args - should be no passed in arguments
 * @param fileMap - hashMap of the file name and file content
 * @param loadedFile - the file that is currently loaded
 * @returns - string | string[][]
 */
const modeFunction: REPLFunction = (
    args: string[],
    fileMap: MockedDataMap,
    loadedFile: string[][],
    setLoadedFile: Dispatch<SetStateAction<(string[][])>>,
    briefMode: boolean,
    setBriefMode: Dispatch<SetStateAction<boolean>>
) => {
    // if statements check for length of arguments
    if (args.length == 0) {
        return 'Please include the mode you wish to switch to';
    } else if (args.length == 1) {
        if (args[0] === "brief") {
            if (briefMode === true) {
                return 'Already in mode brief' // differentiates between passing from verbose to brief and brief to brief
            }
            setBriefMode(true)
            return 'Now in mode brief'
        }
        if (args[0] === "verbose") {
            if (briefMode === false) {
                return 'Already in mode verbose'
            }
            setBriefMode(false)
            return 'Now in mode verbose'
        }
        return 'Please specify a supported mode'
    }
    return 'You have inputted too many arguments';
}

export default modeFunction;