import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import {
  Avatar,
  Box,
  Container,
  createTheme,
  FormControl,
  Grid,
  styled,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { purple, teal } from '@mui/material/colors';
import { useEffect, useState } from 'react';

const MyButton = styled(Button)`
  border: 2px solid red;
  color: red;
  background-color: #fff;
`;

const CustomButton = () => {};

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: teal[500],
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });
  const [icon, setIcon] = useState();
  const [forecastData, setForecastData] = useState([]);
  const [weatherData, setWeatherData] = useState();
  const [avgForecastData, setAvgForecastData] = useState();
  const [groupedForecastData, setGroupedForecastData] = useState([]);

  // console.log(theme);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiKey = '9b43514a1ca3411aaada4dc62811db1d';

    const startDate = '20200821';
    const endDate = '20201003';
    const result = await fetch(
      `/api/Agree_WS/webservices/StockRestService/getInspctDataList/${apiKey}/${startDate}/${endDate}`,
      { method: 'GET' }
    );
    const resultData = await result.json();
    console.log(resultData);
  };

  const convertTime = (dtTxt) => {
    const date = new Date(dtTxt * 1000);
    const offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
    const dateOffset = new Date(date.getTime() - offset);
    const localDate = dateOffset.toISOString();
    const splitArr = localDate.split('T');
    const timeArr = splitArr[1].split('.');

    return `${splitArr[0]} ${timeArr[0]}`;
  };

  // utc시간을 로컬 시간대로 변환하는 함수
  const convertToLocalTime = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    const localDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return localDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  //40개의 데이터를 {5:[8]}로 만듬
  const groupForecastData = (data) => {
    const grouped = [];

    // 처음에 들어가는 8개는 그냥 순서대로 8개 push
    grouped.push(data.slice(0, 8));

    // 그다음 들어가는 8개는 날짜(내일꺼부터)별로 묶어서 8개 push

    // 오늘이 몇일인지 알아야함
    const today = new Date().getTime();
    const yyyyMMdd = convertTime(today / 1000);
    const todayDate = yyyyMMdd.split(' ')[0];
    console.log(todayDate);

    // 반복문을 통해서 걸러내야하는데 오늘날짜인거 빼고,
    const filterdList = data.filter((item) => !item.dt_txt.includes(todayDate));
    for (let i = 0; i < filterdList.length; i += 8) {
      if (grouped.length == 5) break;
      const group = filterdList.slice(i, i + 8);
      grouped.push(group);
    }

    return grouped;
  };

  console.log(groupedForecastData);

  const aggregateForecastData = (data) => {
    const grouped = {};
    data.forEach((entry) => {
      const time = convertToLocalTime(entry.dt);
      const date = entry.dt_txt.split(' ')[0];
      if (!grouped[date]) {
        grouped[date] = {
          minTemp: entry.main.temp_min,
          maxTemp: entry.main.temp_max,
          weatherIcon: entry.weather[0].icon,
        };
      } else {
        grouped[date].minTemp = Math.min(
          grouped[date].minTemp,
          entry.main.temp_min
        );
        grouped[date].maxTemp = Math.max(
          grouped[date].maxTemp,
          entry.main.temp_max
        );
        grouped[date].weatherIcon = entry.weather[0].icon;
      }
      // grouped[date].push(entry);
    });

    return Object.keys(grouped)
      .slice(0, 4)
      .map((date) => ({
        date,
        minTemp: grouped[date].minTemp,
        maxTemp: grouped[date].maxTemp,
        weatherIcon: grouped[date].weatherIcon,
      }));
  };

  const handleWeather = async (lat, lon) => {
    const APIkey = '3bd960b544d8e85c3f24e4e2d139794c';
    const url = `/weather/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`;
    const url2 = `/weather/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`;

    const response = fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const changedList = json.list.map((item) => ({
          ...item,
          dt: item.dt * 1000,
          dt_txt: convertTime(item.dt),
        }));
        console.log(changedList);
        setForecastData(changedList);
        setGroupedForecastData(groupForecastData(changedList));

        const result = aggregateForecastData(changedList);
        setAvgForecastData(result);
      })
      .catch((error) => console.error('Error fetching data:', error));
    const response2 = fetch(url2)
      .then((response) => response.json())
      .then((json) => {
        setWeatherData(json);
        setIcon(json.weather[0].icon);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleClick = (idx) => {
    console.log(groupedForecastData[idx]);
  };

  useEffect(() => {
    //   대전 선화동 위도 경도
    const latitude = 36.328799;
    const longitude = 127.4230707;
    handleWeather(latitude, longitude);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {groupedForecastData.map((forecastData, idx) => (
        <button key={idx} onClick={() => handleClick(idx)}>
          {idx}
        </button>
      ))}
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }} />
          <Typography component='h1' variant='h5'>
            회원가입
          </Typography>
          <Box component='form' sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <FormControl component='fieldset'>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type='email'
                    name='email'
                    id='email'
                    label='이메일 주소'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type='password'
                    name='password'
                    id='password'
                    label='비밀번호 (숫자+영문자+특수문자 8자리 이상)'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type='password'
                    name='rePassword'
                    id='rePassword'
                    label='비밀번호 재입력'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                size='large'
              >
                회원가입
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
