import React, { useEffect }  from 'react'
import Pages from './pages';
import {devtools} from 'valtio/utils'
import { actions, state } from './state';
import { useSnapshot } from 'valtio';
import Loader from './components/Loader/Loader';
import { getTokenPayload } from './utils';
import SnackBar from './components/SnackBar/SnackBar';




devtools(state, 'app state');
const App: React.FC = () => {
  const currentState = useSnapshot(state);
  useEffect(() => {
   
    actions.startLoading();

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      actions.stopLoading();
      return;
    }

    const { exp: tokenExp } = getTokenPayload(accessToken);
    const currentTimeInSeconds = Date.now() / 1000;

    if (tokenExp < currentTimeInSeconds - 10) {
      localStorage.removeItem('accessToken');
      actions.stopLoading();
      return;
    }

    actions.setPollAccessToken(accessToken); 
    actions.initializeSocket();
  }, []);

  return (
    <>
      <Loader isLoading={currentState.isLoading} color="orange" width={120} />
      {currentState.wsErrors.map((error) => (
        <SnackBar
          key={error.id}
          type="error"
          title={error.type}
          message={error.message}
          show={true}
          onClose={() => actions.removeWsError(error.id)}
          autoCloseDuration={5000}
        />
      ))}
      <Pages />
    </>
  );
};

export default App;
