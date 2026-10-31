import WeatherProvider from './context/WeatherProvider'
import Header from './components/Header/Header'
import Results from './components/Results/Results'
import Footer from './components/Footer/Footer'

export default function App() {
  return (
    <WeatherProvider>
      <div className="app">
        <Header />
        <main className="app__content">
          <Results />
        </main>
        <Footer />
      </div>
    </WeatherProvider>
  )
}
