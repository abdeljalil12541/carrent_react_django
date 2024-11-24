import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/Header";
import CarsPage from "./components/cars-page/CarsPage";
import AboutUs from "./components/about-us/AboutUs";
import Footer from "./components/Footer";
import ContactUsPage from "./components/contact-us/ContactUsPage";
import Faq from "./components/faq/Faq";
import Gallery from "./components/gallery/Gallery";
import LatestOffers from "./components/latest-offers/LatestOffers";
import Dashboard from "./components/compte/Dashboard";
import CarDetail from "./components/reservation/CarDetail";
import CheckoutCart from "./components/reservation/CheckoutCart";
import Checkout from "./components/reservation/Checkout";
import SuccessBooking from "./components/SuccessBooking";
import ScrollToTop from './components/ScrollUp';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState('MAD dh');

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  return (
    <Router>
      <div>
        <Header selectedCurrency={selectedCurrency} onCurrencyChange={handleCurrencyChange} setOpenRegisterPage={setOpenRegisterPage} />
      </div>
      
      <Routes>
        <Route path="/" element={<Home selectedCurrency={selectedCurrency} />}></Route>
        <Route path="/location-de-voitures" element={<CarsPage selectedCurrency={selectedCurrency} />}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
        <Route path="/contact-us" element={<ContactUsPage />}></Route>
        <Route path="/questions-frequemment-posees" element={<Faq />}></Route>
        <Route path="/galerie" element={<Gallery />}></Route>
        <Route path="/offres" element={<LatestOffers selectedCurrency={selectedCurrency} />}></Route>
        <Route path="/page-user-setting" element={<Dashboard selectedCurrency={selectedCurrency} />}></Route>
        <Route path="/location-de-voitures/:slug" element={<CarDetail selectedCurrency={selectedCurrency} />}></Route>
        <Route path="/panier" element={<CheckoutCart selectedCurrency={selectedCurrency} />}></Route>
        <Route path="/checkout" element={<Checkout setOpenRegisterPage={setOpenRegisterPage} selectedCurrency={selectedCurrency} />}></Route>
        <Route path="/success-booking" element={<SuccessBooking selectedCurrency={selectedCurrency} />}></Route>
      </Routes>

      <div>
        <Footer />
      </div>
      <ToastContainer autoClose={1500} position='bottom-right' />
      <ScrollToTop />
    </Router>
  );
}

export default App;
