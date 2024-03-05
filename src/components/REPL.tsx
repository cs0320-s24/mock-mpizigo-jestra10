import { useState } from 'react';
import '../styles/main.css';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';

/**
 * This is a top level component for the REPL. Here we create two useState hooks, history and briefmode
 * that is passed into both REPLHistory and REPLInput. This allows them to both be called on and both
 * share the same states so that if one is updated, it updates the other.
 * 
 * @returns - HTML code
 */
export default function REPL() {
  //this is where we set up the useStates for history and briefMode
  const [history, setHistory] = useState< (string | string[][])[][] >([])
  const [briefMode, setBriefMode] = useState<boolean>(true)
  //below is where we call REPLHistory and REPLInput and pass in the sharedstates
  return (
    <div className="repl">  
      <REPLHistory history={history} briefMode={briefMode} />
      <hr></hr>
      <REPLInput history={history} setHistory={setHistory} briefMode={briefMode} setBriefMode={setBriefMode} />
    </div>
  );
}
