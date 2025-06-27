import * as React from "react"
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import axios from "axios"
import moment from 'moment/moment';
import "moment/min/locales"
import { useTranslation } from 'react-i18next';

moment.locale("en")
let cancelAxios = null;

const Weather = () => {
  
  const [currentDate,setCurrentDate] = React.useState("");
  const [temp , setTemp] = React.useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null
  });

  const { t, i18n } = useTranslation();
  const [locale , setLocale] = React.useState("ar");

  // once you connect with external library, you will need to handle it by using useEffect to handle re-render section after each updating accrue in component!
  const handleLanguageChange = () => {
    if(locale === "ar"){
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en")
    }else{
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar")
    }
    // Why this state again here? where we do moment.locale("...") about each case? 
    setCurrentDate(moment().format('MMMM Do YYYY'));
  }

  React.useEffect(() => {
    
    // بما اني بدياها تتحدث بشكل دوري ليش غلط احطها داخل ديبندنسي
    setCurrentDate(moment().format('MMMM Do YYYY'));

    // Make a request for a user with a given ID
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=31.96&lon=35.93&appid=7190f37dec7d7579fed69f1e2076189f',{
        cancelToken: new axios.CancelToken((cancel) => {
          cancelAxios = cancel;
        })
      })
      .then(function (response) {
        const temp = Math.round(response.data.main.temp  - 272.15);
        const description = response.data.weather[0].description;
        const min = Math.round(response.data.main.temp_min  - 272.15);
        const max = Math.round(response.data.main.temp_max  - 272.15);       
        // const icon = Math.round(response.data.main.temp_max  - 272.15);       
        const responseIcon = response.data.weather[0].icon;
        
        setTemp({
          number: temp,
          description,
          min,
          max,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        })
      })
      .catch(function (error) {
        console.log(error);
      });

      // What is the relationship with mounting and unmounting?
      return () => {
        cancelAxios();
      }
  },[]);

  return (
    <Container maxWidth="sm">
      {/* Container Content */}
      <div  dir={locale === "ar" ? 'rtl' : 'ltr'} className='ContainerContent min-h-screen flex items-center justify-center'>
        <div className='flex justify-center flex-col gap-3'>
            <div className='cardBox bg-gray-300 my-4 p-4 rounded-lg shadow-xl cursor-pointer'>
              <div className='cardContent'>
                  {/* header */}
                <div className='cardData'>
                  <div className='cardCityTime my-4 flex items-end justify-center gap-3 flex-col'>
                      <div className='flex items-end justify-center gap-3'>
                        <Typography variant="h3"> {t(`Amman`)} </Typography>
                        <Typography variant="h6"> {currentDate} </Typography>
                      </div>
                      <hr className='bg-black w-full h-[2px]'/>
                  </div>
                </div>

                {/* body */}
                <div className='cardDegreeInfo flex items-center justify-around'>
                    
                    <div className='mainInfo'>
                        <div className='cardTemp flex items-center justify-start gap-3'>
                            <Typography variant="h2"> {temp.number} </Typography>
                            {temp.icon ? (
                            <img src={temp.icon} alt="weather icon" />
                            ) : (
                              <p> weather icon...</p>
                            )}

                        </div>

                        <div className='cardCityStatus'>
                            <Typography variant="h6"> {t(temp.description)} </Typography>
                        </div>

                        <div className='flex items-center justify-start gap-3'>
                            <h5> <span> {t(`min`)}: </span> {temp.min} </h5>
                              <div className='w-[2px] h-5 bg-black'></div>
                            <h5> <span> {t(`max`)}: </span>  {temp.max} </h5>
                        </div>
                    </div>

                    <div className='cloudImg'>
                      <CloudIcon className='text-white' style={{fontSize:"150px"}}/>
                    </div>

                </div>

              </div>
            </div>
            <div className='langBtn'>
              <Button variant="text" onClick={handleLanguageChange}> <span className='capitalize text-black'> {locale === "ar"? "Arabic":"English"} </span> </Button>
            </div>
        </div>
      </div>
    </Container>
  )
}

export default Weather