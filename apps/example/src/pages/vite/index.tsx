import reactLogo from './../assets/react.svg';
import viteLogo from '/vite.svg';

import {
  getStore,
  useReducer,
  useStaticStore,
  useStore,
} from '@hanabira/store';

import { useNavigate } from '@hanabira/router';

const Dummy: React.FC = () => {
  const [state, setState] = useStore<{count: number}>();

  return (
    <div>
      dummy{' '}
      <button
        onClick={() => {
          setState({ count: 0 });
        }}
      >
        Dummy {state.count}
      </button>
    </div>
  );
}

function App() {
  // useNavigate is a hook that returns a function that can be used to navigate
  const navigate = useNavigate();

  // this calls the increment reducer which increments the count state
  const increment = useReducer('increment');

  // this is a hook that returns the count state and a dispatch function
  const [count, setCount] = useStore<number>('count');

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
        <Dummy />
        <button onClick={increment}>count is {count} with Reducer</button> <br />
        <button onClick={() => setCount(count + 1)}>count is {count} with setCount</button> <br />
        <br />
        <button onClick={() => {
          // we use the setStaticCount function to update the count state
          // this will update the count but will not trigger a re-render
          // this means all the values of count will remain the same in the UI
          // but the state will be updated. Check the console to see the state
          // change
          setStaticCount((count) => {
            console.log('secret count', count);

            return count + 1;
          });

          // the buttons above will update the count using the count that is
          // rendered in the UI. This means that the count will be reset to the
          // value that is rendered in the UI. This is expected behaviour so
          // be careful when using useStaticStore and useStore together because
          // you might get them out of sync

          // if you want to update the count using the state that is in the
          // store then you can do this
          // setCount((count) => count + 1);
        }}>
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
