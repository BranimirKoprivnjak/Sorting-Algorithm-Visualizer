import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
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
  const refToolbar = useRef<HTMLDivElement>(null);
  const arrayCopy = [...state.array];

  const sizeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(stateActions.arraySizeChange(+event.target!.value));
  };

  const speedChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(stateActions.animationSpeedChange(+event.target!.value * 10));
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
    const animationSpeed = state.animationSpeed;
    dispatch(stateActions.algorithm(algorithm));
    refToolbar.current!.style.display = 'none';
    const [sortedArray, timer] = sortAnimation(arrayCopy, animationSpeed);
    setTimeout(() => {
      dispatch(stateActions.arrayChange(sortedArray));
      refToolbar.current!.style.display = 'flex';
    }, timer * animationSpeed);
  };

  const mergeSortHandler = () => {
    animationHelper('Merge Sort', mergeSortAnimation);
  };
  const bubbleSortHandler = () => {
    animationHelper('Bubble Sort', bubbleSortAnimation);
  };
  const quickSortHandler = () => {
    animationHelper('Quick Sort', quickSortAnimation);
  };
  const heapSortHandler = () => {
    animationHelper('Heap Sort', heapSortAnimation);
  };

  useEffect(() => {
    generateArrayHandler();
  }, [generateArrayHandler]);

  return (
    <div className={classes.toolbar} ref={refToolbar}>
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
        <label htmlFor="speed">
          Animation Speed ({state.animationSpeed} ms)
        </label>
        <input
          id="speed"
          type="range"
          min="1"
          max="50"
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
