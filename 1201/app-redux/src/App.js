import React from 'react';
import { Counter } from './features/counter/Counter';
import {decrement} from './features/counter/counterSlice';
import { useDispatch } from 'react-redux';
import './App.css';

function App() {
  const dispatch = useDispatch();
  return (
    <div className="App">
     <Counter/>
     <button onClick={()=>{
        dispatch(decrement());
     }} >-</button>
    </div>
  );
}

export default App;
