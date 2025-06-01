'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { MapPin, Heart, Gift, ExternalLink, Phone, Mail } from "lucide-react";

// Komponenta pro padající sníh s více vločkami
const FallingSnow = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{id: number, x: number, y: number, size: number, speed: number, opacity: number}>>([]);

  useEffect(() => {
    const createSnowflakes = () => {
      const flakes = Array.from({ length: 150 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 3 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
      }));
      setSnowflakes(flakes);
    };

    createSnowflakes();
    window.addEventListener('resize', createSnowflakes);

    const animateSnow = () => {
      setSnowflakes(prev => prev.map(flake => ({
        ...flake,
        y: flake.y > window.innerHeight ? -10 : flake.y + flake.speed,
        x: flake.x + Math.sin(flake.y * 0.01) * 0.8,
      })));
    };

    const interval = setInterval(animateSnow, 30);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', createSnowflakes);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute text-white"
          style={{
            left: flake.x,
            top: flake.y,
            fontSize: flake.size + 'px',
            opacity: flake.opacity,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

// Komponenta pro odpočet do svatby
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2026-01-24T13:30:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-lg mx-auto mb-8">
      <div className="text-center">
        <div className="text-2xl md:text-4xl font-serif font-light mb-2">{timeLeft.days}</div>
        <div className="text-xs md:text-sm font-light tracking-wider opacity-80">DNÍ</div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-4xl font-serif font-light mb-2">{timeLeft.hours}</div>
        <div className="text-xs md:text-sm font-light tracking-wider opacity-80">HODIN</div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-4xl font-serif font-light mb-2">{timeLeft.minutes}</div>
        <div className="text-xs md:text-sm font-light tracking-wider opacity-80">MINUT</div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-4xl font-serif font-light mb-2">{timeLeft.seconds}</div>
        <div className="text-xs md:text-sm font-light tracking-wider opacity-80">SEKUND</div>
      </div>
    </div>
  );
};

// Navigační menu
const NavigationMenu = () => {
  const menuItems = [
    { href: '#uvod', label: 'Úvod' },
    { href: '#snoubenci', label:'Snoubenci' },
    { href: '#galerie', label: 'Galerie' },
    { href: '#yard-resort', label: 'Yard Resort' },
    { href: '#program', label: 'Program' },
    { href: '#dary', label: 'Dary' },
    { href: '#info', label: 'Info' },
    { href: '#rsvp', label: 'RSVP' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="text-xl font-serif font-light text-stone-900">Anička</span>
            <div className="w-px h-4 bg-stone-400"></div>
            <span className="text-xl font-serif font-light text-stone-900">Michal</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-light text-stone-600 hover:text-stone-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="text-sm font-light text-stone-600">
            24.01.2026
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function WeddingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigace */}
      <NavigationMenu />

      {/* Hero sekce */}
      <section id="uvod" className="relative overflow-hidden" style={{ height: '139vh' }}>
        {/* Pozadí s fotografií */}
        <div className="absolute inset-0">
          <Image
            src="/Lilien-newborn-30.jpg"
            alt="Anna & Michal"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Overlay pro lepší čitelnost */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
        </div>

        {/* Padající sníh */}
        {mounted && <FallingSnow />}

        {/* Hlavní obsah inspirovaný logem */}
        <div className="relative z-20 flex items-center justify-center p-8 pt-24" style={{ height: '139vh' }}>
          <div className="text-center text-white max-w-4xl mx-auto">
            {/* Logo-inspired design */}
            <div className="mb-12">
              {/* Zakřivený text nahoře */}
              <div className="mb-8">
                <svg viewBox="0 0 400 100" className="w-full max-w-md mx-auto">
                  <path
                    id="curve"
                    d="M 50 50 Q 200 20 350 50"
                    fill="none"
                    stroke="none"
                  />
                  <text className="fill-white text-sm font-light tracking-[0.3em]">
                    <textPath href="#curve" startOffset="50%" textAnchor="middle">
                      ANNA & MICHAL
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Hlavní monogram */}
              <div className="relative mb-8">
                <div className="flex items-center justify-center space-x-8">
                  <span className="text-8xl md:text-9xl font-serif font-light">A</span>
                  <div className="w-px h-24 bg-white"></div>
                  <span className="text-8xl md:text-9xl font-serif font-light">M</span>
                </div>
              </div>

              {/* Datum */}
              <div className="text-xl md:text-2xl font-light tracking-[0.5em] mb-8">
                se budou brát 24. ledna 2026
              </div>
            </div>

            {/* Odpočet do svatby */}
            <div className="mb-12">
              <div className="text-sm md:text-base font-light tracking-wider opacity-90 mb-6">
                DO SVATBY ZBÝVÁ
              </div>
              <Countdown />
            </div>

            {/* Detaily */}
            <div className="space-y-4 mb-12 text-lg md:text-xl font-light">
              <div>13:30</div>
              <div>Yard Resort, Předboj</div>
            </div>

            {/* Scroll down hint */}
            <div className="animate-bounce">
              <a href="#snoubenci" className="text-white/70 hover:text-white transition-colors">
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Snoubenci sekce */}
      <section id="snoubenci" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-900 mb-6">Snoubenci</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
              Rádi bychom vás přivítali na našem svatebním webu, kde naleznete ty nejdůležitější informace k našemu významnému dni. Už se na vás všechny moc těšíme!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            {/* Anna */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/anicka3.jpg"
                  alt="Anna"
                  fill
                  className="object-cover object-[center_0%]"
                  sizes="(max-width: 768px) 192px, 192px"
                />
              </div>
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-4">Anička</h3>
              <p className="text-stone-600 leading-relaxed">
                Do Aničky jsem se zamiloval na první pohled. Nejde to moc dobře vysvětlit. Měla a stále má charisma, které mě neuvěřitelně přitahuje. Poměrně dlouho mému šarmu odolávala, ale nakonec jsem ji udolal! :) Anička je pro mě osobou, kterou jsem dlouho hledal a konečně našel. Je to můj parťák na celý život, na kterého se mohu 100% spolehnout. Teda když zrovna náhodou nemá hlad, to se z ní totiž stane stane monstrum :D
              </p>
            </div>

            {/* Michal */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/michal.jpg"
                  alt="Michal"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 192px"
                />
              </div>
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-4">Michal</h3>
              <p className="text-stone-600 leading-relaxed">
                Na Míšovi miluji spoustu věcí, ale hlavně jeho neustálou pozitivitu a nadhled. No a když mi poprvé uvařil, nebylo už cesty zpět :D. On je ten, co mě motivuje být lepším člověkem a nemít malé cíle. Míša je moje bezpečné místo - člověk, na kterého se mohu spolehnout, člověk, který mi vždy se vším pomůže a splní každou blbost, kterou si na něj vymyslím :). Je taky nejlepší táta pro naši Lilinku a jsem vděčná, že je právě on jejím mužským vzorem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie sekce */}
      <section id="galerie" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-900 mb-6">Galerie</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
              Chronologická cesta našeho vztahu - od prvního setkání až po zásnuby. Každá fotka vypráví příběh toho, co jsme zažili &quot;poprvé&quot;.
            </p>
          </div>

          {/* Chronologická fotogalerie 4x4 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Foto 1 - první kamarádská fotka */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/1.jpg"
                  alt="první kamarádská fotka"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první kamarádská fotka</p>
              </div>
            </div>

            {/* Foto 2 - první Halloween */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/2.jpg"
                  alt="první Halloween"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první Halloween</p>
              </div>
            </div>

            {/* Foto 3 - první vánoční večírek */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/3.jpg"
                  alt="první vánoční večírek"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první vánoční večírek</p>
              </div>
            </div>

            {/* Foto 4 - první fotka jako pár */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/4.jpg"
                  alt="první fotka jako pár"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první fotka jako pár</p>
              </div>
            </div>

            {/* Foto 5 - první dovolená */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/5.jpg"
                  alt="první dovolená"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první dovolená</p>
              </div>
            </div>

            {/* Foto 6 - první Vánoce */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/6.jpg"
                  alt="první Vánoce"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první Vánoce</p>
              </div>
            </div>

            {/* Foto 7 - první Silvestr */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/7.jpg"
                  alt="první Silvestr"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první Silvestr</p>
              </div>
            </div>

            {/* Foto 8 - první společné bydlení */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/8.jpg"
                  alt="první společné bydlení"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první společné bydlení</p>
              </div>
            </div>

            {/* Foto 9 - první pes */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/9.jpg"
                  alt="první pes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první pes</p>
              </div>
            </div>

            {/* Foto 10 - první těhotenství */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/10.jpg"
                  alt="první těhotenství"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první těhotenství</p>
              </div>
            </div>

            {/* Foto 11 - první dítě */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/11.jpg"
                  alt="první dítě"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první dítě</p>
              </div>
            </div>

            {/* Foto 12 - první dům */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/12.jpg"
                  alt="první dům"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první dům</p>
              </div>
            </div>

            {/* Foto 13 - první zásnuby */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/13.jpg"
                  alt="první zásnuby"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první zásnuby</p>
              </div>
            </div>

            {/* Foto 14 - první rozlučka se svobodou */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/14.jpg"
                  alt="první rozlučka se svobodou"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první rozlučka se svobodou</p>
              </div>
            </div>

            {/* Foto 15 - první svatební šaty */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/15.jpg"
                  alt="první svatební šaty"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první svatební šaty</p>
              </div>
            </div>

            {/* Foto 16 - jsme kompletní */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/16.jpg"
                  alt="jsme kompletní"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">jsme kompletní</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yard Resort sekce */}
      <section id="yard-resort" className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-900 mb-6">Yard Resort</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
              Místo, kde se naše sny stanou skutečností. Historická sýpka v srdci přírody s dokonalým zázemím pro nezapomenutelnou svatbu.
            </p>
          </div>

          {/* Banner s pozadím */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-16">
            <div className="absolute inset-0">
              <Image
                src="/yard-resort-bg.jpg"
                alt="Yard Resort"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-stone-800/80"></div>
            </div>

            {/* Obsah banneru */}
            <div className="relative z-10 p-12 md:p-16 text-white text-center">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-serif font-light mb-8 tracking-wide">
                  Místo našich snů
                </h3>
                <div className="space-y-6 text-lg leading-relaxed">
                  <p className="opacity-90">
                    Toto místo jsme objevili náhodou. Míša sem vzal Aničku na narozeninový pobyt a při té příležitosti jsme zjistili, že tu dělají i svatby. Domluvili jsme se tedy přímo na místě na ukázku svatebních prostor. Okouzlila nás historická sýpka, stylové ubytování pro svatebčany a špičková gastronomie, která je pro nás jedno z hlavních kriterií. Do místa jsme se zamilovali, dál už nic nehledali a za pár měsíců podepsali rezervační smlouvu a začali řešit náš vysněný den D.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ubytování */}
          <div className="mb-16">
            <h3 className="text-3xl font-serif font-light text-stone-900 mb-8 text-center">Ubytování</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Apartmán */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src="/apartman.jpg"
                    alt="Apartmán"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h4 className="text-xl font-light text-stone-900 mb-2">Apartmán</h4>
                <p className="text-stone-600 text-sm mb-4">
                  Luxusní apartmán s kuchyňkou a obývacím pokojem. Ideální pro rodiny nebo skupiny přátel.
                </p>
                <div className="text-stone-500 text-sm">
                  <p>• 4-6 lůžek</p>
                  <p>• Kuchyňka</p>
                  <p>• Obývací pokoj</p>
                </div>
              </div>

              {/* Pokoj Standard */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src="/pokoj-standard.jpg"
                    alt="Pokoj Standard"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h4 className="text-xl font-light text-stone-900 mb-2">Pokoj Standard</h4>
                <p className="text-stone-600 text-sm mb-4">
                  Komfortní pokoje s moderním vybavením a krásným výhledem do přírody.
                </p>
                <div className="text-stone-500 text-sm">
                  <p>• 2-3 lůžka</p>
                  <p>• Vlastní koupelna</p>
                  <p>• Výhled do zahrady</p>
                </div>
              </div>

              {/* Wellness pokoj */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src="/wellness-pokoj.jpg"
                    alt="Wellness pokoj"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h4 className="text-xl font-light text-stone-900 mb-2">Wellness pokoj</h4>
                <p className="text-stone-600 text-sm mb-4">
                  Luxusní pokoj s vlastní vířivkou a saunou, ideální pro relaxaci před svatbou.
                </p>
                <div className="text-stone-500 text-sm">
                  <p>• 2 lůžka</p>
                  <p>• Vířivka</p>
                  <p>• Sauna</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-800 rounded-2xl p-6 text-center">
              <p className="text-white mb-2">
                <strong>Check-in:</strong> 14:00 | <strong>Check-out:</strong> 10:00
              </p>
              <p className="text-sm text-white/80">
                Ceny se liší podle počtu lůžek. Pro rezervaci nás kontaktujte.
              </p>
            </div>
          </div>

          {/* Mapa a doprava */}
          <div>
            <h3 className="text-3xl font-serif font-light text-stone-900 mb-8 text-center">Jak se k nám dostanete</h3>

            <div className="bg-stone-800 rounded-2xl p-8 mb-8">
              <p className="text-white leading-relaxed text-center">
                Přímo v areálu je vyhrazené parkoviště pouze pro svatebčany a také vlastní vjezd.
                Parkování je bezplatné a míst je dostatek. Jak se na parkoviště dostat můžete podrobně vidět na mapce níže:
              </p>
            </div>

            {/* Mapa */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2558.123456789!2d14.123456789!3d50.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDA3JzI0LjAiTiAxNMKwMDcnMjQuMCJF!5e0!3m2!1scs!2scz!4v1234567890123!5m2!1scs!2scz"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa - Yard Resort Předboj"
              ></iframe>
            </div>

            {/* Odkazy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="https://maps.google.com/?q=Yard+Resort+Předboj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <MapPin className="w-5 h-5 text-stone-600" />
                <span className="text-stone-900 font-medium">Otevřít v Google Maps</span>
                <ExternalLink className="w-4 h-4 text-stone-400 ml-auto" />
              </a>

              <a
                href="https://www.yard-resort.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-stone-900 font-medium">Oficiální web resortu</span>
                <ExternalLink className="w-4 h-4 text-stone-400 ml-auto" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Program sekce */}
      <section id="program" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-900 mb-6">Program</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
              Přehled toho nejdůležitějšího, co nás čeká během našeho svatebního dne. Těšíme se na každou chvíli s vámi!
            </p>
          </div>

          {/* Program list */}
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">Kanapky + welcome drink</h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">Svatební obřad</h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">Skupinové focení</h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">Přípitek + proslovy</h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">Krájení dortu</h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">Focení novomanželů + ubytování hostů</h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">Vyplétání kytice</h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">První tanec</h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">Večerní raut</h3>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-stone-600 italic">
                Mimo to pro Vás chystáme i spoustu dalších překvapení, které si zatím necháme pro sebe :)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dary sekce */}
      <section id="dary" className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-900 mb-6">Dary</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
              Vaše přítomnost je pro nás tím nejcennějším darem. Pokud nás přesto chcete obdarovat, budeme vděční za příspěvek na naše společné sny.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <Gift className="w-12 h-12 text-stone-600 mx-auto mb-6" />
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-4">Finanční příspěvek</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Pokud nás chcete podpořit, budeme vděční za finanční příspěvek, který použijeme na naše společné plány a sny.
              </p>
              <div className="bg-stone-50 rounded-xl p-6">
                <p className="text-stone-700 font-medium mb-2">Číslo účtu:</p>
                <p className="text-2xl font-mono text-stone-900 mb-4">123456789/0100</p>
                <p className="text-sm text-stone-600">
                  Variabilní symbol: 24012026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info sekce */}
      <section id="info" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-900 mb-6">Praktické informace</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
              Vše, co potřebujete vědět pro náš svatební den.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-stone-50 rounded-2xl p-8">
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-6">Dress code</h3>
              <div className="space-y-4 text-stone-600">
                <p>• <strong>Pánové:</strong> Oblek nebo sako s kalhotami</p>
                <p>• <strong>Dámy:</strong> Koktejlové šaty nebo elegantní outfit</p>
                <p>• <strong>Barvy:</strong> Vyhněte se prosím bílé a krémové</p>
                <p>• <strong>Obuv:</strong> Doporučujeme pohodlnou obuv</p>
              </div>
            </div>

            <div className="bg-stone-50 rounded-2xl p-8">
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-6">Důležité informace</h3>
              <div className="space-y-4 text-stone-600">
                <p>• <strong>Začátek:</strong> 13:30 (prosíme o dochvilnost)</p>
                <p>• <strong>Konec:</strong> Kolem 2:00 v noci</p>
                <p>• <strong>Počasí:</strong> Obřad bude venku (náhradní plán připraven)</p>
                <p>• <strong>Děti:</strong> Vítáme malé svatebčany</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP sekce */}
      <section id="rsvp" className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-900 mb-6">RSVP</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
              Prosíme o potvrzení vaší účasti do 1. prosince 2025. Těšíme se na vás!
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-6">Potvrďte svou účast</h3>

              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <Phone className="w-5 h-5 text-stone-600" />
                  <div>
                    <p className="text-stone-700 font-medium">Telefon</p>
                    <p className="text-stone-600">+420 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Mail className="w-5 h-5 text-stone-600" />
                  <div>
                    <p className="text-stone-700 font-medium">Email</p>
                    <p className="text-stone-600">svatba@example.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-stone-50 rounded-xl">
                <p className="text-stone-600 text-sm leading-relaxed">
                  Při potvrzování účasti nám prosím sdělte počet osob, případné dietní omezení
                  a zda budete potřebovat ubytování v resortu.
                </p>
              </div>

              <div className="mt-8">
                <div className="relative w-48 h-48 mx-auto">
                  <Image
                    src="/QRcode.png"
                    alt="QR kód pro RSVP"
                    fill
                    className="object-contain"
                    sizes="192px"
                  />
                </div>
                <p className="text-sm text-stone-600 mt-4">
                  Naskenujte QR kód pro rychlé potvrzení účasti
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-2xl font-serif font-light">Anna</span>
            <div className="w-px h-6 bg-white/40"></div>
            <span className="text-2xl font-serif font-light">Michal</span>
          </div>
          <p className="text-stone-400 text-sm">
            24. ledna 2026 • Yard Resort, Předboj
          </p>
        </div>
      </footer>
    </div>
  );
}
