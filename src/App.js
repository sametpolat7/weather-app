import React from 'react';
import './style/App.css';
import WeatherInfoProvider from './context/Context';
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <React.Fragment>
      <WeatherInfoProvider>
        <Main />
        <Footer />
      </WeatherInfoProvider>
    </React.Fragment>

  )
}

export default App;
