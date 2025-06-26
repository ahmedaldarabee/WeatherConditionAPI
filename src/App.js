import './App.css';
import * as React from "react"
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from '@mui/material/Container';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import axios from "axios"


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
        <Container maxWidth="sm">

            {/* Container Content */}
            <div className='ContainerContent min-h-screen flex items-center justify-center'>

              <div className='flex justify-center flex-col gap-3'>
                  <div className='cardBox bg-gray-300 my-4 p-4 rounded-lg shadow-xl cursor-pointer'>
                    <div className='cardContent'>
                        {/* header */}
                      <div className='cardData'>
                        <div className='cardCityTime my-4 flex items-end justify-center gap-3 flex-col'>
                            <div className='flex items-end justify-center gap-3'>
                              <Typography variant="h3"> Amman </Typography>
                              <Typography variant="h6"> sunday 26/06/2025 </Typography>
                            </div>
                            <hr className='bg-black w-full h-[2px]'/>
                        </div>
                      </div>

                      {/* body */}
                      <div className='cardDegreeInfo flex items-center justify-around'>
                          
                          <div className='mainInfo'>
                              <div className='cardTemp flex items-center justify-start gap-3'>
                                  <Typography variant="h5"> <span className='text-3xl'>20</span> c </Typography>
                                  <Typography variant="h5"> <CloudOutlinedIcon/> </Typography>
                              </div>

                              <div className='cardCityStatus'>
                                  <Typography variant="h6"> broken clouds </Typography>
                              </div>

                              <div className='flex items-center justify-start gap-3'>
                                  <h5> <span> min: </span> 15 </h5>
                                    <div className='w-[2px] h-5 bg-black'></div>
                                  <h5> <span> max: </span> 30 </h5>
                              </div>
                          </div>

                          <div className='cloudImg'>
                            <CloudIcon className='text-white' style={{fontSize:"150px"}}/>
                          </div>

                      </div>
                    
                    </div>
                  </div>
                  <div className='langBtn'>
                    <Button variant="text"> <span className='capitalize text-black'>English</span> </Button>
                  </div>
              </div>
            </div>


        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
