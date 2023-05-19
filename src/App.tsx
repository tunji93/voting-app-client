import React  from 'react'
import Pages from './pages';
import {devtools} from 'valtio/utils'
import { state } from './state';

devtools(state, 'state')
const App: React.FC = () => {
  return (
   <Pages/>
  );
};

export default App
