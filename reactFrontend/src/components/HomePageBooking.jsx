import React, { useState, useEffect } from "react"
import '../styles/css/Home.css'; // Ensure this path is correct
import { WiDaySunny, WiCloud, WiFog, WiDayRainMix, WiRain } from 'weather-icons-react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatInTimeZone } from 'date-fns-tz';
import { Link, useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import {MapPin} from 'lucide-react';
import Select from 'react-select';
import { FaMapMarkerAlt } from 'react-icons/fa';


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


const HomePageBooking = ({ selectedCurrency }) => {
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();

    const [selectedHour, setSelectedHour] = useState('');
    const [selectedHour2, setSelectedHour2] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);

    const hourOptions = Array.from({ length: 17 }, (_, i) => {
        const hour = i + 8;
        const displayHour = hour === 24 ? '00:00' : `${hour.toString().padStart(2, '0')}:00`;
        return (
        <option key={i} value={displayHour}>
            {displayHour}
        </option>
        );
    });



    const [isSameDestination, SetIsSameDestination] = useState(true);

    const toggleIsSameDestination = () => {
        SetIsSameDestination(!isSameDestination);
    }


    const [availableCars, setAvailableCars] = useState([]);
    const [pickupDate, setPickupDate] = useState(''); // For the pickup date
    const [dropoffDate, setDropoffDate] = useState(''); // For the dropoff date
    const [pickupHour, setPickupHour] = useState('');
    const [dropoffHour, setDropoffHour] = useState('');

    const HomeBookingDateTime = {
        pickupDate: pickupDate,
        dropoffDate: dropoffDate,
        pickupHour: pickupHour,
        dropoffHour: dropoffHour
    }

    const handlePickupHour = (event) => {
        setPickupHour(event.target.value);
        event.target.blur();
    };

    const [isPickupHourClicked, setIsPickupHourClicked] = useState(false)
    const togglePickupHour = (event) => {
        setIsPickupHourClicked(!isPickupHourClicked)

            if(isPickupHourClicked) {
                event.target.blur()
            }
    }

    const handleDropoffHour = (event) => {
        setDropoffHour(event.target.value);
        event.target.blur();
    };

    const [isDropoffHourClicked, setIsDropoffHourClicked] = useState(false)
    const toggleDropoffHour = (event) => {
        setIsDropoffHourClicked(!isDropoffHourClicked)

            if(isDropoffHourClicked) {
                event.target.blur()
            }
    }

    const fetchAvailableCars = async () => {
        const pickupDateTime = formatInTimeZone(
            new Date(pickupDate), 
            'UTC', 
            'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX'
        );
        const dropoffDateTime = formatInTimeZone(
            new Date(dropoffDate), 
            'UTC', 
            'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX'
        );

        try {
            const response = await axios.get("https://carrentreactdjango-production.up.railway.app/api/available-cars/", {
                params: {
                    pickup_datetime: pickupDateTime,
                    dropoff_datetime: dropoffDateTime,
                },
            });
            console.log("Response Data:", response.data);
            setAvailableCars(response.data.available_cars); // Ensure this is the correct path in the response
        } catch (error) {
            console.error("Error fetching available cars:", error);
        }
    };

    useEffect(() => {
        if (pickupDate && dropoffDate && pickupHour && dropoffHour) {
            fetchAvailableCars();
        }
    }, [pickupDate, dropoffDate, pickupHour, dropoffHour]);

    

const [selectedOptionDestination1, setSelectedOptionDestination1] = useState('');
const [selectedOptionDestination2, setSelectedOptionDestination2] = useState('');

const Destination = {
    selectedOptionDestination1: selectedOptionDestination1,
    selectedOptionDestination2: selectedOptionDestination2,
}

const handleChangeOptionDestination1 = (option) => {
  setSelectedOptionDestination1(option);
  if(selectedOptionDestination2 === '') {
    setSelectedOptionDestination2(option)
  } 
};

const handleChangeOptionDestination2 = (option) => {
  setSelectedOptionDestination2(option);
};

  const [pickupFeatures, setPickupFeatures] = useState([])
  useEffect(() => {
    const fetchPickupFeatures = async () => {
        try{
            const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/pick-up-features/')
            setPickupFeatures(response.data.data)
        }
        catch(error) {
            console.error("Error fetching pickup features:", error);
        }
    }
    fetchPickupFeatures();

    console.log('pickup features fetched successfully', pickupFeatures)
}, [])
    
const options = pickupFeatures.map((pickupFeature) => ({
        value: pickupFeature.id,
        label: pickupFeature.name,
        icon: <FaMapMarkerAlt color="red" />,
    }))
  
  // Custom option component to display the icon
  const customOption = (props) => {
    const { innerRef, innerProps, data } = props;
    return (
      <div className="cursor-pointer hover:bg-gray-100" ref={innerRef} {...innerProps} style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
        {data.icon}
        <span style={{ marginLeft: '8px' }}>{data.label}</span>
      </div>
    );
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine date and hour to create full datetime strings
    const pickup_datetime = `${pickupDate}T${pickupHour}:00.000Z`;
    const dropoff_datetime = `${dropoffDate}T${dropoffHour}:00.000Z`;
    setLoader(true)

    console.log('Submitting:', { pickup_datetime, dropoff_datetime });

    setTimeout(async () => {

    // Fetch available cars
    await fetchAvailableCars(); // No need to assign this to a variable

    // After fetching, log available cars
    console.log('Available Cars:', availableCars); // This may log the previous state

    // Prepare the Destination object without the icons
    const cleanDestination = {
        selectedOptionDestination1: {
            value: selectedOptionDestination1.value,
            label: selectedOptionDestination1.label
        },
        selectedOptionDestination2: {
            value: selectedOptionDestination2.value,
            label: selectedOptionDestination2.label
        }
    };
    

    // Navigate after a successful fetch, based on the updated state
        if (availableCars.length > 0) {
            // Only navigate if there are available cars
            navigate('/location-de-voitures', { 
                state: { availableCars: availableCars, HomeBookingDateTime: HomeBookingDateTime, Destination: cleanDestination }
            });
        } else {
            // Handle the case when no cars are available
            console.log('No available cars found.');
        }
    }, 1000)
};

useEffect(() => {
    console.log('destination', Destination)
})

const [minPrice, setMinPrice] = useState();
useEffect(() => {
    const fetchPriceFilter = async () => {
      try {
        const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/price-filter/');
        setMinPrice(response.data.min_price);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchPriceFilter();
  }, []);

  // Extract currency code from selectedCurrency or default to MAD
  const currencyCode = selectedCurrency ? selectedCurrency.split(' ')[0] : 'MAD dh';

  // Format price with currency symbol
  const displayMinPrice = formatPrice(convertPrice(minPrice, 'MAD dh', currencyCode), currencyCode);

    return (
        <>
        <div className={`home ${isSameDestination? '' : 'homeResDes'} relative`}>
            <div className="bgHome"></div>
            <div className="grid grid-cols-3 sm:px-6 lg:px-24 paddingRes pt-2 sm:pt-4 sm:pt-10 relative" style={{zIndex: '999'}}>

            <div className="col-span-3 lg:col-span-2">
                <h3 className="ml-0 sm:ml-0 text-center lg:text-start text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white pb-1 sm:pb-6 lg:pb-5">
                    Trouvez votre voiture parfaite
                </h3>
                <div>
                    <div className="container mx-auto flex flex-col md:flex-row p-2 md:p-0">
                    <form onSubmit={handleSubmit} className="border border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg">
                        <div className="flex flex-col md:flex-row">
                        <div className="w-full text-gray-700">
                            <label>Départ de</label>
                            <div className="relative mt-4">
                                {/* Overlay SVG icon */}
                                <svg fill="#828282" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 395.71 395.71" xmlSpace="preserve" stroke="#828282" className="absolute left-3 top-2.5 w-5 h-5 pointer-events-none">
                                    <g>
                                    <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path>
                                    </g>
                                </svg>

                                {/* React Select Component */}
                                <Select
                                    required
                                    options={options}
                                    placeholder="Départ de"
                                    components={{ Option: customOption }}
                                    value={selectedOptionDestination1}
                                    onChange={handleChangeOptionDestination1}
                                    isSearchable
                                    styles={{
                                    control: (base, state) => ({ ...base, width: '100%', paddingLeft: '2.5rem', backgroundColor: 'transparent', color: '#4A4A4A', fontSize: '0.910rem', borderRadius: '0px', borderColor: state.isFocused ? 'red' : '#E5E7EB', boxShadow: state.isFocused ? '0 0 0 0px red' : '0 0 0 0px #d1d5db', '&:hover': { outline: 'none' , cursor: 'text'} }),
                                    placeholder: (base) => ({ ...base, color: '#94A3B8' }),
                                    dropdownIndicator: (base) => ({ ...base, color: '#828282' }),
                                    singleValue: (base) => ({ ...base, color: '#4A4A4A' }),
                                    menu: (base) => ({ ...base, zIndex: 10 }),
                                    }}
                                />
                            </div>
                        </div>
                        </div>

                        {isSameDestination ? (
                        <p onClick={toggleIsSameDestination} className="text-red-700 cursor-pointer">
                            Différente destination
                        </p>
                        ) : (
                        <>
                            <p onClick={toggleIsSameDestination} className="text-red-700 cursor-pointer">
                            Même destination
                            </p>
                            <div className="flex flex-col md:flex-row">
                            <div className="w-full text-gray-700">
                                <label>Retour à</label>
                                <div className="relative mt-4">
                                    {/* Overlay SVG icon */}
                                    <svg fill="#828282" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 395.71 395.71" xmlSpace="preserve" stroke="#828282" className="absolute left-3 top-2.5 w-5 h-5 pointer-events-none">
                                        <g>
                                        <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path>
                                        </g>
                                    </svg>

                                    {/* React Select Component */}
                                    <Select
                                        required
                                        options={options}
                                        placeholder="Retour à"
                                        components={{ Option: customOption }}
                                        value={selectedOptionDestination2}
                                        onChange={handleChangeOptionDestination2}
                                        isSearchable
                                        styles={{
                                        control: (base, state) => ({ ...base, width: '100%', paddingLeft: '2.5rem', backgroundColor: 'transparent', color: '#4A4A4A', fontSize: '0.910rem', borderRadius: '0px', borderColor: state.isFocused ? 'red' : '#E5E7EB', boxShadow: state.isFocused ? '0 0 0 0px red' : '0 0 0 0px #d1d5db', '&:hover': { outline: 'none' , cursor: 'text'} }),
                                        placeholder: (base) => ({ ...base, color: '#94A3B8' }),
                                        dropdownIndicator: (base) => ({ ...base, color: '#828282' }),
                                        singleValue: (base) => ({ ...base, color: '#4A4A4A' }),
                                        menu: (base) => ({ ...base, zIndex: 10 }),
                                        }}
                                    />
                                </div>
                            </div>
                            </div>
                        </>
                        )}

                        <div className="grid text-gray-700 grid-cols-8 sm:grid-cols-9 md:grid-cols-8 gap-4">
                            <div className="flex flex-col col-span-8 sm:col-span-4 md:col-span-2 lg:col-span-2">
                                <label className="mb-1">Début de location</label>

                                <DatePicker required placeholderText="mm/dd/yyyy" selected={pickupDate} onChange={date => setPickupDate(date)} className="w-full h-[39px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 py-2 transition duration-300 ease focus:outline-none focus:border-red-700 shadow-sm focus:shadow" showIcon />
                            </div>
                            <div className="flex flex-col col-span-8 sm:col-span-4 md:col-span-2 lg:col-span-2">
                                <label className="mb-1">l'heure</label>
                                <div className="relative">
                                    <select
                                        required
                                        value={pickupHour}
                                        onClick={(e) => togglePickupHour(e)}
                                        onChange={(e) => handlePickupHour(e)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        className={`custom-select w-full bg-transparent placeholder:text-slate-400 text-slate-600 border border-slate-200 py-2 transition duration-300 ease focus:outline-none focus:border-red-700 shadow-sm focus:shadow
                                        ${
                                        isFocused ? 'border-red-600' : 'border-gray-400'
                                        } text-gray-500 bg-transparent px-4 py-[6.5px] pr-10 outline-none`}
                                    >
                                        <option value="" disabled>--:--</option>
                                        {hourOptions}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                        <div 
                                        className={`h-2 w-2 border-r-2 border-b-2 transform rotate-45 transition-colors duration-200 ${
                                            isFocused ? 'border-red-600' : 'border-gray-400'
                                        }`}
                                        style={{
                                            marginBottom: '3px',
                                        }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col col-span-8 sm:col-span-4 md:col-span-2 lg:col-span-2">
                                <label className="mb-1">Fin de Location</label>
                                <DatePicker required placeholderText="mm/dd/yyyy" selected={dropoffDate} onChange={date => setDropoffDate(date)} className="w-full h-[39px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 py-2 transition duration-300 ease focus:outline-none focus:border-red-700 shadow-sm focus:shadow" showIcon />
                            </div>
                            <div className="flex flex-col col-span-8 sm:col-span-4 md:col-span-2 lg:col-span-2">
                                <label className="mb-1">l'heure</label>
                                <div className="relative">
                                    <select
                                        required
                                        value={dropoffHour}
                                        onClick={(e) => toggleDropoffHour(e)}
                                        onChange={(e) => handleDropoffHour(e)}
                                        onFocus={() => setIsFocused2(true)}
                                        onBlur={() => setIsFocused2(false)}
                                        className={`custom-select w-full bg-transparent placeholder:text-slate-400 text-slate-600 border border-slate-200 py-2 transition duration-300 ease focus:outline-none focus:border-red-700 shadow-sm focus:shadow 
                                        ${
                                        isFocused2 ? 'border-red-600' : 'border-gray-400'
                                        } text-gray-500 bg-transparent px-4 py-[6.5px] pr-10 outline-none`}
                                    >
                                        <option value="" disabled>--:--</option>
                                        {hourOptions}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                        <div 
                                        className={`h-2 w-2 border-r-2 border-b-2 transform rotate-45 transition-colors duration-200 ${
                                            isFocused2 ? 'border-red-600' : 'border-gray-400'
                                        }`}
                                        style={{
                                            marginBottom: '3px',
                                        }}
                                        />
                                    </div>
                                    </div>
                            </div>
                        </div>

                        <div className="flex justify-start">
                        <button type="submit" className="py-3 px-4 border font-medium hover:bg-red-500 duration-300 rounded-md bg-red-700 text-white">
                            Rechercher des Véhicules
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>


                <div className={`col-span-3 hideItemsRes ${isSameDestination? '': 'bookingDesHomeRes'} hidden sm:block lg:mt-0 bookingHomeRes lg:ml-9 lg:col-span-1 lg:flex lg:flex-col sm:flex-row sm:grid grid-cols-2 items-center`}>
                    {/* Weather Info Section */}
                    <div className={`col-span-1 hidden md:block weather-info flex ${isSameDestination? 'mt-4': 'mt-0'} sm:mt-24 marginForCountUpSpaceRes lg:-mr-14 flex-col lg:flex-col`}>
                        <h2 className="text-3xl sm:text-4xl text-center text-white">CASABLANCA OFFICE</h2>
                        <div className={`flex items-center ${isSameDestination? 'mt-4':'mt-2'} font-light mb-4 sm:mb-0 sm:font-normal  sm:mt-6 justify-center`}>
                            <span className="text-4xl mx-2 text-gray-200">+<CountUp end={7} duration={1.75} /> Years </span>
                            <span className="text-8xl text-gray-200"><MapPin strokeWidth={1.5} size={50} /></span>
                        </div>
                    </div>
                    
                    {/* Car Info Section */}
                    <div className="col-span-1 hidden md:block flex lg:flex-col items-center justify-center lg:mt-0  marginForCountUpSpaceRes lg:-mr-14">
                        <div className="flex flex-col">
                            <a href="" className={`ml-2 sm:ml-0 text-sm text-center flex sm:text-[16px] justify-center sm:mt-8 font-medium hover:text-white`} style={{color: "#e2e8f0"}}>
                                <svg className="pr-2" viewBox="0 0 24 24" style={{marginTop: '2px'}} height={20} fill="#e2e8f0" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2 14.803v6.447c0 .414.336.75.75.75h1.614a.75.75 0 0 0 .74-.627L5.5 19h13l.395 2.373a.75.75 0 0 0 .74.627h1.615a.75.75 0 0 0 .75-.75v-6.447a5.954 5.954 0 0 0-1-3.303l-.78-1.17a1.994 1.994 0 0 1-.178-.33h.994a.75.75 0 0 0 .671-.415l.25-.5A.75.75 0 0 0 21.287 8H19.6l-.31-1.546a2.5 2.5 0 0 0-1.885-1.944C15.943 4.17 14.141 4 12 4c-2.142 0-3.943.17-5.405.51a2.5 2.5 0 0 0-1.886 1.944L4.399 8H2.714a.75.75 0 0 0-.67 1.085l.25.5a.75.75 0 0 0 .67.415h.995a1.999 1.999 0 0 1-.178.33L3 11.5c-.652.978-1 2.127-1 3.303zm15.961-4.799a4 4 0 0 0 .34.997H5.699c.157-.315.271-.65.34-.997l.632-3.157a.5.5 0 0 1 .377-.39C8.346 6.157 10 6 12 6c2 0 3.654.156 4.952.458a.5.5 0 0 1 .378.389l.631 3.157zM5.5 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM20 14.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                                </svg>
                                24 Voitures from {displayMinPrice}/jour
                            </a>

                            <div className="w-full flex justify-center mt-9">
                                <button className="py-3 px-4 font-medium hover:bg-red-500 duration-300 rounded-md bg-red-700 text-white">
                                    Explore
                                    <svg height={15} className="pl-1 mb-[1px] inline-block" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                        <path d="M8.293 5.707a1 1 0 0 1 1.414-1.414l6.647 6.646a1.5 1.5 0 0 1 0 2.122l-6.647 6.646a1 1 0 0 1-1.414-1.414L14.586 12 8.293 5.707z" fill="#ffffff"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className={`loaderPosition ${!loader ? 'invisible': 'visible'}`}>
                <div className="loaderBg"></div>
                <span class="loader"></span>
            </div>
        </div>

        
        </>
    );
}

export default HomePageBooking;