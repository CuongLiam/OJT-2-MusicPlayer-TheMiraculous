import Header from './components/Header/Header'
import Navbar from './components/Header/Navbar'

export default function App() {
  return (
    <div className="min-h-screen bg-[#1e2336] relative">
      <Navbar />
      <div className="pl-20 w-full transition-all duration-300">
        <Header />       
      </div>
    </div>
  )
}