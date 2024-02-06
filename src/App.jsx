import WebRouter from './router/WebRouter'
import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {

  return (
    <>
      <Navbar />
      <WebRouter />
      <Footer />
    </>
  )
}

export default App
