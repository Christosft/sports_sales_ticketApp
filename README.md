🏟️ Sports Sales Ticket App

Ένα πλήρες σύστημα πώλησης εισιτηρίων για αθλητικές εκδηλώσεις. Το frontend είναι υλοποιημένο με React + TypeScript, ενώ το backend με Node.js + Express και MySQL.

Το σύνολο του project αναπτύχθηκε, εκτελείται και συντηρείται εξ ολοκλήρου στο WebStorm της JetBrains.

🔧 Προαπαιτούμενα

📅 Πριν ξεκινήσεις, βεβαιώσου ότι έχεις εγκατεστημένα:
- Node.js: https://nodejs.org/
- npm: https://www.npmjs.com/
- Git: https://git-scm.com/

🚀 Εγκατάσταση

1. Κλωνοποίησε το repository:
    git clone https://github.com/Christosft/sports_sales_ticketApp.git
    cd sports_sales_ticketApp

2. Εγκατάσταση εξαρτήσεων backend:
    cd server
    npm install

3. Εγκατάσταση εξαρτήσεων frontend:
    cd ../client
    npm install

🏁 Εκκίνηση εφαρμογής

✅ Backend (Node.js):
    Ανάπτυξη: npm run dev
    Παραγωγή: npm start

💻 Frontend (React + TypeScript):
    Ανάπτυξη: npm start
    Build για παραγωγή: npm run build

🔀 Git Workflow

Κλωνοποίηση:
    git clone https://github.com/Christosft/sports_sales_ticketApp.git
    cd sports_sales_ticketApp

Δημιουργία νέου branch:
    git checkout -b feature/nea-leitourgia

Commit και Push αλλαγών:
    git add .
    git commit -m "Προσθήκη νέας λειτουργίας για τα εισιτήρια"
    git push origin feature/nea-leitourgia

Merge:
    1. Δημιουργία Pull Request στο GitHub.
    2. Μετά την έγκριση, κάνε merge στο main.

🧪 Testing

Unit Tests (Frontend & Backend): npm test

Integration Tests με Postman:
- Δημιούργησε συλλογή στο Postman για τα REST APIs.
- Εκτέλεσε τα tests κατά την ανάπτυξη.

🌐 Deploy

Backend:
- Κάνε upload τον φάκελο server σε πλατφόρμα όπως Heroku, AWS ή DigitalOcean.
- Όρισε τις περιβαλλοντικές μεταβλητές στο αρχείο .env.

Frontend:
- Εκτέλεσε build: npm run build
- Φιλοξένησέ το σε Vercel, Netlify ή σε δικό σου server.

⚠️ Αν backend & frontend βρίσκονται σε διαφορετικά domains, φρόντισε να ρυθμίσεις κατάλληλα το CORS στο backend.
