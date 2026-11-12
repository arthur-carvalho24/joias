'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const items = [
  {
    id: '01',
    title: 'Bracelete Aura',
    subtitle: 'Ouro Nobre 18k',
    price: 'R$ 14.200',
    img: 'https://images.unsplash.com/photo-1611591475165-da7949fa9843?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: '02',
    title: 'Anel Eclipse',
    subtitle: 'Diamante Negro & Ouro Branco',
    price: 'R$ 18.900',
    img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: '03',
    title: 'Colar Lumina',
    subtitle: 'Lapidação Gota Exclusiva',
    price: 'R$ 22.500',
    img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: '04',
    title: 'Brincos Solis',
    subtitle: 'Pérolas Naturais & Ouro 18k',
    price: 'R$ 11.800',
    img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85',
  },
];

export default function HorizontalCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const slider = sliderRef.current;

      if (!container || !slider) return;

      const totalScroll = slider.scrollWidth - window.innerWidth;

      gsap.to(slider, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-[#292722] text-[#F8F7F4] overflow-hidden">
      <div className="absolute top-12 left-[var(--page-padding)] z-10">
        <span className="eyebrow !text-[#C5A46D]">COLEÇÃO EDITORIAL</span>
        <h2 className="text-3xl md:text-5xl font-serif text-[#F8F7F4] mt-2">
          Objetos de Desejo <em>2026</em>
        </h2>
      </div>

      <div
        ref={sliderRef}
        className="flex items-center h-full gap-8 md:gap-16 pl-[var(--page-padding)] pr-[20vw] pt-24"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="flex-none w-[75vw] sm:w-[45vw] lg:w-[28vw] group cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#37332D]">
              <span className="absolute top-4 left-4 z-10 text-xs tracking-widest text-white/80 font-mono">
                {item.id}
              </span>
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="mt-5 flex items-baseline justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-[#F8F7F4]">{item.title}</h3>
                <p className="text-xs text-[#858076] mt-1 font-sans">{item.subtitle}</p>
              </div>
              <span className="text-xs font-semibold text-[#C5A46D]">{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}