import React  from 'react'
import Pages from './pages';
import {devtools} from 'valtio/utils'
import { state } from './state';
import { useSnapshot } from 'valtio';
import Loader from './components/Loader/Loader';




devtools(state, 'app state');
const App: React.FC = () => {
  const currentState = useSnapshot(state);

  return (
    <>
      <Loader isLoading={currentState.isLoading} color="orange" width={120} />
      <Pages />
    </>
  );
};

export default App;
