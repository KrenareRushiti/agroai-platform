const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

let db;

// Initialize SQLite Database
(async () => {
    db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
    console.log('🚀 Connected to SQLite Database (AgroAgro AI)');

    // Temporarily drop tables to rebuild schema exactly
    // Temporarily drop tables to rebuild schema exactly
    await db.exec(`
        DROP TABLE IF EXISTS Orders;
        DROP TABLE IF EXISTS Inquiries;

        CREATE TABLE IF NOT EXISTS Orders (
            _id INTEGER PRIMARY KEY AUTOINCREMENT,
            droneId INTEGER,
            droneName TEXT,
            customerName TEXT NOT NULL,
            customerEmail TEXT NOT NULL,
            customerPhone TEXT,
            address TEXT,
            company TEXT,
            orderType TEXT NOT NULL,
            price TEXT,
            duration TEXT,
            startDate TEXT,
            purpose TEXT,
            idNumber TEXT,
            termsAccepted BOOLEAN,
            status TEXT DEFAULT 'Pending',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS Inquiries (
            _id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            subject TEXT,
            message TEXT NOT NULL,
            farmSize TEXT,
            status TEXT DEFAULT 'New',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
})();

// Middleware
app.use(cors());
app.use(express.json());

// ============= KNOWLEDGE BASE =============
const knowledgeBase = {
    drones: [
        {
            id: 1, name: 'AeroScout X1', price: 4999, category: 'Monitoring',
            battery: '45 min', coverage: '500 acres', aiEngine: 'GPT Vision',
            description: 'Flagship crop monitoring drone with advanced AI computer vision.',
            useCases: ['Crop Health Analysis', 'Disease Detection', 'Growth Tracking', 'NDVI Mapping']
        },
        {
            id: 2, name: 'AgroSpray Pro', price: 12499, category: 'Spraying',
            battery: '35 min', coverage: '300 acres/hr', aiEngine: 'Spray AI',
            description: 'AI-controlled precision spraying system for targeted chemical application.',
            useCases: ['Precision Pesticide Spraying', 'Fertilizer Distribution', 'Weed Control']
        },
        {
            id: 3, name: 'TerraScan Elite', price: 8999, category: 'Mapping',
            battery: '55 min', coverage: '1000 acres', aiEngine: 'MapAI Pro',
            description: 'Ultra-high-resolution field mapping with AI-powered analytics.',
            useCases: ['Topographic Mapping', 'Irrigation Monitoring', 'Water Stress Detection', 'Yield Prediction']
        },
        {
            id: 4, name: 'HarvestGuard Max', price: 24999, category: 'Enterprise',
            battery: '60 min', coverage: '5000 acres', aiEngine: 'FleetAI',
            description: 'Enterprise multi-drone fleet management solution.',
            useCases: ['Full Farm Automation', 'Fleet Management', 'Comprehensive Analytics', 'Livestock Monitoring']
        }
    ],
    pricing: {
        starter: { name: 'Starter', price: 299, period: 'month', coverage: '100 acres' },
        professional: { name: 'Professional', price: 799, period: 'month', coverage: '500 acres' },
        enterprise: { name: 'Enterprise', price: 1999, period: 'month', coverage: 'Unlimited' },
    },
    company: {
        name: 'AeroAgro AI',
        mission: 'Empowering modern agriculture with AI-powered drone technology.',
        founded: 2020,
        hq: 'San Jose, CA',
        employees: '50+',
        countries: 15,
        acresMonitored: '2M+'
    }
};

// ============= AI CHAT ENDPOINT =============
const getAIResponse = (message) => {
    const lower = message.toLowerCase();

    if (lower.match(/drone|product|model|fleet|dron|produkt/)) {
        const droneList = knowledgeBase.drones.map(d =>
            `• ${d.name} (€${d.price.toLocaleString()}) - ${d.description}`
        ).join('\n');
        return `Këtu janë dronët tanë të fuqizuar nga AI:\n\n${droneList}\n\nCili ju intereson?`;
    }

    if (lower.match(/price|pricing|cost|plan|çmim|pagesë/)) {
        const plans = Object.values(knowledgeBase.pricing).map(p =>
            `• ${p.name}: €${p.price}/${p.period} (${p.coverage})`
        ).join('\n');
        return `Planet tona të çmimeve:\n\n${plans}\n\nÇdo plan përfshin një provë falas 14-ditore!`;
    }

    if (lower.match(/recommend|suggest|best|which|rekomando|sugjero/)) {
        return "Do të dëshironim t'ju ndihmonim! Mund të ndanit:\n1. Madhësinë e fermës suaj (në akra)?\n2. Nevojën kryesore (monitorim, spërkatje, hartëzim, etj.)?";
    }

    if (lower.match(/small|under 100|vogël/)) {
        return `Për ferma më të vogla, unë rekomandoj AeroScout X1 (€4,999) me Planin tonë Fillestar (€299/muaj). I shkëlqyer për monitorimin e të mbjellave deri në 100 akra.`;
    }

    if (lower.match(/medium|100.*500|mesatar/)) {
        return `Për ferma të mesme, Plani Profesional (€799/muaj) me AeroScout X1 + AgroSpray Pro është ideal. Analitikë e plotë e AI dhe spërkatje precize deri në 500 akra.`;
    }

    if (lower.match(/large|enterprise|big|500|madhe/)) {
        return `Për operacione të mëdha, Plani ynë i Ndërmarrjes (€1,999/muaj) me HarvestGuard Max mbështet deri në 5 dronë të koordinuar, plus mbështetje të dedikuar.`;
    }

    if (lower.match(/demo|book|schedule|rezervo/)) {
        return "Rezervoni një demo përmes faqes sonë të Kontaktit ose na telefononi në +383 44 123 456. Ne ofrojmë demo falas!";
    }

    if (lower.match(/hello|hi|hey|përshëndetje|tung/)) {
        return "Përshëndetje! 👋 Unë jam AeroBot, asistenti juaj i bujqësisë AI. Mund t'ju ndihmoj me informacion për dronët, rekomandime, çmime dhe rezervime. Çfarë dëshironi të dini?";
    }

    return "Unë mund t'ju ndihmoj me:\n• Produkte dhe specifika dronësh\n• Plane çmimesh\n• Rekomandime për fermën tuaj\n• Rezervime demo\n\nÇfarë ju intereson?";
};

app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const response = getAIResponse(message);
    res.json({ response, timestamp: new Date().toISOString() });
});

// ============= DRONES API =============
app.get('/api/drones', (req, res) => {
    res.json(knowledgeBase.drones);
});

app.get('/api/drones/:id', (req, res) => {
    const drone = knowledgeBase.drones.find(d => d.id === parseInt(req.params.id));
    if (!drone) return res.status(404).json({ error: 'Drone not found' });
    res.json(drone);
});

// ============= PRICING API =============
app.get('/api/pricing', (req, res) => {
    res.json(knowledgeBase.pricing);
});

// ============= CONTACT/INQUIRY ENDPOINT =============
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, subject, message, farmSize } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    try {
        const result = await db.run(
            'INSERT INTO Inquiries (name, email, phone, subject, message, farmSize) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, phone, subject, message, farmSize]
        );
        res.status(201).json({ success: true, message: 'Inquiry received!', id: result.lastID });
    } catch (err) {
        console.error('Contact error:', err);
        res.status(500).json({ error: 'Database error while saving inquiry' });
    }
});

app.get('/api/inquiries', async (req, res) => {
    try {
        const data = await db.all('SELECT * FROM Inquiries ORDER BY createdAt DESC');
        res.json(data);
    } catch (err) {
        console.error('Inquiries GET error:', err);
        res.status(500).json({ error: 'Database error while fetching inquiries' });
    }
});

// ============= ORDERS ENDPOINT =============
app.post('/api/orders', async (req, res) => {
    const { droneId, droneName, customerName, customerEmail, customerPhone, address, company, orderType, price, duration, startDate, purpose, idNumber, termsAccepted } = req.body;

    if (!droneId || !customerEmail || !orderType || !address) {
        return res.status(400).json({ error: 'Missing required order details' });
    }

    try {
        const result = await db.run(
            'INSERT INTO Orders (droneId, droneName, customerName, customerEmail, customerPhone, address, company, orderType, price, duration, startDate, purpose, idNumber, termsAccepted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [droneId, droneName, customerName, customerEmail, customerPhone, address, company, orderType, price, duration, startDate, purpose, idNumber, termsAccepted]
        );
        res.status(201).json({
            success: true,
            message: orderType === 'buy' ? 'Porosia u krye me sukses!' : 'Rezervimi i qerasë u krye!',
            orderId: result.lastID
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gabim gjatë procesimit të porosisë' });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const data = await db.all('SELECT * FROM Orders ORDER BY createdAt DESC');
        res.json(data);
    } catch (err) {
        console.error('Orders GET error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ============= DELETE ENDPOINTS (Helper for Admin Dashboard if needed) =============
app.delete('/api/orders/:id', async (req, res) => {
    try {
        await db.run('DELETE FROM Orders WHERE _id = ?', req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete' });
    }
});

app.delete('/api/inquiries/:id', async (req, res) => {
    try {
        await db.run('DELETE FROM Inquiries WHERE _id = ?', req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete' });
    }
});

// ============= NEWSLETTER =============
const subscribers = [];

app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    if (subscribers.includes(email)) {
        return res.json({ message: 'Already subscribed!' });
    }

    subscribers.push(email);
    res.status(201).json({ success: true, message: 'Subscribed successfully!' });
});

// ============= COMPANY INFO =============
app.get('/api/company', (req, res) => {
    res.json(knowledgeBase.company);
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 AeroAgro AI Server running on port ${PORT}`);
});
