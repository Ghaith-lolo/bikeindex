import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './layout/header/Header';
import Footer from './layout/footer/Footer';
import SearchBikes from './Views/search_bikes/SearchBikes';
import Home from './Views/home/Home';
import BikeDetails from './Views/bike_details/BikeDetails';


function App() {

  return (
    <>
       <Header />
       <div style={{minHeight:'80vh'}}>
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/bikes" element={<SearchBikes />} />
            <Route path="/bike/:id" element={<BikeDetails />} />
          </Routes>
       </div>
        <Footer />
    </>
  )
}

export default App
