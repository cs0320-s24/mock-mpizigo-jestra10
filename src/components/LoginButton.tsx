import { Dispatch, SetStateAction } from 'react';

/**
 * This is the LoginButton component. It handles the switch from a Login to Sign Out label when clicked,
 * and changes the useState setIsLogginIn accordingly.
 */

interface loginProps {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export function LoginButton(props: loginProps) {

  const authenticate = () => {
    const newValue = !props.isLoggedIn
    props.setIsLoggedIn(newValue)
    return newValue
  }

  //checks what label to switch to depending on whether the user is logged in
  if (props.isLoggedIn) {
    return (
      <button aria-label='Sign Out' onClick={authenticate}>Sign out</button>
    )
  } else {
    return (
      <button aria-label='Login' onClick={authenticate}>Login</button>
    )
  }
}