import { Clock9, Heart, ChevronRight } from "lucide-react"
import { FaUser, FaCog, FaInbox, FaHome, FaHeart } from "react-icons/fa"
import { NavLink, useLocation } from "react-router-dom"
import SettingsDashboard from "./SettingsDashboard"
import PreviewDashboard from "./PreviewDashboard"
import ReservationHistoryDashboard from "./ReservationHistoryDashboard"
import WishlistDashboard from "./WishlistDashboard"
import InboxDashboard from "./InboxDashboard"
import { useState, useEffect } from "react"
import axios from 'axios';


const Dashboard = ({ selectedCurrency }) => {
    const [inboxsCount, setInboxsCount] = useState(0)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState({});
    
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

    useEffect(() => {
        const FetchInboxCount = async () => {
        try{
            const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/get-notif-count/')
            console.log('fetching inboxs successfully...', response.data.notif_count)
            setInboxsCount(response.data.notif_count)
        }catch(error) {
            console.error('error fetching inboxs...', error)
        }
        }

        FetchInboxCount();
    }, []);


    const getCSRFToken = () => {
        const name = 'csrftoken'; // This should match the name of your CSRF cookie
        const cookieValue = `; ${document.cookie}`;
        const parts = cookieValue.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const ResetInboxCount = async () => {
        // Immediately update inbox count for quick UI feedback
        setInboxsCount(0);
    
        try {
            const response = await axios.post(
                `https://carrentreactdjango-production.up.railway.app/api/reset-notif-count/${authenticatedUser.id}/`,
                {}, // Pass an empty object as the body
                {
                    withCredentials: true,
                    headers: {
                        'X-CSRFToken': getCSRFToken(), // Include CSRF token in headers
                    },
                }
            );
    
            console.log('Inbox count reset successfully', response.data);
        } catch (error) {
            console.error('Error resetting inbox count...', error);
            // Optionally reset the count back if there was an error
            setInboxsCount(prevCount => prevCount); // or fetch the latest count again if needed
        }
    };
    
    


    const [avatarDashboar, setavAtarDashboar] = useState('');
    const [loader, setLoader] = useState(false);
    const [usernameDashboar, setavUsernameDashboar] = useState('');
    useEffect(() => {
        const FetchUserDashboar = async () => {
            try{
                setLoader(true);
                const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/user-dashboard/', { withCredentials: true })
                .then((response) => {
                    console.log('response user dashboard', response.data)

                    setavUsernameDashboar(response.data.user_data.username)
                    setavAtarDashboar(`https://carrentreactdjango-production.up.railway.app${response.data.user_data.user_profile.avatar}`)
                })
                
            }catch(error){
                console.error('Error fetching user dashboard data', error)
            }finally{
                setLoader(false);
            }
        };

        FetchUserDashboar();
    }, [])

    const location = useLocation();

    return(
        <section className="lg:container w-full px-1 sm:px-2 lg:px-12 mx-auto grid grid-cols-4">
            
            <div className="col-span-4 sm:col-span-1 my-1 sm:my-4">
                <div className="w-full pt-8 pb-10 bg-[#111] sm:h-screen">
                    <div className="mx-4 sm:mx-0 md:mx-4">
                        
                        <div className="flex justify-center">
                            {avatarDashboar?
                                (
                                    <img 
                                        className="rounded-full object-cover w-32 h-32 sm:w-24 sm:h-24 md:w-32 md:h-32"  
                                        src={avatarDashboar} 
                                        alt=""
                                        onError={(e) => {
                                            // Fallback if image fails to load
                                            e.target.src = "https://secure.gravatar.com/avatar/6a3b74536345bf054d23bb18dfc8a6b9?s=300&d=mm&r=g";
                                        }}
                                    />
                                    
                                ):(
                                    <img className="rounded-full w-32" src={avatarDashboar} alt="" />
                                )
                            }
                        </div>
                        
                        <div className="text-white">
                            <p className="text-center pt-2">{usernameDashboar}</p>
                            <p className="text-center pt-1 text-[11px]">Membre Depuis {new Date(authenticatedUser.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                        </div>
                    </div>

                    <ul className="text-white text-[16px] sm:text-sm md:text-[16px] mt-10">
                        <NavLink to="?sc=overview" className={`flex pl-4 sm:pl-1 md:pl-4 py-2.5 sm:py-1.5 md:py-2.5 ${location.pathname === '/page-user-setting' && location.search === '?sc=overview' ? "bg-red-600" : "hover:bg-gray-700"} cursor-pointer duration-150`}><FaUser className="mt-1 mr-1 text-lg" />Aperçu</NavLink>
                        <NavLink to="?sc=setting" className={`flex pl-4 sm:pl-1 md:pl-4 py-2.5 sm:py-1.5 md:py-2.5 ${location.pathname === '/page-user-setting' && location.search === '?sc=setting' ? "bg-red-600" : "hover:bg-gray-700"} cursor-pointer duration-150`}><FaCog className="mt-1 mr-1 text-lg" />Paramètres</NavLink>
                        <NavLink to="?sc=booking-history" className={`flex pl-4 sm:pl-1 md:pl-4 py-2.5 sm:py-1.5 md:py-2.5 ${location.pathname === '/page-user-setting' && location.search === '?sc=booking-history' ? "bg-red-600" : "hover:bg-gray-700"} cursor-pointer duration-150`}><Clock9 size={19} className="mr-1 mt-[2px]" />Historique des réservation</NavLink>
                        <NavLink to="?sc=wishlist" className={`flex pl-4 sm:pl-1 md:pl-4 py-2.5 sm:py-1.5 md:py-2.5 ${location.pathname === '/page-user-setting' && location.search === '?sc=wishlist' ? "bg-red-600" : "hover:bg-gray-700"} cursor-pointer duration-150`}> {location.pathname === '/page-user-setting' && location.search === '?sc=wishlist' ? <FaHeart size={19} className="mr-1 mt-[2px]" /> : <Heart size={19} className="mr-1 mt-[2px]" />} Ma liste de course</NavLink>
                        <NavLink onClick={ResetInboxCount}  to="?sc=inbox" className={`flex items-center pl-4 sm:pl-1 md:pl-4 py-2.5 sm:py-1.5 md:py-2.5 ${location.pathname === '/page-user-setting' && location.search === '?sc=inbox' ? "bg-red-600" : "hover:bg-gray-700"} cursor-pointer duration-150`}><FaInbox className="mt-1 mr-1 text-lg" />
                            Inbox Notification
                            {inboxsCount === 0 ? (
                                ''
                            ):(
                                <span class={`${location.pathname === '/page-user-setting' && location.search === '?sc=inbox' ? "bg-gray-100 text-red-800" : "bg-red-600 text-white "} text-xs font-semibold w-4 h-4 flex justify-center ml-2 items-center rounded`}>{inboxsCount}</span>
                            )}
                        </NavLink>
                    </ul>
                </div>
            </div>

            <div className="col-span-4 sm:col-span-3 sm:px-1  sm:mt-4">
                <div className="col-span-4 sm:col-span-3 sm:px-1 lg:px-6">
                    <div className="hidden sm:flex flex-row items-center w-full bg-[#111] pl-3.5 text-gray-200 px-2 pb-3 pt-1"> <FaHome className="mt-[6px] mr-1.5" /> <span className="mt-1">Accueil</span> <ChevronRight className="mt-2 text-gray-200 mx-[3px]" size={14} /> 
                        <span className="text-gray-200 mt-1">
                            {location.pathname === '/page-user-setting' && location.search 
                                ? new URLSearchParams(location.search).get('sc')?.replace(/-/g, ' ')  // Replace hyphens with spaces
                            : 'Accueil  Tableau de bord'}
                        </span> 
                    </div>
                </div>

                
                <div className={`${location.pathname === '/page-user-setting' && location.search === '?sc=overview'  ? "block": "hidden"}`}>
                    <PreviewDashboard />
                </div>
                
                <div className={`${location.pathname === '/page-user-setting' && location.search === '?sc=setting' || !location.search ? "block": "hidden"}`}>
                    <SettingsDashboard />
                </div>
                
                <div className={`${location.pathname === '/page-user-setting' && location.search === '?sc=booking-history' ? "block": "hidden"}`}>
                    <ReservationHistoryDashboard selectedCurrency={selectedCurrency} />
                </div>
                
                <div className={`${location.pathname === '/page-user-setting' && location.search === '?sc=wishlist' ? "block": "hidden"}`}>
                    <WishlistDashboard selectedCurrency={selectedCurrency} />
                </div>
                
                <div className={`${location.pathname === '/page-user-setting' && location.search === '?sc=inbox' ? "block": "hidden"}`}>
                    <InboxDashboard />
                </div>

            </div>

            <div className={`loaderPosition ${!loader ? 'invisible' : 'visible'}`}>
                <div className="loaderBg"></div>
                <span className="loader"></span>
            </div>
        </section>
    )
}
export default Dashboard