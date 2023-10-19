import { useAuthState, signInWithGoogle, signOut } from './../utilities/firebase.js';
import "./AuthButton.css";
function AuthButton() {
    const [user] = useAuthState();
  
    const handleSignIn = () => {
      signInWithGoogle();
    };
  
    const handleSignOut = () => {
      signOut();
    };
  
    return (
      <div>
        {user ? (
          <button onClick={handleSignOut}>Log Out</button>
        ) : (
          <button onClick={handleSignIn}>Log In with Google</button>
        )}
      </div>
    );
  }
  
  export default AuthButton;