# 📧 Nastavení EmailJS pro odesílání formuláře

Formulář je připraven pro odesílání emailů na `annmayerova@gmail.com` pomocí EmailJS. Pro zprovoznění je potřeba dokončit nastavení:

## 🚀 Kroky pro nastavení:

### 1. Registrace na EmailJS
1. Jděte na [https://www.emailjs.com/](https://www.emailjs.com/)
2. Zaregistrujte se (zdarma - 200 emailů/měsíc)
3. Přihlaste se do dashboard

### 2. Vytvoření Email Service
1. V dashboard klikněte na **"Email Services"**
2. Klikněte **"Add New Service"**
3. Vyberte **Gmail** (nebo jiný email provider)
4. Zadejte:
   - **Service ID:** `service_svatba`
   - **Service Name:** `Svatební formulář`
   - **Email:** `annmayerova@gmail.com`
5. Autorizujte Gmail účet
6. Uložte service

### 3. Vytvoření Email Template
1. V dashboard klikněte na **"Email Templates"**
2. Klikněte **"Create New Template"**
3. Zadejte:
   - **Template ID:** `template_svatba`
   - **Template Name:** `Potvrzení účasti na svatbu`

### 4. Nastavení Template obsahu:
```
Subject: Nové potvrzení účasti na svatbu - {{from_name}}

Ahoj Anička a Michale!

Máte nové potvrzení účasti na svatbu:

👤 Jméno: {{from_name}}
👥 Doprovod: {{companion_name}}
✅ Účast: {{attendance}}
👶 Děti: {{children}}
🏨 Ubytování: {{accommodation}}

📝 Poznámka:
{{note}}

---
Odesláno ze svatebního webu
```

### 5. Získání Public Key
1. V dashboard jděte na **"Account"** → **"General"**
2. Zkopírujte **Public Key**

### 6. Aktualizace kódu ✅ HOTOVO
Kód je už aktualizován s vašimi klíči:
```javascript
await emailjs.send(
  'service_svatba', // ✅ Service ID
  'template_svatba', // ✅ Template ID
  templateParams,
  '5gUZ3nurvCX404Ret' // ✅ Váš Public Key
);
```

**Vaše klíče:**
- **Public Key:** `5gUZ3nurvCX404Ret` ✅
- **Private Key:** `8Mi6as5xscrlxHWYaFoSZ` (pro EmailJS dashboard)

### 7. Testování
1. Uložte změny a pushněte na GitHub
2. Počkejte na deploy na Vercel
3. Otestujte formulář na živém webu

## 🔧 Alternativní řešení (jednodušší):

Pokud nechcete nastavovat EmailJS, mohu implementovat **Formspree**:
1. Jednodušší nastavení
2. Stačí email adresa
3. Automatické odesílání na `annmayerova@gmail.com`

## 📞 Potřebujete pomoc?
Pokud máte problémy s nastavením, napište mi a pomohu s konfigurací!
