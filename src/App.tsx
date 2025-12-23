import Header from './components/Header/Header'
import Navbar from './components/Header/Navbar'
import Artists from './components/Artist/Artists'
import Footer from './components/Footer/Footer'
// import SignInModal from './components/auth/SignInModal'
// import SignUpModal from './components/auth/SignUpModal'

export default function App() {
  return (
    <div className="bg-[#0f1218] relative max-w-360 min-h-screen flex select-none">
      
      <Navbar />
      <div className="pl-20 w-full min-h-screen flex flex-col transition-all duration-300">
        
        <Header />       

        <main className="flex-1 p-6 text-white">
           <div className="h-full">
            <Artists />
           </div>
        </main>

        <Footer />
        
      </div>
    </div>
  )
}