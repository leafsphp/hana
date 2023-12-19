import reactLogo from './../assets/react.svg';
import viteLogo from '/vite.svg';

import {
  getStore,
  useReducer,
  useStaticStore,
  useStore,
} from '@hanabira/store';

import { useNavigate } from '@hanabira/router';

function App() {
  // useNavigate is a hook that returns a function that can be used to navigate
  const navigate = useNavigate();

  // this calls the increment reducer which increments the count state
  const increment = useReducer('increment');
  const something = useReducer('somethingElse');

  // this is a hook that returns the count state and a dispatch function
  const [count] = useStore<number>('count');

  // this is a hook that returns the count state and a dispatch function but
  // the count is not updated when the state changes
  const [, setStaticCount] = useStaticStore<number>('count');

  // getStore is a function that returns the state of the store
  console.log('count', getStore<number>('count'));

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={increment}>count is {count}</button> <br />
        <button onClick={() => something('This is it')}>{getStore('any')}</button> <br />
        <button onClick={() => setStaticCount((count) => count + 1)}>
          count is {count} but won't show updates
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <button onClick={() => navigate('/dashboard/van')}>navigate</button>
    </>
  );
}

export default App;
