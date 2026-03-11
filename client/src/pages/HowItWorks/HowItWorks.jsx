import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, Plane, Camera, Brain, BarChart3, ArrowRight, ChevronDown } from 'lucide-react';
import './HowItWorks.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } })
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const steps = [
    {
        number: '01',
        icon: <Smartphone size={32} />,
        title: 'Flight Planning',
        subtitle: 'Mobile App Control',
        desc: 'Use our intuitive mobile app to define your flight area, set parameters like altitude and overlap, and schedule autonomous missions. The AI optimizes the flight path based on your farm layout.',
        details: ['GPS waypoint creation', 'Custom altitude settings', 'Scheduled missions', 'Weather-aware planning']
    },
    {
        number: '02',
        icon: <Plane size={32} />,
        title: 'Autonomous Flight',
        subtitle: 'Smart Navigation',
        desc: 'Your drone takes off and navigates the planned route autonomously. Obstacle avoidance and real-time adjustments ensure safe, efficient coverage of your entire field.',
        details: ['Obstacle avoidance', 'Auto return-to-home', 'Real-time telemetry', 'Wind compensation']
    },
    {
        number: '03',
        icon: <Camera size={32} />,
        title: 'Data Collection',
        subtitle: 'Multi-Sensor Capture',
        desc: 'High-resolution RGB, multispectral, and thermal sensors capture comprehensive data about your crops and soil conditions throughout the flight.',
        details: ['RGB imaging (4K)', 'NDVI multispectral', 'Thermal imaging', 'LiDAR elevation data']
    },
    {
        number: '04',
        icon: <Brain size={32} />,
        title: 'AI Analysis',
        subtitle: 'Intelligent Processing',
        desc: 'Our AI engine processes the collected data using computer vision and machine learning algorithms to identify crop stress, diseases, nutrient deficiencies, and water issues.',
        details: ['Disease detection', 'Nutrient analysis', 'Weed identification', 'Water stress mapping']
    },
    {
        number: '05',
        icon: <BarChart3 size={32} />,
        title: 'Dashboard Reports',
        subtitle: 'Actionable Insights',
        desc: 'Access detailed reports and visualizations through our farmer dashboard. Get recommendations on treatment, irrigation, and harvesting optimized by AI predictive models.',
        details: ['Interactive field maps', 'Trend analytics', 'Treatment recommendations', 'Yield predictions']
    },
];

const HowItWorks = () => {
    return (
        <div className="hiw-page">
            <section className="hiw-hero">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="section-tag">How It Works</span>
                        <h1>From Takeoff to <span className="gradient-text">Actionable Insights</span></h1>
                        <p>Discover the five-step process that transforms raw field data into intelligent farming decisions.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <motion.div className="steps-container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        {steps.map((step, i) => (
                            <React.Fragment key={i}>
                                <motion.div className="step-card" variants={fadeUp} custom={i}>
                                    <div className="step-number-col">
                                        <div className="step-number">{step.number}</div>
                                        {i < steps.length - 1 && <div className="step-connector" />}
                                    </div>
                                    <div className="step-content glass">
                                        <div className="step-icon-wrap">{step.icon}</div>
                                        <div className="step-info">
                                            <span className="step-subtitle">{step.subtitle}</span>
                                            <h3>{step.title}</h3>
                                            <p>{step.desc}</p>
                                            <div className="step-details">
                                                {step.details.map((d, j) => (
                                                    <span key={j} className="detail-tag">✓ {d}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding">
                <div className="container">
                    <motion.div className="hiw-cta glass" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <h2>See It in Action</h2>
                        <p>Schedule a live demo and watch our AI drones transform data into actionable insights for your farm.</p>
                        <Link to="/contact" className="btn-primary" id="hiw-demo-btn">Book a Demo <ArrowRight size={20} /></Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
