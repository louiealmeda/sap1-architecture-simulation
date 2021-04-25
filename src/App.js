import './App.css';
import { Box } from '@material-ui/core';
import SideBar from './components/SideBar/SideBar';
import ConBar from './components/ConBar/ConBar';
import ModulesCanvas from './components/ModulesCanvas/ModulesCanvas';
import { Provider } from 'react-redux';
import store from './redux/reducers/pinState';

function App() {
  return (
    <Provider store={store}>
      <Box className="App" display="flex" >
        <SideBar/>
        <Box flex="1" display="flex" flexDirection="column">
          <ModulesCanvas/>
          <ConBar/>
        </Box>
      </Box>
    </Provider>
  );
}

export default App;
