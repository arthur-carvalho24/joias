'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function StickyStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: textRef.current,
        pinSpacing: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#F8F7F4] text-[#292722] min-h-[200vh]">
      <div className="max-w-[1440px] mx-auto px-[var(--page-padding)] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 py-24">
        
        {/* Lado Esquerdo: Fixo (Sticky) */}
        <div ref={textRef} className="h-screen flex flex-col justify-center py-12">
          <span className="eyebrow">A ATELIER GOLDEN GLOW</span>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight mt-4">
            Esculpido à mão. <br />
            Criado para a <em>eternidade</em>.
          </h2>
          <p className="text-sm text-[#514D45] leading-relaxed max-w-md mt-6">
            Cada gema é individualmente selecionada por lapidários mestres. Recusamos
            a produção em massa em favor do acabamento feito por mãos artesãs, 
            preservando a singularidade de cada fragmento.
          </p>

          <div className="mt-10 pt-8 border-t border-[#E5E1D9] flex items-center gap-12">
            <div>
              <span className="block text-2xl font-serif text-[#C5A46D]">100%</span>
              <span className="text-[10px] tracking-widest uppercase text-[#858076]">Ouro 18k Rastreável</span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-[#C5A46D]">Edição</span>
              <span className="text-[10px] tracking-widest uppercase text-[#858076]">Numerada & Única</span>
            </div>
          </div>
        </div>

        {/* Lado Direito: Imagens em Paralaxe */}
        <div className="flex flex-col gap-24 pt-12 lg:pt-32">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE6DE]">
            <img
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85"
              alt="Detalhe de Lapidação"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE6DE]">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85"
              alt="Processo Artesanal Joalheria"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}