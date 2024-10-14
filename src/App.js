import './App.css';
import TravelBlogs from "./compponents/TravelBlogs/TravelBlogs"
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
      <TravelBlogs />
    </div>
    </ThemeProvider>
  );
}

export default App;
