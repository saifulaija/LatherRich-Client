import { FaWhatsapp, FaPhoneAlt, FaFacebookMessenger } from 'react-icons/fa';

const ExchangeAndComplain = () => {
  return (
    <div className="container mx-auto p-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Exchange</h2>
          <p className="mb-2">Exchange is applicable only for size issues, our mistakes, or if we sent damaged products.</p>
          <p className="mb-2">Exchange is only valid within 7 days from the product received date.</p>
          <p className="mb-2">Customers need to provide a short video of the product that needs to be exchanged through our WhatsApp:</p>
          <p className="flex items-center mb-2">
            <FaWhatsapp className="mr-2" />
            <span>+8801324250470</span>
          </p>
          <p className="mb-2">Note: Please mention your order ID with the video.</p>
          <p>Customers need to bear the delivery cost if there is no issue from our end.</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Complain</h2>
          <p className="mb-2">To get a quick response, please call our support number:</p>
          <p className="flex items-center mb-2">
            <FaPhoneAlt className="mr-2" />
            <span>+8801324250470</span>
          </p>
          <p className="mb-2">Customers can submit their complaints through our WhatsApp:</p>
          <p className="flex items-center mb-2">
            <FaWhatsapp className="mr-2" />
            <span>+8801324250470</span>
          </p>
          <p>Or contact us via our Facebook page inbox:</p>
          <p className="flex items-center">
            <FaFacebookMessenger className="mr-2" />
            <span>Facebook Messenger</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExchangeAndComplain;
