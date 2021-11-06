import classes from './Legend.module.css';
import {
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  QUATERNARY_COLOR,
} from '../../config/config';

const Legend: React.FC<{ algorithm: string }> = ({ algorithm }) => {
  return (
    <div
      className={classes.legend}
      style={{ visibility: algorithm ? 'visible' : 'hidden' }}
    >
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
      </div>
    </div>
  );
};

export default Legend;
