import './App.css';
//import Customerlist from './components/customerlist';
import AppBar  from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BasicTabs from './components/tabs';


function App() {
  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6">
            PersonalTrainer Application
          </Typography>
        </Toolbar>
      </AppBar>
      <BasicTabs />      
    </div>
  );
}

export default App;
