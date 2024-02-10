import WebRouter from './router/WebRouter'
import './App.css'
import Footer from './components/layout/Footer'
import { CartProvider } from './context/CartContext.jsx'
function App() {

  return (
    <main className='container mx-auto min-h-screen flex flex-col justify-between '>
      <CartProvider>
        <WebRouter />
        <Footer />
      </CartProvider>
    </main>
  )
}

export default App
