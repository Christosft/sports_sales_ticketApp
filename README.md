# 🏟️ Sports Sales Ticket App

Ένα πλήρες σύστημα πώλησης εισιτηρίων για αθλητικές εκδηλώσεις. Το frontend είναι υλοποιημένο με **React + TypeScript**, ενώ το backend με **Node.js + Express** και **MySQL**.

> Το σύνολο του project αναπτύχθηκε, τρέχη και ετέλεσε εξολοκληρρωμένα στο **WebStorm**, της JetBrains.

---

## 🔧 Προαπαιτούμενα

📅 Πριν ξεκινήσεις, βεβαίωσου ότι έχεις εγκατεστημένα:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

---

## 🚀 Εγκατάσταση

1. **Κλωνολόγησε το repository:**

```bash
git clone https://github.com/Christosft/sports_sales_ticketApp.git
cd sports_sales_ticketApp
```

2. **Εγκατάσταση εξαρτήσεων Backend:**

```bash
cd server
npm install
```

3. **Εγκατάσταση εξαρτήσεων Frontend:**

```bash
cd ../client
npm install
```

---

## 🏁 Εκκίνηση εφαρμογής

### ✅ Backend (Node.js):

Από τον φάκελο `server`:

- Ανάπτυξη:

```bash
npm run dev
```

- Παραγωγή:

```bash
npm start
```

### 💻 Frontend (React + TypeScript):

Από τον φάκελο `client`:

- Ανάπτυξη:

```bash
npm start
```

- Build για παραγωγή:

```bash
npm run build
```

---

## 🔀 Git Workflow

### Κλωνολόγηση:

```bash
git clone https://github.com/Christosft/sports_sales_ticketApp.git
cd sports_sales_ticketApp
```

### Δημιουργία νέου branch:

```bash
git checkout -b feature/nea-leitoyrgia
```

### Commit και Push αλλαγών:

```bash
git add .
git commit -m "Προσθήκη νέας λειτουργίας για τα εισιτήρια"
git push origin feature/nea-leitoyrgia
```

### Merge:

1. Δημιουργία **Pull Request** στο GitHub.
2. Μετά την έγκριση, κάνε merge στο `main`.

---

## 🧪 Testing

### Unit Tests (Frontend & Backend)

Χρησιμοποιείται το **Jest**.

```bash
npm test
```

### Integration Tests με Postman

- Δημιούργησε collection στο Postman για τα REST APIs.
- Εκτελείς τα tests κατά τη διάρκεια ανάπτυξης.

---

## 🌐 Deploy

### Backend:

- Κάνε upload το φάκελο `server` σε πλατφόρμα όπως:
  - Heroku
  - AWS
  - DigitalOcean
- Όρισε τις **περιβαλλοντικές μεταβλητές** (.env)

### Frontend:

- Εκτέλεσε build:

```bash
npm run build
```

> ⚠️ Αν backend & frontend βρίσκονται σε διαφορετικά domains, φρόντισε να ρυθμίσεις κατάλληλα το **CORS** στο backend.

---

