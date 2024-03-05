import '../styles/main.css';
import { Dispatch, SetStateAction, useState} from 'react';
import { ControlledInput } from './ControlledInput';
import { CommandMap } from '../commands/CommandMap';
import { MockedDataMap } from '../commands/MockedDataMap';

/**
 * This is the REPLInput component. It handles user command input into Mock. It returns the input
 * fieldset for the user.
 */


//This is the REPLInputProps interface. We pass this type into the argument type of the function REPLInput.
//This ensures that these arguments are passed into the function.
interface REPLInputProps{
  history: (string | string[][])[][],
  setHistory: Dispatch<SetStateAction<(string | string[][])[][]>>
  briefMode: boolean
  setBriefMode: Dispatch<SetStateAction<boolean>>
}

/**
 * This is the REPLInput function. It creates two useState hooks for the command string and the file loaded in, 
 * and instatiates the file and command map. It returns a Submit button that on click handles the inputted
 * commands using ControlledInput. It updates REPLHistory through the history state hook.
 * 
 * @param props - type REPLInput which the interface can be seen above
 * @returns - html code to be displayed on the website
 */
export function REPLInput(props : REPLInputProps) {
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>('');
  // Manages the currently loaded in file
  const [loadedFile, setLoadedFile] = useState< (string[][]) >([]);
  //creates a new instance of a command map and loads in the default commands into that map
  const commandMap = new CommandMap();
  commandMap.addDefaultCommands();
  //creates a new instance of a file map and loads in the default files into that map
  const fileMap = new MockedDataMap();
  fileMap.addDefaultFiles();
  
  /**
   * Runs the inputted command and updates the history accordingly. Executes every time the Submit button
   * is clicked.
   * 
   * @param commandString the inputted command
   */
  function handleSubmit(commandString: string) {
    //split up the arguments typed in
    let strArray: string[] = commandString.split(' ');
    //if the command exists in the command map then run the command and pass in repsective arguments
    if (commandMap.getCommand(strArray[0]) != null) {
      props.setHistory([...props.history, [commandString, commandMap.getCommand(strArray[0])(strArray.slice(1), fileMap, loadedFile, setLoadedFile, props.briefMode, props.setBriefMode)]]);
    } 
    //if the command doesn't exist in the command map, then provide informative error message and update history
    else {
      props.setHistory([...props.history, [commandString, "Command not recognized"]]);
    }
    //reset the command string so the next command can be typed in
    setCommandString('');
  }

    //This is the HTML code for instantiating a text box and a button for it.
    return (
        <div className="repl-input">
            <fieldset>
              <legend>Enter a command:</legend>
          <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"}/>
            </fieldset>
        
          <button onClick={() => handleSubmit(commandString)}>
            Submit
        </button>
        </div>
    );
  }