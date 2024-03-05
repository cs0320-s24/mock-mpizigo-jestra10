import '../styles/main.css';


/**
 * This is the REPLHistory component. It handles formatting command history and retrieved data into tables,
 * and displaying the history on the website.
 */

/**
 * Interface type passed into argument type of REPLHistory, this ensures that the necessary arguments are
 * passed into the function.
 */
interface REPLHistoryProps{
    history: (string | string[][])[][]
    briefMode: boolean
}

/**
 * A helper function to format each command that is currently in the history array.
 * 
 * @param command the command inputted on the website
 * @param briefMode whether the history should be displayed in brief mode or not
 * @returns a div containing the command history up until now in either brief or verbose mode
 */
function tableGenerator(command: string | string[][], briefMode: boolean){
    //if the argument passed in is a string then just need paragraph tags
    if (typeof command === "string"){
        //check if we're in brief mode
        if (briefMode){
            return (
            <p>{command}</p>
        );
        }
        return (
            <p>Output: {command}</p>
        );
    }
    //if the argument passed in was a string[][], we create an HTML table for it
    else{
        //check if in brief mode
        if (briefMode){
            return (
                <table>
                    <tbody>
                    {
                        command.map((command) =>
                            <tr>{command.map((cell) =>
                                <td>{cell}</td>)}
                                </tr>)
                    }
                    </tbody>
                </table>
            );
        }
        //if in brief mode then create an Output: display before creating the HTML table
        return (
            <div>
                <p>Output:</p>
                <table>
                    <tbody>
                    {
                        command.map((command) =>
                            <tr>{command.map((cell) =>
                                <td>{cell}</td>)}
                                </tr>)
                    }
                    </tbody>
                </table>
            </div>
        ); 
    }
}
/**
 * This function turns the history array passed in into HTML code to display the history on the
 * website. In it, it checks if the responses should be brief or verbose. It also calls a helper
 * function called tableGenerator() to help display the history in the correct format.
 * 
 * @param props - of type REPLHistoryProps
 * @returns - HTML code for displaying the history
 */
export function REPLHistory(props : REPLHistoryProps) {
    //check if in briefmode
    if (props.briefMode) {
        //map through the history array and call the helper function on each element
        //to display each element in the correct format
        return (
            <div className="repl-history">
                {
                    props.history.map((command) =>
                        tableGenerator(command[1], props.briefMode))
                }
            </div>
        );
    }
    //If not in briefmode then must show the command and its output. Also
    //map through the history array and call the helper function on each element
    //to display each element in the correct format
    return (
            <div className="repl-history">
                {
                    props.history.map((command) => (
                        <div>
                            <p>Command: {command[0]}</p>
                            {tableGenerator(command[1], props.briefMode)}
                        </div>))
                }
            </div>
        );
}