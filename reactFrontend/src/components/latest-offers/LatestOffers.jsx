import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



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

const LatestOffers = ({ selectedCurrency }) => {
    const [latestOffers, setLatestOffers] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchLatestOffers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/latest-offers/');
                setLatestOffers(response.data);
                console.log('data...', response.data);
            } catch (error) {
                console.error('Error fetching latest offers:', error);
            }
        };
        fetchLatestOffers();
    }, []);

    // Extract currency code from selectedCurrency or default to MAD
    const currencyCode = selectedCurrency ? selectedCurrency.split(' ')[0] : 'MAD dh';

    return (
        <div className="container mx-auto py-6 px-6 sm:px-8 md:px-10 lg:px-14">
            {/* Navigation breadcrumb */}
            <nav className="mb-8">
                <div className="flex items-center gap-2 text-sm">
                    <a href="/" className="text-red-600 hover:text-red-700">Accueil</a>
                    <span className="text-gray-400"><ChevronRight className='-ml-1 mt-1' size={14} /></span>
                    <span className="text-gray-500 -ml-1">DERNIÈRES OFFRES</span>
                </div>
            </nav>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-8">DERNIÈRES OFFRES</h1>

            {/* Promo Card */}
            {latestOffers && latestOffers.map((offer, index) => {
                
                // Create a refined `carDetails` object with only the properties you want
                const carDetails = {
                    id: offer.car.id,
                    name: offer.car.name,
                    slug: offer.car.slug,
                    is_available: offer.car.is_available,
                    category: offer.car.category.name,
                    car_features: offer.car.car_features ? offer.car.car_features.map(feature => feature.name) : [],
                    default_equipements: offer.car.default_equipment ? offer.car.default_equipment.map(equipement => equipement.name) : [],
                    pickup_features: offer.car.pickup_features ? offer.car.pickup_features.map(pickup_feature => pickup_feature.name) : [],
                    price: offer.car.price_per_day,
                    image: `http://127.0.0.1:8000${offer.car.image}`,
                    current_location: offer.car.current_location.name,
                    car_size: offer.car.car_size
                };

                return (
                    <div key={index} className="relative overflow-hidden rounded-lg mb-9">
                        <div className="relative h-[420px] sm:h-[400px] w-full">
                            {/* Background gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
                            
                            {/* Main background image */}
                            <img 
                                src={`http://127.0.0.1:8000${offer.image}`}
                                alt={offer.title}
                                className="w-full h-full object-cover scale-x-[-1]"
                            />
                            
                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-center">
                                {/* Content container with semi-transparent background */}
                                <div className="bg-gray-200/80 p-4 sm:p-8 ml-0 sm:ml-6 max-w-2xl rounded-lg">
                                    {/* Fully opaque content */}
                                    <div className="relative z-30">
                                        <h2 className="text-xl sm:text-4xl font-light text-red-600 mb-4">{offer.title}</h2>
                                        <p className="text-gray-800 text-sm sm:text-xl">
                                            {offer.description}
                                        </p>
                                        <p className='text-base sm:text-xl mt-2 text-red-600 font-semibold'>{formatPrice(convertPrice(offer.price_per_day, 'MAD dh', currencyCode), currencyCode)}<span className='text-gray-800 font-normal text-sm sm:text-lg'>/jour</span></p>
                                    </div>
                                </div>
                                
                                {/* Button positioned below the content box */}
                                <Link to={`/location-de-voitures/${carDetails.slug}`} state={{ finalDateTime: {}, car: carDetails }} className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-5 text-sm sm:text-[16px] py-3 rounded-3xl mt-6 sm:ml-6 w-fit">
                                    RÉSERVER MAINTENANT
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LatestOffers;
