import React, { useEffect, useState } from 'react';
    import { CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
    



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

    

const SuccessBooking = ({ selectedCurrency }) => {
    const { state } = useLocation();
    const car = state?.car
    const bookingData = state?.bookingData
    const finalDestination = state?.finalDestination
    const createdOrderDate = state?.createdOrderDate
    const bookingStatus = state?.bookingStatus
    const totalPrice = state?.totalPrice

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState({}); // Initialize as an object

    console.log('car info success page', finalDestination)

    // Extract currency code from selectedCurrency or default to MAD
    const currencyCode = selectedCurrency ? selectedCurrency.split(' ')[0] : 'MAD dh';

    // Format price with currency symbol
    const displayTotalPrice = formatPrice(convertPrice(totalPrice, 'MAD dh', currencyCode), currencyCode);

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    // Check authentication status on component mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('https://carrent-polished-shadow-812.fly.dev/api/check_authentication/', { withCredentials: true });
                setIsAuthenticated(response.data.isAuthenticated);
                if (response.data.isAuthenticated) {
                    getUserInfo(); // Fetch user info if authenticated
                }
            } catch (error) {
                console.error("Error checking authentication status", error);
            }
        };

        checkAuthStatus();
    }, []);

    const getUserInfo = async () => {
        try {
            const response = await axios.get('https://carrent-polished-shadow-812.fly.dev/api/user-info/', { withCredentials: true });
            setAuthenticatedUser(response.data.user);
        } catch (error) {
            console.log('Error fetching user info:', error);
        }
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
      };

      return (
        <div className="py-8">
          {/* Success Message */}
          <div className="text-center mb-8">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <h2 className="text-2xl font-bold">Booking Successful</h2>
            <div className="mt-4">
              <a 
                href="/" 
                className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                See More
              </a>
            </div>
          </div>
    
          {/* Invoice Container */}
          <div className="max-w-3xl mx-auto bg-gray-100 p-8 rounded-lg">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="mb-4 md:mb-0">
                    <img 
                      src={car.image}
                      alt="Invoice logo" 
                      className="max-h-32 rounded-lg"
                    />
                </div>
                {isAuthenticated && (
                <div className="text-right">
                  <p className="text-xl font-bold mb-2">Invoiced To</p>
                  <p className="text-lg text-gray-800">{authenticatedUser.username}</p>
                </div>
                )}
                </div>
    
              {/* Invoice Details */}
              <div className="bg-white p-6 rounded-lg">
                <ul className="space-y-2">
                  <li>
                    <span className="font-semibold">Booking ID:</span> #{car.id}
                  </li>
                  <li>
                    <span className="font-semibold">Booking Date:</span> {formatDate(createdOrderDate)}
                  </li>
                  <li>
                    <span className="font-semibold">Status: </span>
                    <span className={`font-medium text-green-600`}>
                        {bookingStatus}
                    </span>
                  </li>
                </ul>
              </div>
    
              {/* Invoice Items */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white">
                      <th className="py-4 px-6 text-left bg-gray-50">Car:</th>
                      <td className="py-4 px-6">{car.name}</td>
                    </tr>
                    <tr className="bg-white">
                      <th className="py-4 px-6 text-left bg-gray-50">from: </th>
                      <td className="py-4 px-6">{formatDate(bookingData.pickup_datetime)}</td>
                    </tr>
                    <tr className="bg-white">
                      <th className="py-4 px-6 text-left bg-gray-50">to: </th>
                      <td className="py-4 px-6">{formatDate(bookingData.dropoff_datetime)}</td>
                    </tr>
                    <tr className="bg-white">
                      <th className="py-4 px-6 text-left bg-gray-50">Pick up: </th>
                      <td className="py-4 px-6">{finalDestination.destination1.label}</td>
                    </tr>
                    <tr className="bg-white">
                      <th className="py-4 px-6 text-left bg-gray-50">Drop off: </th>
                      <td className="py-4 px-6">{finalDestination.destination2.label}</td>
                    </tr>
                    <tr className={`bg-white ${!bookingData.is_addon_1 && !bookingData.is_addon_2 && !bookingData.is_addon_3 ? 'hidden': '' }`}>
                      <th className="py-4 px-6 text-left bg-gray-50">Add-ons: </th>
                      <td className="py-4 px-6">
  <span>
    {bookingData.is_addon_1 ? 'GPS' : ''}
  </span>
  <span>
    {bookingData.is_addon_2 ? `${bookingData.is_addon_1 ? ', ' : ''}Conducteur supplémentaire` : ''}
  </span>
  <span>
    {bookingData.is_addon_3 ? `${(bookingData.is_addon_1 || bookingData.is_addon_2) ? ', ' : ''}Siège bébé` : ''}
  </span>
  <span>
    {(!bookingData.is_addon_1 && !bookingData.is_addon_2 && !bookingData.is_addon_3) ? 'sans extensions' : ''}
  </span>
</td>
                    </tr>
                    <tr className='bg-white'>
                      <th className="py-4 px-6 text-left bg-gray-50">Email: </th>
                      <td className="py-4 px-6">{bookingData.email_address}</td>
                    </tr>
                    <tr className='bg-white'>
                      <th className="py-4 px-6 text-left bg-gray-50">Phone Number: </th>
                      <td className="py-4 px-6">{bookingData.phone_number}</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-gray-50 border font-medium">
                    <tr className="font-bold">
                      <th className="py-4 px-6 text-right">Total:</th>
                      <th className="py-4 px-6 text-center">{displayTotalPrice}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
    
              {/* Footer */}
              <div className="text-center text-gray-600">
                <p>Thank you for booking a car on our website!</p>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
export default SuccessBooking;