import react, {useContext, useState} from 'react'
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from '../store/auth-context';
import { login } from "../util/auth";


function LoginScreen() {
  const authCtx = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signinHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      console.log('error message', error);
      Alert.alert('Authentication failed!', 'Could not log you in. Please check your credentials or try again later!');
      const testObj = {name: 'rafe'};
      console.log('testObj', testObj);
      setIsAuthenticating(false);
    }
    
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return <AuthContent isLogin onAuthenticate={signinHandler}/>;
}

export default LoginScreen;