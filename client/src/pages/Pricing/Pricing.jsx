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
        name: 'Starter',
        price: '$299',
        period: '/month',
        description: 'Perfect for small farms getting started with drone monitoring.',
        features: [
            { text: 'AeroScout X1 Basic drone', included: true },
            { text: 'Farm monitoring (up to 100 acres)', included: true },
            { text: 'Basic AI analytics', included: true },
            { text: 'Weekly flight reports', included: true },
            { text: 'Mobile app access', included: true },
            { text: 'Precision spraying', included: false },
            { text: 'Multi-spectral imaging', included: false },
            { text: 'Fleet management', included: false },
            { text: 'Dedicated support', included: false },
        ],
        popular: false,
    },
    {
        name: 'Professional',
        price: '$799',
        period: '/month',
        description: 'For growing operations needing advanced analytics and spraying.',
        features: [
            { text: 'AeroScout X1 + AgroSpray Pro', included: true },
            { text: 'Farm monitoring (up to 500 acres)', included: true },
            { text: 'Full AI analytics suite', included: true },
            { text: 'Daily AI reports', included: true },
            { text: 'Precision spraying', included: true },
            { text: 'Multi-spectral imaging', included: true },
            { text: 'Priority support', included: true },
            { text: 'Fleet management', included: false },
            { text: 'Dedicated account manager', included: false },
        ],
        popular: true,
    },
    {
        name: 'Enterprise',
        price: '$1,999',
        period: '/month',
        description: 'Full automation for large-scale agricultural operations.',
        features: [
            { text: 'Full drone fleet (up to 5 drones)', included: true },
            { text: 'Unlimited coverage area', included: true },
            { text: 'Enterprise AI analytics', included: true },
            { text: 'Real-time monitoring & alerts', included: true },
            { text: 'Full precision spraying', included: true },
            { text: 'Multi-spectral + thermal imaging', included: true },
            { text: 'Fleet coordination AI', included: true },
            { text: 'Dedicated account manager', included: true },
            { text: '24/7 premium support', included: true },
        ],
        popular: false,
    },
];

const faqs = [
    { q: 'Can I switch plans later?', a: 'Yes, you can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.' },
    { q: 'Is there a free trial?', a: 'We offer a 14-day free trial on the Professional plan. Book a demo to get started.' },
    { q: 'Do drones come with the plan?', a: 'Plans include drone leasing. You can also purchase drones outright and use our software platform separately.' },
    { q: 'What happens if a drone is damaged?', a: 'Our Enterprise plan includes comprehensive insurance. Starter and Pro plans offer optional damage protection add-ons.' },
];

const Pricing = () => {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="pricing-page">
            <section className="pricing-hero">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="section-tag">Pricing</span>
                        <h1>Simple, Transparent <span className="gradient-text">Pricing</span></h1>
                        <p>Choose the plan that fits your farm. Scale up or down anytime.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <motion.div className="pricing-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        {plans.map((plan, i) => (
                            <motion.div key={i} className={`pricing-card glass ${plan.popular ? 'popular' : ''}`} variants={fadeUp} custom={i}>
                                {plan.popular && <div className="popular-badge">Most Popular</div>}
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
                                    Get Started <ArrowRight size={18} />
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
                        <span className="section-tag">FAQ</span>
                        <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
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
