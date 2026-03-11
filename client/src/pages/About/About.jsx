import React from 'react';
import { motion } from 'framer-motion';
import { Target, Cpu, Leaf, Award, Users, Globe, Rocket, Shield } from 'lucide-react';
import './About.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } })
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const About = () => {
    const values = [
        { icon: <Leaf size={28} />, title: 'Sustainability', desc: 'We build technology that reduces environmental impact while maximizing agricultural output.' },
        { icon: <Cpu size={28} />, title: 'Innovation', desc: 'Pushing the boundaries of AI and robotics to solve real-world farming challenges.' },
        { icon: <Shield size={28} />, title: 'Reliability', desc: 'Enterprise-grade systems with 99.9% uptime designed for mission-critical operations.' },
        { icon: <Users size={28} />, title: 'Community', desc: 'Partnering with farmers worldwide to build a smarter, more connected agricultural ecosystem.' },
    ];

    const milestones = [
        { year: '2020', title: 'Founded', desc: 'AeroAgro AI was founded by a team of AI researchers and agricultural engineers.' },
        { year: '2021', title: 'First Drone', desc: 'Launched our first crop monitoring drone, the AeroScout X1 prototype.' },
        { year: '2022', title: 'AI Integration', desc: 'Integrated GPT-powered analytics into our drone fleet management platform.' },
        { year: '2023', title: 'Global Expansion', desc: 'Expanded operations to 15 countries with over 200 enterprise clients.' },
        { year: '2024', title: 'Fleet AI', desc: 'Released multi-drone fleet coordination AI for large-scale operations.' },
        { year: '2025', title: '2M Acres Milestone', desc: 'Surpassed 2 million acres monitored by our AI-powered drone fleet.' },
    ];

    const techStack = [
        { icon: <Cpu size={24} />, name: 'Computer Vision', desc: 'Advanced image recognition for crop analysis' },
        { icon: <Globe size={24} />, name: 'Satellite Integration', desc: 'Real-time satellite overlay for precision mapping' },
        { icon: <Rocket size={24} />, name: 'Edge Computing', desc: 'On-board processing for instant field insights' },
        { icon: <Award size={24} />, name: 'Machine Learning', desc: 'Predictive models trained on millions of data points' },
    ];

    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="section-tag">About Us</span>
                        <h1>Pioneering the Future of <span className="gradient-text">Smart Agriculture</span></h1>
                        <p>We're on a mission to empower farmers with AI-driven drone technology that makes precision farming accessible, efficient, and sustainable.</p>
                    </motion.div>
                </div>
            </section>

            {/* Mission */}
            <section className="section-padding mission-section">
                <div className="container">
                    <div className="mission-grid">
                        <motion.div className="mission-content" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <span className="section-tag">Our Mission</span>
                            <h2>Making Precision Farming <span className="gradient-text">Accessible</span> to All</h2>
                            <p>At AeroAgro AI, we believe every farmer — from small family operations to large enterprises — deserves access to cutting-edge technology. Our AI-powered drones democratize precision agriculture, helping farmers increase yields, reduce costs, and protect the environment.</p>
                            <p>We combine autonomous drone technology with advanced artificial intelligence to deliver actionable insights that transform how food is grown. Our platform processes millions of data points daily, offering real-time crop health monitoring, predictive analytics, and automated farming operations.</p>
                        </motion.div>
                        <motion.div className="mission-stats" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                            {[
                                { value: '500+', label: 'Farms Powered' },
                                { value: '15', label: 'Countries' },
                                { value: '50+', label: 'Team Members' },
                                { value: '98%', label: 'Client Satisfaction' },
                            ].map((s, i) => (
                                <motion.div key={i} className="mission-stat glass" variants={fadeUp} custom={i}>
                                    <strong>{s.value}</strong>
                                    <span>{s.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding values-section">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <span className="section-tag">Our Values</span>
                        <h2>What <span className="gradient-text">Drives</span> Us</h2>
                    </motion.div>
                    <motion.div className="values-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        {values.map((v, i) => (
                            <motion.div key={i} className="value-card glass" variants={fadeUp} custom={i}>
                                <div className="value-icon">{v.icon}</div>
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Tech */}
            <section className="section-padding tech-section">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <span className="section-tag">Our Technology</span>
                        <h2>Innovation in <span className="gradient-text">Smart Farming</span></h2>
                    </motion.div>
                    <motion.div className="tech-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        {techStack.map((t, i) => (
                            <motion.div key={i} className="tech-card" variants={fadeUp} custom={i}>
                                <div className="tech-icon">{t.icon}</div>
                                <h3>{t.name}</h3>
                                <p>{t.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section-padding timeline-section">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <span className="section-tag">Our Journey</span>
                        <h2>Building the <span className="gradient-text">Future</span></h2>
                    </motion.div>
                    <motion.div className="timeline" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        {milestones.map((m, i) => (
                            <motion.div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} variants={fadeUp} custom={i}>
                                <div className="timeline-content glass">
                                    <span className="timeline-year">{m.year}</span>
                                    <h3>{m.title}</h3>
                                    <p>{m.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
