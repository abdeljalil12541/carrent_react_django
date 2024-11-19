import { Minus, Plus, SquareCheckBig } from 'lucide-react';
import { useEffect, useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200 py-2">
      <button
        className="flex items-center w-full text-left text-lg font-medium text-gray-700"
        onClick={toggleOpen}
      >
        <span className="mr-3 bg-red-500">
          <div className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            {isOpen ? <Minus color='white' /> : <Plus color='white' />}
          </div>
        </span>
        <span className='text-lg sm:text-xl lg:text-2xl font-light'>{question}</span>
      </button>

      <div
        className={`transition-max-height duration-1000 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        {isOpen && (
          <div className="mt-2 text-gray-600 text-sm">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
};

const Faq = () => {
    
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="relative h-screen bg-cover overflow-hidden grid grid-cols-5 md:grid-cols-4 lg:grid-cols-3 bg-center" style={{height: '80vh', backgroundImage: "url('https://occupythedream.org/wp-content/uploads/2022/07/how-much-does-it-cost-to-rent-a-luxury-car-occupythedream.jpg')" }}>
                {/* Transparent overlay */}
            <div className="col-span-4 sm:col-span-4 md:col-span-3 lg:col-span-2 bg-black bg-opacity-70 sm:my-8 sm:mx-20 flex items-center">
                <div className="ml-4 text-gray-200 mx-auto max-w-xl">
                <h2 className="text-xl sm:text-3xl font-semibold mb-1 sm:mb-6">
                    De quoi ai-je besoin pour louer une voiture?
                </h2>
                <p className="mb-6 text-sm sm:text-[16px]">
                    Pour réserver votre voiture, tout ce dont vous avez besoin est une carte de crédit ou de débit. Lorsque vous prenez la voiture, vous aurez besoin:
                </p>
                <ul className="ml-1 text-xs sm:text-[16px]">
                    <li><span className='inline-block mb-[3px] sm:mb-0 -mb-1 mr-1'><SquareCheckBig color='red' size={18} /></span>Le crédit du conducteur principal, avec suffisamment de fonds pour le dépôt.</li>
                    <li><span className='inline-block mb-[3px] sm:mb-0 -mb-1 mr-1'><SquareCheckBig color='red' size={18} /></span>Permis de conduire valide et complet de chaque conducteur.</li>
                    <li><span className='inline-block mb-[3px] sm:mb-0 -mb-1 mr-1'><SquareCheckBig color='red' size={18} /></span>Votre passeport et toute autre pièce d'identité que l'entreprise de location  doit voir.</li>
                </ul>
                <p className="mt-4 text-sm sm:text-[16px]">
                    Assurez-vous également de vérifier les termes et conditions de la voiture.
                </p>
                </div>
            </div>
        </div>

      {/* FAQ Section */}
      <div className="grid sm:grid-cols-2 sm:gap-10 md:gap-20 mx-4 sm:mx-10 md:mx-18 lg:mx-24 my-8 sm:my-14 md:my-20">
        {/* First Column */}
        <div className="flex flex-col space-y-1 sm:space-y-4">
          <FAQItem
            question="Ai-je besoin d'une carte de crédit ?"
            answer={
              <>
                <span className="font-bold">😁 OUI.</span> Une carte de crédit aux nom et prénom du conducteur principal est indispensable lors de la prise en charge du véhicule afin d’en déposer la caution. Les cartes de débit ne seront pas acceptées. Il existe néanmoins des offres de location de voiture sans caution pour certaines destinations.
              </>
            }
          />

          <FAQItem
            question="Doit-on verser une caution ?"
            answer={
              <>
                <span className="font-bold">😁 OUI.</span> La caution est gardée par le loueur en cas de dégradations sur le véhicule, pour couvrir la franchise. Carigami vous conseille les offres avec remboursement de franchise. En cas de sinistre, vous devrez avancer les frais de franchise au loueur, avant de pouvoir en demander le remboursement.
              </>
            }
          />

          <FAQItem
            question="À partir de quel âge puis-je louer une voiture ?"
            answer={
              <>
                <span className="font-bold">🏁 Cela.</span> Cela dépend des pays et des prestataires, mais c’est soit à partir de 19 ans, de 21 ans ou de 23 ans. Il faut toujours au minimum 1 an de permis de conduire valable, voir plus suivant la destination ou la catégorie de voiture louée.
              </>
            }
          />

          <FAQItem
            question="Puis-je modifier une réservation de location de voiture ?"
            answer={
              <>
                <span className="font-bold">😁 OUI.</span> Il est possible de modifier une réservation jusqu’à 24 heures avant votre départ, que ce soit sa durée, l’heure de prise en charge ou la catégorie du véhicule. La seule condition est que vos nouveaux souhaits soient compatibles avec les disponibilités du loueur sur place.
              </>
            }
          />

          <FAQItem
            question="L'annulation d'une réservation est-elle payante ?"
            answer={
              <>
                <span className="font-bold">😊 NON.</span> L’annulation d’une réservation est sans frais jusqu’à 24 heures avant l’heure de la prise en charge du véhicule. Pour annuler, il suffit de nous appeler pendant nos horaires d’ouverture (c’est gratuit aussi).
              </>
            }
          />

          <FAQItem
            question="De quelles assurances ai-je besoin ?"
            answer={
              <>
                <span className="font-bold">Assurance.</span> L’assurance responsabilité civile, qui couvre tous dommages corporels sur autrui (également nommé LIS), est toujours incluse dans nos offres de location (sauf exceptions pour certaines destinations).
              </>
            }
          />
        </div>

        {/* Second Column */}
        <div className="flex flex-col space-y-4">
          <FAQItem
            question="La personne qui m'accompagne peut-elle aussi conduire la voiture de location ?"
            answer={
              <>
                <span className="font-bold">OUI.</span> Bien sûr, mais à la condition qu’elle ait le permis et qu’elle ait été déclarée comme conducteur supplémentaire auprès du loueur sur place.
              </>
            }
          />

          <FAQItem
            question="Quelles options pour le véhicule ?"
            answer={
              <>
                <span className="font-bold">🚗 Options.</span> Parmi les options les plus demandées, on trouve le siège bébé, le GPS. Toutes ces options sont gratuites.
              </>
            }
          />

          <FAQItem
            question="Peut-on prendre en charge son véhicule dans une agence et le restituer dans une autre ?"
            answer={
              <>
                <span className="font-bold">😃 OUI.</span> Les allers simples au sein d’un même pays sont possibles dans la plupart des cas.
              </>
            }
          />

          <FAQItem
            question="Une voiture de location peut-elle m'attendre au port ou à mon hôtel ?"
            answer={
              <>
                <span className="font-bold">😃 OUI.</span> Pour certains hôtels, cela dépend des destinations et de la saison.
              </>
            }
          />

          <FAQItem
            question="EST-CE QUE LE SITE UTILISE DES COOKIES ?"
            answer={
              <>
                <span className="font-bold">Cookies.</span> Le site Medousa Car opère un usage limité des cookies dans l’intérêt de ses clients.
              </>
            }
          />

          <FAQItem
            question="POURQUOI DOIS-JE INDIQUER MON NUMÉRO DE VOL ?"
            answer={
              <>
                <span className="font-bold">Vol.</span> Si vous prenez en charge votre voiture dans un aéroport, veuillez nous communiquer votre numéro de vol.
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Faq;
