import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
        id: 1, name: 'AeroScout X1', tagline: 'Përsosmëri në Monitorimin e të Mbjellave',
        img: drone1,
        price: '€4,999',
        specs: [
            { icon: <Battery size={18} />, label: 'Bateria', value: '45 min' },
            { icon: <Maximize size={18} />, label: 'Mbulimi', value: '500 akra' },
            { icon: <Cpu size={18} />, label: 'Motori AI', value: 'Vizualizimi i GPT' },
            { icon: <Wifi size={18} />, label: 'Rrezja', value: '15 km' },
        ],
        useCases: ['Analiza e Shëndetit të të Mbjellave', 'Zbulimi i Sëmundjeve', 'Gjurmimi i Rritjes', 'Hartëzimi NDVI'],
        aiFeatures: ['Zbulimi i problemeve të bimëve në kohë reale', 'Optimizimi automatik i shtegut të fluturimit', 'Analiza e imazheve multi-spektrale'],
        description: 'AeroScout X1 është droni ynë kryesor për monitorimin e të mbjellave, i pajisur me inteligjencë artificiale për pamjen kompjuterike për të analizuar shëndetin e bimëve, zbulimin e hershëm të sëmundjeve dhe ofrimin e njohurive të zbatueshme për fermerët që menaxhojnë deri në 500 akra.'
    },
    {
        id: 2, name: 'AgroSpray Pro', tagline: 'Redefinimi i Spërkatjes së Saktë',
        img: drone2,
        price: '€12,499',
        specs: [
            { icon: <Battery size={18} />, label: 'Bateria', value: '35 min' },
            { icon: <Maximize size={18} />, label: 'Mbulimi', value: '300 akra/orë' },
            { icon: <Cpu size={18} />, label: 'Motori AI', value: 'Spërkatje me Inteligjencë Artificiale(AI)' },
            { icon: <Zap size={18} />, label: 'Rezervuari', value: '20L' },
        ],
        useCases: ['Spërkatja me precizion e pesticideve', 'Shpërndarja e Plehrash', 'Kontrolli i Shpërthimeve', 'Mbjellja e Farave'],
        aiFeatures: ['Kontroll i spërkatjes i udhëhequr nga AI', 'Aplikim me normë të ndryshueshme', 'Algoritmi i kompensimit të erës'],
        description: 'AgroSpray Pro përdor sisteme spërkatëse të kontrolluara nga AI për të ofruar pesticide dhe plehra saktësisht ku nevojitet. Zvogëlon përdorimin kimik me 60% duke mbajtur mbrojtjen maksimale të të mbjellave.'
    },
    {
        id: 3, name: 'TerraScan Elite', tagline: 'Inteligjenca e Hartëzimit të Fushës & Ujitjes',
        img: drone1,
        price: '€8,999',
        specs: [
            { icon: <Battery size={18} />, label: 'Bateria', value: '55 min' },
            { icon: <Maximize size={18} />, label: 'Mbulimi', value: '1000 akra' },
            { icon: <Cpu size={18} />, label: 'Motori AI', value: 'MapAI Pro' },
            { icon: <Wifi size={18} />, label: 'Rezolucioni', value: '2cm/px' },
        ],
        useCases: ['Hartëzimi Topologjik', 'Monitorimi i Ujitjes', 'Zbulimi i Mungesës së Ujit', 'Parashikimi i Prodhimit'],
        aiFeatures: ['Gjenerimi i ortomozaikëve me rezolucion të lartë', 'Hartëzimi termik i mungesës së ujit', 'Modelimi prediktiv i mundesive'],
        description: 'TerraScan Elite gjeneron hartat e fushave me rezolucion ultra të lartë dhe përdor analizën e fuqizuar me IA për të zbuluar problemet e ujitjes, për të parashikuar prodhimin dhe për të ndihmuar në optimizimin e strategjive të mbjelljes.'
    },
    {
        id: 4, name: 'HarvestGuard Max', tagline: 'Platforma e Ndërmarrjeve Multi-Dronë',
        img: drone2,
        price: '€24,999',
        specs: [
            { icon: <Battery size={18} />, label: 'Bateria', value: '60 min' },
            { icon: <Maximize size={18} />, label: 'Mbulimi', value: '5000 akra' },
            { icon: <Cpu size={18} />, label: 'Motori AI', value: 'FleetAI' },
            { icon: <Wifi size={18} />, label: 'Dronët', value: 'Deri në 5' },
        ],
        useCases: ['Automatizimi i Plot i Fermës', 'Menaxhimi i Flotave', 'Analiza Komprehensive', 'Monitorimi i Blegtorisë'],
        aiFeatures: ['Koordinimi i flotës me AI', 'Panel i analizave për ndërmarrjet', 'Sinjalizime për mirëmbajtje parandaluese'],
        description: 'HarvestGuard Max është zgjidhja jonë e nivelit të biznesit për operacione në shkallë të gjerë. Menaxhoni deri në 5 dronë të koordinuar që mbulojnë 5000+ akra me administrim te bazuar ne IA dhe analiza komplete.'
    },
];

const Products = () => {
    const [activeAction, setActiveAction] = useState(null); // { drone: object, type: 'buy' | 'rent' }
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '', company: '', purpose: '',
        duration: '1 Ditë', startDate: '', termsAccepted: false, idNumber: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderDone, setOrderDone] = useState(false);

    const handleOrder = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const orderData = {
            droneId: activeAction.drone.id,
            droneName: activeAction.drone.name,
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            orderType: activeAction.type,
            duration: activeAction.type === 'rent' ? formData.duration : null,
            startDate: activeAction.type === 'rent' ? formData.startDate : null,
            address: formData.address,
            company: formData.company,
            purpose: activeAction.type === 'rent' ? formData.purpose : null,
            idNumber: activeAction.type === 'rent' ? formData.idNumber : null,
            termsAccepted: formData.termsAccepted,
            price: activeAction.type === 'buy' ? activeAction.drone.price : (activeAction.drone.id * 99) // Mock price calc
        };

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            const data = await response.json();
            if (data.success) {
                setOrderDone(true);
                setTimeout(() => {
                    setOrderDone(false);
                    setActiveAction(null);
                    setFormData({
                        name: '', email: '', phone: '', address: '', company: '', purpose: '',
                        duration: '1 Ditë', startDate: '', termsAccepted: false, idNumber: ''
                    });
                }, 3000);
            }
        } catch (error) {
            alert('Pati një gabim gjatë porosisë. Ju lutem provoni përsëri.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="products-page">
            <section className="products-hero">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="section-tag">Flota Jonë</span>
                        <h1>Dronë Bujqësorë të Fuqizuar nga <span className="gradient-text">Inteligjenca Artificiale (AI)</span></h1>
                        <p>Teknologjia e dronëve lider në industri e krijuar për bujqësi precize në çdo shkallë.</p>
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
                                            <h4>Rastet e Përdorimit</h4>
                                            <ul className="use-cases-list">
                                                {drone.useCases.map((uc, j) => <li key={j}>✓ {uc}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4>Aftësitë e Inteligjencës Artificiale</h4>
                                            <ul className="ai-features-list">
                                                {drone.aiFeatures.map((af, j) => <li key={j}>⚡ {af}</li>)}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="product-actions">
                                        <button className="btn-primary" onClick={() => setActiveAction({ drone, type: 'buy' })}>
                                            Blej Tani <ArrowRight size={18} />
                                        </button>
                                        <button className="btn-outline" onClick={() => setActiveAction({ drone, type: 'rent' })}>
                                            Qiraja nga {drone.id === 1 ? '€99' : drone.id === 2 ? '€249' : '€199'}/ditë
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Order/Rental Modal */}
            <AnimatePresence>
                {activeAction && (
                    <div className="modal-overlay" onClick={() => setActiveAction(null)}>
                        <motion.div
                            className="modal-content glass"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h3>{activeAction.type === 'buy' ? 'Porosit' : 'Merr me Qira'} <span className="gradient-text">{activeAction.drone.name}</span></h3>
                                <button className="close-btn" onClick={() => setActiveAction(null)}>×</button>
                            </div>
                            <div className="modal-body">
                                {orderDone ? (
                                    <div className="success-message">
                                        <h3>✓ Faleminderit!</h3>
                                        <p>Porosia juaj u ruajt me sukses në databazë.</p>
                                    </div>
                                ) : (
                                    <form className="rental-form" onSubmit={handleOrder}>
                                        <div className="input-group">
                                            <label>Emri i Plotë</label>
                                            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Emri juaj..." />
                                        </div>
                                        <div className="input-group">
                                            <label>Email</label>
                                            <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="email@shembull.com" />
                                        </div>
                                        <div className="input-group">
                                            <label>Telefoni</label>
                                            <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+383..." />
                                        </div>
                                        <div className="input-group">
                                            <label>Adresa / Lokacioni</label>
                                            <input type="text" required value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} placeholder="Qyteti, Rruga..." />
                                        </div>

                                        {activeAction.type === 'buy' && (
                                            <div className="input-group">
                                                <label>Kompania / Ferma (Opsionale)</label>
                                                <input type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="Emri i biznesit tuaj..." />
                                            </div>
                                        )}

                                        {activeAction.type === 'rent' && (
                                            <>
                                                <div className="input-group">
                                                    <label>Kohëzgjatja</label>
                                                    <select value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })}>
                                                        <option>1 Ditë</option>
                                                        <option>3 Ditë</option>
                                                        <option>7 Ditë</option>
                                                    </select>
                                                </div>
                                                <div className="input-group">
                                                    <label>Data e Fillimit</label>
                                                    <input type="date" required value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} />
                                                </div>
                                                <div className="input-group">
                                                    <label>Qëllimi i Përdorimit</label>
                                                    <input type="text" required value={formData.purpose} onChange={e => setFormData({ ...formData, purpose: e.target.value })} placeholder="P.sh. Spërkatje misri, Hartëzim toke..." />
                                                </div>
                                                <div className="input-group">
                                                    <label>Nr. Letërnjoftimit (Garanci)</label>
                                                    <input type="text" required value={formData.idNumber} onChange={e => setFormData({ ...formData, idNumber: e.target.value })} placeholder="Shëno numrin e ID ose pasaportës tuaj..." />
                                                </div>
                                                <div className="input-checkbox" style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
                                                    <input type="checkbox" id="terms" required checked={formData.termsAccepted} onChange={e => setFormData({ ...formData, termsAccepted: e.target.checked })} style={{ width: 'auto' }} />
                                                    <label htmlFor="terms" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Marr përsipër përgjegjësinë për pajisjen dhe pranoj kushtet e sigurimit gjatë qirasë.</label>
                                                </div>
                                            </>
                                        )}

                                        <button className="btn-primary full-width" type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? 'Duke procesuar...' : 'Konfirmo Porosinë'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Comparison Table */}
            <section className="section-padding comparison-section">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <span className="section-tag">Krahaso</span>
                        <h2>Gjeni <span className="gradient-text">Dronin e Duhur</span> Për Ju</h2>
                    </motion.div>
                    <motion.div className="comparison-table-wrap glass" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>Karakteristikat</th>
                                    {drones.map(d => <th key={d.id}>{d.name}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Çmimi</td>{drones.map(d => <td key={d.id}><strong>{d.price}</strong></td>)}</tr>
                                <tr><td>Jetëgjatësia e Baterisë</td>{drones.map(d => <td key={d.id}>{d.specs[0].value}</td>)}</tr>
                                <tr><td>Mbulimi</td>{drones.map(d => <td key={d.id}>{d.specs[1].value}</td>)}</tr>
                                <tr><td>Motori AI</td>{drones.map(d => <td key={d.id}>{d.specs[2].value}</td>)}</tr>
                                <tr><td>Monitorimi i të Mbjellave</td><td>✓</td><td>—</td><td>✓</td><td>✓</td></tr>
                                <tr><td>Spërkatja me Precizion</td><td>—</td><td>✓</td><td>—</td><td>✓</td></tr>
                                <tr><td>Hartëzimi i Fushës</td><td>—</td><td>—</td><td>✓</td><td>✓</td></tr>
                                <tr><td>Menaxhimi i Flotave</td><td>—</td><td>—</td><td>—</td><td>✓</td></tr>
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Products;
