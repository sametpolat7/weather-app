import React from 'react';
import './style/App.css';
import WeatherInfoProvider from './context/Context';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Recent from './components/Recent/Recent';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <React.Fragment>
      <WeatherInfoProvider>
        <div className='container'>
          <Header />
          <Search />
          <Recent />
          <Footer />
        </div>
      </WeatherInfoProvider>
    </React.Fragment>

  )
}

export default App;
