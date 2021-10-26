import { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { mergeSortAnimations } from './algorithms/mergeSort';
import { State, Action, ActionType } from './models/model';
import {
  DEFAULT_ARRAY_SIZE,
  ANIMATION_SPEED_MS,
  COMPARISON_COLOR,
} from './config/config';

import classes from './App.module.css';

const reducer = (state: State, action: Action): any => {
  switch (action.type) {
    case ActionType.SizeChange:
      return { value: state.value, size: action.payload };
    case ActionType.ValueChange:
      return { value: action.payload, size: state.size };
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    value: [],
    size: DEFAULT_ARRAY_SIZE,
  });

  const sliderChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.SizeChange, payload: +event.target!.value });
  };

  // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
  const generateArrayHandler = useCallback(() => {
    const generatedArray: number[] = [];
    for (let i = 0; i < state.size; i++)
      // duplicated values allowed!
      generatedArray.push(Math.floor(Math.random() * (800 - 5 + 1)) + 5);
    dispatch({ type: ActionType.ValueChange, payload: generatedArray });
  }, [state.size]);

  const mergeSortHandler = () => {
    const arrayCopy = [...state.value];
    const animations: number[][] = mergeSortAnimations(arrayCopy);
    for (let i = 0; i < animations.length; i++) {
      const bars = document.getElementsByClassName('App_bar__2Q8P3');
      const bar = bars[animations[i][0]] as HTMLElement;
      if (i % 2 === 0) {
        setTimeout(() => {
          bar.style.backgroundColor = COMPARISON_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          bar.style.height = `${animations[i][1] * 0.7}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  useEffect(() => {
    generateArrayHandler();
  }, [generateArrayHandler]);

  return (
    <>
      <div className={classes.container}>
        {state.value.map((value: number, index: number) => (
          <div
            key={index}
            className={classes.bar}
            style={{
              height: `${value * 0.7}px`,
            }}
          ></div>
        ))}
      </div>
      <div className={classes.menu}>
        <button onClick={generateArrayHandler}>Generate New Array</button>
        <p>Change array size</p>
        <input
          type="range"
          min="5"
          max="100"
          onChange={sliderChangeHandler}
        ></input>
        <button onClick={mergeSortHandler}>Merge Sort</button>
      </div>
    </>
  );
};

export default App;
