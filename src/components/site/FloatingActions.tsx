import { Phone } from "lucide-react";
import { company } from "@/data/site";

const whatsappNumber = company.phone.replace(/\D/g, "");
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hello Jobtech, I would like to enquire about manpower, payroll or labour compliance services.",
)}`;

export function FloatingActions() {
  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 z-40 flex flex-col items-end gap-2.5 sm:bottom-5 sm:right-5 sm:gap-3">
      <a
        href={`tel:${company.phone.replace(/\s/g, "")}`}
        aria-label="Call Jobtech"
        className="grid h-11 w-11 place-items-center rounded-full bg-slate-900 text-white shadow-lift transition hover:bg-slate-800 sm:h-12 sm:w-12"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp Jobtech"
        className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:bg-[#1ebe5d] sm:h-12 sm:w-12"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.43 2.15 11.89c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.89-4.43 9.89-9.89C21.94 6.43 17.5 2 12.04 2zm5.76 14.01c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.13.1-1.83-.11-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.86-4.23-5.01-4.43-.15-.2-1.25-1.66-1.25-3.17 0-1.5.79-2.24 1.07-2.55.28-.3.61-.38.81-.38h.58c.18 0 .43-.07.67.51.24.6.82 2.07.89 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.3.15.47.13.64-.08.17-.2.73-.85.93-1.14.2-.3.4-.24.67-.15.28.1 1.76.83 2.06.98.3.15.5.22.57.35.08.13.08.75-.16 1.43z" />
    </svg>
  );
}
