import { ChangeEvent, useCallback, useEffect } from 'react';
import { bubbleSortAnimation } from '../../animations/bubbleSortAnimation';
import { heapSortAnimation } from '../../animations/heapSortAnimation';
import { mergeSortAnimation } from '../../animations/mergeSortAnimation';
import { quickSortAnimation } from '../../animations/quickSortAnimation';
import { useCustomSelector, useCustomDispatch } from '../../hooks/hooks';
import { stateActions } from '../../store/redux';

import classes from './ToolBar.module.css';

const ToolBar: React.FC = () => {
  const dispatch = useCustomDispatch();
  const state = useCustomSelector(statePara => statePara.state);
  const arrayCopy = [...state.array];

  const sizeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(stateActions.arraySizeChange(+event.target!.value));
  };

  const speedChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(stateActions.animationSpeedChange(+event.target!.value * 15));
  };

  // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
  const generateArrayHandler = useCallback(() => {
    const generatedArray: number[] = [];
    for (let i = 0; i < state.arraySize; i++)
      // duplicated values allowed!
      generatedArray.push(Math.floor(Math.random() * (800 - 5 + 1)) + 5);
    dispatch(stateActions.arrayChange(generatedArray));
  }, [state.arraySize, dispatch]);

  const animationHelper = (algorithm: string, sortAnimation: Function) => {
    dispatch(stateActions.algorithm(algorithm));
    sortAnimation(arrayCopy, state.animationSpeed);
  };

  const mergeSortHandler = () => {
    animationHelper('Merge', mergeSortAnimation);
  };
  const bubbleSortHandler = () => {
    animationHelper('Bubble', bubbleSortAnimation);
  };
  const quickSortHandler = () => {
    animationHelper('Quick', quickSortAnimation);
  };
  const heapSortHandler = () => {
    animationHelper('Heap', heapSortAnimation);
  };

  useEffect(() => {
    generateArrayHandler();
  }, [generateArrayHandler]);

  return (
    <div className={classes.toolbar}>
      <button onClick={generateArrayHandler}>Generate New Array</button>
      <div className={classes.slider}>
        <label htmlFor="size">Array Size</label>
        <input
          id="size"
          type="range"
          min="5"
          max="100"
          onChange={sizeChangeHandler}
        ></input>
      </div>
      <div className={classes.slider}>
        <label htmlFor="speed">Animation Speed</label>
        <input
          id="speed"
          type="range"
          min="1"
          max="10"
          onChange={speedChangeHandler}
        ></input>
      </div>
      <button onClick={mergeSortHandler}>Merge Sort</button>
      <button onClick={bubbleSortHandler}>Bubble Sort</button>
      <button onClick={quickSortHandler}>Quick Sort</button>
      <button onClick={heapSortHandler}>Heap Sort</button>
    </div>
  );
};

export default ToolBar;
