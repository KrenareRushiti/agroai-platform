import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, FileText, Shield, GraduationCap, ArrowRight, Clock, BookOpen } from 'lucide-react';
import './Education.css';

const Education = () => {
    const categories = [
        { id: 'basics', title: 'Bazat e Dronëve', icon: <GraduationCap size={24} />, count: '12 Mësime' },
        { id: 'safety', title: 'Siguria & Rregulloret', icon: <Shield size={24} />, count: '8 Udhëzues' },
        { id: 'spraying', title: 'Spërkatje me Precizion', icon: <FileText size={24} />, count: '5 Kurse' },
        { id: 'tutorials', title: 'Video Udhëzuese', icon: <PlayCircle size={24} />, count: '15 Video' },
    ];

    const tutorials = [
        {
            title: 'Fillimi me AeroScout X1',
            desc: 'Mësoni si ta nxirrni nga kutia, kalibroni dhe kryeni fluturimin tuaj të parë autonom.',
            duration: '15 min',
            level: 'Fillestar',
            category: 'Bazat'
        },
        {
            title: 'Praktikat më të Mira të Spërkatjes me Precizion',
            desc: 'Maksimizoni efikasitetin dhe reduktoni mbetjet kimike duke përdorur gryka të drejtuara nga IA.',
            duration: '25 min',
            level: 'Nërmjetëm',
            category: 'Spërkatje'
        },
        {
            title: 'Procedurat e Urgjencës',
            desc: 'Një udhëzues i plotë për trajtimin e motit të papritur dhe problemeve teknike.',
            duration: '10 min',
            level: 'Avancuar',
            category: 'Siguri'
        }
    ];

    return (
        <div className="education-page">
            <section className="edu-hero">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="section-tag">Qendra e Edukimit</span>
                        <h1>Përvetësoni Artin e <span className="gradient-text">Teknologjisë së Dronëve Bujqësorë</span></h1>
                        <p>Trajnime gjithëpërfshirëse, udhëzues sigurie dhe video udhëzuese teknike për fermerin modern.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    {/* Categories */}
                    <div className="edu-categories-grid">
                        {categories.map((cat) => (
                            <motion.div key={cat.id} className="cat-card glass" whileHover={{ y: -5 }}>
                                <div className="cat-icon">{cat.icon}</div>
                                <h3>{cat.title}</h3>
                                <span>{cat.count}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="edu-main-grid">
                        {/* Featured Tutorials */}
                        <div className="featured-tutorials">
                            <div className="sec-header">
                                <h2>Rekomanduar <span className="gradient-text">për Ju</span></h2>
                                <button className="btn-text">Shiko të Gjitha <ArrowRight size={18} /></button>
                            </div>
                            <div className="tutorials-list">
                                {tutorials.map((tut, i) => (
                                    <div key={i} className="tutorial-card glass">
                                        <div className="tut-image">
                                            <BookOpen size={48} />
                                            <span className="level-badge">{tut.level}</span>
                                        </div>
                                        <div className="tut-content">
                                            <div className="tut-meta">
                                                <span><Clock size={14} /> {tut.duration}</span>
                                                <span>•</span>
                                                <span>{tut.category}</span>
                                            </div>
                                            <h3>{tut.title}</h3>
                                            <p>{tut.desc}</p>
                                            <button className="btn-primary-sm">Fillo Mësimin</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="edu-sidebar">
                            <div className="safety-alert glass">
                                <Shield size={32} className="icon" />
                                <h3>Siguria e Para</h3>
                                <p>Gjithmonë kontrolloni rregulloret lokale të aviacionit para se të fluturoni. Shkarkoni listën tonë të pajtueshmërisë 2024.</p>
                                <button className="btn-outline full-width">Shkarko PDF</button>
                            </div>

                            <div className="certification-card glass">
                                <GraduationCap size={32} className="icon" />
                                <h3>Certifikohuni</h3>
                                <p>Përfundoni kursin tonë profesional për pilot të dronëve dhe certifikohuni nga AeroAgro AI.</p>
                                <button className="btn-primary full-width">Regjistrohu Tani</button>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Education;
