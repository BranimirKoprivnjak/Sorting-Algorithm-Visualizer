import classes from './Chart.module.css';

const Chart: React.FC<{ array: number[] }> = ({ array }) => {
  const barWidth = Math.floor((1 / array.length) * 500);

  return (
    <div className={classes.container}>
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
  );
};

export default Chart;
