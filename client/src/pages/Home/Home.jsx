import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Zap, BarChart3, Shield, Eye, Target, Sprout, Brain, Satellite, Users, Star, ChevronRight, Calculator } from 'lucide-react';
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
        { icon: <Leaf size={28} />, title: 'Bujqësi ekonomike', desc: 'Zvogëloni përdorimin e pesticideve me 60% me shënjestrim preciz.' },
        { icon: <Zap size={28} />, title: 'Skanime të shpejta', desc: 'Mbuloni 500 akra nën një orë me fluturim autonom.' },
        { icon: <BarChart3 size={28} />, title: 'Drejtuar nga të dhënat', desc: 'Analiza e IA që i kthen të dhënat e fermës në inteligjencë të zbatueshme.' },
        { icon: <Shield size={28} />, title: 'Mbrojtja e të mbjellave', desc: 'Zbulimi i hershëm i sëmundjeve kursen deri në 40% të humbjes së prodhimit.' },
        { icon: <Eye size={28} />, title: 'Monitorim në kohë reale', desc: 'Lidhjet e drejtpërdrejta dhe alarmet ju mbajnë të lidhur me fushat tuaja 24/7.' },
        { icon: <Target size={28} />, title: 'Spërkatje me precizion', desc: 'Grykat e udhëzuara nga IA ofrojnë atë që i nevojitet çdo bime.' },
    ];

    const features = [
        { icon: <Brain size={28} />, title: 'Motori i vizualizimit me AI', desc: 'Analiza e të mbjellave me GPT identifikon problemet, sëmundjet dhe mungesën e lëndëve ushqyese në kohë reale.' },
        { icon: <Satellite size={28} />, title: 'Imazhe shumë-spektrale', desc: 'Sensorët NDVI dhe termikë kapin të dhëna të padukshme për syrin e njeriut.' },
        { icon: <Sprout size={28} />, title: 'Gjurmimi i rritjes', desc: 'Ndiqni zhvillimin e të mbjellave nga fara deri te vjelja me krahasime historikësh.' },
    ];

    const testimonials = [
        { name: 'Dr. Maria Santos', role: 'Menaxhere Ferme, GreenField Estates', text: 'Dronët e AeroAgro AI rritën rendimentin tonë me 35% në sezonin e parë. Rekomandimet e IA janë jashtëzakonisht të sakta.', rating: 5 },
        { name: 'James O\'Brien', role: 'CEO, AgriTech Farms', text: 'Spërkatja precize na kurseu 200,000€ në vit. Kjo teknologji është e ardhmja e bujqësisë së qëndrueshme.', rating: 5 },
        { name: 'Aisha Patel', role: 'Drejtoreshë, SmartHarvest Inc.', text: 'Mbështetja dhe inteligjenca e tyre e dronëve i tejkaluan të gjitha pritjet. Rikthimi i investimit tonë u arrit brenda 6 muajsh.', rating: 5 },
    ];

    const stats = [
        { value: '2M+', label: 'Akra të Monitoruara' },
        { value: '500+', label: 'Ferma të Fuqizuara' },
        { value: '35%', label: 'Rritje Mesatare e Rendimentit' },
        { value: '60%', label: 'Më Pak Përdorim Pesticidesh' },
    ];

    return (
        <div className="home-page">
            {/* Hero - Full screen video with title and CTA only */}
            <section className="hero">
                <div className="hero-video-wrapper">
                    <video autoPlay loop muted playsInline className="hero-video">
                        <source src="https://www-cdn.djiits.com/reactor/assets/_next/static/videos/ec42c957-dd34-483b-8545-802d3f6a5160.mp4" type="video/mp4" />
                        <source src="https://www-cdn.djiits.com/assets/uploads/8e4bb7660b454b7176025523cebdcd80.mp4" type="video/mp4" />
                    </video>
                    <div className="hero-video-overlay" />
                </div>

                <div className="container hero-content">
                    <motion.div className="hero-text" initial="hidden" animate="visible" variants={stagger}>
                        <motion.h1 variants={fadeUp} custom={0}>
                            Bujqësi Precize me <span className="gradient-text">Dronë Inteligjentë</span>
                        </motion.h1>
                        <motion.div className="hero-cta" variants={fadeUp} custom={1}>
                            <Link to="/products" className="btn-primary btn-hero-main" id="hero-explore-btn">
                                Eksploro Dronët <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits */}
            <section className="section-padding benefits-section">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
                        <span className="section-tag">Pse AeroAgro AI</span>
                        <h2>Transformoni Bujqësinë me <span className="gradient-text">Teknologji Inteligjente</span></h2>
                        <p>Dronët tanë të fuqizuar me IA ofrojnë zgjidhje precize për bujqësinë që rrisin produktivitetin ndërsa reduktojnë ndikimin mjedisor.</p>
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
                        <span className="section-tag">Karakteristikat Kryesore</span>
                        <h2>Teknologji që <span className="gradient-text">Fuqizon</span> Fermerët</h2>
                    </motion.div>
                    <motion.div className="features-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
                        {features.map((f, i) => (
                            <motion.div key={i} className="feature-card" variants={fadeUp} custom={i}>
                                <div className="feature-icon-wrap">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                                <Link to="/how-it-works" className="feature-link">
                                    Mëso më shumë <ChevronRight size={16} />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Product Highlights */}
            <section className="section-padding product-highlights">
            </section>

            {/* Efficiency Section */}
            <section className="section-padding efficiency-highlights">
                <div className="container">
                    <motion.div className="efficiency-grid glass" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <div className="efficiency-text">
                            <span className="section-tag">Optimizimi</span>
                            <h2>Llogarisni <span className="gradient-text">Përfitimet tuaja të Efikasitetit</span></h2>
                            <p>Zbuloni se sa mund të kurseni për kimikate, ujë dhe fuqi punëtore duke përdorur mjetet tona të menaxhimit të flotës të drejtuara nga IA.</p>
                            <div className="efficiency-stats">
                                <div className="e-stat"><strong>60%</strong> <span>Më Pak Mbetje Kimike</span></div>
                                <div className="e-stat"><strong>40%</strong> <span>Optimizim i Ujit</span></div>
                            </div>
                            <Link to="/contact" className="btn-primary">Na Kontaktoni për Efikasitetin <ArrowRight size={20} /></Link>
                        </div>
                        <div className="efficiency-visual">
                            <Calculator size={120} strokeWidth={1} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding testimonials-section">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
                        <span className="section-tag">Histori Suksesi</span>
                        <h2>Besohet nga <span className="gradient-text">Fermerët në Mbarë Botën</span></h2>
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
                        <h2>Gati Për Të Ngritur Fermën Tuaj?</h2>
                        <p>Rezervoni një demo falas dhe shihni si AeroAgro AI mund të transformojë operacionet tuaja bujqësore.</p>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn-primary" id="cta-demo-btn">Rezervo një Demo <ArrowRight size={20} /></Link>
                            <Link to="/contact" className="btn-outline" id="cta-pricing-btn">Na Kontaktoni</Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
