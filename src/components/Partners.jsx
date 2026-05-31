import { RevealOnScroll } from '../hooks/useScrollReveal';

const partners = [
  { name: 'BCEAO', display: 'BCEAO' },
  { name: 'Banque Mondiale', display: 'Banque Mondiale' },
  { name: 'UEMOA', display: 'UEMOA' },
  { name: 'FCPB', display: 'FCPB' },
  { name: 'PNUD', display: 'PNUD' },
  { name: 'AFD', display: 'AFD' },
  { name: 'BCEAO', display: 'BCEAO' },
  { name: 'Banque Mondiale', display: 'Banque Mondiale' },
  { name: 'UEMOA', display: 'UEMOA' },
  { name: 'FCPB', display: 'FCPB' },
  { name: 'PNUD', display: 'PNUD' },
  { name: 'AFD', display: 'AFD' },
];

export default function Partners() {
  return (
    <section id="partners" className="py-14 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <p className="text-center text-[13px] text-gray-400 font-medium uppercase tracking-[0.2em] mb-10">
            Ils nous font confiance et nous accompagnent
          </p>
        </RevealOnScroll>

        {/* Marquee effect */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="overflow-hidden">
            <div className="flex gap-16 animate-marquee">
              {partners.map((partner, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center justify-center px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-default"
                >
                  <span className="text-lg font-bold text-gray-300 group-hover:text-primary-500 transition-colors duration-300 whitespace-nowrap">
                    {partner.display}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider mt-14" />
    </section>
  );
}
