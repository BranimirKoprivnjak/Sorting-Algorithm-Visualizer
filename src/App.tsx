import { ChangeEvent, useEffect, useState } from 'react';
import { mergeSortAnimations } from './algorithms/mergeSort';

import classes from './App.module.css';

let animations: number[][] = [];

const App: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [slider, setSlider] = useState<number>(50);

  const sliderChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSlider(+event.target!.value);
  };

  // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
  const generateArrayHandler = () => {
    const generatedArray: number[] = [];
    for (let i = 0; i < slider; i++)
      // duplicated values allowed!
      generatedArray.push(Math.floor(Math.random() * (800 - 5 + 1)) + 5);
    setArray(generatedArray);
  };

  const mergeSortHandler = () => {
    const arrayCopy = [...array];
    animations = mergeSortAnimations(arrayCopy);
    for (let i = 0; i < animations.length; i++) {
      const bars = document.getElementsByClassName('App_bar__2Q8P3');
      if (i % 2 !== 0) {
        setTimeout(() => {
          const bar = bars[animations[i][0]] as HTMLElement;
          bar.style.height = `${animations[i][1] * 0.7}px`;
        }, i * 50);
      } else {
        setTimeout(() => {}, i * 50);
      }
    }
  };

  useEffect(() => {
    generateArrayHandler();
  }, [slider]);

  return (
    <>
      <div className={classes.container}>
        {array.map((value, index) => (
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
