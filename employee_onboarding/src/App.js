import logo from './logo.svg';
import './App.css';
import { increment , decrement , setValue } from './store/exampleSlice';
import { useSelector,useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.example.value);


  
  return (
    <div >
   <h1 className="bg-red-400 text-lg ">Abi</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(setValue(42))}>Set Value to 42</button>
   <div>Value: {count}</div>;
    </div>
  );
}

export default App;
