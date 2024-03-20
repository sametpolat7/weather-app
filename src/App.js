import React from 'react';
import './style/App.css';
import WeatherInfoProvider from './context/Context';
import Input from './components/Input/Input';
import Results from './components/Results/Results';

function App() {
  return (
    <React.Fragment>
      <WeatherInfoProvider>
        <div className='main'>
          <div className='container col-10'>
            <Input />
            <Results />
          </div>
        </div>
      </WeatherInfoProvider>
    </React.Fragment>

  )
}

export default App;
