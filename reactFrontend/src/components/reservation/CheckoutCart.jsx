import { ChevronRight } from 'lucide-react';
import { FaCar, FaArrowCircleRight } from "react-icons/fa"
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';



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


const CheckoutCart = ({ selectedCurrency }) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const car = state?.car || {}
    const DateTimeStateFrom = state?.FinalDateTimeStateFrom || {}
    const finalDestination = state?.finalDestinationState || {}
    const totalPrice = state?.totalPrice || 0
    const selectedAddOns = state?.selectedAddOns || {}



    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    console.log('checkout cart date time...', DateTimeStateFrom)
    console.log('checkout cart destination...', finalDestination)
    console.log('checkout cart...', car)
    console.log('selected add-ons on checkout cart...', finalDestination.destination1.label)

    // Extract currency code from selectedCurrency or default to MAD
    const currencyCode = selectedCurrency ? selectedCurrency.split(' ')[0] : 'MAD dh';

    // Format price with currency symbol
    const displayTotalPrice = formatPrice(convertPrice(totalPrice, 'MAD dh', currencyCode), currencyCode);
    const [loader, setLoader] = useState(false)

    const handlePassingData = (e) => {
        e.preventDefault();
        
        setLoader(true);
        setTimeout(() => {
            navigate('/checkout', { 
                state: { 
                    car: car, 
                    DateTimeStateFrom: DateTimeStateFrom, 
                    finalDestination: finalDestination, 
                    totalPrice: totalPrice, 
                    selectedAddOns: selectedAddOns 
                }
            });
            setLoader(false);
        }, 300);
    }

    return(
        <section className='container mx-auto'>
            <div className="flex text-sm mt-4 ml-6">
                <span className="text-red-600">Accueil</span> <ChevronRight className="w-3 text-gray-500 mx-[2px] -mt-[1px]" /> <span className="text-gray-500 text-sm">Panier</span>
            </div>
            
            <div className='grid grid-cols-4'>
                <div className="p-2 WidthLgCheckoutCartRes sm:p-6 col-span-4 md:col-span-3 lg:col-span-2">
                    {/* List item */}
                    <p className='text-[39.99px] font-light text-gray-600 mb-4'>Panier</p>
                    <div className='w-24'>
                        <div className='bg-gray-100 pl-2 py-2 rounded-t flex'><FaCar className='text-gray-500' /> <span className='text-gray-500 text-sm pl-1 -mt-[2px]'>Voitures</span></div>
                    </div>
                    <div className="border shadow-lg p-4 mb-4">

                        <div className="grid grid-cols-4">

                        <img src={car.image} className='col-span-4 sm:col-span-1 w-40 object' alt="" />

                        <div className="ml-4 col-span-4 sm:col-span-2">
                            <h3 className="text-lg text-red-600">{car.name}</h3>
                            <p className="text-sm text-gray-500 -mt-1.5 mb-1">ou sommes</p>
                            <p className="text-gray-600 text-sm">
                                Date : {DateTimeStateFrom.pickupDate? `${DateTimeStateFrom.pickupDate.toLocaleDateString('en-GB')}`: 'no date selected'} {DateTimeStateFrom.pickupHour? `${DateTimeStateFrom.pickupHour}h`: 'no time selected'} 
                                <br /> 
                                <FaLongArrowAltRight className='inline-block' /> {DateTimeStateFrom.dropoffDate? `${DateTimeStateFrom.dropoffDate.toLocaleDateString('en-GB')}`: 'no date selected'} {DateTimeStateFrom.tempDropoffHour? `${DateTimeStateFrom.tempDropoffHour}h`: 'no time selected'} <br />
                                Régions: {finalDestination.destination1.label.toUpperCase()} <FaLongArrowAltRight className='inline-block' /> <br /> {finalDestination.destination2.label.toUpperCase()}
                            </p>
                        </div>

                        <div className='ml-3 sm:ml-0'>
                            <div className='sm:block'>
                                <p className="text-xl sm:text-3xl font-semibold text-gray-600">{displayTotalPrice}</p>
                                <a href='#' className='mt-1 flex text-red-600 hover:text-red-500'>plus de voitures <FaLongArrowAltRight className='mt-1.5 ml-1' /></a>
                            </div>
                        </div>

                        </div>
                    </div>
                </div>

                <div className='col-span-4 md:col-span-1 -mt-9 sm:-mt-0 ml-2 mr-1 md:ml-0 mb-6 lg:ml-2'>
                    <p className='text-2xl font-md sm:text-[39.99px] sm:text-[34.99px] lg:text-[39.99px] sm:font-light text-gray-600 mt-8'>Total panier</p>
                        
                    <div className='mr-1 md:mr-0 lg:mr-10 mt-2 md:mt-4 lg:mt-3'>
                        <div className='border border-gray-300 font-semibold rounded-t px-2 text-gray-500 py-2 flex justify-between items-center'><p>Sous- <br /> total</p> <p className='font-normal mr-1'>{displayTotalPrice}</p></div>
                        <div className='border-b border-x border-gray-300 font-semibold rounded-b px-2 text-gray-500 py-2 flex justify-between items-cente'><p>Total</p> <p className='mr-1'>{displayTotalPrice}</p></div>
                    </div>

                    <button onClick={handlePassingData} className='bg-red-600 text-gray-100 px-2 sm:px-4 md:px-1 lg:px-4 sm:font-semibold py-2 sm:py-3 mt-4 rounded'>Valider la commande</button>
                </div>
            </div>
            <div className={`loaderPosition ${!loader ? 'invisible': 'visible'}`}>
                <div className="loaderBg"></div>
                <span class="loader"></span>
            </div>
        </section>
    )
}
export default CheckoutCart