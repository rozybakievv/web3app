import Home from "./components/Home.jsx"
import Navbar from "./components/Navbar.jsx"
import Modal from "./components/Modal.jsx"
import Footer from "./components/Footer.jsx"

const App = () => {
    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-t from-gray-700 via-gray-900 to-black">
                <Navbar></Navbar>
                <Home></Home>
            </div>
            <Modal></Modal>
            <Footer></Footer>
        </div>
    )
}

export default App;