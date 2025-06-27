import './App.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Weather from './components/Weather';

const theme = createTheme({
  typography: {
    fontFamily: ["UbuntuRegular"],
  },
  palette: {
    primary: {
      main: "#039be5",
    },
  },
});

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Weather />
      </ThemeProvider>
    </>
  );
}

export default App;
