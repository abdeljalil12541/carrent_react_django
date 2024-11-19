import React, { useEffect } from "react";
import HomePageBooking from "../HomePageBooking"
import HomeCardSlider from "../HomeCardSlider";
import BrandSlider from "../Brands";
import WhyChooseUs from "../WhyChooseUs";
import HomePageAboutUs from "../HomePageAboutUs";
import Footer from "../Footer";
import Location from "../Location";
import GalleryHomePage from "../GalleryHomePage";
import HomePageMoroccoBaner from "../HomePageMoroccoBanner";
import HomePageReviews from "../HomePageReviews";


export default function Home({ selectedCurrency }) {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return(
        <div>
            <HomePageBooking />
            <BrandSlider />
            <HomeCardSlider selectedCurrency={selectedCurrency} />
            <HomePageAboutUs />
            <WhyChooseUs />
            <HomePageMoroccoBaner />
            <HomePageReviews />
            <GalleryHomePage />
            <Location />
        </div>
    );
}