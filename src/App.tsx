import { useCustomSelector } from './hooks/hooks';

import Chart from './components/Chart/Chart';
import ToolBar from './components/ToolBar/ToolBar';

const App: React.FC = () => {
  const state = useCustomSelector(statePara => statePara.state);

  return (
    <>
      <Chart state={state} />
      <ToolBar />
    </>
  );
};

export default App;
