import car from '../../styles/images/cars/car2.png';
import { FaCar } from "react-icons/fa"
import axios from 'axios';
import { useEffect, useState } from 'react';
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




const WishlistDashboard = ({ selectedCurrency }) => {
  const [wishlistCars, setWishlistCars] = useState([])
  const [itemsToShow, setItemsToShow] = useState(3);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const FetchWishlistObjects = async () => {
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/get-wishlist-objects/')

        const formattedWishlistCars = response.data.map(item => ({
          id: item.car.id,
          name: item.car.name,
          category: item.car.category.name,
          slug: item.car.slug,
          image: `http://127.0.0.1:8000${item.car.image}`,
          is_available: item.car.is_available,
          model: item.car.model,
          car_size: item.car.car_size,
          price: item.car.price_per_day,
          mileage: item.car.mileage,
          seats: item.car.seats,
          transmission: item.car.transmission,
          fuel_type: item.car.fuel_type,
          current_location: item.car.current_location.name,
          car_features: item.car.car_features.map(feature => feature.name),
          default_equipements: item.car.default_equipment.map(equipement => equipement.name),
          pickup_features: item.car.pickup_features.map(pickup_feature => pickup_feature.name),
          created_at: item.created_at
        }))
        console.log(formattedWishlistCars)

        setWishlistCars(formattedWishlistCars)
      }catch (error) {
        console.error('something went wrong...', error)
      }
    }
    
    FetchWishlistObjects();
  }, []) 

  const loadMoreItems = () => {
    setLoader(true);
    setTimeout(() => {
      setItemsToShow((prev) => prev + 3);
      setLoader(false);
    }, 500);
  };

  // Extract currency code from selectedCurrency or default to MAD
  const currencyCode = selectedCurrency ? selectedCurrency.split(' ')[0] : 'MAD dh';
  const [finalDateTime] = useState({});


  return (
    <div className="p-1 sm:p-6">
      {/* Heading */}
      <h2 className="text-4xl font-light border-b pb-4 mb-6 text-gray-600 mb-4">Ma liste de course</h2>

      {/* List item */}
      {wishlistCars.length > 0 ? (
        wishlistCars.slice(0, itemsToShow).map((car, index) => {
          const createdAt = car.created_at ? new Date(car.created_at).toLocaleDateString() : "Not available";

          return (
            <div key={index} className='w-full mb-4'>
              <div className='w-52'>
                <div className='bg-gray-100 pl-2 py-2 rounded-t flex'>
                  <FaCar className='text-gray-500' />
                  <span className='text-gray-500 text-sm pl-1 -mt-[2px]'>Voitures</span>
                  <span className='pl-2 text-gray-400 text-[11px]'>ajouté le {createdAt}</span>
                </div>
              </div>
              <div className="border shadow-lg p-4 mb-4">
              <div className="grid grid-cols-4 gap-y-4">
                  <img src={car.image} className="col-span-4 sm:col-span-1 w-40 object" alt={car.name} />
                  <div className="ml-1 sm:ml-4 col-span-4 sm:col-span-2">
                      <h3 className="text-lg font-semibold">{car.name}</h3>
                      <p className="text-gray-600 text-sm">
                          {car.name} Location d’une voiture {car.name} chez NH rent car
                          Location {car.name} est disponible chez Nh rent car. Louer une
                          voiture {car.name} à ...
                      </p>
                  </div>
                  <div className="ml-1 sm:ml-2 col-span-4 sm:col-span-1 flex flex-col items-start sm:items-end">
                      <p className="text-gray-600 text-sm">à partir de</p>
                      <div className="flex mb-4">
                          <p className="text-2xl font-bold text-gray-800">
                              {formatPrice(convertPrice(car.price, 'MAD dh', currencyCode), currencyCode)}
                          </p>
                      </div>
                      <Link
                          to={`/location-de-voitures/${car.slug}`}
                          state={{ finalDateTime, car: car }}
                          className="bg-red-500 text-sm sm:text-[15px] md:text-[16px] text-white px-4 py-2 mt-2 sm:mt-0 rounded w-full sm:w-auto text-center"
                      >
                          Prendre rendez-vous
                      </Link>
                  </div>
              </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className='w-full text-center'>
          <h1 className='text-3xl'>Wishlist is empty</h1>
        </div>
      )}
      
      
      {itemsToShow >= wishlistCars.length ? null : (
      <div className="mt-4">
        <button onClick={loadMoreItems} className="bg-red-500 text-white px-6 py-2 rounded">Voir plus</button>
      </div>
      )}

      <div className={`loaderPosition ${!loader ? 'invisible': 'visible'}`}>
        <div className="loaderBg"></div>
        <span className="loader"></span>
      </div>  
    </div>
  );
};

export default WishlistDashboard;
