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
        { icon: <Leaf size={28} />, title: 'Qëndrueshmëria', desc: 'Ne ndërtojmë teknologji që redukton ndikimin mjedisor duke maksimizuar prodhimin bujqësor.' },
        { icon: <Cpu size={28} />, title: 'Inovacioni', desc: 'Shtyjmë kufijtë e IA dhe robotikës për të zgjidhur sfidat reale të bujqësisë.' },
        { icon: <Shield size={28} />, title: 'Besueshmëria', desc: 'Sisteme të nivelit të ndërmarrjes me 99.9% kohë në punë, të krijuara për operacione kritike.' },
        { icon: <Users size={28} />, title: 'Komuniteti', desc: 'Partneritet me fermerët në mbarë botën për të ndërtuar një ekosistem bujqësor më të zgjuar dhe më të lidhur.' },
    ];

    const milestones = [
        { year: '2020', title: 'Themelimi', desc: 'AeroAgro AI u themelua nga një ekip studiuesish të IA dhe inxhinierësh bujqësorë.' },
        { year: '2021', title: 'Droni i Parë', desc: 'Lansuam dronin tonë të parë për monitorimin e të mbjellave, prototipin AeroScout X1.' },
        { year: '2022', title: 'Integrimi i IA', desc: 'Integruam analizat e fuqizuara nga GPT në platformën tonë të menaxhimit të flotës së dronëve.' },
        { year: '2023', title: 'Zgjerimi Global', desc: 'Zgjeruam operacionet në 15 vende me mbi 200 klientë ndërmarrje.' },
        { year: '2024', title: 'Flota IA', desc: 'Publikuam IA për koordinimin e flotës me shumë dronë për operacione në shkallë të gjerë.' },
        { year: '2025', title: 'Arritja 2M Akra', desc: 'Tejkalim i 2 milionë akrave të monitoruara nga flota jonë e dronëve me fuqi IA.' },
    ];

    const techStack = [
        { icon: <Cpu size={24} />, name: 'Vizioni Kompjuterik', desc: 'Njohje e avancuar e imazheve për analizën e të mbjellave' },
        { icon: <Globe size={24} />, name: 'Integrimi Satelitor', desc: 'Kombinimi në kohë reale i të dhënave satelitore për hartëzim preciz' },
        { icon: <Rocket size={24} />, name: 'Edge Computing', desc: 'Përpunim direkt në pajisje për të dhëna të menjëhershme në fushë' },
        { icon: <Award size={24} />, name: 'Mësimi Makinerik', desc: 'Modele parashikuese të trajnuara në miliona pika të dhënash' },
    ];

    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="section-tag">Rreth Nesh</span>
                        <h1>Pionierë të së Ardhmes së <span className="gradient-text">Bujqësisë Inteligjente</span></h1>
                        <p>Ne jemi në një mision për të fuqizuar fermerët me teknologjinë e dronëve të drejtuar nga IA që e bën bujqësinë precize të aksesueshme, efikase dhe të qëndrueshme.</p>
                    </motion.div>
                </div>
            </section>

            {/* Mission */}
            <section className="section-padding mission-section">
                <div className="container">
                    <div className="mission-grid">
                        <motion.div className="mission-content" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <span className="section-tag">Misioni Ynë</span>
                            <h2>Bërja e Bujqësisë Precize të <span className="gradient-text">Aksesueshme</span> për të Gjithë</h2>
                            <p>Në AeroAgro AI, ne besojmë që çdo fermer — nga operacionet e vogla familjare te ndërmarrjet e mëdha — meriton akses në teknologjinë më të fundit. Dronët tanë me fuqi IA demokratizojnë bujqësinë precize, duke ndihmuar fermerët të rrisin rendimentet, të ulin kostot dhe të mbrojnë mjedisin.</p>
                            <p>Ne kombinojmë teknologjinë autonome të dronëve me inteligjencën artificiale të avancuar për të dhënë njohuri të zbatueshme që transformojnë mënyrën se si rritet ushqimi. Platforma jonë përpunon miliona pika të dhënash çdo ditë, duke ofruar monitorim të shëndetit të të mbjellave në kohë reale, analitikë parashikuese dhe operacione bujqësore të automatizuara.</p>
                        </motion.div>
                        <motion.div className="mission-stats" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                            {[
                                { value: '500+', label: 'Ferma të Fuqizuara' },
                                { value: '15', label: 'Shtete' },
                                { value: '50+', label: 'Anëtarë Ekipi' },
                                { value: '98%', label: 'Kënaqësi e Klientit' },
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
                        <span className="section-tag">Vlerat Tona</span>
                        <h2>Çfarë Na <span className="gradient-text">Motivon</span></h2>
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
                        <span className="section-tag">Teknologjia Jonë</span>
                        <h2>Inovacion në <span className="gradient-text">Bujqësinë Inteligjente</span></h2>
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
                        <span className="section-tag">Rrugëtimi Ynë</span>
                        <h2>Duke Ndërtuar <span className="gradient-text">Të Ardhmen</span></h2>
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
