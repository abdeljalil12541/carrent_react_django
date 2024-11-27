import CarsForRent from "./CarsForRent";
import Filter from "./Filter";
import '../../styles/css/carPage.css'
import { useState, useRef, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatInTimeZone } from "date-fns-tz";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import Select from 'react-select';



const CarsPage = ({ selectedCurrency }) => {

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) => {

            // Check if the category is already selected
            const isSelected = prev.includes(category);

            // Create a new array with the category added or removed
            const newSelected = isSelected
                ? prev.filter((c) => c !== category) // Remove if already selected
                : [...prev, category]; // Add if not selected

            // Ensure the array is unique
            const uniqueSelected = Array.from(new Set(newSelected));

            return uniqueSelected; // Return the new unique array
        });
    };




    
    const [filteredCarPrice, setFilteredCarPrice] = useState([]);

     // Function to handle filtering by price
     const handleFilteringPriceChange = (price) => {
        setFilteredCarPrice((prev) => {
            
            // Check if the new price range is already selected
            const isSelected = prev.some(
                (p) => p.low === price.low && p.high === price.high
            );
    
            // If the new price range is selected, remove all previous selections and keep the current one
            if (isSelected) {
                return [price]; // Return a new array with only the selected price range
            }
    
            // If the new price range is not selected, clear previous selections and add the new one
            const newSelected = [price];
            return newSelected; // Return the new array with the added price range
        });
    };
    




    const [selectedPickupFeature, setSelectedPickupFeature] = useState([]);

    const handlePickupFeatureChange = (pickupFeature) => {
        setSelectedPickupFeature((prev) => {

            // Check if the category is already selected
            const isSelected = prev.includes(pickupFeature);

            // Create a new array with the category added or removed
            const newSelected = isSelected
                ? prev.filter((c) => c !== pickupFeature) // Remove if already selected
                : [...prev, pickupFeature]; // Add if not selected

            // Ensure the array is unique
            const uniqueSelected = Array.from(new Set(newSelected));

            return uniqueSelected; // Return the new unique array
        });
    };




    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const handleSelectedFeaturesChange = (feature) => {
        setSelectedFeatures((prev) => {

            // Check if the category is already selected
            const isSelected = prev.includes(feature);

            // Create a new array with the category added or removed
            const newSelected = isSelected
                ? prev.filter((c) => c !== feature) // Remove if already selected
                : [...prev, feature]; // Add if not selected

            // Ensure the array is unique
            const uniqueSelected = Array.from(new Set(newSelected));

            return uniqueSelected; // Return the new unique array
        });
    };
    




    const [selectedDefaultEquipement, setSelectedDefaultEquipements] = useState([]);

    const handleDefaultEquipementsChange = (defaultEquipement) => {
        setSelectedDefaultEquipements((prev) => {

            // Check if the category is already selected
            const isSelected = prev.includes(defaultEquipement);

            // Create a new array with the category added or removed
            const newSelected = isSelected
                ? prev.filter((c) => c !== defaultEquipement) // Remove if already selected
                : [...prev, defaultEquipement]; // Add if not selected

            // Ensure the array is unique
            const uniqueSelected = Array.from(new Set(newSelected));

            return uniqueSelected; // Return the new unique array
        });
    };
    
    

    const dialogRef = useRef(null); // Create a ref for the dialog
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                closeSlider(); // Close the slider if clicked outside
                console.log('slider closing...');
            }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Clean up the event listener
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [isSameDestination, SetIsSameDestination] = useState(true);

    const toggleIsSameDestination = () => {
        SetIsSameDestination(!isSameDestination);
    }

    const closeSlider = () => {
        handleOpen(); // Close the dialog
    };


    const [SearchFormVisible, setSearchFormVisible] = useState(true)
    const toggleSearchFormVisible = () => {
        setSearchFormVisible(!SearchFormVisible)
        console.log('SearchFormVisible?', SearchFormVisible)
    } 



    // Boking form homepage 
    const navigate = useNavigate();
    const location = useLocation();
    const [availableCarsState, setAvailableCarsState] = useState([]);
    const [homeBookingDateTime, setHomeBookingDateTime] = useState([]);

    useEffect(() => {
        if (location.state?.HomeBookingDateTime) {
            setHomeBookingDateTime(location.state.HomeBookingDateTime)
            console.log('cars page date time from home booking...', location.state?.HomeBookingDateTime)
        }
        // Check if we have cars data in location state
        if (location.state?.availableCars) {
            setAvailableCarsState(location.state.availableCars);
            toggleSearchFormVisible();
            console.log('Available cars state:', location.state.availableCars);
        } else {
            console.log('No available cars found in location state');
            // Optionally redirect back to booking page if no cars data
            // navigate('/');
        }
    }, [location.state]);
    // Boking form homepage end 




    // Boking form 
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
        const [loader, setLoader] = useState(false)
        const [availableCarsFromBokkingForm, setAvailableCarsFromBokkingForm] = useState([]);
        const [pickupDate, setPickupDate] = useState(''); // For the pickup date
        const [dropoffDate, setDropoffDate] = useState(''); // For the dropoff date
        const [pickupHour, setPickupHour] = useState('');
        const [dropoffHour, setDropoffHour] = useState('');

        const finalDateTimeFromCarsPage = {
            pickupDate: pickupDate,
            pickupHour: pickupHour,
            dropoffDate: dropoffDate,
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

        const fetchAvailableCarsFromBookingForm = async () => {
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
            const response = await axios.get("https://admin.fn-drive.com/api/available-cars/", {
                params: {
                    pickup_datetime: pickupDateTime,
                    dropoff_datetime: dropoffDateTime,
                },
            });
            console.log("Response Data:", response.data);
            setAvailableCarsFromBokkingForm(response.data.available_cars); // Ensure this is the correct path in the response
            } catch (error) {
                console.error("Error fetching available cars:", error);
            }
        };


        const handleCarsFormBookingSubmit =  (e) => {
            e.preventDefault();
            setLoader(true);

            // Combine date and hour to create full datetime strings
            const pickup_datetime = `${pickupDate}T${pickupHour}:00.000Z`;
            const dropoff_datetime = `${dropoffDate}T${dropoffHour}:00.000Z`;

            console.log('Submitting:', { pickup_datetime, dropoff_datetime });

            setTimeout(() => {

            // Fetch available cars
             fetchAvailableCarsFromBookingForm(); // No need to assign this to a variable
            if (availableCarsFromBokkingForm.length === 0) {
                setLoader(false); // Stop the loader if no cars are available
                toggleSearchFormVisible(); // Proceed with showing results
            } else {
                toggleSearchFormVisible(); // Proceed with showing results
                setLoader(false); // Turn off the loader if cars are found
            }

            // Set the destination after submitting the form
        const cleanDestination = {
            selectedOptionDestination1: selectedOptionDestination1?.value
                ? {
                    value: selectedOptionDestination1.value,
                    label: selectedOptionDestination1.label
                }
                : {}, // Default to empty object if no value is selected
            selectedOptionDestination2: selectedOptionDestination2?.value
                ? {
                    value: selectedOptionDestination2.value,
                    label: selectedOptionDestination2.label
                }
                : {}, // Default to empty object if no value is selected
        };

        // Only set the final destination after form submission
        if (cleanDestination) {
            setFinalDestination(cleanDestination);
        }

            // After fetching, log available cars
            console.log('Available Cars:', availableCarsFromBokkingForm); // This may log the previous state
            }, 1000)
        };

    // Boking form end 



    
    const [finalDateTime, setFinalDateTime] = useState({});
    const [selectedOptionDestination1, setSelectedOptionDestination1] = useState('');
    const [selectedOptionDestination2, setSelectedOptionDestination2] = useState('');

    // Derived state to determine which date/time to use
    useEffect(() => {
        const bookingDateTimeFromHome = location.state?.HomeBookingDateTime;
        const bookingDateTimeFromCarsPage = {
            pickupDate: pickupDate,
            pickupHour: pickupHour,
            dropoffDate: dropoffDate,
            dropoffHour: dropoffHour
        };

        if (pickupDate || pickupHour || dropoffDate || dropoffHour) {
            setFinalDateTime(bookingDateTimeFromCarsPage);
        } else if(bookingDateTimeFromHome) {
            setFinalDateTime(bookingDateTimeFromHome);
        }
    }, [location.state, pickupDate, pickupHour, dropoffDate, dropoffHour]);



    
    const [finalDestination, setFinalDestination] = useState([]);

    useEffect(() => {
        console.log('destination from home booking page', finalDestination)
    }, [finalDestination])

    const [pickupFeatures, setPickupFeatures] = useState([])
    useEffect(() => {
        const fetchPickupFeatures = async () => {
            try{
                const response = await axios.get('https://admin.fn-drive.com/api/pick-up-features/')
                setPickupFeatures(response.data.data)
                console.log("pickup features id:", response.data.data);
            }
            catch(error) {
                console.error("Error fetching pickup features:", error);
            }
        }
        fetchPickupFeatures();

        console.log('pickup features fetched successfully', pickupFeatures)
    }, [])


    const DestinationCarsPage = {
        selectedOptionDestination1: selectedOptionDestination1,
        selectedOptionDestination2: selectedOptionDestination2,
    }

    useEffect(() => {
        console.log('destination carspage', DestinationCarsPage)
    })

    const handleChangeOptionDestination1 = (option) => {
        setSelectedOptionDestination1(option);
        if(selectedOptionDestination2 === '') {
            setSelectedOptionDestination2(option)
        }    
    };

    const handleChangeOptionDestination2 = (option) => {
    setSelectedOptionDestination2(option);
    };

        const options = pickupFeatures.map((pickupFeature) => ({
            value: pickupFeature.id,
            label: pickupFeature.name,
            icon: <FaMapMarkerAlt color="red" />,
        }))
    
    // Custom option component to display the icon
    const customOption = (props) => {
        const { innerRef, innerProps, data } = props;
        return (
        <div className="cursor-pointer hover:bg-gray-100" ref={innerRef} {...innerProps} style={{ display: 'flex', alignItems: 'center', padding: '8px'}}>
            {data.icon}
            <span style={{ marginLeft: '8px' }}>{data.label}</span>
        </div>
        );
    };

  
    const cleanDestination = {
        selectedOptionDestination1: selectedOptionDestination1?.value
            ? {
                value: selectedOptionDestination1.value,
                label: selectedOptionDestination1.label
            }
            : {}, // Default to empty object if no value is selected
        selectedOptionDestination2: selectedOptionDestination2?.value
            ? {
                value: selectedOptionDestination2.value,
                label: selectedOptionDestination2.label
            }
            : {}, // Default to empty object if no value is selected
    };

    useEffect(() => {
        const destinationFromHomeBookingPage = location.state?.Destination;
    
        // Check if there's a destination passed from the home booking page
        if (destinationFromHomeBookingPage) {
            setFinalDestination(destinationFromHomeBookingPage);
        } 
    }, [location.state?.Destination, selectedOptionDestination1, selectedOptionDestination2]);

    const [filteredCarsLengthByCurrentLocation, setFilteredCarsLengthByCurrentLocation] = useState(0);


    return(
    <section className="mx-1 lg:container searcherRes lg:mx-auto lg:px-16">
        <nav className="mt-4">
                <div className="flex items-center gap-2 text-sm">
                <a href="/" className="text-red-600 hover:text-red-700 ml-1 font-semibold">Accueil</a>
                <span className="text-gray-400"><ChevronRight className='-ml-1' size={14} /></span>
                <span className="text-gray-500 -ml-1">LOCATION DE VOITURES</span>
                </div>
        </nav>
        <div className="hidden md:block">
            <h2 className={`text-xl sm:text-3xl ${SearchFormVisible? 'hidden': ''} font-light inline-block mt-3`}>
                {filteredCarsLengthByCurrentLocation > 0 ? `${filteredCarsLengthByCurrentLocation} voitures` : 'Aucune voiture'} à {
                    finalDestination.selectedOptionDestination1 && finalDestination.selectedOptionDestination1.label
                    ? finalDestination.selectedOptionDestination1.label.toUpperCase()
                    : ''
                }
                <span> </span>
                le {finalDateTime.pickupDate ? `${new Date(finalDateTime.pickupDate).toLocaleDateString('en-US', { month: 'short' })} ${new Date(finalDateTime.pickupDate).getDate()}` : 'empty date'}
                <span> </span>
                - {finalDateTime.dropoffDate ? `${new Date(finalDateTime.dropoffDate).toLocaleDateString('en-US', { month: 'short' })} ${new Date(finalDateTime.dropoffDate).getDate()}` : 'empty date'}
            </h2>
            <a onClick={(event) => { event.preventDefault(); setSearchFormVisible(true); }} className={`${SearchFormVisible? 'hidden': ''} text-red-600 cursor-pointer text-sm ml-1 inline-block`}>Changer la recherche</a>
        </div>
        
        <div className={`${!SearchFormVisible? 'hidden': ''} w-full bg-neutral-950 rounded-md pb-2 sm:pb-6 pt-6 px-4 mt-6`}>
            <form onSubmit={handleCarsFormBookingSubmit} className="md:flex items-center justify-center space-x-4">
                <div className="flex mb-3 flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-1 md:space-x-4 mr-1">
                    {/* "Départ de" Input */}
                    <div className="flex flex-col">
                        <label htmlFor="inp1" className="text-gray-200 text-sm sm:text-[16px] mb-2">Lieu de ramassage</label>
                        <div className="relative w-full lg:w-56">
                            {/* Overlay SVG icon */}
                            <svg fill="#828282" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 395.71 395.71" xmlSpace="preserve" stroke="#828282" className="absolute left-3 top-2.5 w-5 h-5 pointer-events-none">
                                <g>
                                <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path>
                                </g>
                            </svg>
                                {/* React Select Component */}
                                <Select
                                    className="destinations"
                                    required
                                    options={options}
                                    placeholder="Départ de"
                                    components={{ Option: customOption }}
                                    value={selectedOptionDestination1}
                                    onChange={handleChangeOptionDestination1}
                                    isSearchable
                                    styles={{
                                    control: (base, state) => ({ ...base, width: '100%', paddingLeft: '2.5rem', backgroundColor: 'transparent', color: '#4A4A4A', fontSize: '0.920rem', borderRadius: '0px', borderColor: state.isFocused ? 'red' : '#4b5563', boxShadow: state.isFocused ? '0 0 0 0px red' : '0 0 0 0px #d1d5db', '&:hover': { outline: 'none' , cursor: 'text'} }),
                                    placeholder: (base) => ({ ...base, color: '#94A3B8' }),
                                    dropdownIndicator: (base) => ({ ...base, color: '#828282' }),
                                    singleValue: (base) => ({ ...base, color: '#94a3b8' }),
                                    menu: (base) => ({ ...base, zIndex: 10 }),
                                    }}
                                />
                        </div>
                    </div>

                    {/* "Retour à" Input */}
                    <div className="flex flex-col">
                        <label htmlFor="inp2" className="text-gray-200 text-sm sm:text-[16px] mb-2">Lieu de dépôt</label>
                        <div className="relative w-full lg:w-56">
                                {/* Overlay SVG icon */}
                                <svg fill="#828282" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 395.71 395.71" xmlSpace="preserve" stroke="#828282" className="absolute left-3 top-2.5 w-5 h-5 pointer-events-none">
                                    <g>
                                    <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path>
                                    </g>
                                </svg>

                                {/* React Select Component */}
                                <Select
                                    className="destinations"
                                    required
                                    options={options}
                                    placeholder="Retour à"
                                    components={{ Option: customOption }}
                                    value={selectedOptionDestination2}
                                    onChange={handleChangeOptionDestination2}
                                    isSearchable
                                    styles={{
                                    control: (base, state) => ({ ...base, width: '100%', paddingLeft: '2.5rem', backgroundColor: 'transparent', color: '#4A4A4A', fontSize: '0.920rem', borderRadius: '0px', borderColor: state.isFocused ? 'red' : '#4b5563', boxShadow: state.isFocused ? '0 0 0 0px red' : '0 0 0 0px #d1d5db', '&:hover': { outline: 'none' , cursor: 'text'} }),
                                    placeholder: (base) => ({ ...base, color: '#94A3B8' }),
                                    dropdownIndicator: (base) => ({ ...base, color: '#828282' }),
                                    singleValue: (base) => ({ ...base, color: '#9ca3af' }),
                                    menu: (base) => ({ ...base, zIndex: 10 }),
                                    }}
                                />
                                </div>
                    </div>

                    {/* Date and Time Inputs */}
                    <div className="flex flex-col">
                        <label className="text-gray-200 text-sm sm:text-[16px] mb-2">Date de ramassage</label>
                        <div className="flex space-x-2">
                        <div className='flex w-full'>
                            <DatePicker required placeholderText="mm/dd/yyyy" selected={pickupDate} onChange={(date) => setPickupDate(date)} className={`datepickers w-36 sm:w-24 lg:w-36 ${isFocused ? 'border-y border-l': 'border'} h-[39px] border-gray-600 focus:outline-none bg-transparent text-gray-400 focus:border-red-600`} showIcon />
                            <div className="relative w-full">
                                    <select
                                        required
                                        value={pickupHour}
                                        onClick={(e) => togglePickupHour(e)}
                                        onChange={(e) => handlePickupHour(e)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        className={`custom-select w-full appearance-none ${
                                        isFocused ? 'border-red-600 border' : 'border-y border-r border-l border-l-neutral-950 border-gray-600'
                                        } text-gray-400 bg-transparent px-4 py-[6.5px] pr-10 outline-none`}
                                    >
                                        <option value="" disabled>Select hour</option>
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
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-200 text-sm sm:text-[16px] mb-2">Date de dépôt</label>
                        <div className="flex space-x-2">
                            <div className="flex w-full">
                                <DatePicker required placeholderText="mm/dd/yyyy" selected={dropoffDate} onChange={(date) => setDropoffDate(date)} className={`datepickers w-36 sm:w-24 lg:w-36 ${isFocused2 ? 'border-y border-l': 'border'} h-[39px] border-gray-600 focus:outline-none bg-transparent text-gray-400 focus:border-red-600`} showIcon />
                                <div className="relative w-full">
                                    <select
                                        required
                                        value={dropoffHour}
                                        onClick={(e) => toggleDropoffHour(e)}
                                        onChange={(e) => handleDropoffHour(e)}
                                        onFocus={() => setIsFocused2(true)}
                                        onBlur={() => setIsFocused2(false)}
                                        className={`custom-select w-full appearance-none ${
                                        isFocused2 ? 'border-red-600 border' : 'border-y border-r border-l border-l-neutral-950 border-gray-600'
                                        } text-gray-400 bg-transparent px-4 py-[6.5px] pr-10 outline-none`}
                                    >
                                        <option value="" disabled>Select hour</option>
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
                    </div>
                </div>

                {/* Search Button */}
                <button type="submit" className="w-full buttonCarsRentFormRes -mt-3 sm:-mt-3 sm:w-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-full md:w-14 h-14 -ml-4 md:-ml-4 lg:ml-0 text-white bg-red-600 p-3.5 mt-3 rounded-md hover:bg-red-500 focus:outline-none"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35m2.35-3.15A7.5 7.5 0 1010.5 18a7.5 7.5 0 008.5-4.5z"
                        />
                    </svg>
                </button>
            </form>
            
        </div>
                                        
        {/* Grid layout for cars and filters */}
        <div className="grid grid-cols-1 md:grid-cols-4">
            <Filter 
                selectedCurrency={selectedCurrency}

                selectedCategories={selectedCategories} 
                onCategoryChange={handleCategoryChange}
                selectedPickupFeature={selectedPickupFeature}
                onPickupFeatureChange={handlePickupFeatureChange}
                selectedFeatures={selectedFeatures}
                onFeatureChange={handleSelectedFeaturesChange}
                selectedDefaultEquipement={selectedDefaultEquipement}
                onDefaultEquipementChange={handleDefaultEquipementsChange}
                filteredCarPrice={filteredCarPrice}
                onFilterPriceChange={handleFilteringPriceChange}
            />

            
            <div className="col-span-3">
                <div className="md:hidden">
                    <h2 className={`text-xl sm:text-2xl ${SearchFormVisible? 'hidden': ''} font-light inline-block mt-3`}>
                        {filteredCarsLengthByCurrentLocation > 0 ? `${filteredCarsLengthByCurrentLocation} voitures` : 'Aucune voiture'} à {
                            finalDestination.selectedOptionDestination1 && finalDestination.selectedOptionDestination1.label
                            ? finalDestination.selectedOptionDestination1.label.toUpperCase()
                            : ''
                        }
                        <span> </span>
                        le {finalDateTime.pickupDate ? `${new Date(finalDateTime.pickupDate).toLocaleDateString('en-US', { month: 'short' })} ${new Date(finalDateTime.pickupDate).getDate()}` : 'empty date'}
                        <span> </span>
                        - {finalDateTime.dropoffDate ? `${new Date(finalDateTime.dropoffDate).toLocaleDateString('en-US', { month: 'short' })} ${new Date(finalDateTime.dropoffDate).getDate()}` : 'empty date'}
                    </h2>
                    <a onClick={(event) => { event.preventDefault(); setSearchFormVisible(true); }} className={`${SearchFormVisible? 'hidden': ''} text-red-600 cursor-pointer text-sm ml-1 inline-block`}>Changer la recherche</a>
                </div>

                <CarsForRent 
                    selectedCurrency={selectedCurrency}
                    
                    selectedCategories={selectedCategories}
                    selectedPickupFeature={selectedPickupFeature}
                    filteredCarPrice={filteredCarPrice}
                    selectedFeatures={selectedFeatures}
                    selectedDefaultEquipement={selectedDefaultEquipement}
                    availableCarsState={availableCarsState}
                    availableCarsFromBokkingForm={availableCarsFromBokkingForm}
                    finalDateTime={finalDateTime}
                    finalDestination={finalDestination}
                    setFilteredCarsLengthByCurrentLocation={setFilteredCarsLengthByCurrentLocation}
                    
                    loader={loader}
                />
            </div>
        </div>

        {open &&
        <Dialog
            ref={dialogRef}
            open={open}
            onClose={handleOpen}
            fullWidth // Make the dialog take the full width
            maxWidth="lg" // Set the maximum width to large (or you can use "xl" for extra large)
            className="fixed inset-0 flex items-center justify-center bg-none bg-opacity-.1" // Center the dialog with background opacity
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
        >

            <div className="w-full flex justify-center">

                
                <div className="relative">
                    <div className="container mx-auto flex flex-col md:flex-row p-2 md:p-0">
                    <div className="border border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg">
                        <div className="flex flex-col md:flex-row">

                        <button onClick={() => setOpen(false)} className="absolute right-4 top-4">
                            <svg fill="#313131" height="12px" width="12px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g></svg>
                        </button>

                        <div className="w-full">
                            <label>Départ de</label>
                            <div className="relative mt-4">
                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 px-3 py-2 pl-10 transition duration-300 ease focus:outline-none focus:border-red-700 shadow-sm focus:shadow"
                                placeholder="Départ de"
                            />
                            <svg
                                fill="#828282"
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 395.71 395.71"
                                xmlSpace="preserve"
                                stroke="#828282"
                                className="absolute left-3 top-2.5 w-5 h-5"
                            >
                                <g>
                                <path
                                    d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
                                ></path>
                                </g>
                            </svg>
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
                            <div className="w-full">
                                <label>Retour à</label>
                                <div className="relative mt-4">
                                <input
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 px-3 py-2 pl-10 transition duration-300 ease focus:outline-none focus:border-red-700 shadow-sm focus:shadow"
                                    placeholder="Retour à"
                                />
                                <svg
                                    fill="#828282"
                                    version="1.1"
                                    id="Capa_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 395.71 395.71"
                                    xmlSpace="preserve"
                                    stroke="#828282"
                                    className="absolute left-3 top-2.5 w-5 h-5"
                                >
                                    <g>
                                    <path
                                        d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
                                    ></path>
                                    </g>
                                </svg>
                                </div>
                            </div>
                            </div>
                        </>
                        )}

                        <form className="grid grid-cols-8 sm:grid-cols-9 md:grid-cols-8 gap-4">
                            <div className="flex flex-col col-span-8 sm:col-span-4 md:col-span-2 lg:col-span-2">
                                <label>Début de location</label>
                                <input
                                type="date"
                                placeholder="Enter text here..."
                                className="bg-gray-300 w-full focus:outline-none text-gray-700 border border-gray-200 p-2"
                                />
                            </div>
                            <div className="flex flex-col col-span-8 sm:col-span-4 md:col-span-2 lg:col-span-2">
                                <label>l'heure</label>
                                <input
                                type="time"
                                placeholder="Enter text here..."
                                className="bg-gray-300 w-full focus:outline-none text-gray-700 border border-gray-200 p-2"
                                />
                            </div>
                            <div className="flex flex-col col-span-8 sm:col-span-4 md:col-span-2 lg:col-span-2">
                                <label>Fin de Location</label>
                                <input
                                type="date"
                                placeholder="Enter text here..."
                                className="bg-gray-300 w-full focus:outline-none text-gray-700 border border-gray-200 p-2"
                                />
                            </div>
                            <div className="flex flex-col col-span-8 sm:col-span-4 md:col-span-2 lg:col-span-2">
                                <label>l'heure</label>
                                <input
                                type="time"
                                placeholder="Enter text here..."
                                className="bg-gray-300 w-full focus:outline-none text-gray-700 border border-gray-200 p-2"
                                />
                            </div>
                        </form>

                        <div className="flex justify-start">
                        <button className="py-3 px-4 border font-medium hover:bg-red-500 duration-300 rounded-md bg-red-700 text-white">
                            Rechercher des Véhicules
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

        </Dialog>
        }
        <div className={`loaderPosition ${!loader ? 'invisible': 'visible'}`}>
            <div className="loaderBg"></div>
            <span class="loader"></span>
        </div>
    </section>
    );
}

export default CarsPage;
