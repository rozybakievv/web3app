import Home from "./components/Home.jsx"
import Navbar from "./components/Navbar.jsx"
import Modal from "./components/Modal.jsx"
import Footer from "./components/Footer.jsx"

const App = () => {
    return (
        <div className="min-h-screen">
            <Navbar></Navbar>
            <Home></Home>
            <Modal></Modal>
            <Footer></Footer>
        </div>
    )
}

export default App;