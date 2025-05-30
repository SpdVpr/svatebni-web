# Svatební web Anička + Míša 💍

Moderní svatební web vytvořený v Next.js pro svatbu Aničky a Míši, která se koná 24. ledna 2026 v Yard Resort, Předboj.

## ✨ Funkce

- **Úvodní stránka** s animovaným sněžením a odpočtem do svatby
- **Interaktivní formulář** pro potvrzení účasti
- **Responzivní design** optimalizovaný pro všechna zařízení
- **Moderní animace** pomocí Framer Motion
- **Zimní téma** s elegantním designem

## 🚀 Spuštění projektu

### Lokální vývoj

```bash
# Instalace závislostí
npm install

# Spuštění vývojového serveru
npm run dev
```

Otevřete [http://localhost:3000](http://localhost:3000) v prohlížeči.

### Produkční build

```bash
# Vytvoření produkční verze
npm run build

# Spuštění produkční verze
npm start
```

## 📁 Struktura projektu

```
src/
├── app/
│   ├── page.tsx          # Úvodní stránka se sněžením
│   ├── svatba/
│   │   └── page.tsx      # Hlavní svatební stránka
│   ├── layout.tsx        # Hlavní layout
│   └── globals.css       # Globální styly
└── public/
    ├── Lilien-newborn-30.jpg  # Hlavní fotka
    └── IMG_1741.jpg           # Další fotka
```

## 🎨 Design

- **Fonty**: Playfair Display (serif) + Inter (sans-serif)
- **Barvy**: Zimní paleta - modrá, zelená, zlatá, stříbrná
- **Animace**: Sněžení, plynulé přechody, hover efekty
- **Responzivní**: Optimalizováno pro mobily, tablety i desktop

## 📱 Sekce webu

1. **Úvodní stránka** - Sněžení, odpočet, základní info
2. **Program dne** - Časový harmonogram a doprovodný program
3. **Potvrzení účasti** - Formulář s dietními omezeními
4. **Důležité detaily** - Dress code, dárky, ubytování, mapa
5. **O nás** - Příběh páru a fotogalerie
6. **Praktické věci** - Playlist, kontakty

## 🚀 Deployment na Vercel

1. Pushněte kód na GitHub
2. Připojte repository na [Vercel](https://vercel.com)
3. Vercel automaticky nasadí web na produkční URL

## 🛠️ Technologie

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animace
- **Lucide React** - Ikony

## 📝 Customizace

### Změna obsahu
- Upravte texty v `src/app/svatba/page.tsx`
- Přidejte vlastní fotky do `public/` složky
- Upravte barvy v Tailwind třídách

### Přidání nových sekcí
- Vytvořte novou komponentu v `svatba/page.tsx`
- Přidejte ji do navigace v `sections` array

## 💡 Tipy

- Obrázky optimalizujte před nahráním (WebP formát)
- Testujte na různých zařízeních
- Použijte Google Analytics pro sledování návštěvnosti

## 📞 Podpora

Pro technické dotazy kontaktujte vývojáře nebo vytvořte issue na GitHubu.

---

Vytvořeno s ❤️ pro Aničku a Míšu
