# AgroAI Platform 🚀

Platformë e fuqizuar nga Inteligjenca Artificiale për bujqësi precize me dronë.

## 🌟 Karakteristikat
- **AeroBot AI:** Asistent inteligjent për rekomandime dhe çmime.
- **Menaxhimi i Flotës:** Monitorim dhe spërkatje me precizion.
- **Ndërfaqe Moderne:** Dizajn i shpejtë dhe i përgjegjshëm (responsive).

## 🚀 Si ta hapësh në localhost (në çdo kompjuter)
Nëse dëshiron ta hapësh projektin nga GitHub në një kompjuter tjetër, ndiq këto hapa:

1. **Klononi projektin:**
   ```bash
   git clone https://github.com/KrenareRushiti/agroai-platform.git
   cd agroai-platform
   ```

2. **Instaloni varësitë (Dependencies):**
   - Për Serverin:
     ```bash
     cd server
     npm install
     ```
   - Për Klientin (Frontend):
     ```bash
     cd ../client
     npm install
     ```

3. **Nisni projektin:**
   - Hapni një terminal te `server` dhe shkruani: `npm start`
   - Hapni një terminal tjetër te `client` dhe shkruani: `npm run dev`
   - Uebsajti do të hapet në: [http://localhost:5173/](http://localhost:5173/)

## 🌐 Live Demo (Me Link)
Për ta hapur uebsajtin **direkt me link** pa instaluar asgjë (si p.sh. në Vercel ose Netlify), duhet të bëni **Deployment**.

### Hapat për Deployment (Vercel):
1. Shkoni te [Vercel.com](https://vercel.com).
2. Lidheni llogarinë tuaj të GitHub.
3. Importoni këtë projekt (`agroai-platform`).
4. Zgjidhni folderin `client` si "Root Directory".
5. Klikoni **Deploy**.
6. Pasi të përfundojë, Vercel do t'ju japë një **Link Publik** (p.sh. `agroai-platform.vercel.app`).

### Hapat për Backend (Render):
1. Shkoni te [Render.com](https://render.com).
2. Krijoni një "Web Service" të ri.
3. Lidheni me GitHub dhe zgjidhni folderin `server`.
4. Ai do të jetë linku i API-së tuaj live.

---
Zhvilluar nga **Krenare Rushiti** 🇦🇱
