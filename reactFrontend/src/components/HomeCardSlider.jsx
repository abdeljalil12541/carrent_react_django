import logo from "../styles/images/smallLogo.png";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight } from 'lucide-react'



import '../styles/css/HomeCardSlider.css';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';  // Import the necessary Swiper modules

import 'swiper/css';              // Swiper core CSS
import 'swiper/css/navigation';   // Navigation module CSS
import 'swiper/css/pagination';   // Pagination module CSS

import axios from 'axios';
import { FaMapMarkerAlt } from "react-icons/fa";






// Currency conversion rates object
const CURRENCY_RATES = {
    'MAD': 1,      // Base currency (MAD)
    'USD': 0.095,  // 1 MAD = 0.095 USD
    'EUR': 0.081   // 1 MAD = 0.081 EUR
};

// Currency display configuration
const CURRENCY_CONFIG = {
    'MAD': { symbol: 'DH', position: 'after' },
    'USD': { symbol: '$', position: 'before' },
    'EUR': { symbol: '€', position: 'after' }
};

// Format price with currency
const formatPrice = (price, currencyCode) => {
    const config = CURRENCY_CONFIG[currencyCode];
    const formattedNumber = price.toFixed(0);
    
    return config.position === 'before' 
      ? `${config.symbol}${formattedNumber}`
      : `${formattedNumber} ${config.symbol}`;
};

// Convert price between currencies
const convertPrice = (price, fromCurrency, toCurrency) => {
    // If the target currency is MAD, return the price directly
    if (toCurrency === 'MAD dh') {
        return price; // No conversion needed
    }

    // First convert to MAD (base currency)
    const priceInMAD = fromCurrency === 'MAD dh' 
      ? price 
      : price / CURRENCY_RATES[fromCurrency];
    
    // Then convert to target currency
    return toCurrency === 'MAD dh' 
      ? priceInMAD 
      : priceInMAD * CURRENCY_RATES[toCurrency];
};






const Card = ({ id, name, slug, is_available, image, model, car_size, category, brand, price, mileage, seats, transmission, fuel_type, current_location, car_features, default_equipements, pickup_features, selectedCurrency }) => {
    
    // Extract currency code from selectedCurrency or default to MAD
    const currencyCode = selectedCurrency ? selectedCurrency.split(' ')[0] : 'MAD dh';

    // Convert price to the selected or default currency (MAD)
    const convertedPrice = convertPrice(price, 'MAD dh', currencyCode); // Ensure the original price is in MAD
    
    // Format price with currency symbol
    const displayPrice = formatPrice(convertedPrice, currencyCode);

    
    // Create a car object that contains all the necessary data
    const carData = {
        id,
        name,
        slug,
        image,
        is_available,
        model,
        car_size,
        category,
        brand,
        price,
        mileage,
        seats,
        transmission,
        fuel_type,
        current_location,
        car_features,
        default_equipements,
        pickup_features
    };

    // Initialize finalDateTime as an empty object
    const [finalDateTime] = useState({});
    
    

    

  return (
    <section className="px-4">
        <div className="border relative rounded-lg my-9 shadow-lg p-4 w-full">
        <h3 className="bg-blue-100 absolute text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300" style={{zIndex: '999'}}>{model}</h3>
        <div className="overflow-hidden">
            <img src={image} alt={model} className="w-full h-48 object-cover duration-500 hover:scale-125 rounded-lg" />
        </div>
        <div className="mt-4">
            <p className="font-bold text-lg">{name}</p>

            <h3 className="text-sm mb-4 mt-1 text-gray-500">
                <svg className="inline-block mb-1 mr-1" fill="#64748b" width={15} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 395.71 395.71" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path> </g> </g></svg>
                Morocco, {typeof current_location === 'string' ? current_location.split(' ').slice(0, -1).join(' ') : 'N/A'}
            </h3>

            <hr />

            <div className="w-full grid grid-cols-2 mt-4 px-4">
                <div className="flex w-full justify-between items-center col-span-2">
                    <span className="flex items-center">
                        <svg fill="#c53030" className="inline-block mr-1" height="18px" width="18px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 612 612" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M175.205,239.62c0.127-1.965-0.533-3.902-1.833-5.381l-58.84-66.941c-1.3-1.479-3.135-2.381-5.102-2.508 c-1.975-0.126-3.902,0.533-5.381,1.833c-27.037,23.766-49.479,51.794-66.706,83.305c-0.944,1.729-1.165,3.762-0.611,5.651 c0.554,1.89,1.836,3.483,3.565,4.427l78.205,42.748c1.131,0.619,2.352,0.912,3.557,0.912c2.627,0,5.174-1.398,6.523-3.866 c11.386-20.828,26.229-39.359,44.114-55.08C174.178,243.422,175.08,241.587,175.205,239.62z"></path> <path d="M201.462,214.829c1.334,2.515,3.907,3.948,6.568,3.948c1.174,0,2.365-0.279,3.473-0.867 c20.962-11.117,43.512-18.371,67.025-21.561c4.064-0.551,6.913-4.293,6.362-8.358l-11.979-88.316 c-0.551-4.064-4.304-6.909-8.358-6.362c-35.708,4.843-69.949,15.857-101.772,32.736c-3.623,1.922-5.002,6.416-3.082,10.041 L201.462,214.829z"></path> <path d="M105.785,334.345l-86.017-23.338c-1.901-0.514-3.929-0.255-5.638,0.725s-2.958,2.598-3.475,4.499 C3.586,342.295,0,369.309,0,396.523c0,4.657,0.111,9.329,0.342,14.284c0.185,3.981,3.468,7.083,7.414,7.083 c0.116,0,0.234-0.002,0.35-0.008l89.031-4.113c1.967-0.09,3.82-0.96,5.145-2.415c1.327-1.455,2.022-3.38,1.93-5.347 c-0.155-3.341-0.23-6.444-0.23-9.484c0-18.02,2.365-35.873,7.029-53.066C112.082,339.499,109.743,335.42,105.785,334.345z"></path> <path d="M438.731,120.745c-32.411-15.625-67.04-25.308-102.925-28.786c-1.972-0.198-3.918,0.408-5.439,1.659 c-1.521,1.252-2.481,3.056-2.671,5.018l-8.593,88.712c-0.396,4.082,2.594,7.713,6.677,8.108 c23.652,2.291,46.463,8.669,67.8,18.954c1.015,0.49,2.118,0.738,3.225,0.738c0.826,0,1.654-0.139,2.45-0.416 c1.859-0.649,3.385-2.012,4.24-3.786l38.7-80.287C443.978,126.965,442.427,122.525,438.731,120.745z"></path> <path d="M569.642,245.337c0.48-1.911,0.184-3.932-0.828-5.624c-18.432-30.835-41.933-57.983-69.848-80.686 c-1.529-1.242-3.48-1.824-5.447-1.627c-1.959,0.203-3.758,1.174-5,2.702l-56.237,69.144c-1.242,1.529-1.828,3.488-1.625,5.447 c0.201,1.959,1.173,3.758,2.702,5.002c18.47,15.019,34.015,32.975,46.205,53.369c1.392,2.326,3.855,3.618,6.383,3.618 c1.297,0,2.61-0.34,3.803-1.054l76.501-45.728C567.94,248.889,569.16,247.248,569.642,245.337z"></path> <path d="M598.044,304.939c-1.228-3.915-5.397-6.096-9.308-4.867l-85.048,26.648c-3.915,1.226-6.093,5.393-4.867,9.306 c6.104,19.486,9.199,39.839,9.199,60.494c0,3.041-0.076,6.144-0.23,9.484c-0.092,1.967,0.602,3.892,1.93,5.347 c1.327,1.456,3.178,2.325,5.145,2.415l89.031,4.113c0.118,0.005,0.234,0.008,0.35,0.008c3.944,0,7.228-3.103,7.414-7.083 c0.229-4.955,0.342-9.627,0.342-14.284C612,365.306,607.306,334.494,598.044,304.939z"></path> <path d="M305.737,380.755c-1.281,0-2.555,0.042-3.824,0.11l-120.65-71.185c-2.953-1.745-6.702-1.308-9.176,1.065 c-2.476,2.371-3.07,6.099-1.456,9.121l65.815,123.355c-0.242,2.376-0.371,4.775-0.371,7.195c0,18.608,7.246,36.101,20.403,49.258 c13.158,13.158,30.652,20.404,49.26,20.404c18.608,0,36.101-7.248,49.258-20.404c13.158-13.157,20.403-30.65,20.403-49.258 c0-18.608-7.246-36.101-20.403-49.258C341.839,388.001,324.344,380.755,305.737,380.755z"></path> </g> </g> </g></svg>
                        {mileage} /Km
                    </span>
                    <span className="flex items-center">
                        <svg fill="#c53030" className="inline-block mr-1" height="18px" width="18px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"></style> <g> <path class="st0" d="M277.028,262.753l-26.612-2.882c-3.641-0.394-6.72-2.788-8.118-6.172c-0.017-0.04-0.034-0.081-0.05-0.121 c-1.403-3.383-0.92-7.252,1.376-10.105l16.78-20.855c3.164-3.932,2.857-9.616-0.712-13.185l-31.411-31.411 c-3.569-3.569-9.252-3.876-13.185-0.712l-20.864,16.787c-2.846,2.29-6.704,2.776-10.082,1.386c-0.037-0.015-0.074-0.03-0.111-0.045 c-3.396-1.394-5.799-4.478-6.194-8.128l-2.883-26.624c-0.543-5.018-4.779-8.82-9.826-8.82h-44.422c-5.047,0-9.283,3.802-9.826,8.82 l-2.883,26.624c-0.395,3.649-2.799,6.734-6.195,8.128c-0.037,0.015-0.074,0.03-0.11,0.045c-3.378,1.391-7.236,0.904-10.082-1.386 L70.752,177.31c-3.932-3.164-9.616-2.857-13.184,0.712l-31.411,31.411c-3.569,3.569-3.876,9.253-0.712,13.185l16.78,20.855 c2.296,2.854,2.779,6.722,1.376,10.105c-0.017,0.04-0.033,0.081-0.05,0.121c-1.399,3.384-4.477,5.778-8.118,6.172L8.82,262.753 C3.802,263.296,0,267.532,0,272.579v44.422c0,5.047,3.802,9.283,8.82,9.826l26.612,2.881c3.641,0.394,6.72,2.788,8.118,6.172 c0.017,0.04,0.033,0.081,0.05,0.121c1.403,3.383,0.92,7.252-1.376,10.106l-16.78,20.855c-3.164,3.932-2.857,9.616,0.712,13.185 l31.411,31.411c3.569,3.569,9.253,3.876,13.185,0.712l20.864-16.787c2.846-2.291,6.704-2.777,10.082-1.386 c0.037,0.015,0.074,0.03,0.111,0.045c3.396,1.394,5.799,4.478,6.194,8.128l2.883,26.624c0.543,5.018,4.779,8.82,9.826,8.82h44.422 c5.047,0,9.283-3.802,9.826-8.82l2.883-26.624c0.395-3.649,2.798-6.734,6.194-8.128c0.037-0.015,0.074-0.03,0.11-0.045 c3.378-1.391,7.236-0.905,10.083,1.386l20.864,16.787c3.932,3.164,9.616,2.857,13.185-0.712l31.411-31.411 c3.569-3.569,3.875-9.253,0.712-13.185l-16.78-20.855c-2.296-2.853-2.779-6.722-1.376-10.106c0.016-0.04,0.033-0.08,0.05-0.121 c1.399-3.384,4.477-5.778,8.118-6.172l26.612-2.881c5.017-0.544,8.82-4.78,8.82-9.826v-44.422 C285.848,267.532,282.046,263.296,277.028,262.753z M142.924,339.349c-24.609,0-44.559-19.95-44.559-44.559 c0-24.609,19.95-44.559,44.559-44.559s44.559,19.95,44.559,44.559C187.483,319.399,167.533,339.349,142.924,339.349z"></path> <path class="st0" d="M507.469,218.212L489.2,203.785c-2.91-2.298-4.526-5.821-4.528-9.53c0-0.039,0-0.078,0-0.118 c-0.006-3.717,1.611-7.249,4.528-9.552l18.269-14.428c4.184-3.304,5.664-8.985,3.624-13.91l-8.025-19.374 c-2.04-4.926-7.104-7.896-12.398-7.274l-23.12,2.716c-3.692,0.434-7.333-0.92-9.956-3.553c-0.027-0.028-0.055-0.056-0.083-0.083 c-2.622-2.624-3.97-6.258-3.537-9.941l2.716-23.119c0.622-5.294-2.349-10.358-7.274-12.398l-19.374-8.024 c-4.925-2.04-10.606-0.56-13.91,3.623l-14.428,18.268c-2.299,2.911-5.822,4.526-9.53,4.528c-0.04,0-0.079,0-0.118,0 c-3.716,0.006-7.248-1.611-9.552-4.528l-14.428-18.269c-3.304-4.184-8.986-5.664-13.911-3.624l-19.374,8.025 c-4.925,2.04-7.896,7.104-7.274,12.399l2.716,23.12c0.434,3.691-0.92,7.332-3.553,9.956c-0.028,0.028-0.056,0.056-0.084,0.083 c-2.624,2.622-6.257,3.97-9.941,3.537l-23.119-2.716c-5.295-0.622-10.358,2.349-12.398,7.274l-8.025,19.374 c-2.04,4.925-0.56,10.607,3.624,13.911l18.268,14.427c2.911,2.299,4.526,5.821,4.528,9.53c0,0.04,0,0.079,0,0.118 c0.007,3.717-1.611,7.249-4.528,9.552l-18.269,14.428c-4.184,3.304-5.664,8.985-3.623,13.91l8.024,19.374 c2.04,4.925,7.104,7.896,12.398,7.274l23.121-2.716c3.691-0.434,7.332,0.92,9.956,3.553c0.028,0.028,0.055,0.056,0.083,0.083 c2.622,2.624,3.97,6.258,3.537,9.941l-2.716,23.12c-0.622,5.295,2.349,10.358,7.274,12.398l19.374,8.025 c4.925,2.04,10.606,0.56,13.911-3.624l14.427-18.268c2.299-2.911,5.821-4.526,9.53-4.528c0.039,0,0.078,0,0.118,0 c3.716-0.007,7.249,1.611,9.552,4.528l14.428,18.269c3.304,4.184,8.985,5.664,13.911,3.624l19.374-8.025 c4.925-2.04,7.896-7.104,7.274-12.398l-2.716-23.12c-0.434-3.691,0.92-7.333,3.553-9.956c0.028-0.028,0.056-0.056,0.084-0.083 c2.624-2.621,6.257-3.97,9.941-3.537l23.12,2.716c5.295,0.622,10.358-2.349,12.398-7.274l8.025-19.374 C513.132,227.198,511.653,221.516,507.469,218.212z M403.948,228.701c-18.584,7.698-39.89-1.127-47.588-19.712 s1.128-39.89,19.712-47.588c18.584-7.698,39.89,1.127,47.588,19.712C431.357,199.697,422.532,221.004,403.948,228.701z"></path> </g> </g></svg>
                        {transmission}
                    </span>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 mt-4 px-4">
                <div className="flex w-full justify-between items-center col-span-2">
                    <span className="flex items-center">
                    <svg fill="#c53030" className="inline-block mr-1" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 240.235 240.235" xml:space="preserve" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M211.744,6.089C208.081,2.163,203.03,0,197.52,0h-15.143c-11.16,0-21.811,8.942-23.74,19.934l-0.955,5.436 c-0.96,5.47,0.332,10.651,3.639,14.589c3.307,3.938,8.186,6.106,13.74,6.106h19.561c2.714,0,5.339-0.542,7.778-1.504l-2.079,17.761 c-2.001-0.841-4.198-1.289-6.507-1.289h-22.318c-9.561,0-18.952,7.609-20.936,16.961l-19.732,93.027l-93.099-6.69 c-5.031-0.36-9.231,1.345-11.835,4.693c-2.439,3.136-3.152,7.343-2.009,11.847l10.824,42.618 c2.345,9.233,12.004,16.746,21.53,16.746h78.049h1.191h39.729c9.653,0,18.336-7.811,19.354-17.411l15.272-143.981 c0.087-0.823,0.097-1.634,0.069-2.437l5.227-44.648c0.738-1.923,1.207-3.967,1.354-6.087l0.346-4.97 C217.214,15.205,215.407,10.016,211.744,6.089z"></path> </g></svg>
                        {seats} Seats
                    </span>
                    <span className="flex items-center">
                    <svg fill="#c53030" className="inline-block mr-1" height="15px" width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 472.615 472.615" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M394.104,0l-28.333,28.476l19.901,20.004c-3.018,1.409-5.846,3.361-8.334,5.86c-11.38,11.438-11.38,29.983,0,41.424 c0.826,0.829,1.76,1.471,2.656,2.18v234.21c0,10.278-8.298,18.634-18.491,18.634c-10.192,0-18.48-8.355-18.48-18.634V227.202 c0-26.962-21.847-48.904-48.702-48.904h-19.103V1.711H0v470.904h275.219V197.99h19.103c16,0,29.01,13.105,29.01,29.212v104.952 c0,21.134,17.125,38.326,38.173,38.326c21.058,0,38.183-17.192,38.183-38.326V104.175c6.864-0.414,13.617-3.142,18.862-8.411 c2.49-2.503,4.435-5.344,5.834-8.378l19.9,20.002l28.332-28.478L394.104,0z M228.675,167.197H46.545V89.841 c0-22.546,18.275-40.82,40.82-40.82h100.489c22.545,0,40.821,18.274,40.821,40.82V167.197z"></path> </g> </g> </g></svg>
                        {fuel_type}
                    </span>
                </div>
            </div>
            <div></div>
            <p className="text-blue-900 pl-1 mt-4 mb-4 font-semibold">{displayPrice} <span className="text-gray-600 font-medium"> / Day</span></p>
            <div className="flex justify-between items-center mt-2">
            <Link to={`/location-de-voitures/${slug}`} state={{ finalDateTime, car: carData }} className="text-white hover:bg-red-600 duration-300 bg-red-700 rounded-lg px-4 py-2">Book Now</Link>
            </div>
        </div>
        </div>
    </section>
  );
};

const HomeCardSlider = ({ selectedCurrency }) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeCardCar = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/home-car-card/');
                // Map the fetched data to the structure expected by the Card component
                const formattedCars = response.data.data.map(car => ({
                    id: car.id,
                    name: car.name,
                    category: car.category.name,
                    brand: `https://carrentreactdjango-production.up.railway.app${car.brand}`,
                    slug: car.slug,
                    image: `https://carrentreactdjango-production.up.railway.app${car.image}`,
                    is_available: car.is_available,
                    model: car.model,
                    car_size: car.car_size,
                    price: car.price_per_day, // Store price as a number
                    mileage: car.mileage,
                    seats: car.seats,
                    transmission: car.transmission,
                    fuel_type: car.fuel_type,
                    current_location: car.current_location.name,
                    car_features: car.car_features.map(feature => feature.name),
                    default_equipements: car.default_equipment.map(equipement => equipement.name),
                    pickup_features: car.pickup_features.map((pickup_feature) => pickup_feature.name),
                }));
                setCars(formattedCars);
                console.log('home car cards data', response.data.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeCardCar();
    }, []);

    return (
        <div>
            <div className="-mt-2.5 -mb-2.5">
                <div className="flex justify-center">
                    <img src={logo} className="w-28 sm:w-36 md:mr-14" alt="" />
                </div>
                <h1 className="text-center text-lg sm:text-2xl font-semibold text-gray-800 block md:mr-14 -mt-8 sm:-mt-11">Our <span className="text-red-600">Cars</span></h1>
            </div>

            <Swiper
                spaceBetween={0}
                loopFillGroupWithBlank={true}
                slidesPerView={1}
                speed={2000}
                autoplay={{
                    delay: 2000,
                }}
                loop={true}
                modules={[Navigation, Pagination, Autoplay]}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {cars.map(car => (
                    <SwiperSlide key={car.id}>
                        <Card {...car} selectedCurrency={selectedCurrency} />
                    </SwiperSlide>
                ))}
            </Swiper>
                
            <div className="w-full flex justify-center mb-4 -mt-4">
                <button className="bg-red-600 text-gray-200 text-lg px-3 py-1.5 rounded flex">More <ArrowRight className="mt-1 ml-1 w-5" /></button>
            </div>
        </div>
    );
};

export default HomeCardSlider;
