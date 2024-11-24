import Dialog from '@mui/material/Dialog';
import { X } from 'lucide-react'
import React, { useState, useEffect, useRef } from "react"
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import '../styles/css/header.css';
import logo from '../styles/images/logo10.png';
import { NavLink, replace } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

import { useNavigate } from 'react-router-dom';



const Header = ({ selectedCurrency, onCurrencyChange }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['csrftoken', 'sessionid']);
    const buttonRef = useRef(null); // Ref for the button

    // Set up Axios to send CSRF token and credentials with each request
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const [loader, setLoader] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState({}); // Initialize as an object

    
     // Function to fetch CSRF token from the backend
     const getCSRFToken = async () => {
        try {
            const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/get-csrf-token/', { withCredentials: true });
            const csrfToken = response.data.csrfToken;
            if (csrfToken) {
                setCookie('csrftoken', csrfToken, { path: '/', sameSite: 'None', secure: true });
            }
        } catch (error) {
            console.error('Error fetching CSRF token', error);
        }
    };
    

    // Run this effect only once to fetch and set the CSRF token
    useEffect(() => {
        // Check if the CSRF token is already set in the cookies
        if (!cookies.csrftoken) {
            getCSRFToken();
        }
    }, [cookies, setCookie]); // Only call the effect if csrfToken is not already set


     // Access the CSRF token and session ID from cookies
     const csrfToken = cookies.csrftoken;
     const sessionId = cookies.sessionid;
 
     

     useEffect(() => {
        const sessionId = getCookie('sessionid');
        if (!sessionId) {
            console.warn('Session ID is missing. Ensure that the server is setting cookies correctly.');
        } else {
            console.log('Session ID:', sessionId);
        }
     }, [])

    // Function to get CSRF token from cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
}
    
useEffect(() => {
    const csrfToken = getCookie('csrftoken');
    console.log('CSRF Token (by me): ', csrfToken);
    console.log('All cookies:', document.cookie);

}, [])

    const checkCookies = () => {
        const csrfToken = getCookie('csrftoken');
        const sessionId = getCookie('sessionid');
    
        if (csrfToken && sessionId) {
            console.log("Cookies are set correctly:", { csrfToken, sessionId });
        } else {
            console.error("Cookies are not set correctly.");
        }
    };
    
    useEffect(() => {
        const checkCookies = async () => {
            const csrfToken = getCookie('csrftoken');
            const sessionId = getCookie('sessionid');
            const getcsrftoken= getCSRFToken()
            console.log('Detailed cookie check:', {
                csrfToken,
                getcsrftoken,
                sessionId,
                allCookies: document.cookie
            });
        };

        checkCookies();
    }, []);
    
    // Call this function after login or when the app loads
    useEffect(() => {
        checkCookies();
    }, []);

    // Check authentication status on component mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/check_authentication/', { withCredentials: true });
                console.log('CSRF Token:', getCookie('csrftoken'));
                console.log('Session ID:', getCookie('sessionid'));
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


    

    // Fetch user info
    const [userAvatar, setUserAvatar] = useState('');

    const getUserInfo = async () => {
        try {
            const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/user-info/', { withCredentials: true });
            setAuthenticatedUser(response.data.user);
            console.log('Authenticated User:', response.data.user); // Log user info

            // Check if profile and avatar exist before setting the URL
            if (response.data.user.user_profile?.avatar) {
                setUserAvatar(`https://carrentreactdjango-production.up.railway.app${response.data.user.user_profile.avatar}`);
            }
        } catch (error) {
            console.log('Error fetching user info:', error);
        }
    };

    const [openRegisterPage, setOpenRegisterPage] = useState(false)
    const HandleOpenRegisterPage = () => setOpenRegisterPage(!openRegisterPage)

    // Register Form
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [full_name, setFull_name] = useState('');

    const [ifRegistered, setIfRegistered] = useState(false)

    const handleSwitchFromSignupToLogin = () => {
        setOpenRegisterPage(false);
        setOpen(true);
    }

    const handleSingUpSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || !full_name) {
            toast.error("Please fill in all fields!");
            return;
        }

        // Check if full name contains a space
        if (!full_name.includes(' ')) {
            toast.error("Ensure your full name has a space (ex: 'John Doe').");
            return;
        }

        try {
            const response = await axios.post('https://carrentreactdjango-production.up.railway.app/api/user-creation/',
            { username, email, password, full_name },
            { headers: { 'X-CSRFToken': getCSRFToken() }, withCredentials: true }
            );
            console.log('UserCreated', response.data);

            // Reset form fields
            setUserName('');
            setEmail('');
            setPassword('');
            setFull_name('');
            
            // Set registration state
            setIfRegistered(true);
            toast.success('User created successfully');
            
        } catch (error) {
            // Check if the error response exists and has a specific message
            if (error.response && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Failed to create user!");
            }
        }
    }
            // Register Form End


    // Login Form
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate();
    

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        setLoader(true)
        if (!loginEmail || !loginPassword) {
            toast.error("Please fill in all fields!");
            return;
        }

        try {
            // The CSRF token will automatically be included in the headers
            const response = await axios.post('https://carrentreactdjango-production.up.railway.app/api/user-login/', 
                { loginEmail, loginPassword }
            );
            console.log('User Login', response.data);
            setLoginEmail('');
            setLoginPassword('');
            toast.success('User logged in successfully');
            setOpen(false);
            setLoader(true)

            setTimeout(() => {
                navigate('/', { replace: true });
                window.location.reload();
            }, 2000);
        } catch (error) {
            toast.error("Invalid Password!");
            setLoader(false)
        }
    };
            // Login Form End
    


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const dialogRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const closeSlider = () => {
        handleOpen(); // Close the dialog
        HandleOpenRegisterPage();
    };

    



    const [isFixed, setIsFixed] = useState(false); // State to manage fixed navbar


    const location = useLocation();

    // Effect to handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) { // Change 50 to the scroll position you want
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    
    
    // Updated logout function
    const logout = async (e) => {
        e.preventDefault();
        
        try {
            const csrfToken = getCookie('csrftoken');  // CSRF token from cookies
    
            setLoader(true);
            setTimeout(async () => {

                // Perform the logout request with CSRF token
                const response = await axios.post(
                    'https://carrentreactdjango-production.up.railway.app/api/logout/', 
                    {}, 
                    { 
                        headers: {
                            'X-CSRFToken': csrfToken,  // Pass CSRF token in the headers
                        },
                        withCredentials: true,  // Ensure cookies are sent
                    }
                );
                console.log("Logged out successfully", response.data);
                navigate('/');  // Redirect to home page
                window.location.reload();  // Optionally reload the page
            }, 1000);
        } catch (error) {
            console.error("Logout error:", error.response ? error.response.data : error.message);
        }finally{
            toast.success("Logged out successfully")
        }
    };
    
    console.log('CSRF Token:', csrfToken);  // CSRF token fetched from cookie
    console.log('Session ID:', sessionId);  // Session ID fetched from cookie



    useEffect(() => {
        const csrfToken = getCookie('csrftoken');
        const sessionId = getCookie('sessionid');
        if (!csrfToken || !sessionId) {
            console.warn('Missing csrfToken or sessionId:', { csrfToken, sessionId });
        }
    }, []);
    
    
    
    
    
    
    
    
    
    
    
    
    const [isOpen, setIsOpen] = useState(false);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const accountRef = useRef(null);
    const accountRefLg = useRef(null);
    const currencyRef = useRef(null);


  // Function to toggle the dropdown on button click
  const toggleCurrencyDropdown = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up
    setIsCurrencyOpen((prev) => !prev); // Toggle dropdown visibility
};

    const handleCurrencyChange =  (currency) => {
        try {
            setLoader(true);
            setTimeout( () => {
            onCurrencyChange(currency);
            setIsCurrencyOpen(false);
            setLoader(false);
        },500)
        } finally {
        }
    };
    


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                closeSlider(); // Close the slider if clicked outside
                console.log('slider closing...');
            }
            if (accountRef.current && !accountRef.current.contains(e.target) && buttonRef.current && !buttonRef.current.contains(e.target)) {
                setIsOpen(false); // Close the dropdown when clicking outside
            }
            if (currencyRef.current && !currencyRef.current.contains(e.target) && buttonRef.current && !buttonRef.current.contains(e.target)) {
                setIsCurrencyOpen(false); // Close the dropdown when clicking outside
            }
            if (accountRefLg.current && !accountRefLg.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Clean up the event listener
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
    // Toggle the mobile menu
    const toggleDropdownMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
    
    return(
        <header>
            <div className="w-full items-center border-b border-b-red-600 lg:border-none px-2 sm:px-8 lg:px-20 lg:px-28 bg-[#111] h-20 flex justify-between">
                <div className="flex mb-2.5 -ml-11 sm:-ml-14">
                    <img src={logo} className='ml-2 sm:ml-0 w-[200px] sm:w-[240px] mt-[78px] sm:mt-[88px]' />

                </div>

                <div className="flex items-center">
                        <div className="relative">
                            {/* Mobile Menu Button */}
                            <button
                                className="mobile-menu-button-responsive-header lg:hidden flex items-center text-white"
                                onClick={toggleMenu}
                            >
                                {isMenuOpen? (
                                    <X />
                                ):(
                                    <div className=' border rounded border-gray-400 p-[1px] mr-1'>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                                    </div>
                                )
                                }
                                    
                            </button>

                        </div>

                        {/* Mobile Sidebar */}
                            <div
                                style={{zIndex:'99999'}}
                                className={`fixed inset-y-0 right-0 z-40 w-full bg-[#111] text-white transform ${
                                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                                } transition-transform duration-300 ease-in-out lg:hidden`}
                            >
                                <div className="flex justify-end p-4">
                                    <button onClick={toggleMenu}>
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                                <nav className="flex flex-col space-y-[1px] py-1">
                                    <NavLink
                                        onClick={toggleMenu}
                                        to="/"
                                        className={`${location.pathname === '/' ? "bg-red-700 text-white": "text-gray-200" }-700 ml-0.5 hover:text-white px-6 h-full py-2.5 text-sm font-medium`}
                                    >
                                        ACCUEIL
                                    </NavLink>
                                    <NavLink
                                        onClick={toggleMenu}
                                        to="location-de-voitures"
                                        className={`${location.pathname === '/location-de-voitures' ? "bg-red-700 text-white": "text-gray-200" } ml-0.5 hover:bg-red-700 hover:text-white px-6 h-full py-2.5 text-sm font-medium`}
                                    >
                                        LOCATION DE VOITURES
                                    </NavLink>
                                    <NavLink
                                        onClick={toggleMenu}
                                        to="/about-us"
                                        className={`${location.pathname === '/about-us' ? "bg-red-700 text-white": "text-gray-200" } ml-0.5 hover:bg-red-700 hover:text-white px-6 h-full py-2.5 text-sm font-medium`}
                                    >
                                        À PROPOS
                                    </NavLink>
                                    <NavLink
                                        onClick={toggleMenu}
                                        to="/offres"
                                        className={`${location.pathname === '/offres' ? "bg-red-700 text-white": "text-gray-200" } ml-0.5 hover:bg-red-700 hover:text-white px-6 h-full py-2.5 text-sm font-medium`}
                                    >
                                        DERNIÈRES OFFRES
                                    </NavLink>
                                    <NavLink
                                        onClick={toggleMenu}
                                        to="/galerie"
                                        className={`${location.pathname === '/galerie' ? "bg-red-700 text-white": "text-gray-200" } ml-0.5 hover:bg-red-700 hover:text-white px-6 h-full py-2.5 text-sm font-medium`}
                                    >
                                        GALERIE
                                    </NavLink>
                                    <NavLink
                                        onClick={toggleMenu}
                                        to="/questions-frequemment-posees"
                                        className={`${location.pathname === '/questions-frequemment-posees' ? "bg-red-700 text-white": "text-gray-200" } ml-0.5 hover:bg-red-700 hover:text-white px-6 h-full py-2.5 text-sm font-medium`}
                                    >
                                        FAQ
                                    </NavLink>
                                    <NavLink
                                        onClick={toggleMenu}
                                        to="/contact-us"
                                        className={`${location.pathname === '/contact-us' ? "bg-red-700 text-white": "text-gray-200" } ml-0.5 hover:bg-red-700 hover:text-white px-6 h-full py-2.5 text-sm font-medium`}
                                    >
                                        CONTACTEZ NOUS
                                    </NavLink>

                                        {isAuthenticated && authenticatedUser.username && (
                                        <>
                                            <NavLink to="/page-user-setting" onClick={toggleMenu} className="px-6 pb-1 hover:bg-red-600 h-full flex ml-0.5 text-gray-200 text-sm">
                                            {userAvatar ? (
                                                <img 
                                                    className="mt-1 object-cover h-10 w-10 cursor-pointer duration-300 border-2 border-transparent mr-2 rounded-full w-10" 
                                                    src={userAvatar} 
                                                    alt="User avatar"
                                                    onError={(e) => {
                                                        // Fallback if image fails to load
                                                        e.target.src = "https://secure.gravatar.com/avatar/6a3b74536345bf054d23bb18dfc8a6b9?s=300&d=mm&r=g";
                                                    }}
                                                />
                                            ) : (
                                                <img 
                                                    className="mt-1 object-cover h-10 w-10 cursor-pointer duration-300 border-2 border-transparent mr-2 rounded-full w-10" 
                                                    src="https://secure.gravatar.com/avatar/6a3b74536345bf054d23bb18dfc8a6b9?s=300&d=mm&r=g" 
                                                    alt="Default avatar"
                                                />
                                            )}
                                                <p className="mt-3 cursor-pointer">Bonjour, {authenticatedUser.username}</p>
                                            </NavLink>
                                        </>
                                        )}
    
                                        <div className="relative ml-0.5 hover:text-white h-full py-2.5 text-sm font-medium inline-block text-left -top-2 lg:hidden">
                                        <div className="items-center">
                                            {!isAuthenticated ? (
                                                <>
                                                    <div ref={accountRef}>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Prevent the event from bubbling up
                                                                setIsOpen((prev) => !prev); // Toggle dropdown visibility
                                                                
                                                            }}
                                                            className="flex hover:bg-red-700 justify-between items-center w-full gap-x-1 py-2 px-6 h-full py-2.5 font-medium text-white"
                                                        >
                                                            COMPTE
                                                            <ChevronDownIcon
                                                                aria-hidden="true"
                                                                className={`h-4 w-4 text-gray-200 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                                            />
                                                        </button>

                                                            <div className={`w-26 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isOpen ? '' : 'hidden'}`}>
                                                                <div className="py-1">
                                                                    <div
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            toggleMenu();
                                                                            handleOpen();
                                                                            setIsOpen(false);
                                                                        }}
                                                                        className="block px-4 py-2 cursor-pointer text-lg text-gray-700 hover:bg-gray-100"
                                                                    >
                                                                        Connectez-vous
                                                                    </div>
                                                                    <div
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            toggleMenu();
                                                                            HandleOpenRegisterPage();
                                                                            setIsOpen(false);
                                                                        }}
                                                                        className="cursor-pointer block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                                                                    >
                                                                        S'inscrire
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div
                                                        onClick={(e) => {
                                                            logout(e);
                                                            toggleMenu();
                                                        }}
                                                        className="cursor-pointer py-2 px-6 h-full py-2.5 font-medium hover:bg-red-700 flex items-center pr-4 gap-x-1 font-medium text-white shadow-sm"
                                                    >
                                                        DÉCONNEXION
                                                    </div>
                                                </>
                                            )}

                                            <div ref={currencyRef}>
                                                <button
                                                    ref={buttonRef} // Add button ref here
                                                    onClick={toggleCurrencyDropdown}
                                                    className="flex justify-between items-center hover:bg-red-700 w-full gap-x-1 py-2 px-6 h-full py-2.5 font-medium text-white shadow-sm"
                                                >
                                                    {selectedCurrency}
                                                    <ChevronDownIcon
                                                        className={`h-4 w-4 text-gray-200 transition-transform duration-200 ${isCurrencyOpen ? 'rotate-180' : ''}`}
                                                    />
                                                </button>

                                                {/* Dropdown menu */}
                                                <div
                                                    style={{ zIndex: '999' }}
                                                    className={`right-0 w-26 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isCurrencyOpen ? '' : 'hidden'}`}
                                                >
                                                    <div className="py-1" onClick={(e) => e.stopPropagation()}>
                                                        {[{ value: 'MAD', label: 'MAD dh' }, { value: 'USD', label: 'USD $' }, { value: 'EUR', label: 'EUR €' }].map((currency) => (
                                                            <div
                                                                key={currency.value}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    console.log(`Currency selected: ${currency.value}`);
                                                                    handleCurrencyChange(currency.value); // Handle the currency change
                                                                    setIsCurrencyOpen(false); // Close the dropdown after selection
                                                                    toggleMenu(); // Close any other menu if needed
                                                                }}
                                                                className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                {currency.label}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </nav>
                            </div>

                    
                    {/* Existing Menu Component for larger screens */}
                    <Menu as="div" className="relative inline-block text-left -top-2 hidden lg:block">
                        <div className="inline-flex items-center">
                            {/* Conditionally render the NavLink based on authentication status */}
                            {isAuthenticated && authenticatedUser.username && (
                            <>
                                <NavLink to="/page-user-setting" className="profileHover flex mr-4 text-gray-200 text-sm">
                                {userAvatar ? (
                                    <img 
                                        className="mt-1 object-cover h-10 w-10 cursor-pointer duration-300 border-2 border-transparent mr-2 rounded-full w-10" 
                                        src={userAvatar} 
                                        alt="User avatar"
                                        onError={(e) => {
                                            // Fallback if image fails to load
                                            e.target.src = "https://secure.gravatar.com/avatar/6a3b74536345bf054d23bb18dfc8a6b9?s=300&d=mm&r=g";
                                        }}
                                    />
                                ) : (
                                    <img 
                                        className="mt-1 object-cover h-10 w-10 cursor-pointer duration-300 border-2 border-transparent mr-2 rounded-full w-10" 
                                        src="https://secure.gravatar.com/avatar/6a3b74536345bf054d23bb18dfc8a6b9?s=300&d=mm&r=g" 
                                        alt="Default avatar"
                                    />
                                )}
                                    <p className="mt-3 cursor-pointer">Bonjour, {authenticatedUser.username}</p>
                                </NavLink>
                                <span className="-mt-1 -ml-2" style={{fontSize: '16px', fontWeight:'100', color: 'gray', }}>|</span>
                            </>
                            )}
                            {!isAuthenticated ? (
                            <>
                                <div ref={accountRefLg}>
                                    <MenuButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsCurrencyOpen(false);
                                            setIsOpen(!isOpen);
                                        }}
                                        className="flex items-center dropDownBtn gap-x-1 rounded-md px-3 py-2 text-sm font-normal text-white shadow-sm"
                                    >
                                        Compte
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                        />
                                    </MenuButton>

                                    {isOpen && (
                                        <MenuItems
                                            static
                                            style={{zIndex: '999'}}
                                            className="absolute right-0 mt-2 w-26 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        >
                                            <div className="py-1">
                                                <MenuItem>
                                                    <div
                                                        onClick={() => {
                                                            handleOpen();
                                                            setIsOpen(false)
                                                        }}
                                                        className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Connectez-vous
                                                    </div>
                                                </MenuItem>
                                                <MenuItem>
                                                    <div
                                                        onClick={() => {
                                                            HandleOpenRegisterPage();
                                                            setIsOpen(false);
                                                        }}
                                                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        S'inscrire
                                                    </div>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    )}
                                </div>
                                <span className="-mt-1 -mx-1 -ml-2" style={{fontSize: '16px', fontWeight:'100', color: 'gray', }}>|</span>
                            </>
                            ):(
                                <>
                                <div
                                    onClick={logout}
                                    className="cursor-pointer dropDownBtn flex items-center pr-4 gap-x-1 rounded-md px-3 py-2 text-sm font-normal text-white shadow-sm"
                                >
                                    Déconnexion
                                </div>
                                <span className="-mt-1 -mx-1 -ml-2" style={{fontSize: '16px', fontWeight:'100', color: 'gray', }}>|</span>
                                </>
                            )}
            
                            <div ref={currencyRef}>
                                <MenuButton
                                    onClick={toggleCurrencyDropdown}
                                    className="flex items-center gap-x-1 dropDownBtn2 rounded-md px-3 py-2 text-sm font-normal text-white shadow-sm"
                                >
                                    {selectedCurrency}
                                    <ChevronDownIcon
                                        className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${isCurrencyOpen ? 'rotate-180' : ''}`}
                                    />
                                </MenuButton>

                                {isCurrencyOpen && (
                                    <MenuItems
                                        static
                                        style={{ zIndex: '999' }}
                                        className="absolute right-0 mt-2 w-26 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                        <div className="py-1">
                                            {[
                                                { value: 'MAD', label: 'MAD dh' },
                                                { value: 'USD', label: 'USD $' },
                                                { value: 'EUR', label: 'EUR €' }
                                            ].map((currency) => (
                                                <MenuItem key={currency.value}>
                                                    <div
                                                        onClick={() => {
                                                            handleCurrencyChange(currency.value);
                                                            setIsCurrencyOpen(false);
                                                        }}
                                                        className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        {currency.label}
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </MenuItems>
                                    )}
                            </div>
                        </div>
                    </Menu>
                </div>
            </div>

            <Disclosure as="nav" className={`bg-white hidden lg:block navBorder scrollingNavbar ${isFixed ? 'fixed' : 'hiddenn'}`} style={{zIndex: '9998'}}> {/* Updated to conditionally apply fixed */}
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-10 items-center justify-center"> {/* Centering the items */}
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                            </DisclosureButton>
                        </div>

                        <div className="flex flex-1 h-full items-center justify-center sm:items-stretch sm:justify-center"> {/* Centering the links */}
                            <div className="hidden h-full sm:ml-6 sm:block">
                                <div className="flex h-full">
                                    <NavLink
                                        to="/"
                                        className={`${location.pathname === '/' ? "bg-red-700 text-white": "text-gray-600" } hover:bg-red-700 ml-0.5 hover:text-white px-10 h-full py-2 text-xs headerTextRes font-medium`}
                                    >
                                        ACCUEIL
                                    </NavLink>
                                    <NavLink
                                        to="location-de-voitures"
                                        className={`${location.pathname === '/location-de-voitures' ? "bg-red-700 text-white": "text-gray-600" } text-gray-600 ml-0.5 hover:bg-red-700 hover:text-white px-9 h-full py-2 text-xs headerTextRes font-medium`}
                                    >
                                        LOCATION DE VOITURES
                                    </NavLink>
                                    <NavLink
                                        to="/about-us"
                                        className={`${location.pathname === '/about-us' ? "bg-red-700 text-white": "text-gray-600" } text-gray-600 ml-0.5 hover:bg-red-700 hover:text-white px-9 h-full py-2 text-xs headerTextRes font-medium`}
                                    >
                                        À PROPOS
                                    </NavLink>
                                    <NavLink
                                        to="/offres"
                                        className={`${location.pathname === '/offres' ? "bg-red-700 text-white": "text-gray-600" } text-gray-600 ml-0.5 hover:bg-red-700 hover:text-white px-9 h-full py-2 text-xs headerTextRes font-medium`}
                                    >
                                        DERNIÈRES OFFRES
                                    </NavLink>
                                    <NavLink
                                        to="/galerie"
                                        className={`${location.pathname === '/galerie' ? "bg-red-700 text-white": "text-gray-600" } text-gray-600 ml-0.5 hover:bg-red-700 hover:text-white px-9 h-full py-2 text-xs headerTextRes font-medium`}
                                    >
                                        GALERIE
                                    </NavLink>
                                    <NavLink
                                        to="/questions-frequemment-posees"
                                        className={`${location.pathname === '/questions-frequemment-posees' ? "bg-red-700 text-white": "text-gray-600" } text-gray-600 ml-0.5 hover:bg-red-700 hover:text-white px-9 h-full py-2 text-xs headerTextRes font-medium`}
                                    >
                                        FAQ
                                    </NavLink>
                                    <NavLink
                                        to="/contact-us"
                                        className={`${location.pathname === '/contact-us' ? "bg-red-700 text-white": "text-gray-600" } text-gray-600 ml-0.5 hover:bg-red-700 hover:text-white px-9 h-full py-2 text-xs headerTextRes font-medium`}
                                    >
                                        CONTACTEZ NOUS
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                        <DisclosurePanel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                <DisclosureButton
                                    as="a"
                                    href="#"
                                    className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 text-base font-medium'
                                >
                                    <p className="font-medium">First</p>
                                </DisclosureButton>
                            </div>
                        </DisclosurePanel>
                    </div>
                </div>
            </Disclosure>
                                                        
            


            {open &&
                <Dialog
                    ref={dialogRef}
                    open={open}
                    onClose={handleOpen}
                    fullWidth // Make the dialog take the full width
                    maxWidth="xl" // Set the maximum width to large (or you can use "xl" for extra large)
                    className="fixed inset-0 flex items-center justify-center bg-none bg-opacity-.1" // Center the dialog with background opacity
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                

                <div className='sm:w-96'>
                    <div className='flex justify-between py-3 pl-4 pr-3 mb-4 border-b'>
                        <p className='text-[25.99px] text-gray-600 font-light'>Connectez-vous</p>
                        <div onClick={() => setOpen(false)}><X className='w-[20px] text-gray-400 mt-2.5 cursor-pointer' /></div>
                    </div>
                    <form onSubmit={handleLoginSubmit} className=" max-w-lg pb-6 px-4">
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Email
                            </label>
                            <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-yellow-50"
                            id="username"
                            type="text"
                            placeholder="Email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Mot de passe
                            </label>
                            <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-yellow-50"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            >
                            Connectez-vous
                            </button>
                        </div>
                        <div className="mt-4">
                            <a href="#" className="text-red-500 hover:underline">Privacy Policy</a>
                        </div>
                    </form>
                </div>


                </Dialog>
            }

            {openRegisterPage &&
                <Dialog
                ref={dialogRef}
                open={openRegisterPage}
                onClose={HandleOpenRegisterPage}
                fullWidth // Make the dialog take the full width
                maxWidth="3xl" // Set the maximum width to large (or you can use "xl" for extra large)
                className="fixed inset-0 flex items-center justify-center bg-none bg-opacity-.1" // Center the dialog with background opacity
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0.9, y: -100 },
                }}
              >
                <div className="">
                  <div className="flex justify-between py-2 pl-4 pr-3 mb-4 border-b">
                    <p className="text-[25.99px] text-gray-600 font-light">S'inscrire</p>
                    <div onClick={HandleOpenRegisterPage}>
                      <X className="w-[20px] text-gray-400 mt-2.5 cursor-pointer" />
                    </div>
                  </div>
              
                  <form onSubmit={handleSingUpSubmit} className="max-w-lg pb-6 px-4">
                        {ifRegistered && (
                        <div class="bg-green-100 cursor-pointer border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <strong class="font-bold">Thank You for Registering!</strong>
                            <a onClick={handleSwitchFromSignupToLogin} class="underline ml-2 block sm:inline">Click here to log in</a>
                            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                            </span>
                        </div>
                        )}
                    {/* Username Input */}
                    <div className="mb-4 mt-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Nom d'utilisateur <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-yellow-50"
                        id="username"
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
              
                    {/* Password Input */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Mot de passe <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-yellow-50"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
              
                    {/* Email Input */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        E-mail <span className="text-red-500">(*)</span>
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="ex. johndoe@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
              
                    {/* Full Name Input */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                        Nom complet
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fullname"
                        type="text"
                        placeholder="ex: John Doe"
                        value={full_name}
                        onChange={(e) => setFull_name(e.target.value)}
                      />
                    </div>
              
                    {/* Terms and Privacy Checkbox */}
                    <div className="mb-4">
                      <label className="inline-flex items-center">
                        <input type="checkbox" required className="form-checkbox h-5 w-5 text-red-600" />
                        <span className="ml-2 text-gray-700">
                          J'ai lu et j'accepte les <a href="#" className="text-red-500 hover:underline">conditions générales de vente</a> et <a href="#" className="text-red-500 hover:underline">Privacy Policy</a>
                        </span>
                      </label>
                    </div>
              
                    {/* Submit Button */}
                    <div className="flex items-center justify-center">
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        S'enregistrer
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog>
              
            }

            <div className={`loaderPosition ${!loader ? 'invisible': 'visible'}`}>
                <div className="loaderBg"></div>
                <span class="loader"></span>
            </div>
        </header>
    )
}
export default Header