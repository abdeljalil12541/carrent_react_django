import axios from "axios";
import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const CURRENCY_RATES = {
  'MAD': 1,
  'USD': 0.095,
  'EUR': 0.081
};

const CURRENCY_CONFIG = {
  'MAD': { symbol: 'DH', position: 'after' },
  'USD': { symbol: '$', position: 'before' },
  'EUR': { symbol: '€', position: 'after' }
};

const formatPrice = (price, currencyCode) => {
  const config = CURRENCY_CONFIG[currencyCode];
  const formattedNumber = price.toFixed(0);
  return config.position === 'before' ? `${config.symbol}${formattedNumber}` : `${formattedNumber} ${config.symbol}`;
};

const convertPrice = (price, fromCurrency, toCurrency) => {
  if (toCurrency === 'MAD dh') {
    return price;
  }
  const priceInMAD = fromCurrency === 'MAD dh' ? price : price / CURRENCY_RATES[fromCurrency];
  return toCurrency === 'MAD dh' ? priceInMAD : priceInMAD * CURRENCY_RATES[toCurrency];
};


const STATUS_MAP = {
  "Tout": null,
  "En attente": "upcoming",
  "Loué actuellement": "active",
  "Achevé": "active",
  "En attente de confirmation": "upcoming",
  "Terminée": "completed",
};




const ReservationHistoryDashboard = ({ selectedCurrency }) => {
  const [bookingCarsHistories, setBookingCarsHistories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Tout");
  const [itemsToShow, setItemsToShow] = useState(6);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchBookingHistoriesInfo();
  }, [selectedStatus]);

  const fetchBookingHistoriesInfo = async () => {
    try {
      const apiStatus = STATUS_MAP[selectedStatus];
      const response = await axios.get(`https://carrentreactdjango-production.up.railway.app/api/booking-info/`, {
        params: { status: apiStatus }
      });
      setBookingCarsHistories(response.data);
    } catch (error) {
      console.error('Error fetching reservation history:', error);
    }
  };

  const currencyCode = selectedCurrency ? selectedCurrency.split(' ')[0] : 'MAD dh';

  const loadMoreItems = () => {
    setLoader(true);
    setTimeout(() => {
      setItemsToShow((prev) => prev + 6);
      setLoader(false);
    }, 500);
  };

  return (
    <div className="p-1 sm:p-2 md:p-6">
      <h2 className="text-4xl font-light border-b pb-4 text-gray-600 mb-4">Historique des réservations</h2>

      {/* Tabs */}
      <div className="border-b mb-4">
    <nav className="flex flex-wrap space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10">
        {Object.keys(STATUS_MAP).map(status => (
            <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`py-2 sm:py-3 lg:py-4 ${selectedStatus === status ? 'text-gray-700 border-b-2 border-red-500' : 'text-red-500 hover:border-red-500'} text-sm sm:text-base md:text-md`}
            >
                {status}
            </button>
        ))}
    </nav>
</div>


      {/* Table with mapped booking data */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="font-[600] border border-gray-200 px-4 py-2 text-left">#ID</th>
              <th className="font-[600] border border-gray-200 px-4 py-2 text-left">Titre</th>
              <th className="font-[600] border border-gray-200 px-4 py-2 text-left">Date de commande</th>
              <th className="font-[600] border border-gray-200 px-4 py-2 text-left">Heure d'exécution</th>
              <th className="font-[600] border border-gray-200 px-4 py-2 text-left">Coût</th>
              <th className="font-[600] border border-gray-200 px-4 py-2 text-left">État</th>
            </tr>
          </thead>
          <tbody>
          {bookingCarsHistories
            .filter(booking => {
              if (selectedStatus === "Tout") return true;
              return booking.booking_status === STATUS_MAP[selectedStatus];
            })
            .slice(0, itemsToShow)
            .map((bookingHistory, index) => (
              <tr key={index} className="text-sm text-gray-800">
                <td className="border border-gray-200 pl-2 py-2 text-center">{bookingHistory.id}</td>
                <td className="border border-gray-200 pl-2 py-2 text-red-500">{bookingHistory.car.name}</td>
                <td className="border border-gray-200 pl-2 py-2">
                  {new Date(bookingHistory.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </td>
                <td className="border border-gray-200 pl-2 py-2">
                  {new Date(bookingHistory.pickup_datetime).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })} 
                  <MoveRight className="text-gray-600 inline-block mx-1" size={15} /> 
                  {new Date(bookingHistory.dropoff_datetime).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </td>
                <td className="border border-gray-200 pl-2 py-2">
                  {formatPrice(convertPrice(bookingHistory.total_price, 'MAD dh', currencyCode), currencyCode)}
                </td>
                <td className="border border-gray-200 pl-2 py-2">
                  <button className={`px-2 py-[2px] rounded text-white ${bookingHistory.booking_status === 'upcoming' ? 'bg-yellow-400' : ''} ${bookingHistory.booking_status === 'active' ? 'bg-green-600' : ''} ${bookingHistory.booking_status === 'completed' ? 'bg-red-500' : ''}`}>
                    {bookingHistory.booking_status === 'upcoming' ? 'pending' : bookingHistory.booking_status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load more button */}
      {itemsToShow >= bookingCarsHistories.length ? null : (
        <div className="mt-4">
          <button onClick={loadMoreItems} className="bg-red-500 text-white px-6 py-2 rounded">
            Voir plus
          </button>
        </div>
      )}

      {/* Loader */}
      <div className={`loaderPosition ${!loader ? 'invisible': 'visible'}`}>
        <div className="loaderBg"></div>
        <span className="loader"></span>
      </div>  
    </div>
  );
};

export default ReservationHistoryDashboard;
