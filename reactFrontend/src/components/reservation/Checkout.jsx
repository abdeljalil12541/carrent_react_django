import { ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { FaCalendar } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import countries from '../../countries-list/countries.json';
import emailjs from '@emailjs/browser';

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



const Checkout = ({ selectedCurrency }) => {
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    
  const [loader, setLoader] = useState(false)
  const { state } = useLocation();
  const navigate = useNavigate();
  const car = state?.car
  const DateTimeStateFrom = state?.DateTimeStateFrom
  const finalDestination = state?.finalDestination
  const totalPrice = state?.totalPrice
  const selectedAddOns = state?.selectedAddOns
  const form = useRef(null);

  
  // Extract currency code from selectedCurrency or default to MAD
  const currencyCode = selectedCurrency ? selectedCurrency.split(' ')[0] : 'MAD dh';

  // display car price
  const displayCarPrice = formatPrice(convertPrice(car.price, 'MAD dh', currencyCode), currencyCode);

  // Format price with currency symbol
  const displayTotalPrice = formatPrice(convertPrice(totalPrice, 'MAD dh', currencyCode), currencyCode);

  console.log('checkout page car...', car)
  console.log('checkout page date time...', DateTimeStateFrom)
  console.log('checkout page destination...', finalDestination)
  console.log('selected add-ons on checkout...', selectedAddOns)

  useEffect(() => {
      window.scrollTo(0, 0)
  }, [])

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState({}); // Initialize as an empty object

  console.log('car info success page', finalDestination);

  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  // Check authentication status on component mount
  useEffect(() => {
      const checkAuthStatus = async () => {
          try {
              const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/check_authentication/', { withCredentials: true });
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

  // Fetch authenticated user info
  const getUserInfo = async () => {
      try {
          const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/user-info/', { withCredentials: true });
          setAuthenticatedUser(response.data.user);
      } catch (error) {
          console.error('Error fetching user info:', error);
      }
  };

  // Log changes to isAuthenticated and authenticatedUser
  useEffect(() => {
      console.log('authenticated user:', authenticatedUser);
      console.log('is authenticated:', isAuthenticated);
  }, [isAuthenticated, authenticatedUser]); // Dependency array ensures logs on updates


// Format date time helper function
const formatForDjango = (date, time) => {
    const dateObj = new Date(date);
    const [hours, minutes] = time.split(':');
    dateObj.setHours(parseInt(hours), parseInt(minutes), 0);
    return dateObj.toISOString();
};

const [carName, setCarName] = useState(car.name);
const [imgForMail, setImgForMail] = useState(car.image);
const [destinationFormEmailJs, setDestinationFormEmailJs] = useState(`'${finalDestination.destination1.label}' à '${finalDestination.destination2.label}'`);

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [companyName, setCompanyName] = useState('');
const [country, setCountry] = useState('maroc'); // Initial value is 'maroc'
const [countryList, setCountryList] = useState([]);
const [streetNumberAndName, setStreetNumberAndName] = useState('');
const [city, setCity] = useState('');
const [regionDepartment, setRegionDepartment] = useState('');
const [postcode, setPostcode] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [emailAddress, setEmailAddress] = useState('');
const [message, setMessage] = useState('');
const [carForBooking, setCarForBooking] = useState(car);
const [pickupDatetime, setPickupDatetime] = useState('');
const [dropoffDatetime, setDropoffDatetime] = useState('');
const [bookingStatus, setBookingStatus] = useState('upcoming');
const [destinationToBook1, setDestinationToBook1] = useState(finalDestination.destination1.value);
const [destinationToBook2, setDestinationToBook2] = useState(finalDestination.destination2.value);
const [isAddon1, setIsAddon1] = useState('');
const [isAddon2, setIsAddon2] = useState('');
const [isAddon3, setIsAddon3] = useState('');
const [totalPriceToBook, setTotalPriceToBook] = useState(totalPrice);

useEffect(() => {
    console.log('car image ::', imgForMail)
})

useEffect(() => {
    const getCountries = async () => {
      try {
        // Try to fetch countries from the API
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('API fetch failed');
        }
        const data = await response.json();

        // Sort countries alphabetically by common name
        const sortedCountries = data.sort((a, b) => {
          const nameA = a.name.common.toLowerCase();
          const nameB = b.name.common.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        setCountryList(sortedCountries);
      } catch (error) {
        console.error('Error fetching from API, using local countries.json instead:', error);

        // Fallback to local countries.json file if API fails
        const sortedCountries = countries.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        setCountryList(sortedCountries);
      }
    };

    getCountries();
  }, []); // Runs once on component mount

  // Handle the country change
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

useEffect(() => {
    if (selectedAddOns) {
        setIsAddon1(selectedAddOns.gps);
        setIsAddon2(selectedAddOns.additionalDriver);
        setIsAddon3(selectedAddOns.babySeat);
    }
}, [selectedAddOns]);

const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date"; // Return a default message for invalid input

    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date"; // Handle parsing failure

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};



const [pickUpForEmail, setPickUpForEmail] = useState('');
const [dropOffForEmail, setDropOffForEmail] = useState('');
// Simplified useEffect to handle just pickup and dropoff datetime formatting
useEffect(() => {
    if (DateTimeStateFrom?.pickupDate && DateTimeStateFrom?.pickupHour) {
        const formattedPickupDateTime = formatForDjango(
            DateTimeStateFrom.pickupDate,
            DateTimeStateFrom.pickupHour
        );
        console.log("Formatted Pickup Datetime:", formattedPickupDateTime); // Debug
        setPickupDatetime(formattedPickupDateTime);
        setPickUpForEmail(formatDate(formattedPickupDateTime));
    }

    if (DateTimeStateFrom?.dropoffDate && DateTimeStateFrom?.tempDropoffHour) {
        const formattedDropoffDateTime = formatForDjango(
            DateTimeStateFrom.dropoffDate,
            DateTimeStateFrom.tempDropoffHour
        );
        console.log("Formatted Dropoff Datetime:", formattedDropoffDateTime); // Debug
        setDropoffDatetime(formattedDropoffDateTime);
        setDropOffForEmail(formatDate(formattedDropoffDateTime));
    }
}, [DateTimeStateFrom]);
console.log('selected add-ons on checkout...', selectedAddOns)
console.log('pickupdatetime...', pickupDatetime)
console.log('dropoffdatetime...', dropoffDatetime)
console.log('destination...', finalDestination)

console.log('destdsqdqsdsqination...', dropOffForEmail)

const getCSRFToken = () => {
    const name = 'csrftoken'; // This should match the name of your CSRF cookie
    const cookieValue = `; ${document.cookie}`;
    const parts = cookieValue.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const sendEmail = (e) => {
    e.preventDefault();
    emailjs
        .sendForm(
            'service_aoddrhn',
            'template_sz33o2f',
            form.current, // Pass the form reference
            'Rm8oyL6FStTFHX7uW'
        )
        .then(
            () => {
                console.log('SUCCESS!');
            },
            (error) => {
                console.log('FAILED...', error.text);
            }
        );
};

const CreateBoking = async (e) => {
    e.preventDefault();

    const carPk = carForBooking?.id;
    if (!carPk) {
        console.error("Car ID is missing. Cannot proceed with booking.");
        return;
    }

    // Ensure we have the current authentication state
    if (isAuthenticated && !authenticatedUser?.id) {
        console.error("User authentication state is invalid");
        toast.error('Authentication error. Please try again.');
        return;
    }

    const bookingData = {
        user: isAuthenticated ? authenticatedUser.id : null,
        first_name: firstName,
        last_name: lastName,
        company_name: companyName,
        country: country,
        street_number_and_name: streetNumberAndName,
        city: city,
        region_department: regionDepartment,
        postcode: postcode,
        phone_number: phoneNumber,
        email_address: emailAddress,
        message: message,
        car: carPk,
        pickup_datetime: pickupDatetime,
        dropoff_datetime: dropoffDatetime,
        booking_status: bookingStatus,
        destination1: destinationToBook1,
        destination2: destinationToBook2,
        is_addon_1: isAddon1,
        is_addon_2: isAddon2,
        is_addon_3: isAddon3,
        total_price: totalPriceToBook,
    };

    setLoader(true);
    
    // Newsletter checkbox logic
    const newsletterCheckbox = document.getElementById('newsletter');
    const isNewsletterChecked = newsletterCheckbox?.checked;

    setTimeout(async () => {
        try {
            const response = await fetch("https://carrentreactdjango-production.up.railway.app/api/create-booking/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken(),
                    // Add Authorization header if user is authenticated
                    // ...(isAuthenticated && {
                    //     "Authorization": `Bearer ${localStorage.getItem('authToken')}` // Adjust based on your auth setup
                    // })
                },
                credentials: 'include', // Important for CSRF token
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Booking creation failed:", errorData);
                toast.error(errorData.message || 'Oops.. something went wrong!');
                setLoader(false);
            } else {
                const createdBooking = await response.json();
                console.log("Booking created successfully:", createdBooking);

                // Send the email notification
                try {
                    sendEmail(e);
                } catch (error) {
                    console.error("Failed to send email:", error);
                }

                
                // If the newsletter checkbox is checked, submit the email
                if (isNewsletterChecked) {
                    try {
                        const newsletterResponse = await axios.post(
                            'https://carrentreactdjango-production.up.railway.app/api/add-news-letter/',
                            { email: emailAddress },
                            { withCredentials: true }
                        );
                        console.log('Newsletter added successfully', newsletterResponse.data);
                        toast.success('Newsletter added successfully');
                    } catch (error) {
                        console.error('Newsletter submission error:', error);
                    }
                }

                navigate('/success-booking', {
                    state: {
                        car: carForBooking,
                        bookingData,
                        finalDestination,
                        createdOrderDate: createdBooking.created_at,
                        bookingStatus: createdBooking.booking_status,
                        totalPrice
                    }
                });
            }
        } catch (error) {
            console.error("An error occurred:", error);
            toast.error('Network error. Please try again.');
            setLoader(false);
        }
    }, 2000);

};

const handleGoToContactPage = () => {
    setLoader(true);
    setTimeout(() => {
        navigate('/contact-us')
    }, 300);
}


  return (
    <div className="max-w-4xl md:mx-14 pt-4 px-6">
        <nav className="mb-3">
            <div className="flex text-sm ">
                <span className="text-red-600">Accueil</span> <ChevronRight className="w-3 text-gray-500 mx-[2px] -mt-[1px]" /> <span className="text-gray-500 text-sm">Panier</span>
            </div>
        </nav>

        <p className='text-3xl sm:text-4xl md:text-[39.99px] font-light text-gray-600 mb-4'>Checkout</p>

        <div className="bg-pink-50 flex justify-between border-t-[3px] border-red-600 p-4 mb-8">
            <p className="text-gray-700">
            <span className="mr-2">Aidez-nous à nous améliorer !</span>
                <div onClick={handleGoToContactPage} className="cursor-pointer text-red-500 inline-block hover:text-red-600 underline">
                    Donnez votre avis
                </div>
            </p>
            <FaCalendar className='inline-block mr-1 text-red-500 mt-[2px]' />
        </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-normal text-gray-700 mb-6">
            Détails de facturation
          </h2>
            <form ref={form} onSubmit={CreateBoking} className="space-y-4 mb-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm text-gray-600 mb-2">
                        Prénom
                    </label>
                    <input
                        name='firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        className="w-full p-2 border outline-none focus:border-red-600 duration-300"
                        placeholder="Prénom"
                    />
                    </div>
                    <div>
                    <label className="block text-sm text-gray-600 mb-2">
                        Nom
                    </label>
                    <input
                        name='lastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        className="w-full p-2 border outline-none focus:border-red-600 duration-300"
                        placeholder="Nom"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-2">
                    Nom de l'entreprise (facultatif)
                    </label>
                    <input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    type="text"
                    className="w-full p-2 border outline-none focus:border-red-600 duration-300"
                    placeholder="Nom de l'entreprise (facultatif)"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-2">
                    Pays/région
                    </label>
                    <select className='w-full p-2 border outline-none focus:border-red-600 duration-300' id="country-select" value={country} onChange={handleCountryChange}>
                    <option value="">Select a country</option>
                        {countryList.map((country) => (
                        <option key={country.cca2} value={country.name.common}>
                            {country.name.common}
                        </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-2">
                    Numéro et nom de rue
                    </label>
                    <input
                    value={streetNumberAndName}
                    onChange={(e) => setStreetNumberAndName(e.target.value)}
                    type="text"
                    className="w-full p-2 border outline-none focus:border-red-600 duration-300"
                    placeholder="Numéro et nom de rue"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-2">
                    Ville
                    </label>
                    <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    className="w-full p-2 border outline-none focus:border-red-600 duration-300"
                    placeholder="Ville"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-2">
                    Région / Département
                    </label>
                    <input
                    value={regionDepartment}
                    onChange={(e) => setRegionDepartment(e.target.value)}
                    type="text"
                    className="w-full p-2 border outline-none focus:border-red-600 duration-300"
                    placeholder="Région / Département"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-2">
                    Code postal
                    </label>
                    <input
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    type="text"
                    className="w-full p-2 border outline-none focus:border-red-600 duration-300"
                    placeholder="Code postal"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-2">
                    Téléphone
                    </label>
                    <input
                    name='phoneNumber'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="tel"
                    className="w-full p-2 border outline-none focus:border-red-600 duration-300"
                    placeholder="Téléphone"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-2">
                    Adresse de messagerie
                    </label>
                    <input
                    name='emailAddress'
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    type="email"
                    className="w-full p-2 border outline-none focus:border-red-600 duration-300"
                    placeholder="Adresse de messagerie"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <input
                    type="checkbox"
                    id="newsletter"
                    className="border outline-none focus:border-red-600"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-600">
                    Sign me up for the newsletter!
                    </label>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-2">
                    Notes de commande (facultatif)
                    </label>
                    <textarea
                    name='message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border outline-none focus:border-red-600 duration-300 min-h-[100px]"
                    placeholder="Notes de commande (facultatif)"
                    ></textarea>
                </div>

                <input type="text" className='hidden' value={carName} name='carName' />
                <input type="text" className='hidden' value={imgForMail} name='imgForMail' />
                <input type="text" className='hidden' value={destinationFormEmailJs} name='destinationFormEmailJs' />
                <input type="text" className='hidden' value={pickUpForEmail} name='pickUpForEmail' />
                <input type="text" className='hidden' value={dropOffForEmail} name='dropOffForEmail' />

                <div>
                    <button type='submit' className='bg-red-600 text-white font-semibold rounded px-4 py-2'>Commander</button>
                </div>
            </form>
        </div>

        <div className="lg:col-span-1 mb-4 -mt-9 lg:-mt-0">
          <div className="bg-white border">
            <div className="pt-6">
              <h2 className="text-2xl font- text-gray-800 mb-4 ml-4 pb-2">Votre commande</h2>
              <div>
                  <div className="flex items-center space-x-4 border-t  pb-4">
                    <img
                      src={car.image}
                      alt="car image"
                      className="w-20 h-12 ml-4 object-cover mt-4 rounded"
                    />
                    <div>
                      <h3 className="font-medium text-red-500">{car.name}</h3>
                      <p className="text-gray-600">{displayCarPrice} dhs</p>
                    </div>
                  </div>
                <div className='border-t py-3'>
                    <div className='flex justify-between text-gray-600 px-4 items-center'>
                        <p>Sous-total :</p>
                        <p>{displayTotalPrice}</p>
                    </div>
                </div>
                <div className='border-t py-3'>
                    <div className='flex justify-between text-2xl text-gray-600 px-4 items-center'>
                        <p className='text-base'>Total :</p>
                        <p className='text-red-600'>{displayTotalPrice}</p>
                    </div>
                </div>
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
  );
};

export default Checkout;