import axios from 'axios';
import { useEffect, useState } from 'react';

const InboxDashboard = () => {
  const [inboxs, setInboxs] = useState([]);
  const [inboxsCount, setInboxsCount] = useState(0);
  const [sortedInboxs, setSortedInboxs] = useState([]);

  useEffect(() => {
    const FetchInboxObjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/get-inboxs/');
        console.log('fetching inboxs successfully...', response.data);
        setInboxs(response.data);

        // Shuffle inboxes and then sort by 'created_at'
        const shuffledInboxs = shuffleArray(response.data);
        setSortedInboxs(sortByCreatedAt(shuffledInboxs));
      } catch (error) {
        console.error('error fetching inboxs...', error);
      }
    };

    FetchInboxObjects();
  }, []);

  useEffect(() => {
    const FetchInboxCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/get-notif-count/');
        console.log('fetching inbox count successfully...', response.data.notif_count);
        setInboxsCount(response.data.notif_count);
      } catch (error) {
        console.error('error fetching inbox count...', error);
      }
    };

    FetchInboxCount();
  }, []);

  // Shuffle function to randomize the array
  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  // Sort by created_at date in descending order
  const sortByCreatedAt = (array) => {
    return array.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  };

  return (
    <div className="p-1 sm:p-6">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-light border-b pb-4 mb-6 text-gray-600 mb-4">Inbox</h2>

      {inboxsCount === 0 ? (
        ''
      ) : (
        <p className="text-gray-500 mb-4">You have {inboxsCount} message(s)</p>
      )}

      {sortedInboxs.length > 0 ? (
        sortedInboxs.map((inbox) => (
          <div key={inbox.id}>  {/* Use unique ID as key */}
            {inbox.inbox_type === 'signup' && (
              <div className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 relative" role="alert">
                <span className='text-[11px] opacity-[0.6] absolute right-2 bottom-1'>{new Date(inbox.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <div>
                  <span className="text-sm sm:text-md md:text-lg relative font-light">
                    {inbox.user.username} Votre inscription est confirmée. Nous vous souhaitons la bienvenue parmi nous.

                  </span>
                </div>
              </div>
            )}

            {inbox.inbox_type === 'booking' && (
              <div className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 relative" role="alert">
                <span className='text-[11px] opacity-[0.6] absolute right-2 bottom-1'>{new Date(inbox.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <div>
                  <span className="text-sm sm:text-md md:text-lg font-light">
                    Merci, votre réservation est confirmée. À très bientôt pour votre expérience!
                  </span>
                </div>
              </div>
            )}

            {inbox.inbox_type === 'is_active' && (
              <div className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 relative" role="alert">
                <span className='text-[11px] opacity-[0.6] absolute right-2 bottom-1'>{new Date(inbox.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <div>
                  <span className="text-sm sm:text-md md:text-lg font-light">
                    Félicitations, votre voiture a été livrée avec succès. Merci de faire confiance à notre service!
                  </span>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        ''
      )}
    </div>
  );
};

export default InboxDashboard;
