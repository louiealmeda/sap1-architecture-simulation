import logo from './logo.svg';
import './App.css';
import { Box } from '@material-ui/core';
import SideBar from './components/SideBar/SideBar';
import ConBar from './components/ConBar/ConBar';
import ModulesCanvas from './components/ModulesCanvas/ModulesCanvas';

function App() {
  return (
    <Box className="App" display="flex" >
      <SideBar/>
      <Box flex="1" display="flex" flexDirection="column">
        <ModulesCanvas/>
        <ConBar/>
      </Box>
    </Box>
  );
}

export default App;
