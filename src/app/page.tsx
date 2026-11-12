'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CategoryCarousel3D } from '@/components/ui/CategoryCarousel3D';

interface Product {
  id: string;
  name: string;
  material: string;
  price: number;
  installments: string;
  image: string;
  hoverImage: string;
  tag?: string;
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Colar Solitaire Lumina',
    material: 'Ouro Amarelo 18k & Diamante 0.5ct',
    price: 8900,
    installments: '10x de R$ 890,00 sem juros',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    tag: 'EDICÃO LIMITADA',
  },
  {
    id: '2',
    name: 'Anel Sculptural Aura',
    material: 'Ouro Nobre 18k & Textura Orgânica',
    price: 5400,
    installments: '10x de R$ 540,00 sem juros',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
    tag: 'BEST-SELLER',
  },
  {
    id: '3',
    name: 'Brincos Drop Light',
    material: 'Ouro Amarelo 18k & Lapidação Gota',
    price: 6200,
    installments: '10x de R$ 620,00 sem juros',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setToastMessage(`"${productName}" adicionado à sacola.`);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const elementsToReveal = gsap.utils.toArray<HTMLElement>('.reveal-item');
      elementsToReveal.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      const cards = gsap.utils.toArray<HTMLElement>('.product-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="relative">
      {/* Toast de Notificação de Compra */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#292722] text-[#F8F7F4] border border-[#C5A46D]/40 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 transition-all duration-300">
          <span className="w-2 h-2 rounded-full bg-[#C5A46D] animate-ping" />
          <p className="text-xs tracking-wider">{toastMessage}</p>
        </div>
      )}

      {/* 1. Announcement Bar */}
      <div className="announcement">
        FRETE CORTESIA EM COMPRAS ACIMA DE R$ 2.500 — EDIÇÃO LIMITADA
      </div>

      {/* 2. Header */}
      <header className="header sticky top-0 bg-[#F8F7F4]/90 backdrop-blur-md z-40">
        <div className="wordmark">
          GOLDEN <span>GLOW</span>
        </div>
        <nav className="navigation">
          <a href="#categorias">ACERVO</a>
          <a href="#produtos">COLEÇÃO</a>
          <a href="#sobre">A MARCA</a>
        </nav>
        <a href="#carrinho" className="header-link flex items-center gap-2">
          SACOLA <span className="text-[#C5A46D] font-bold">({cartCount})</span>
        </a>
      </header>

      
      {/* 3. Hero Section com Vídeo */}
<section className="hero">
  {/* Vídeo de Fundo */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover transform scale-105"
    poster="/images/hero.png" /* Carrega a imagem estática enquanto o vídeo carrega */
  >
    <source src="/videos/videohero.mp4" type="video/mp4" />
  </video>

  {/* Overlay Escuro para Manter Contraste do Texto */}
  <div className="hero-overlay" />

  {/* Conteúdo */}
  <div className="hero-content">
    <span className="eyebrow">A BELEZA ESTÁ NOS DETALHES</span>
    <h1>
      Mais que joias. <br />
      <em>Expressões eternas.</em>
    </h1>
    <p>
      Peças que traduzem personalidade, delicadeza e a beleza de ser único.
    </p>
    <a href="#produtos" className="primary-button">
      DESCUBRA A COLEÇÃO ↗
    </a>
  </div>

  <span className="hero-index">01 — 03</span>
  <span className="hero-caption">OBJETOS DE DESEJO · 2026</span>
</section>

      {/* 4. Brand Introduction */}
      <section id="sobre" className="intro">
        <div className="reveal-item">
          <span className="eyebrow">FEITAS PARA PERMANECER</span>
          <h2>
            O extraordinário mora <br />
            na <em>simplicidade</em>.
          </h2>
          <p>
            Acreditamos que uma joia não é apenas um acessório. É memória, identidade 
            e sentimento transformados em matéria.
          </p>
        </div>
      </section>

      {/* 5. Acervo em Categorias (Carrossel Oval 3D) */}
      <section id="categorias">
        <CategoryCarousel3D />
      </section>

      {/* 6. Área de Produtos com Ações Reais de E-commerce */}
      <section id="produtos" className="collection py-20">
        <div className="section-heading reveal-item mb-12">
          <div>
            <span className="eyebrow">SELEÇÃO EXCLUSIVA</span>
            <h2 className="text-4xl font-serif">Joias em Destaque</h2>
          </div>
          <a href="/collection" className="text-link">
            VER TODO O CATALOGO ↗
          </a>
        </div>

        {/* Grid de Produtos */}
        <div className="product-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <div key={product.id} className="product-card group flex flex-col">
              
              {/* Imagem do Produto com Transição Hover */}
              <div className="product-image relative aspect-[4/5] overflow-hidden bg-[#EAE6DE] rounded-xl">
                {product.tag && (
                  <span className="absolute top-4 left-4 z-10 bg-[#292722]/90 backdrop-blur-md text-[#D8C29B] text-[9px] font-semibold tracking-widest px-3 py-1.5 rounded-full border border-[#C5A46D]/30">
                    {product.tag}
                  </span>
                )}

                {/* Foto Principal */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
                />
                
                {/* FotoSecundária no Hover */}
                <img
                  src={product.hoverImage}
                  alt={`${product.name} detalhe`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:scale-105"
                />

                {/* Barra de Ação Flutuante no Hover */}
                <div className="absolute inset-x-4 bottom-4 z-20 flex flex-col gap-2 translate-y-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleAddToCart(product.name)}
                    className="w-full py-3.5 bg-[#292722] text-[#F8F7F4] text-[10px] font-semibold tracking-[2px] uppercase rounded-lg hover:bg-[#C5A46D] hover:text-[#292722] transition-colors shadow-xl"
                  >
                    + ADICIONAR À SACOLA
                  </button>
                  <a
                    href={`/product/${product.id}`}
                    className="w-full py-2.5 bg-[#F8F7F4]/90 backdrop-blur-md text-[#292722] text-[9px] font-semibold tracking-[1.5px] uppercase text-center rounded-lg hover:bg-[#F8F7F4] transition-colors border border-[#E5E1D9]"
                  >
                    VER DETALHES DO PRODUTO
                  </a>
                </div>
              </div>

              {/* Informações detalhadas do Produto */}
              <div className="product-info mt-5 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[10px] tracking-widest text-[#858076] uppercase">
                    {product.material}
                  </span>
                  <h3 className="font-serif text-2xl text-[#292722] mt-1 group-hover:text-[#C5A46D] transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5E1D9] flex flex-col">
                  <span className="text-xl font-serif text-[#292722]">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[11px] text-[#777269] mt-0.5">
                    ou {product.installments}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 7. Closing Section */}
      <section className="closing">
        <div className="reveal-item">
          <span className="eyebrow">SUA HISTÓRIA, SUA MARCA</span>
          <h2>
            O que é eterno <br />
            não precisa de <em>ocasião</em>.
          </h2>
          <a href="#produtos" className="primary-button">
            EXPLORAR O ACERVO ↗
          </a>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="footer">
        <div className="wordmark">GOLDEN GLOW</div>
        <span>© 2026 GOLDEN GLOW — TODOS OS DIREITOS RESERVADOS</span>
        <div className="navigation">
          <a href="#">INSTAGRAM</a>
          <a href="#">TERMOS</a>
          <a href="#">CONTATO</a>
        </div>
      </footer>
    </main>
  );
}