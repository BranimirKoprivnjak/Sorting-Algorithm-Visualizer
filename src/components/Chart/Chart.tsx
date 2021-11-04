import { State } from '../../models/model';
import classes from './Chart.module.css';
import Legend from './Legend';

const Chart: React.FC<{ state: State }> = ({ state }) => {
  const array = state.array;
  const barWidth = Math.floor((1 / array.length) * 500);

  return (
    <>
      <Legend algorithm={state.algorithm} />
      <div className={classes.chart}>
        {array.map((value: number, index: number) => (
          <div
            key={index}
            className={classes.bar}
            style={{
              height: `${value * 0.7}px`,
              width: `${barWidth}px`,
            }}
          >
            {array.length <= 20 ? value : ''}
          </div>
        ))}
      </div>
    </>
  );
};

export default Chart;
