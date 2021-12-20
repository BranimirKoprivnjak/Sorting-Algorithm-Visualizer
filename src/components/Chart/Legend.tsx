import classes from './Legend.module.css';
import {
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  QUATERNARY_COLOR,
  QUINARY_COLOR,
} from '../../config/config';

const Legend: React.FC<{ algorithm: string; array: number[] }> = ({
  algorithm,
}) => {
  return (
    <>
      {!algorithm && (
        <div className={classes.tutorial}>
          Welcome to Sorting Algorithm Visualizer! A sorting algorithm is an
          algorithm that puts elements of a list into an order. Each bar below
          represents a random number between 5 and 800. Try out different Sorts
          to visualize their unique ways of sorting the list!
        </div>
      )}
      {algorithm && (
        <div className={classes.legend}>
          <div>
            <h2>{algorithm}</h2>
          </div>
          <div className={classes.section}>
            <div className={classes.container}>
              <div
                className={classes.color}
                style={{ backgroundColor: `${SECONDARY_COLOR}` }}
              ></div>
              <p>Comparison</p>
            </div>
            <div className={classes.container}>
              <div
                className={classes.color}
                style={{ backgroundColor: `${TERTIARY_COLOR}` }}
              ></div>
              <p>{algorithm === 'Merge Sort' ? 'Change' : 'Swap'}</p>
            </div>
            {algorithm === 'Quick Sort' && (
              <div className={classes.container}>
                <div
                  className={classes.color}
                  style={{ backgroundColor: `${QUATERNARY_COLOR}` }}
                ></div>
                <p>Pivot</p>
              </div>
            )}
            <div className={classes.container}>
              <div
                className={classes.color}
                style={{ backgroundColor: `${QUINARY_COLOR}` }}
              ></div>
              <p>Sorted</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Legend;
