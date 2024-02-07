import WebRouter from './router/WebRouter'
import './App.css'
import Footer from './components/layout/Footer'

function App() {

  return (
    <main className='container mx-auto min-h-screen flex flex-col justify-between '>
      <WebRouter />
      <Footer />
    </main>
  )
}

export default App
