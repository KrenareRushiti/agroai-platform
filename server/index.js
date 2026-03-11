const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

    if (lower.match(/drone|product|model|fleet/)) {
        const droneList = knowledgeBase.drones.map(d =>
            `• ${d.name} ($${d.price.toLocaleString()}) - ${d.description}`
        ).join('\n');
        return `Here are our AI-powered drones:\n\n${droneList}\n\nWhich one interests you?`;
    }

    if (lower.match(/price|pricing|cost|plan/)) {
        const plans = Object.values(knowledgeBase.pricing).map(p =>
            `• ${p.name}: $${p.price}/${p.period} (${p.coverage})`
        ).join('\n');
        return `Our pricing plans:\n\n${plans}\n\nAll plans include a 14-day free trial!`;
    }

    if (lower.match(/recommend|suggest|best|which/)) {
        return "I'd love to help! Could you share:\n1. Your farm size (in acres)?\n2. Main need (monitoring, spraying, mapping, or all-in-one)?";
    }

    if (lower.match(/small|under 100/)) {
        return `For smaller farms, I recommend the AeroScout X1 ($4,999) with our Starter Plan ($299/mo). Great for crop monitoring up to 100 acres.`;
    }

    if (lower.match(/medium|100.*500/)) {
        return `For mid-size farms, the Professional Plan ($799/mo) with AeroScout X1 + AgroSpray Pro is ideal. Full AI analytics and precision spraying for up to 500 acres.`;
    }

    if (lower.match(/large|enterprise|big|500/)) {
        return `For large operations, our Enterprise Plan ($1,999/mo) with HarvestGuard Max supports up to 5 coordinated drones covering unlimited acreage, plus dedicated support.`;
    }

    if (lower.match(/demo|book|schedule/)) {
        return "Book a demo through our Contact page or call +1 (555) 123-4567. We offer both in-field and virtual demos — completely free!";
    }

    if (lower.match(/hello|hi|hey/)) {
        return "Hello! 👋 I'm AeroBot, your AI farming assistant. I can help with drone info, recommendations, pricing, and demo booking. What would you like to know?";
    }

    return "I can help with:\n• Drone products & specs\n• Pricing plans\n• Farm-specific recommendations\n• Booking demos\n\nWhat interests you?";
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
const inquiries = [];

app.post('/api/contact', (req, res) => {
    const { name, email, phone, subject, message, farmSize } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const inquiry = {
        id: inquiries.length + 1,
        name, email, phone, subject, message, farmSize,
        date: new Date().toISOString(),
        status: 'New'
    };
    inquiries.push(inquiry);
    res.status(201).json({ success: true, message: 'Inquiry received!', id: inquiry.id });
});

app.get('/api/inquiries', (req, res) => {
    res.json(inquiries);
});

// ============= DEMO BOOKING ENDPOINT =============
const demoBookings = [];

app.post('/api/demo', (req, res) => {
    const { name, email, company, date, farmSize, notes } = req.body;
    if (!name || !email || !date) {
        return res.status(400).json({ error: 'Name, email, and date are required' });
    }

    const booking = {
        id: demoBookings.length + 1,
        name, email, company, date, farmSize, notes,
        createdAt: new Date().toISOString(),
        status: 'Pending'
    };
    demoBookings.push(booking);
    res.status(201).json({ success: true, message: 'Demo booked!', id: booking.id });
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
