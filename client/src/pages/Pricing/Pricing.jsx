import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, HelpCircle, X } from 'lucide-react';
import './Pricing.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } })
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const plans = [
    {
        name: 'Fillestar',
        price: '€299',
        period: '/muaj',
        description: 'E përkryer për ferma të vogla që sapo nisin monitorimin me dron.',
        features: [
            { text: 'Dron baze AeroScout X1', included: true },
            { text: 'Monitorim i fermës (deri në 100 akra)', included: true },
            { text: 'Analitikë bazë e IA', included: true },
            { text: 'Raporte fluturimi javore', included: true },
            { text: 'Qasje në aplikacion celular', included: true },
            { text: 'Spërkatje me precizion', included: false },
            { text: 'Imazhe multispektrale', included: false },
            { text: 'Menaxhimi i flotës', included: false },
            { text: 'Mbështetje e dedikuar', included: false },
        ],
        popular: false,
    },
    {
        name: 'Profesional',
        price: '€799',
        period: '/muaj',
        description: 'Për operacione në rritje që kanë nevojë për analitikë të avancuar dhe spërkatje.',
        features: [
            { text: 'AeroScout X1 + AgroSpray Pro', included: true },
            { text: 'Monitorim i fermës (deri në 500 akra)', included: true },
            { text: 'Paketa e plotë e analitikës së IA', included: true },
            { text: 'Raporte ditore të IA', included: true },
            { text: 'Spërkatje me precizion', included: true },
            { text: 'Imazhe multispektrale', included: true },
            { text: 'Mbështetje me prioritet', included: true },
            { text: 'Menaxhimi i flotës', included: false },
            { text: 'Menaxher i dedikuar llogarie', included: false },
        ],
        popular: true,
    },
    {
        name: 'Ndërmarrje',
        price: '€1,999',
        period: '/muaj',
        description: 'Automatizim i plotë për operacione bujqësore në shkallë të gjerë.',
        features: [
            { text: 'Flotë e plotë dronësh (deri në 5 dronë)', included: true },
            { text: 'Zonë mbulimi e pakufizuar', included: true },
            { text: 'Analitikë IA për ndërmarrje', included: true },
            { text: 'Monitorim dhe sinjalizime në kohë reale', included: true },
            { text: 'Spërkatje e plotë me precizion', included: true },
            { text: 'Imazhe multispektrale + termike', included: true },
            { text: 'IA për koordinimin e flotës', included: true },
            { text: 'Menaxher i dedikuar llogarie', included: true },
            { text: 'Mbështetje premium 24/7', included: true },
        ],
        popular: false,
    },
];

const faqs = [
    { q: 'A mund ta ndryshoj planin më vonë?', a: 'Po, ju mund të përmirësoni ose të ulni vizualizimin në çdo kohë. Ndryshimet hyjnë në fuqi në fillim të ciklit tuaj të ardhshëm të faturimit.' },
    { q: 'A ka një provë falas?', a: 'Ne ofrojmë një provë 14-ditore falas në planin Profesional. Rezervoni një demo për të filluar.' },
    { q: 'A vijnë dronët me planin?', a: 'Planet përfshijnë dhënien me qira të dronëve. Ju gjithashtu mund të blini dronë direkt dhe të përdorni platformën tonë të softuerit veçmas.' },
    { q: 'Çfarë ndodh nëse një dron dëmtohet?', a: 'Plani ynë i Ndërmarrjes përfshin sigurim gjithëpërfshirës. Planet Fillestar dhe Profesional ofrojnë shtesa opsionale për mbrojtjen nga dëmtimet.' },
];

const Pricing = () => {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="pricing-page">
            <section className="pricing-hero">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="section-tag">Çmimet</span>
                        <h1>Çmime të Thjeshta dhe <span className="gradient-text">Transparente</span></h1>
                        <p>Zgjidhni planin që i përshtatet fermës suaj. Rrituni ose zvogëlohuni në çdo kohë.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <motion.div className="pricing-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        {plans.map((plan, i) => (
                            <motion.div key={i} className={`pricing-card glass ${plan.popular ? 'popular' : ''}`} variants={fadeUp} custom={i}>
                                {plan.popular && <div className="popular-badge">Më i Popullarizuari</div>}
                                <h3>{plan.name}</h3>
                                <div className="pricing-amount">
                                    <span className="price">{plan.price}</span>
                                    <span className="period">{plan.period}</span>
                                </div>
                                <p className="plan-desc">{plan.description}</p>
                                <ul className="plan-features">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className={f.included ? 'included' : 'excluded'}>
                                            {f.included ? <Check size={16} /> : <X size={16} />}
                                            {f.text}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/contact" className={plan.popular ? 'btn-primary full-width' : 'btn-outline full-width'} id={`pricing-cta-${plan.name.toLowerCase()}`}>
                                    Fillo Tani <ArrowRight size={18} />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-padding faq-section">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <span className="section-tag">Pyetjet e Shpeshta (FAQ)</span>
                        <h2>Pyetjet e Bëra <span className="gradient-text">Më Shpesh</span></h2>
                    </motion.div>
                    <motion.div className="faq-list" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        {faqs.map((faq, i) => (
                            <motion.div key={i} className={`faq-item glass ${openFaq === i ? 'open' : ''}`} variants={fadeUp} custom={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <div className="faq-question">
                                    <HelpCircle size={20} />
                                    <span>{faq.q}</span>
                                    <div className="faq-toggle">{openFaq === i ? '−' : '+'}</div>
                                </div>
                                {openFaq === i && <div className="faq-answer"><p>{faq.a}</p></div>}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
