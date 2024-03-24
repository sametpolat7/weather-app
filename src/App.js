import React from 'react';
import './style/App.css';
import WeatherInfoProvider from './context/Context';
import Input from './components/Input/Input';
import Results from './components/Results/Results';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <React.Fragment>
      <WeatherInfoProvider>
        <div className='container col-10'>
          <Input />
          <Results />
        </div>
        <Footer />
      </WeatherInfoProvider>
    </React.Fragment>
  )
}

export default App;
