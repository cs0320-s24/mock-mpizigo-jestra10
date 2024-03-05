import {mockedData} from '../data/mockedData';
/**
 * This is the MockedDataMap class. This creates a hashMap class specifically meant for mapping
 * possible file names to its file contents. This class is instantiated in REPLInput and is to be
 * used in loadCSV, searchCSV, and viewCSV. It provides functions to get a file, add a file, remove
 * a file, and a function to add default files which retrieves it from a mockedData file. These
 * methods make it easier for another developer to use this class to add or remove their own files.
 * This class also provides a function for a mocked version of Search, replicating responses that 
 * search would give depening on the arguments passed in.
 */
export class MockedDataMap {
    //this creates the hashmap used to map a file to its file contents
    private hashMap: { [key: string]: string[][] } = {};
    
    /**
     * Gets a file from the hashmap according to the filename
     * 
     * @param string name of the file
     */ 
    getFile(fileName: string): string[][] {
        return this.hashMap[fileName];
    }

    /**
     * Adds a file and its content to the hashmap
     * 
     * @param fileName the name of the file
     * @param file the data (the actual file)
     */
    addFile(fileName: string, file: string[][]) {
        this.hashMap[fileName] = file;
    }

    /**
     * Removes a file from the file map
     * 
     * @param fileName the name of the file
     */
    removeFile(fileName: string) {
        delete this.hashMap[fileName];
    }
    
    /**
     * Adds all the default files for the Mock project.
     */
    addDefaultFiles() {
        this.hashMap['data/simpleData.csv'] = mockedData('simpleData');
        this.hashMap['data/headerData.csv'] = mockedData('headerData')
        this.hashMap['data/oneColumnData.csv'] = mockedData('oneColumnData');
        this.hashMap['data/emptyData.csv'] = mockedData('emptyData');
        this.hashMap['data/malformedData.csv'] = mockedData('malformedData');
        this.hashMap['data/repeatedData.csv'] = mockedData('repeatedData');
    }
    
    /**
     * Performs a "mocked search" depending on the arguments passed in through the search command.
     * Manually checks for inputs and returns the necessary outputs (instead of actually searching
     * through a file.)
     * 
     * @param column the column header or index
     * @param value the value to search for
     * @param loadedFile the file that has been loaded
     * @returns an informative string message or data as a string[][]
     */
    mockSearch(column: string, value: string, loadedFile: string[][]): string | string[][]  {
        //format the string to remove excess spaces and make it lower case
        let columnFormatted = column.trim().toLowerCase();
        let valueFormatted = value.trim().toLowerCase();
        //create a boolean that will tell us if the column identifier is a string or only contains numbers
        let nonIntegerColumnBoolean = /[a-z]/i.test(columnFormatted);
        //this if statement replicates search for the simpleData.csv
        if (loadedFile.toString() == this.hashMap['data/simpleData.csv'].toString()){
            //check if column is an integer, if it is then replicate search
            if (!nonIntegerColumnBoolean){
                if (parseInt(columnFormatted) > 3 || parseInt(columnFormatted) < 0){
                    return 'Error: index ' + column + ' is out of range of data set'
                }
                if (columnFormatted == "1"){
                    if (valueFormatted == "hello"){
                        return [["hello", "my", "name"]];
                    }
                    if (valueFormatted == "is"){
                        return [["is","billy","bob"]];
                    }
                    if (valueFormatted == "and"){
                        return [["and", "I", "like"]];
                    }
                    if (valueFormatted == "eating"){
                        return [["eating", "hot", "dogs"]];
                    }
                }
                if (columnFormatted == "2"){
                    if (valueFormatted == "my"){
                        return [["hello", "my", "name"]];
                    }
                    if (valueFormatted == "billy"){
                        return [["is","billy","bob"]];
                    }
                    if (valueFormatted == "i"){
                        return [["and", "I", "like"]];
                    }
                    if (valueFormatted == "hot"){
                        return [["eating", "hot", "dogs"]];
                    }
                }
                if (columnFormatted == "3"){
                    if (valueFormatted == "name"){
                        return [["hello", "my", "name"]];
                    }
                    if (valueFormatted == "bob"){
                        return [["is","billy","bob"]];
                    }
                    if (valueFormatted == "like"){
                        return [["and", "I", "like"]];
                    }
                    if (valueFormatted == "dogs"){
                        return [["eating", "hot", "dogs"]];
                    }
                }
            }
            //if column is a string then replicate search for column is a string
            if (columnFormatted == "hello"){
                if (valueFormatted == "hello"){
                    return [["hello", "my", "name"]];
                }
                if (valueFormatted == "is"){
                    return [["is","billy","bob"]];
                }
                if (valueFormatted == "and"){
                    return [["and", "I", "like"]];
                }
                if (valueFormatted == "eating"){
                    return [["eating", "hot", "dogs"]];
                }
            }
            if (columnFormatted == "my"){
                if (valueFormatted == "my"){
                    return [["hello", "my", "name"]];
                }
                if (valueFormatted == "billy"){
                    return [["is","billy","bob"]];
                }
                if (valueFormatted == "i"){
                    return [["and", "I", "like"]];
                }
                if (valueFormatted == "hot"){
                    return [["eating", "hot", "dogs"]];
                }
            }
            if (columnFormatted == "name"){
                if (valueFormatted == "name"){
                    return [["hello", "my", "name"]];
                }
                if (valueFormatted == "bob"){
                    return [["is","billy","bob"]];
                }
                if (valueFormatted == "like"){
                    return [["and", "I", "like"]];
                }
                if (valueFormatted == "dogs"){
                    return [["eating", "hot", "dogs"]];
                }
            }
        }
        //this if statement replicates search for the oneColumnData.csv
        if (loadedFile.toString() == this.hashMap['data/oneColumnData.csv'].toString()){
            //if column is a integer then replicate search for column is a integer
            if (!nonIntegerColumnBoolean){
                if (parseInt(columnFormatted) != 1){
                    return 'Error: index ' + column + ' is out of range of data set'
                }
                if (valueFormatted == "yum"){
                    return [["yum"],["yum"]];
                }
                if (valueFormatted == "burger"){
                    return [["burger"]];
                }
                if (valueFormatted == "king"){
                    return [["king"]];
                }
                if (valueFormatted == "is"){
                    return [["is"]];
                }
                if (valueFormatted == "so"){
                    return [["so"]];
                }
            }
            //if column is a string then replicate search for column is a string
            if (columnFormatted == "burger"){
                if (valueFormatted == "yum"){
                    return [["yum"],["yum"]];
                }
                if (valueFormatted == "burger"){
                    return [["burger"]];
                }
                if (valueFormatted == "king"){
                    return [["king"]];
                }
                if (valueFormatted == "is"){
                    return [["is"]];
                }
                if (valueFormatted == "so"){
                    return [["so"]];
                }
            }
        }
        //this if statement replicates search for the malformedData.csv
        if (loadedFile.toString() == this.hashMap['data/malformedData.csv'].toString()){
            //if column is an integer then replicate search for column is an integer
            if (!nonIntegerColumnBoolean){
                if (parseInt(columnFormatted) > 2){
                    return 'Error: index ' + column + ' is out of range of data set'
                }
                if (columnFormatted == "1"){
                    if (valueFormatted == "i"){
                        return [["I", "am"]];
                    }
                    if (valueFormatted == "malformed"){
                        return [["malformed", "data","the","third"]];
                    }
                    if (valueFormatted == "nice"){
                        return [["nice", "to", "meetyou"]];
                    }
                }
                if (columnFormatted == "2"){
                    if (valueFormatted == "am"){
                        return [["I", "am"]];
                    }
                    if (valueFormatted == "data"){
                        return [["malformed", "data","the","third"]];
                    }
                    if (valueFormatted == "to"){
                        return [["nice", "to", "meetyou"]];
                    }
                }
            }
            //if column is a string then replicate search for column is a string
            if (columnFormatted == "i"){
                if (valueFormatted == "i"){
                        return [["I", "am"]];
                    }
                if (valueFormatted == "malformed"){
                    return [["malformed", "data","the","third"]];
                }
                if (valueFormatted == "nice"){
                    return [["nice", "to", "meetyou"]];
                }
            }
            if (columnFormatted == "am"){
                if (valueFormatted == "am"){
                        return [["I", "am"]];
                    }
                if (valueFormatted == "data"){
                    return [["malformed", "data","the","third"]];
                }
                if (valueFormatted == "to"){
                    return [["nice", "to", "meetyou"]];
                }
            }
        }
        //this if statement replicates search for the headerData.csv
        if (loadedFile.toString() == this.hashMap['data/headerData.csv'].toString()){
            //if column is an integer then replicate search for column is an integer
            if (!nonIntegerColumnBoolean){
                if (parseInt(columnFormatted) > 3 || parseInt(columnFormatted) < 0){
                    return 'Error: index ' + column + ' is out of range of data set'
                }
                if (columnFormatted == "1"){
                    if (valueFormatted == "name"){
                        return [["name", "age", "job"]];
                    }
                    if (valueFormatted == "nimtelson"){
                        return [["nimtelson", "420", "engineer"]];
                    }
                    if (valueFormatted == "ashketchum"){
                        return [["ashketchum", "12", "pokemontrainer"]];
                    }
                    if (valueFormatted == "andyvandam"){
                        return [["andyvandam", "76", "professor"]];
                    }
                }
                if (columnFormatted == "2"){
                    if (valueFormatted == "age"){
                        return [["name", "age", "job"]];
                    }
                    if (valueFormatted == "420"){
                        return [["nimtelson", "420", "engineer"]];
                    }
                    if (valueFormatted == "12"){
                        return [["ashketchum", "12", "pokemontrainer"]];
                    }
                    if (valueFormatted == "76"){
                        return [["andyvandam", "76", "professor"]];
                    }
                }
                if (columnFormatted == "3"){
                    if (valueFormatted == "job"){
                        return [["name", "age", "job"]];
                    }
                    if (valueFormatted == "engineer"){
                        return [["nimtelson", "420", "engineer"]];
                    }
                    if (valueFormatted == "pokemontrainer"){
                        return [["ashketchum", "12", "pokemontrainer"]];
                    }
                    if (valueFormatted == "professor"){
                        return [["andyvandam", "76", "professor"]];
                    }
                }
            }
            //if column is a string then replicate search for column is a string
            if (columnFormatted == "name"){
                if (valueFormatted == "name"){
                    return [["name", "age", "job"]];
                }
                if (valueFormatted == "nimtelson"){
                    return [["nimtelson", "420", "engineer"]];
                }
                if (valueFormatted == "ashketchum"){
                    return [["ashketchum", "12", "pokemontrainer"]];
                }
                if (valueFormatted == "andyvandam"){
                    return [["andyvandam", "76", "professor"]];
                }
            }
            if (columnFormatted == "age"){
                if (valueFormatted == "age"){
                    return [["name", "age", "job"]];
                }
                if (valueFormatted == "420"){
                    return [["nimtelson", "420", "engineer"]];
                }
                if (valueFormatted == "12"){
                    return [["ashketchum", "12", "pokemontrainer"]];
                }
                if (valueFormatted == "76"){
                    return [["andyvandam", "76", "professor"]];
                }
            }
            if (columnFormatted == "job"){
                if (valueFormatted == "job"){
                    return [["name", "age", "job"]];
                }
                if (valueFormatted == "engineer"){
                    return [["nimtelson", "420", "engineer"]];
                }
                if (valueFormatted == "pokemontrainer"){
                    return [["ashketchum", "12", "pokemontrainer"]];
                }
                if (valueFormatted == "professor"){
                    return [["andyvandam", "76", "professor"]];
                }
            }
        }
        //this if statement replicates search for the repeatedData.csv
        if (loadedFile.toString() == this.hashMap['data/repeatedData.csv'].toString()){
            //if column is an integer then replicate search for column is an integer
            if (!nonIntegerColumnBoolean){
                if (parseInt(columnFormatted) > 3 || parseInt(columnFormatted) < 0){
                    return 'Error: index ' + column + ' is out of range of data set'
                }
                if (columnFormatted == "1"){
                    if (valueFormatted == "what"){
                        return [["what", "what", "what"],["what", "yo", "oops"],["what", "what", "what"]];
                    }
                    if (valueFormatted == "ah"){
                        return [["ah", "yo", "sup"],];
                    }
                }
                if (columnFormatted == "2"){
                    if (valueFormatted == "what"){
                        return [["what", "what", "what"],["what", "what", "what"]];
                    }
                    if (valueFormatted == "yo"){
                        return [["ah", "yo", "sup"],["what", "yo", "oops"]];
                    }
                }
                if (columnFormatted == "3"){
                    if (valueFormatted == "what"){
                        return [["what", "what", "what"],["what", "what", "what"]];
                    }
                    if (valueFormatted == "sup"){
                        return [["ah", "yo", "sup"]];
                    }
                    if (valueFormatted == "oops"){
                        return [["what", "yo", "oops"]];
                    }
                }
            }
            //if column is a string then replicate search for column is a string
            if (columnFormatted == "what"){
                if (valueFormatted == "what"){
                    return [["what", "what", "what"],
                    ["what", "yo", "oops"],
                    ["what", "what", "what"]];
                }
                if (valueFormatted == "yo"){
                    return [["ah", "yo", "sup"], ["what", "yo", "oops"]];
                }
                if (valueFormatted == "ah" || valueFormatted == "sup"){
                    return [["ah", "yo", "sup"]];
                }
                if (valueFormatted == "oops"){
                    return [["what", "yo", "oops"]];
                }
            }
        }
        //if the search didn't find any instance of the arguments passed in,
        //then give a response informing the user of that
        return 'No instances of value: ' + value + ' were found in column: ' + column;
    }
}