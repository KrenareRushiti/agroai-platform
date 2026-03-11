import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingCart, Battery, Maximize, Cpu, Wifi, Zap } from 'lucide-react';
import drone1 from '../../assets/drone1.png';
import drone2 from '../../assets/drone2.png';
import './Products.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }
    })
};

const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const drones = [
    {
        id: 1, name: 'AeroScout X1', tagline: 'Crop Monitoring Excellence',
        img: drone1,
        price: '$4,999',
        specs: [
            { icon: <Battery size={18} />, label: 'Battery', value: '45 min' },
            { icon: <Maximize size={18} />, label: 'Coverage', value: '500 acres' },
            { icon: <Cpu size={18} />, label: 'AI Engine', value: 'GPT Vision' },
            { icon: <Wifi size={18} />, label: 'Range', value: '15 km' },
        ],
        useCases: ['Crop Health Analysis', 'Disease Detection', 'Growth Tracking', 'NDVI Mapping'],
        aiFeatures: ['Real-time plant stress detection', 'Automatic flight path optimization', 'Multi-spectral image analysis'],
        description: 'The AeroScout X1 is our flagship crop monitoring drone, equipped with advanced AI computer vision to analyze plant health, detect diseases early, and provide actionable insights for farmers managing up to 500 acres.'
    },
    {
        id: 2, name: 'AgroSpray Pro', tagline: 'Precision Spraying Redefined',
        img: drone2,
        price: '$12,499',
        specs: [
            { icon: <Battery size={18} />, label: 'Battery', value: '35 min' },
            { icon: <Maximize size={18} />, label: 'Coverage', value: '300 acres/hr' },
            { icon: <Cpu size={18} />, label: 'AI Engine', value: 'Spray AI' },
            { icon: <Zap size={18} />, label: 'Tank', value: '20L' },
        ],
        useCases: ['Precision Pesticide Spraying', 'Fertilizer Distribution', 'Weed Control', 'Seed Planting'],
        aiFeatures: ['AI-guided nozzle control', 'Variable rate application', 'Wind compensation algorithm'],
        description: 'The AgroSpray Pro uses AI-controlled spraying systems to deliver pesticides and fertilizers exactly where needed. Reduce chemical use by 60% while maintaining maximum crop protection.'
    },
    {
        id: 3, name: 'TerraScan Elite', tagline: 'Field Mapping & Irrigation Intelligence',
        img: drone1,
        price: '$8,999',
        specs: [
            { icon: <Battery size={18} />, label: 'Battery', value: '55 min' },
            { icon: <Maximize size={18} />, label: 'Coverage', value: '1000 acres' },
            { icon: <Cpu size={18} />, label: 'AI Engine', value: 'MapAI Pro' },
            { icon: <Wifi size={18} />, label: 'Resolution', value: '2cm/px' },
        ],
        useCases: ['Topographic Mapping', 'Irrigation Monitoring', 'Water Stress Detection', 'Yield Prediction'],
        aiFeatures: ['High-res orthomosaic generation', 'Thermal water stress mapping', 'Predictive yield modeling'],
        description: 'The TerraScan Elite generates ultra-high-resolution field maps and uses AI-powered analysis to detect irrigation issues, predict yields, and help optimize planting strategies for farms up to 1000 acres.'
    },
    {
        id: 4, name: 'HarvestGuard Max', tagline: 'Enterprise-Grade Multi-Drone Platform',
        img: drone2,
        price: '$24,999',
        specs: [
            { icon: <Battery size={18} />, label: 'Battery', value: '60 min' },
            { icon: <Maximize size={18} />, label: 'Coverage', value: '5000 acres' },
            { icon: <Cpu size={18} />, label: 'AI Engine', value: 'FleetAI' },
            { icon: <Wifi size={18} />, label: 'Drones', value: 'Up to 5' },
        ],
        useCases: ['Full Farm Automation', 'Multi-Drone Fleet Management', 'Comprehensive Analytics', 'Livestock Monitoring'],
        aiFeatures: ['Fleet coordination AI', 'Enterprise analytics dashboard', 'Predictive maintenance alerts'],
        description: 'The HarvestGuard Max is our enterprise solution for large-scale operations. Manage up to 5 coordinated drones covering 5000+ acres with centralized AI fleet management and comprehensive analytics.'
    },
];

const Products = () => {
    return (
        <div className="products-page">
            <section className="products-hero">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="section-tag">Our Fleet</span>
                        <h1>AI-Powered <span className="gradient-text">Agricultural Drones</span></h1>
                        <p>Industry-leading drone technology designed for precision farming at every scale.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <motion.div className="products-list" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        {drones.map((drone, i) => (
                            <motion.div key={drone.id} className="product-card glass" variants={fadeUp} custom={i}>
                                <div className="product-image-col">
                                    <img src={drone.img} alt={drone.name} loading="lazy" />
                                    <div className="product-price-badge">{drone.price}</div>
                                </div>
                                <div className="product-info-col">
                                    <span className="product-tagline">{drone.tagline}</span>
                                    <h2>{drone.name}</h2>
                                    <p className="product-desc">{drone.description}</p>

                                    <div className="product-specs-row">
                                        {drone.specs.map((sp, j) => (
                                            <div key={j} className="spec-item">
                                                <div className="spec-icon">{sp.icon}</div>
                                                <span className="spec-label">{sp.label}</span>
                                                <strong>{sp.value}</strong>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="product-two-cols">
                                        <div>
                                            <h4>Use Cases</h4>
                                            <ul className="use-cases-list">
                                                {drone.useCases.map((uc, j) => <li key={j}>✓ {uc}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4>AI Capabilities</h4>
                                            <ul className="ai-features-list">
                                                {drone.aiFeatures.map((af, j) => <li key={j}>⚡ {af}</li>)}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="product-actions">
                                        <Link to="/contact" className="btn-primary" id={`demo-btn-${drone.id}`}>
                                            Request Demo <ArrowRight size={18} />
                                        </Link>
                                        <button className="btn-outline">
                                            <ShoppingCart size={18} /> Add to Quote
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="section-padding comparison-section">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <span className="section-tag">Compare</span>
                        <h2>Find the <span className="gradient-text">Right Drone</span> For You</h2>
                    </motion.div>
                    <motion.div className="comparison-table-wrap glass" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    {drones.map(d => <th key={d.id}>{d.name}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Price</td>{drones.map(d => <td key={d.id}><strong>{d.price}</strong></td>)}</tr>
                                <tr><td>Battery Life</td>{drones.map(d => <td key={d.id}>{d.specs[0].value}</td>)}</tr>
                                <tr><td>Coverage</td>{drones.map(d => <td key={d.id}>{d.specs[1].value}</td>)}</tr>
                                <tr><td>AI Engine</td>{drones.map(d => <td key={d.id}>{d.specs[2].value}</td>)}</tr>
                                <tr><td>Crop Monitoring</td><td>✓</td><td>—</td><td>✓</td><td>✓</td></tr>
                                <tr><td>Precision Spraying</td><td>—</td><td>✓</td><td>—</td><td>✓</td></tr>
                                <tr><td>Field Mapping</td><td>—</td><td>—</td><td>✓</td><td>✓</td></tr>
                                <tr><td>Fleet Management</td><td>—</td><td>—</td><td>—</td><td>✓</td></tr>
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Products;
