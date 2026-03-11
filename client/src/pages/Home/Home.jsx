import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Zap, BarChart3, Shield, Eye, Target, Sprout, Brain, Satellite, Users, Star, ChevronRight } from 'lucide-react';
import heroImg from '../../assets/hero_drone.png';
import './Home.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }
    })
};

const stagger = {
    visible: { transition: { staggerChildren: 0.12 } }
};

const Home = () => {
    const benefits = [
        { icon: <Leaf size={28} />, title: 'Eco-Friendly Farming', desc: 'Reduce pesticide use by 60% with precision AI targeting.' },
        { icon: <Zap size={28} />, title: 'Lightning-Fast Scans', desc: 'Cover 500 acres in under an hour with autonomous flight.' },
        { icon: <BarChart3 size={28} />, title: 'Data-Driven Insights', desc: 'AI analytics that turn farm data into actionable intelligence.' },
        { icon: <Shield size={28} />, title: 'Crop Protection', desc: 'Early disease detection saves up to 40% of potential yield loss.' },
        { icon: <Eye size={28} />, title: 'Real-Time Monitoring', desc: 'Live feeds and alerts keep you connected to your fields 24/7.' },
        { icon: <Target size={28} />, title: 'Precision Spraying', desc: 'AI-guided nozzles deliver exactly what each plant needs.' },
    ];

    const features = [
        { icon: <Brain size={28} />, title: 'AI Vision Engine', desc: 'GPT-powered crop analysis identifies plant stress, disease, and nutrient deficiency in real-time.' },
        { icon: <Satellite size={28} />, title: 'Multi-Spectral Imaging', desc: 'NDVI and thermal sensors capture data invisible to the human eye.' },
        { icon: <Sprout size={28} />, title: 'Growth Tracking', desc: 'Track crop development from seed to harvest with historical comparisons.' },
    ];

    const testimonials = [
        { name: 'Dr. Maria Santos', role: 'Farm Manager, GreenField Estates', text: 'AeroAgro AI drones increased our yield by 35% in the first season. The AI recommendations are incredibly accurate.', rating: 5 },
        { name: 'James O\'Brien', role: 'CEO, AgriTech Farms', text: 'The precision spraying alone saved us $200K annually. This technology is the future of sustainable agriculture.', rating: 5 },
        { name: 'Aisha Patel', role: 'Director, SmartHarvest Inc.', text: 'Their customer support and drone intelligence exceeded all expectations. Our ROI was achieved within 6 months.', rating: 5 },
    ];

    const stats = [
        { value: '2M+', label: 'Acres Monitored' },
        { value: '500+', label: 'Farms Powered' },
        { value: '35%', label: 'Avg Yield Increase' },
        { value: '60%', label: 'Less Pesticide Use' },
    ];

    return (
        <div className="home-page">
            {/* Hero */}
            <section className="hero">
                <div className="hero-bg-glow" />
                <div className="hero-grid-overlay" />
                <div className="container hero-content">
                    <motion.div className="hero-text" initial="hidden" animate="visible" variants={stagger}>
                        <motion.span className="hero-badge" variants={fadeUp} custom={0}>
                            <Sprout size={16} /> AI-Powered Agriculture
                        </motion.span>
                        <motion.h1 variants={fadeUp} custom={1}>
                            Revolutionize Your <span className="gradient-text">Farm</span> with Intelligent Drones
                        </motion.h1>
                        <motion.p variants={fadeUp} custom={2}>
                            AeroAgro AI combines cutting-edge drone technology with artificial intelligence to help farmers monitor crops, detect diseases, and optimize yields like never before.
                        </motion.p>
                        <motion.div className="hero-cta" variants={fadeUp} custom={3}>
                            <Link to="/products" className="btn-primary" id="hero-explore-btn">
                                Explore Drones <ArrowRight size={20} />
                            </Link>
                            <Link to="/contact" className="btn-outline" id="hero-demo-btn">
                                Book a Demo
                            </Link>
                        </motion.div>
                        <motion.div className="hero-stats" variants={fadeUp} custom={4}>
                            {stats.map((s, i) => (
                                <div key={i} className="stat-item">
                                    <strong>{s.value}</strong>
                                    <span>{s.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                    <motion.div className="hero-visual"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="hero-image-wrapper">
                            <img src={heroImg} alt="AeroAgro AI Drone over farmland" />
                            <div className="hero-image-glow" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits */}
            <section className="section-padding benefits-section">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
                        <span className="section-tag">Why AeroAgro AI</span>
                        <h2>Transform Agriculture with <span className="gradient-text">Smart Technology</span></h2>
                        <p>Our AI-powered drones deliver precision farming solutions that increase productivity while reducing environmental impact.</p>
                    </motion.div>
                    <motion.div className="benefits-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
                        {benefits.map((b, i) => (
                            <motion.div key={i} className="benefit-card glass" variants={fadeUp} custom={i}>
                                <div className="benefit-icon">{b.icon}</div>
                                <h3>{b.title}</h3>
                                <p>{b.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="section-padding features-section">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
                        <span className="section-tag">Key Features</span>
                        <h2>Technology That <span className="gradient-text">Empowers</span> Farmers</h2>
                    </motion.div>
                    <motion.div className="features-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
                        {features.map((f, i) => (
                            <motion.div key={i} className="feature-card" variants={fadeUp} custom={i}>
                                <div className="feature-icon-wrap">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                                <Link to="/how-it-works" className="feature-link">
                                    Learn more <ChevronRight size={16} />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Product Highlights */}
            <section className="section-padding product-highlights">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
                        <span className="section-tag">Our Drones</span>
                        <h2>Engineered for <span className="gradient-text">Modern Farming</span></h2>
                    </motion.div>
                    <motion.div className="product-preview" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} custom={1}>
                        <div className="product-preview-card glass">
                            <div className="product-preview-info">
                                <h3>AeroScout X1</h3>
                                <p>Our flagship crop monitoring drone with advanced AI vision. Perfect for farms up to 500 acres.</p>
                                <ul>
                                    <li>✓ 45-min flight time</li>
                                    <li>✓ Real-time disease detection</li>
                                    <li>✓ Autonomous flight planning</li>
                                    <li>✓ Multi-spectral imaging</li>
                                </ul>
                                <Link to="/products" className="btn-primary">
                                    View All Products <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding testimonials-section">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
                        <span className="section-tag">Success Stories</span>
                        <h2>Trusted by <span className="gradient-text">Farmers Worldwide</span></h2>
                    </motion.div>
                    <motion.div className="testimonials-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
                        {testimonials.map((t, i) => (
                            <motion.div key={i} className="testimonial-card glass" variants={fadeUp} custom={i}>
                                <div className="testimonial-stars">
                                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="var(--accent)" color="var(--accent)" />)}
                                </div>
                                <p className="testimonial-text">"{t.text}"</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar"><Users size={22} /></div>
                                    <div>
                                        <strong>{t.name}</strong>
                                        <span>{t.role}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="container">
                    <motion.div className="cta-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
                        <h2>Ready to Elevate Your Farming?</h2>
                        <p>Book a free demo and see how AeroAgro AI can transform your agricultural operations.</p>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn-primary" id="cta-demo-btn">Book a Demo <ArrowRight size={20} /></Link>
                            <Link to="/pricing" className="btn-outline" id="cta-pricing-btn">See Pricing</Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
