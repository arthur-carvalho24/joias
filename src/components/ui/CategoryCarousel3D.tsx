'use client';

import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    setMatches(matchMedia.matches);

    const handleChange = () => setMatches(matchMedia.matches);
    matchMedia.addEventListener('change', handleChange);
    return () => matchMedia.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  imgUrl: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'pingente-aco-inox',
    title: 'Pingentes Aço Inox',
    subtitle: 'Esculturas Contemporâneas',
    imgUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pulseira-banho-ouro-18k',
    title: 'Pulseiras Ouro 18k',
    subtitle: 'Fluidez & Brilho Nobre',
    imgUrl: 'https://images.unsplash.com/photo-1611591475165-da7949fa9843?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pulseira-masculina-aco-inox',
    title: 'Pulseiras Masc. Aço Inox',
    subtitle: 'Design Robusto & Minimalista',
    imgUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tornozeleira-banho-ouro-18k',
    title: 'Tornozeleiras Ouro 18k',
    subtitle: 'Delicadeza Atemporal',
    imgUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tornozeleira-aco-inox',
    title: 'Tornozeleiras Aço Inox',
    subtitle: 'Resistência & Estilo Urbano',
    imgUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bracelete-aco-inox',
    title: 'Braceletes Aço Inox',
    subtitle: 'Geometria & Presença',
    imgUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'brinco-aco-inox',
    title: 'Brincos Aço Inox',
    subtitle: 'Leveza & Lapidação Limpa',
    imgUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'corrente-masculina-ouro-18k',
    title: 'Correntes Masc. Ouro 18k',
    subtitle: 'Elos Marcantes & Nobres',
    imgUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pulseira-masculina-ouro-18k',
    title: 'Pulseiras Masc. Ouro 18k',
    subtitle: 'Sofisticação Masculina',
    imgUrl: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
  },
];

const OvalCarousel = memo(
  ({ onItemClick }: { onItemClick: (item: CategoryItem) => void }) => {
    const isMobile = useMediaQuery('(max-width: 640px)');
    const [rotation, setRotation] = useState(0);

    const isPointerDownRef = useRef(false);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const lastXRef = useRef(0);
    const velocityRef = useRef(0);
    const animFrameRef = useRef<number | null>(null);

    const faceCount = CATEGORIES.length;
    const radiusX = isMobile ? 380 : 750;
    const radiusZ = isMobile ? 180 : 340;
    const cardWidth = isMobile ? 220 : 280;

    useEffect(() => {
      const updatePhysics = () => {
        if (!isPointerDownRef.current && Math.abs(velocityRef.current) > 0.01) {
          setRotation((prev) => prev + velocityRef.current);
          velocityRef.current *= 0.93;
        }
        animFrameRef.current = requestAnimationFrame(updatePhysics);
      };

      animFrameRef.current = requestAnimationFrame(updatePhysics);

      return () => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };
    }, []);

    const handlePointerDown = (e: React.PointerEvent) => {
      isPointerDownRef.current = true;
      isDraggingRef.current = false;
      startXRef.current = e.clientX;
      lastXRef.current = e.clientX;
      velocityRef.current = 0;
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isPointerDownRef.current) return;

      const deltaX = e.clientX - lastXRef.current;
      const totalDelta = Math.abs(e.clientX - startXRef.current);

      if (totalDelta > 6) {
        isDraggingRef.current = true;
      }

      const sensitivity = isMobile ? 0.25 : 0.15;
      const step = deltaX * sensitivity;

      setRotation((prev) => prev + step);
      velocityRef.current = step;
      lastXRef.current = e.clientX;
    };

    const handlePointerUp = () => {
      isPointerDownRef.current = false;
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 50);
    };

    const handleCardClick = (item: CategoryItem) => {
      if (isDraggingRef.current) return;
      onItemClick(item);
    };

    return (
      <div
        className="relative w-full h-[520px] flex items-center justify-center select-none touch-pan-y overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{
          perspective: '1400px',
        }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {CATEGORIES.map((item, i) => {
            const baseAngle = i * (360 / faceCount);
            const currentAngle = (baseAngle + rotation) * (Math.PI / 180);

            const x = Math.sin(currentAngle) * radiusX;
            const z = Math.cos(currentAngle) * radiusZ;
            const rotateYDeg = (currentAngle * 180) / Math.PI;

            const normalizedZ = (z + radiusZ) / (2 * radiusZ);
            const opacity = 0.45 + normalizedZ * 0.55;
            const scale = 0.82 + normalizedZ * 0.18;

            return (
              <div
                key={item.id}
                className="absolute origin-center transition-opacity duration-300 group cursor-pointer"
                style={{
                  width: `${cardWidth}px`,
                  height: '380px',
                  transform: `translate3d(${x.toFixed(2)}px, 0px, ${z.toFixed(2)}px) rotateY(${rotateYDeg.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
                  opacity: Number(opacity.toFixed(3)),
                  zIndex: Math.round(z + radiusZ),
                  willChange: 'transform, opacity',
                }}
                onClick={() => handleCardClick(item)}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#E5E1D9] bg-[#EAE6DE] shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    draggable={false}
                    className="pointer-events-none w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[9px] uppercase tracking-[2.5px] text-[#D8C29B]">
                      CATEGORIA
                    </span>
                    <h3 className="font-serif text-xl text-[#F8F7F4] mt-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#EAE6DE] font-sans opacity-85 mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

OvalCarousel.displayName = 'OvalCarousel';

export function CategoryCarousel3D() {
  const [activeItem, setActiveItem] = useState<CategoryItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative py-20 bg-[#F8F7F4] overflow-hidden">
      <div className="text-center mb-10 px-6">
        <span className="eyebrow">EXPLORE O ACERVO</span>
        <h2 className="text-3xl md:text-5xl font-serif text-[#292722] mt-2">
          Categorias em <em>Destaque</em>
        </h2>
        <p className="text-xs text-[#777269] mt-3 tracking-widest uppercase">
          Arraste lateralmente para percorrer o acervo oval
        </p>
      </div>

      <div className="relative w-full max-w-[1600px] mx-auto min-h-[520px]">
        {isMounted ? (
          <OvalCarousel onItemClick={(item) => setActiveItem(item)} />
        ) : (
          <div className="w-full h-[520px] flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#C5A46D] border-t-transparent animate-spin" />
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative max-w-lg w-full bg-[#F8F7F4] rounded-2xl overflow-hidden shadow-2xl p-6 text-center border border-[#C5A46D]/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6">
                <img
                  src={activeItem.imgUrl}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="eyebrow">COLEÇÃO EXCLUSIVA</span>
              <h3 className="font-serif text-3xl text-[#292722] mt-2">
                {activeItem.title}
              </h3>
              <p className="text-sm text-[#777269] mt-2">
                {activeItem.subtitle}
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <a
                  href={`/collection?cat=${activeItem.id}`}
                  className="primary-button !bg-[#292722] !text-white hover:!bg-[#C5A46D]"
                >
                  VER PRODUTOS ↗
                </a>
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-6 py-3 border border-[#E5E1D9] text-xs font-semibold tracking-wider hover:bg-[#EAE6DE] transition-colors"
                >
                  FECHAR
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}