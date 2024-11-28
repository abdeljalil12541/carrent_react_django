import { User, Mail, Phone, Image, Lock, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

const SettingsDashboard = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['csrftoken', 'sessionid']);
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [avatar, setAvatar] = useState(null);

    const [bio, setBio] = useState('');

    const [usernameId, setUsernameId] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        if (file) {
            setAvatar(file); // Store the file object
        }
    };
    
    useEffect(() => {
    const FetchUserDashboard = async () => {
        try {
            const response = await axios.get('https://carrent-polished-shadow-812.fly.dev/api/user-dashboard/', { withCredentials: true });
            console.log('response user dashboard', response.data);

            setUsername(response.data.user_data.username);
            setEmail(response.data.user_data.email);
            setPhoneNumber(response.data.user_data.user_profile.phone_number);
            setAvatar(`https://carrent-polished-shadow-812.fly.dev${response.data.user_data.user_profile.avatar}`);
            setBio(response.data.user_data.user_profile.bio);

            setUsernameId(response.data.user_data.username);

        } catch (error) {
            console.error('Error fetching user dashboard data', error);
        }
    };


    FetchUserDashboard();
}, []);

const getCSRFToken = () => {
    const name = 'csrftoken'; // This should match the name of your CSRF cookie
    const cookieValue = `; ${document.cookie}`;
    const parts = cookieValue.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const UpdateUser = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put(
            `https://carrent-polished-shadow-812.fly.dev/api/user-update/${usernameId}/`,
            { username, email },
            {
                headers: { 'X-CSRFToken': getCSRFToken() },
                withCredentials: true
            }
        );
        console.log('user updated successfully', response.data);

        // setTimeout(() => {
        //     window.location.reload();
        // }, 1500);
    } catch (error) {
        console.error('Error updating user:', error.response?.data || error.message);
        // Add error notification here
    }
};


const UpdateProfile = async (e) => {
    e.preventDefault();
    
    try {
        // Create FormData to properly handle file upload
        const formData = new FormData();
        formData.append('phone_number', phoneNumber);
        formData.append('bio', bio);
        if (avatar instanceof File) {
            formData.append('avatar', avatar);
        }
        
        const response = await axios.put(
            `https://carrent-polished-shadow-812.fly.dev/api/update-profile/${usernameId}/`,
            formData,
            {
                headers: { 
                    'X-CSRFToken': getCSRFToken(),
                    'Content-Type': 'multipart/form-data'  // Important for file upload
                },
                withCredentials: true
            }
        );
        console.log('profile updated successfully', response.data);

    } catch (error) {
        console.error('Error updating profile:', error.response?.data || error.message);
    }
};


const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const UpdatePassword = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
        toast.error("New passwords don't match!");
        return;
    }
    
    setLoader(true);
    try {
        const response = await axios.put(
            'https://carrent-polished-shadow-812.fly.dev/api/update-password/',  // Note: no username in URL
            {
                old_password: currentPassword,
                new_password: newPassword
            },
            {
                headers: { 
                    'X-CSRFToken': getCSRFToken(),
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        );
        
        toast.success('Password updated successfully');
        // Clear password fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        setTimeout(() => {
            window.location.reload();
        }, 2000)
        
    } catch (error) {
        const errorMessage = error.response?.data?.old_password || 
                           error.response?.data?.new_password || 
                           'Error updating password';
        toast.error(errorMessage);
        console.error('Error updating password:', error);
    }finally {
        setLoader(false);
    }
};


const [loader, setLoader] = useState(false)

const FormSubmit = (e) => {
    e.preventDefault();

    UpdateUser(e);
    UpdateProfile(e);
    
    toast.success('user updated successfully')
    setLoader(true);
    setTimeout(() => {
        window.location.reload();
        setLoader(false);
    }, 1500);
}

    return(
        <div className="w-full mb-6 sm:px-6 mt-6">
            <p className="text-4xl font-light border-b pb-4 text-gray-600 mb-4">Paramètres</p>    
            <div className="max-w-4xl  py-4 px-2 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column - Personal Information */}
                    <div className="space-y-6">
                    <h2 className="text-2xl text-gray-600 font-[350] mb-4">Information personel</h2>
                    
                    <div className="space-y-4 text-gray-600">
                        <form onSubmit={FormSubmit}>
                            <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Nom d'utilisateur
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input 
                                value={username}
                                id="username"
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="Nom d'utilisateur"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                                />
                            </div>
                            </div>

                            <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                type="email"
                                placeholder="Email"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                                />
                            </div>
                            </div>

                            <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Numéro téléphone
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input 
                                id="phone"
                                value={phoneNumber === 'null' ? '' : phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                type="tel"
                                placeholder="Numéro téléphone"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                                />
                            </div>
                            </div>

                            <div className="space-y-2">
                            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                                Logo
                            </label>
                            <div className="relative">
                            <div className='border rounded-md'>
                                <input
                                onChange={handleFileChange}
                                type="file"
                                class="block cursor-pointer w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4 file:rounded-md
                                    file:border-0 file:text-sm file:font-semibold
                                    file:bg-red-600 file:text-gray-100
                                    hover:file:bg-red-500"
                            />
                            </div>
                            </div>
                            <div className="mb-8">
                                <div className="space-y-2">
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                                    Tell me about yourself
                                </label>
                                <div className="relative pb-4">
                                    <User className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                                    <textarea 
                                    value={bio === 'null' ? '' : bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    id="bio"
                                    rows={4}
                                    placeholder="Tell us about yourself..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 resize-none"
                                    />
                                </div>
                                </div>
                            </div>
                            <hr className='pt-4' />
                                <button type='submit' className='bg-red-600 text-white py-2 px-5 rounded'>Sauver les changement</button>
                            </div>
                        </form>
                    </div>
                    </div>

                    {/* Right Column - Password Change */}
                    <div className="space-y-6">
                    <h2 className="text-2xl text-gray-600 font-[350] mb-4">Changer le mot de passe</h2>
                    
                    <form onSubmit={UpdatePassword}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                                Mot de passe actuel
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input 
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                id="currentPassword"
                                type="password"
                                placeholder="Mo de passe actuel"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 bg-yellow-50"
                                />
                            </div>
                            </div>

                            <div className="space-y-2">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                Nouveau mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                id="newPassword"
                                type="password"
                                placeholder="Nouveau mot de passe"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                                />
                            </div>
                            </div>

                            <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirmer le nouveau Mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirmer le nouveau Mot de passe"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                                />
                            </div>
                            </div>

                            <button type='submit' className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors">
                            Changer le mot de passe
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            <div className={`loaderPosition ${!loader ? 'invisible': 'visible'}`}>
                <div className="loaderBg"></div>
                <span class="loader"></span>
            </div>

        </div>    
    )
}
export default SettingsDashboard