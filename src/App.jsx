import WebRouter from './router/WebRouter'
import './App.css'
import Footer from './components/layout/Footer'
import { CartProvider } from './context/CartContext.jsx'
import { ToastProvider } from '@radix-ui/react-toast'
function App() {

  return (
    <main className='container mx-auto min-h-screen flex flex-col justify-between '>
      <CartProvider>
        <ToastProvider>
          <WebRouter />
          <Footer />
        </ToastProvider>
      </CartProvider>
    </main>
  )
}

export default App
