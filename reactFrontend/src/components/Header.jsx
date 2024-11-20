import Dialog from '@mui/material/Dialog';
import { X } from 'lucide-react'
import React, { useState, useEffect, useRef } from "react"
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import '../styles/css/header.css';
import logo from '../styles/images/logo.png';
import { NavLink, replace } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

// Fetch CSRF token function
const getCSRFToken = () => {
    const name = 'csrftoken';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';
// Set up Axios to send CSRF token and credentials with each request
axios.interceptors.request.use(config => {
    config.headers['X-CSRFToken'] = getCSRFToken(); // Attach CSRF token
    return config;
});

const Header = ({ selectedCurrency, onCurrencyChange }) => {
    const [loader, setLoader] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState({}); // Initialize as an object
    
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
        setOpenRegisterPage(false)
        setOpen(true)
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

        if (!loginEmail || !loginPassword) {
            toast.error("Please fill in all fields!");
            return;
        }

        try {
            const response = await axios.post('https://carrentreactdjango-production.up.railway.app/api/user-login/', 
                { loginEmail, loginPassword },
                { headers: { 'X-CSRFToken': getCSRFToken() }, withCredentials: true }
            );
            console.log('User Login', response.data);
            setLoginEmail('');
            setLoginPassword('');
            toast.success('User logged in successfully');
            setOpen(false)

            setTimeout(() => {
                navigate('/', {replace: true});
                window.location.reload();
            }, 2000)
        } catch (error) {
            toast.error("Invalid Password!");
        }
    }
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

    useEffect(() => {
        const fetchCSRFToken = async () => {
            try {
                await axios.get('https://carrentreactdjango-production.up.railway.app/api/get-csrf-token/', { withCredentials: true });
            } catch (error) {
                console.error("Error fetching CSRF token", error);
            }
        };

        fetchCSRFToken();
    }, []);

    // Function to get CSRF token from cookies
    const getCookie = (name) => {
        try {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                const cookieValue = parts.pop().split(';').shift();
                console.log(`Found ${name} cookie:`, cookieValue); // Debug log
                return cookieValue;
            }
            console.log(`Cookie ${name} not found`); // Debug log
            return null;
        } catch (error) {
            console.error('Error getting cookie:', error);
            return null;
        }
    };
    
    // Store CSRF token in memory as backup
    let memoryCsrfToken = null;
    
    // Function to get and store CSRF token
    const getAndStoreCSRFToken = async () => {
        try {
            // First try to get from cookie
            let csrfToken = getCookie('csrftoken');
            
            if (!csrfToken && !memoryCsrfToken) {
                // If no token in cookie or memory, fetch from server
                const response = await axios.get(
                    'https://carrentreactdjango-production.up.railway.app/api/get-csrf-token/',
                    { withCredentials: true }
                );
                csrfToken = getCookie('csrftoken'); // Try to get the new cookie
                if (!csrfToken && response.data.csrfToken) {
                    csrfToken = response.data.csrfToken;
                }
            }
    
            // Use memory token as fallback
            csrfToken = csrfToken || memoryCsrfToken;
    
            if (csrfToken) {
                memoryCsrfToken = csrfToken; // Store in memory
                axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
                console.log('CSRF token set:', csrfToken); // Debug log
                return csrfToken;
            }
            
            throw new Error('Could not obtain CSRF token');
        } catch (error) {
            console.error('Error getting CSRF token:', error);
            throw error;
        }
    };
    
    // Updated logout function
    const logout = async (e) => {
        e.preventDefault();
        console.log('Attempting logout...');
    
        try {
            // Ensure we have a CSRF token
            const csrfToken = await getAndStoreCSRFToken();
    
            console.log('Making logout request with token:', csrfToken); // Debug log
    
            const response = await axios({
                method: 'post',
                url: 'https://carrentreactdjango-production.up.railway.app/api/logout/',
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // Add empty data object to ensure proper POST request
                data: {}
            });
    
            console.log('Logout response:', response); // Debug log
    
            if (response.status === 200) {
                // Clear stored token after successful logout
                memoryCsrfToken = null;
                toast.success('Logout successful');
                setTimeout(() => {
                    navigate('/', { replace: true });
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            console.error('Logout error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                cookies: document.cookie,
                storedToken: memoryCsrfToken
            });
            toast.error('Logout failed: ' + (error.response?.data?.error || 'Unknown error'));
        }
    };
    
    // Initialize CSRF token when the app loads
    useEffect(() => {
        getAndStoreCSRFToken().catch(console.error);
    }, []);
    
    
    
    const [isOpen, setIsOpen] = useState(false);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const accountRef = useRef(null);
    const currencyRef = useRef(null);

    const toggleCurrencyDropdown = (e) => {
        e.stopPropagation();
        setIsOpen(false); // Close account dropdown
        setIsCurrencyOpen(!isCurrencyOpen);
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

            if (currencyRef.current && !currencyRef.current.contains(event.target)) {
                setIsCurrencyOpen(false)
            }

            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Clean up the event listener
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
    
    

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
            <div className="w-full items-center px-2 sm:px-28 bg-[#111] h-20 flex justify-between">
                <div className="flex">
                    <img src={logo} className='ml-2 sm:ml-0 w-[120px] sm:w-[150px]' />

                </div>

                <div className="flex items-center">
                        <div className="relative">
                            {/* Mobile Menu Button */}
                            <button
                                className="mobile-menu-button-responsive-header sm:hidden flex items-center text-white"
                                onClick={toggleMenu}
                            >
                                {isMenuOpen? (
                                    <X />
                                ):(
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                                )
                                }
                                    
                            </button>

                            {/* Menu Container */}
                            <div className="absolute sm:hidden right-[10px] top-11 mt-2 dropdownMenuHeaderRes w-[200px] z-[9999]">
                                <ul className="hList-responsive-header">
                                <li className="menu-responsive-header">
                                    <ul className="menu-dropdown-responsive-header ml-8">
                                    <li className="menu-dropdown-item-responsive-header">
                                        <a href="/">ACCUEIL</a>
                                    </li>
                                    <li className="menu-dropdown-item-responsive-header">
                                        <a href="/location-de-voitures">LOCATION DE VOITURES</a>
                                    </li>
                                    <li className="menu-dropdown-item-responsive-header">
                                        <a href="/about-us">À PROPOS</a>
                                    </li>
                                    <li className="menu-dropdown-item-responsive-header">
                                        <a href="/offres">DERNIÈRES OFFRES</a>
                                    </li>
                                    <li className="menu-dropdown-item-responsive-header">
                                        <a href="/galerie">GALERIE</a>
                                    </li>
                                    <li className="menu-dropdown-item-responsive-header">
                                        <a href="/questions-frequemment-posees">FAQ</a>
                                    </li>
                                    <li className="menu-dropdown-item-responsive-header">
                                        <a href="/contact-us">CONTACTEZ NOUS</a>
                                    </li>
                                    </ul>
                                </li>
                                </ul>
                            </div>

                            <style>{`
                                /* Override hover states with click states */
                                .menu-responsive-header:not(:hover) > .menu-dropdown-responsive-header {
                                    padding: ${isMenuOpen ? '' : '1px 0'};
                                    transform: ${isMenuOpen ? 'translateX(10px)' : 'translateX(0)'};
                                    z-index: ${isMenuOpen ? '100' : '99'};
                                    background: ${isMenuOpen ? '#ebebeb' : '#dc2626'};

                                }

                                .menu-dropdown-item-responsive-header {
                                    overflow: hidden;
                                    height: 30px;
                                    padding: 5px 40px;
                                    background: rgba(0, 0, 0, 0);
                                    white-space: nowrap;
                                    transition: 
                                        0.5s height cubic-bezier(.73,.32,.34,1.5),
                                        0.5s padding cubic-bezier(.73,.32,.34,1.5),
                                        0.5s margin cubic-bezier(.73,.32,.34,1.5),
                                        0.5s 0.2s color,
                                        0.2s background-color,
                                        0.3s transform;
                                    }

                                .menu-dropdown-item-responsive-header:hover {
                                    background: rgba(0, 0, 0, 0.1);
                                    transform: translateX(5px); /* Adding a slight right move when hovered */
                                }
                                        
                                .menu-responsive-header:not(:hover) > .menu-dropdown-responsive-header:after {
                                border-top-color: ${isMenuOpen ? '#ebebeb' : '#000'};
                                }

                                .menu-responsive-header:not(:hover) > .menu-title-responsive-header:after {
                                border-bottom-width: ${isMenuOpen ? '5px' : '0'};
                                transition: 0.2s ${isMenuOpen ? '0.2s' : '0s'} border-bottom-width ease-out;
                                }

                                .menu-responsive-header:not(:hover) > .menu-dropdown-responsive-header > .menu-dropdown-item-responsive-header {
                                visibility: ${isMenuOpen ? 'visible' : 'hidden'};
                                height: ${isMenuOpen ? '30px' : '0'};
                                padding-top: ${isMenuOpen ? '5px' : '0'};
                                padding-bottom: ${isMenuOpen ? '5px' : '0'};
                                margin: ${isMenuOpen ? 'initial' : '0'};
                                color: ${isMenuOpen ? 'rgba(25,25,25,1)' : 'rgba(25,25,25,0)'};
                                transition: 
                                    0.5s height cubic-bezier(.73,.32,.34,1.5),
                                    0.5s padding cubic-bezier(.73,.32,.34,1.5),
                                    0.5s margin cubic-bezier(.73,.32,.34,1.5),
                                    0.5s ${isMenuOpen ? '0.2s' : '0s'} color,
                                    ${isMenuOpen ? '0s' : '0.6s'} visibility;
                                z-index: 99;
                                }
                            `}</style>
                        </div>

                    
                    {/* Existing Menu Component for larger screens */}
                    <Menu as="div" className="relative inline-block text-left -top-2 hidden sm:block">
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
                                <div ref={accountRef}>
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
                                                        onClick={handleOpen}
                                                        className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Connectez-vous
                                                    </div>
                                                </MenuItem>
                                                <MenuItem>
                                                    <div
                                                        onClick={HandleOpenRegisterPage}
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

            <Disclosure as="nav" className={`bg-white hidden sm:block navBorder scrollingNavbar ${isFixed ? 'fixed' : 'hiddenn'}`} style={{zIndex: '9999'}}> {/* Updated to conditionally apply fixed */}
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
                                        className={`${location.pathname === '/' ? "bg-red-700 text-white": "text-gray-600" } hover:bg-red-700 ml-0.5 hover:text-white px-10 h-full py-2 text-sm font-medium`}
                                    >
                                        ACCUEIL
                                    </NavLink>
                                    <NavLink
                                        to="location-de-voitures"
                                        className={`${location.pathname === '/location-de-voitures' ? "bg-red-700 text-white": "text-gray-600" } text-gray-600 ml-0.5 hover:bg-red-700 hover:text-white px-9 h-full py-2 text-sm font-medium`}
                                    >
                                        LOCATION DE VOITURES
                                    </NavLink>
                                    <NavLink
                                        to="/about-us"
                                        className={`${location.pathname === '/about-us' ? "bg-red-700 text-white": "text-gray-600" } text-gray-600 ml-0.5 hover:bg-red-700 hover:text-white px-9 h-full py-2 text-sm font-medium`}
                                    >
                                        À PROPOS
                                    </NavLink>
                                    <NavLink
                                        to="/offres"
                                        className={`${location.pathname === '/offres' ? "bg-red-700 text-white": "text-gray-600" } text-gray-600 ml-0.5 hover:bg-red-700 hover:text-white px-9 h-full py-2 text-sm font-medium`}
                                    >
                                        DERNIÈRES OFFRES
                                    </NavLink>
                                    <NavLink
                                        to="/galerie"
                                        className={`${location.pathname === '/galerie' ? "bg-red-700 text-white": "text-gray-600" } text-gray-600 ml-0.5 hover:bg-red-700 hover:text-white px-9 h-full py-2 text-sm font-medium`}
                                    >
                                        GALERIE
                                    </NavLink>
                                    <NavLink
                                        to="/questions-frequemment-posees"
                                        className={`${location.pathname === '/questions-frequemment-posees' ? "bg-red-700 text-white": "text-gray-600" } text-gray-600 ml-0.5 hover:bg-red-700 hover:text-white px-9 h-full py-2 text-sm font-medium`}
                                    >
                                        FAQ
                                    </NavLink>
                                    <NavLink
                                        to="/contact-us"
                                        className={`${location.pathname === '/contact-us' ? "bg-red-700 text-white": "text-gray-600" } text-gray-600 ml-0.5 hover:bg-red-700 hover:text-white px-9 h-full py-2 text-sm font-medium`}
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











