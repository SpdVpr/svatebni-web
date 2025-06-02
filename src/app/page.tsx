'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { MapPin, Heart, Gift, ExternalLink } from "lucide-react";

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
    { href: '#info', label: 'Dress Code' },
    { href: '#rsvp', label: 'Účast' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-serif font-light text-stone-900">Anička</span>
            <div className="w-px h-4 bg-stone-400"></div>
            <span className="text-xl font-serif font-light text-stone-900">Michal</span>
          </div>

          {/* Desktop menu */}
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

          {/* Datum */}
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
                Na Míšovi miluji spoustu věcí, ale hlavně jeho neustálou pozitivitu a nadhled. No a když mi poprvé uvařil, už nebylo cesty zpět :D. On je ten, co mě motivuje být lepším člověkem a nemít malé cíle. Míša je moje bezpečné místo - člověk, na kterého se mohu spolehnout, člověk, který mi vždy se vším pomůže a splní každou blbost, kterou si na něj vymyslím :). Je taky naprosto nejlepší táta pro naši Lilinku a jsem nekonečně vděčná, že je právě on jejím mužským vzorem.
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

            {/* Foto 5 - první KVIFF */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/5.jpg"
                  alt="první KVIFF"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první KVIFF</p>
              </div>
            </div>

            {/* Foto 6 - první svatbování */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/6.jpg"
                  alt="první svatbování"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první svatbování</p>
              </div>
            </div>

            {/* Foto 7 - první lanka */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/7.jpg"
                  alt="první lanka"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první lanka</p>
              </div>
            </div>

            {/* Foto 8 - první výlet za hranice */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/8.jpg"
                  alt="první výlet za hranice"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první výlet za hranice</p>
              </div>
            </div>

            {/* Foto 9 - první dovolená */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/9.jpg"
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

            {/* Foto 10 - první bruslení */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/10.jpg"
                  alt="první bruslení"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">první bruslení</p>
              </div>
            </div>

            {/* Foto 11 - první Vánoce */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/11.jpg"
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

            {/* Foto 12 - první Silvestr */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/12.jpg"
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

            {/* Foto 13 - budeme tři */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/13.jpg"
                  alt="budeme tři"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">budeme tři</p>
              </div>
            </div>

            {/* Foto 14 - je to holčička */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/14.jpg"
                  alt="je to holčička"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">je to holčička</p>
              </div>
            </div>

            {/* Foto 15 - řekla ANO */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/15.jpg"
                  alt="řekla ANO"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center">
                <p className="text-white text-sm font-semibold">řekla ANO</p>
              </div>
            </div>

            {/* Foto 16 - nová fotka */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/3] relative">
                <Image
                  src="/fotky-chronologicky/16.jpg"
                  alt="naše budoucnost"
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

          {/* Poznámka */}
          <div className="text-center mt-12">
            <p className="text-stone-500 italic">
              Naše společná cesta od kamarádství k lásce a rodině ❤️
            </p>
          </div>
        </div>
      </section>

      {/* Yard Resort sekce */}
      <section id="yard-resort" className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-900 mb-6">Yard Resort</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed max-w-4xl mx-auto font-serif italic">
              Yard Resort se nachází pouze 15 min od pražských Letňan a 20 min od Brandýsa nad Labem. Celá událost se bude odehrávat uvnitř, takže se nemusíte obávat, že budete mrznout nebo zbytečně nakupovat nové zimní svršky.
            </p>
          </div>

          {/* Fotky Yard Resort */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Hlavní foto resortu */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/yard1.jpg"
                  alt="Yard Resort - exteriér"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Zahrada s rybníkem */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/yard2.jpg"
                  alt="Yard Resort - zahrada s rybníkem"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Hlavní banner s informacemi */}
          <div className="relative mb-16">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-stone-800"
              style={{
                minHeight: '400px'
              }}
            >
              {/* Overlay pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
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
          </div>

          {/* Ubytování */}
          <div className="mb-16">
            <h3 className="text-2xl font-serif font-light text-stone-900 mb-8 text-center">Ubytování</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Wellness pokoj */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/Yard/wellness2.jpg"
                    alt="Wellness pokoj"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-light text-stone-900 mb-3">Wellness</h4>
                  <p className="text-stone-600 mb-4 text-sm">
                    Luxusní pokoj s vlastní wellness zónou, ideální pro relaxaci před svatbou.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-stone-900">3 700 Kč</span>
                    <span className="text-sm text-stone-500">za noc</span>
                  </div>
                </div>
              </div>

              {/* Standard pokoj */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/Yard/standard2.jpg"
                    alt="Standard pokoj"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-light text-stone-900 mb-3">Standard</h4>
                  <p className="text-stone-600 mb-4 text-sm">
                    Komfortní pokoje s moderním vybavením, různé velikosti podle počtu lůžek.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-stone-900">2 100 - 3 300 Kč</span>
                    <span className="text-sm text-stone-500">za noc</span>
                  </div>
                </div>
              </div>

              {/* Deluxe pokoj */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/Yard/deluxe2.jpg"
                    alt="Deluxe pokoj"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-light text-stone-900 mb-3">Deluxe</h4>
                  <p className="text-stone-600 mb-4 text-sm">
                    Prostorné pokoje s vyšším standardem vybavení a elegantním designem.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-stone-900">2 500 - 4 700 Kč</span>
                    <span className="text-sm text-stone-500">za noc</span>
                  </div>
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

          {/* Kde ho najdete */}
          <div className="mb-16">
            <h3 className="text-2xl font-serif font-light text-stone-900 mb-8 text-center">Kde ho najdete?</h3>
            <div className="relative mb-8">
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl" style={{ height: '400px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2558.8!2d14.475775!3d50.223407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470c0b5b5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sYard%20Resort%2C%20Ke%20Tvrzi%207%2C%20250%2072%20P%C5%99edboj!5e0!3m2!1scs!2scz!4v1735739123456!5m2!1scs!2scz"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Yard Resort - Ke Tvrzi 7, 250 72 Předboj"
                ></iframe>
              </div>
            </div>


          </div>

          {/* Parkoviště */}
          <div className="mb-16">
            <div className="bg-stone-800 rounded-2xl p-8 mb-8">
              <p className="text-white leading-relaxed text-center">
                Přímo v areálu je vyhrazené parkoviště pouze pro svatebčany a také vlastní vjezd.
                Parkování je bezplatné a míst je dostatek. Jak se na parkoviště dostat můžete podrobně vidět na mapce níže:
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/Yard/vjezd.jpg"
                  alt="Mapa vjezdu na parkoviště"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 100vw"
                />
              </div>
            </div>
          </div>

          {/* Odkazy */}
          <div className="text-center">
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://www.yardresort.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-stone-200 hover:border-stone-400 rounded-xl text-stone-700 hover:text-stone-900 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
                Oficiální web resortu
              </a>

              <a
                href="https://www.google.com/maps/place/Ke+Tvrzi+7,+250+72+P%C5%99edboj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-stone-200 hover:border-stone-400 rounded-xl text-stone-700 hover:text-stone-900 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <MapPin className="w-4 h-4" />
                Otevřít v Google Maps
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
              Na co se můžete během našeho svatebního dne těšit?
            </p>
          </div>

          {/* Program list */}
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">Kanapky a welcome drink</h3>
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
                <h3 className="text-lg font-light text-stone-900">Přípitek a proslovy</h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">Krájení dortu</h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">Focení novomanželů</h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">První tanec</h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">Vyplétání kytice</h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">Večerní raut</h3>
              </div>
				<div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                <h3 className="text-lg font-light text-stone-900">Párty</h3>
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
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-12 shadow-lg">
              <div className="mb-8">
                <Gift className="w-16 h-16 text-stone-400 mx-auto mb-6" />
              </div>
              <div className="text-xl text-stone-600 leading-relaxed space-y-4">
                <p>
                  Největším darem pro nás bude, když tento den oslavíte s námi. Pokud byste nás ale chtěli potěšit ještě trochu více, rádi uvítáme finanční příspěvek, který nám pomůže splnit naše společné sny.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info sekce - Dress Code */}
      <section id="info" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-900 mb-6">Dress Code</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mb-8"></div>
            <p className="text-lg italic text-stone-600 leading-relaxed max-w-2xl mx-auto font-serif">
              Prosíme, slaďte se s námi do schématu naší svatby a přijďte formálně oblečeni v jedné z těchto barev:
            </p>
          </div>

          {/* Barevná paleta */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Tmavě zelená */}
            <div className="text-center">
              <h4 className="text-lg font-light text-stone-900 mb-6">Tmavě zelená</h4>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: '#1f4f3f' }}></div>
                <p className="text-sm text-stone-600">jako voňavé jehličí</p>
              </div>
            </div>

            {/* Světle hnědá */}
            <div className="text-center">
              <h4 className="text-lg font-light text-stone-900 mb-6">Světle hnědá</h4>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: '#8b6f47' }}></div>
                <p className="text-sm text-stone-600">jako teplé kakao</p>
              </div>
            </div>

            {/* Světle šedá */}
            <div className="text-center">
              <h4 className="text-lg font-light text-stone-900 mb-6">Světle šedá</h4>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: '#c4c4c4' }}></div>
                <p className="text-sm text-stone-600">jako sněhové vločky</p>
              </div>
            </div>
          </div>

          {/* Druhá řada barev */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 max-w-2xl mx-auto">
            {/* Tmavě hnědá */}
            <div className="text-center">
              <h4 className="text-lg font-light text-stone-900 mb-6">Tmavě hnědá</h4>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: '#4a3429' }}></div>
                <p className="text-sm text-stone-600">jako popadané šišky</p>
              </div>
            </div>

            {/* Tmavě šedá */}
            <div className="text-center">
              <h4 className="text-lg font-light text-stone-900 mb-6">Tmavě šedá</h4>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: '#6b6b6b' }}></div>
                <p className="text-sm text-stone-600">jako zamrzlé jezero</p>
              </div>
            </div>
          </div>

          {/* Poznámka pro pány */}
          <div className="text-center mb-16">
            <p className="text-sm text-stone-500 italic">+ černá barva pro pány</p>
          </div>

          {/* Galerie inspirace */}
          <div className="mb-16">
            <h3 className="text-2xl font-serif font-light text-stone-900 mb-8 text-center">Inspirace pro váš outfit</h3>

            {/* Tmavě zelená inspirace */}
            <div className="mb-12">
              <h4 className="text-lg font-light text-stone-900 mb-6 text-center">Tmavě zelená</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/11.jpg"
                      alt="Tmavě zelená inspirace 1"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Elegantní tmavě zelená</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/2.jpg"
                      alt="Tmavě zelená inspirace 2"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Formální tmavě zelená</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/3.jpg"
                      alt="Tmavě zelená inspirace 3"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Stylová tmavě zelená</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Světle hnědá inspirace */}
            <div className="mb-12">
              <h4 className="text-lg font-light text-stone-900 mb-6 text-center">Světle hnědá</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/svetlehneda1.jpg"
                      alt="Světle hnědá inspirace 1"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Elegantní světle hnědá</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/svetlehneda2.jpg"
                      alt="Světle hnědá inspirace 2"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Formální světle hnědá</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/svetlehneda3.jpg"
                      alt="Světle hnědá inspirace 3"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Stylová světle hnědá</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Světle šedá inspirace */}
            <div className="mb-12">
              <h4 className="text-lg font-light text-stone-900 mb-6 text-center">Světle šedá</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/svetleseda1.jpg"
                      alt="Světle šedá inspirace 1"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Elegantní světle šedá</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/svetleseda2.jpg"
                      alt="Světle šedá inspirace 2"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Formální světle šedá</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/svetleseda3.jpg"
                      alt="Světle šedá inspirace 3"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Stylová světle šedá</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tmavě hnědá inspirace */}
            <div className="mb-12">
              <h4 className="text-lg font-light text-stone-900 mb-6 text-center">Tmavě hnědá</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/tmavehneda1.jpg"
                      alt="Tmavě hnědá inspirace 1"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Elegantní tmavě hnědá</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/tmavehneda2.jpg"
                      alt="Tmavě hnědá inspirace 2"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Formální tmavě hnědá</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/tmavehneda3.jpg"
                      alt="Tmavě hnědá inspirace 3"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Stylová tmavě hnědá</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tmavě šedá inspirace */}
            <div className="mb-12">
              <h4 className="text-lg font-light text-stone-900 mb-6 text-center">Tmavě šedá</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/tmaveseda1.jpg"
                      alt="Tmavě šedá inspirace 1"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Elegantní tmavě šedá</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/tmaveseda2.jpg"
                      alt="Tmavě šedá inspirace 2"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Formální tmavě šedá</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/dress/tmaveseda3.jpg"
                      alt="Tmavě šedá inspirace 3"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">Stylová tmavě šedá</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP sekce */}
      <section id="rsvp" className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-900 mb-6">Potvrzení účasti</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
              Budeme rádi, když nám zde co nejdříve potvrdíte svou účast. Pokud se nebudete moct zúčastnit, tak nám prosím dejte rovněž vědět prostřednictvím formuláře níže.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <form className="space-y-8">
                {/* Jména */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-3">
                      Vaše jméno
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all duration-200"
                      placeholder="Vaše jméno a příjmení"
                    />
                  </div>
                  <div>
                    <label htmlFor="companion" className="block text-sm font-medium text-stone-700 mb-3">
                      Jméno doprovodu
                    </label>
                    <input
                      type="text"
                      id="companion"
                      name="companion"
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all duration-200"
                      placeholder="Jméno a příjmení doprovodu"
                    />
                  </div>
                </div>

                {/* Děti */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-4">
                    Bereme s sebou děti
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="children"
                        value="yes"
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-400"
                      />
                      <span className="ml-3 text-stone-700">Ano</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="children"
                        value="no"
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-400"
                      />
                      <span className="ml-3 text-stone-700">Ne</span>
                    </label>
                  </div>
                </div>

                {/* Účast */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-4">
                    Zúčastním se
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attendance"
                        value="ceremony"
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-400"
                      />
                      <span className="ml-3 text-stone-700">Obřadu</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attendance"
                        value="reception"
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-400"
                      />
                      <span className="ml-3 text-stone-700">Hostiny</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attendance"
                        value="party"
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-400"
                      />
                      <span className="ml-3 text-stone-700">Večerní párty</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attendance"
                        value="all"
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-400"
                      />
                      <span className="ml-3 text-stone-700">Celé svatby</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attendance"
                        value="none"
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-400"
                      />
                      <span className="ml-3 text-stone-700">Vůbec se nezúčastním</span>
                    </label>
                  </div>
                </div>



                {/* Ubytování */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-4">
                    Mám zájem o ubytování
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="accommodation"
                        value="yes"
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-400"
                      />
                      <span className="ml-3 text-stone-700">Ano</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="accommodation"
                        value="no"
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-400"
                      />
                      <span className="ml-3 text-stone-700">Ne</span>
                    </label>
                  </div>
                </div>

                {/* Poznámka */}
                <div>
                  <label htmlFor="note" className="block text-sm font-medium text-stone-700 mb-3">
                    Poznámka
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    rows={4}
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Pokud jste vegani, máte alergie nebo jakékoli speciální požadavky, napište nám to zde..."
                  ></textarea>
                </div>

                {/* Tlačítko */}
                <div className="text-center pt-6">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-stone-800 hover:bg-stone-900 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Heart className="w-5 h-5" />
                    Potvrdit účast
                  </button>
                </div>
              </form>

              {/* Poznámka pod formulářem */}
              <div className="mt-8 pt-8 border-t border-stone-200">
                <p className="text-stone-500 text-sm text-center leading-relaxed">
                  Formulář prosím vyplňte i za svého partnera, abychom mohli lépe naplánovat případné ubytování a menu na hostinu.
                  <br />
                  Děkujeme a už se na Vás moc těšíme! ❤️
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