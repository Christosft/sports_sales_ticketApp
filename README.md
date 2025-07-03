Sports Sales Ticket App
Περιεχόμενα
Περιγραφή

Προαπαιτούμενα

Περιγραφή
Η εφαρμογή αυτή είναι ένα σύστημα πώλησης εισιτηρίων για αθλητικές εκδηλώσεις, με frontend βασισμένο σε React και backend σε Node.js.

Προαπαιτούμενα
Node.js

npm 

Git

Εγκατάσταση
Κλωνοποίηση του repository:

bash
Αντιγραφή
Επεξεργασία
git clone https://github.com/Christosft/sports_sales_ticketApp.git
cd sports_sales_ticketApp
Εγκατάσταση εξαρτήσεων στο backend:

bash
Αντιγραφή
Επεξεργασία
cd server
npm install
Εγκατάσταση εξαρτήσεων στο frontend:

bash
Αντιγραφή
Επεξεργασία
cd ../client
npm install
Build και Run
Backend (Node.js)
Από το φάκελο server:

bash
Αντιγραφή
Επεξεργασία
npm run dev
ή για παραγωγή:

bash
Αντιγραφή
Επεξεργασία
npm start
Frontend (React + TypeScript)
Από το φάκελο client:

bash
Αντιγραφή
Επεξεργασία
npm start
Για build παραγωγής:

bash
Αντιγραφή
Επεξεργασία
npm run build
Git Usage
Κλωνοποίηση (Clone)
bash
Αντιγραφή
Επεξεργασία
git clone https://github.com/Christosft/sports_sales_ticketApp.git
cd sports_sales_ticketApp
Δημιουργία νέου branch
bash
Αντιγραφή
Επεξεργασία
git checkout -b feature/nea-leitoyrgia
Προσθήκη αλλαγών και commit
bash
Αντιγραφή
Επεξεργασία
git add .
git commit -m "Προσθήκη νέας λειτουργίας για τα εισιτήρια"
Push στο απομακρυσμένο repository
bash
Αντιγραφή
Επεξεργασία
git push origin feature/nea-leitoyrgia
Συγχώνευση (merge) branch
Δημιουργία Pull Request στο GitHub για συγχώνευση στο main.

Μετά την έγκριση, κάνε merge.

Testing
Unit Tests (Frontend και Backend)
Χρησιμοποιήστε το Jest για unit testing.

Εκτέλεση tests:

bash
Αντιγραφή
Επεξεργασία
npm test
Integration Tests με Postman
Δημιουργήστε collection στο Postman για τα REST APIs.

Εκτελέστε τα tests κατά την ανάπτυξη.

Deploy
Backend
Ανέβασε τον φάκελο server σε κάποιο hosting (π.χ. Heroku, AWS, DigitalOcean).

Φρόντισε να ορίσεις τις περιβαλλοντικές μεταβλητές.

Frontend
Κάνε build το frontend (npm run build).

Ανέβασε τον φάκελο build σε static hosting (π.χ. Netlify, Vercel).

Αν ο backend και frontend είναι σε διαφορετικά domains, ρύθμισε το CORS στο backend.
