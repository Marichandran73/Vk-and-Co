import { useCompany } from '../hooks/useData';
import { HiPhone, HiChat } from 'react-icons/hi';

export default function ContactButtons() {
  const company = useCompany();
  const phone = company?.owner?.phone || '+918778857604';
  const cleanPhone = phone.replace(/\s/g, '').replace(/^\+91/, '91');
  const whatsappUrl = `https://wa.me/${cleanPhone}`;

  return (
    <div id="contact" className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <HiChat className="w-6 h-6" />
        <span className="hidden sm:inline font-medium">WhatsApp</span>
      </a>
      <a
        href={`tel:${cleanPhone}`}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:scale-105 transition-transform"
        aria-label="Call"
      >
        <HiPhone className="w-6 h-6" />
        <span className="hidden sm:inline font-medium">Call</span>
      </a>
    </div>
  );
}
