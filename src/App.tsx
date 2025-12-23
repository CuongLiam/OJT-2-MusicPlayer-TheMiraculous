import Header from './components/Header/Header'
import Navbar from './components/Header/Navbar'
// import SignInModal from './components/auth/SignInModal'
// import SignUpModal from './components/auth/SignUpModal'

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