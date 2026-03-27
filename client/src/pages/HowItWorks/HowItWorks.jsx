import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, Plane, Camera, Brain, BarChart3, ArrowRight, ChevronDown } from 'lucide-react';
import DroneSimulation from '../../components/DroneSimulation';
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
        title: 'Planifikimi i Fluturimit',
        subtitle: 'Kontrolli nga Aplikacioni',
        desc: 'Përdorni aplikacionin tonë intuitiv për të përcaktuar zonën tuaj të fluturimit, vendosni parametrat si lartësia dhe mbivendosja, dhe planifikoni misione autonome. IA optimizon rrugën e fluturimit bazuar në paraqitjen e fermës suaj.',
        details: ['Krijimi i pikave GPS', 'Cilësime të personalizuara të lartësisë', 'Misione të planifikuara', 'Planifikim i ndërgjegjshëm për motin']
    },
    {
        number: '02',
        icon: <Plane size={32} />,
        title: 'Fluturim Autonom',
        subtitle: 'Navigim Inteligjent',
        desc: 'Droni juaj ngrihet dhe lundron në rrugën e planifikuar në mënyrë autonome. Shmangia e pengesave dhe rregullimet në kohë reale sigurojnë mbulim të sigurt dhe efikas të të gjithë fushës suaj.',
        details: ['Shmangia e pengesave', 'Kthim automatik në shtëpi', 'Telemetri në kohë reale', 'Kompensimi i erës']
    },
    {
        number: '03',
        icon: <Camera size={32} />,
        title: 'Mbledhja e të Dhënave',
        subtitle: 'Regjistrim Multi-Sensor',
        desc: 'Sensorët me rezolucion të lartë RGB, multispektral dhe termik regjistrojnë të dhëna gjithëpërfshirëse rreth të mbjellave dhe kushteve të tokës gjatë gjithë fluturimit.',
        details: ['Imazhe RGB (4K)', 'Multispektral NDVI', 'Imazhe termike', 'Të dhëna lartësie LiDAR']
    },
    {
        number: '04',
        icon: <Brain size={32} />,
        title: 'Analiza me IA',
        subtitle: 'Përpunim Inteligjent',
        desc: 'Motori ynë i IA përpunon të dhënat e mbledhura duke përdorur vizionin kompjuterik dhe algoritmet e mësimit makinerik për të identifikuar problemet e të mbjellave, sëmundjet, mungesat e lëndëve ushqyese dhe problemet e ujit.',
        details: ['Zbulimi i sëmundjeve', 'Analiza e lëndëve ushqyese', 'Identifikimi i barërave të këqija', 'Hartëzimi i mungesës së ujit']
    },
    {
        number: '05',
        icon: <BarChart3 size={32} />,
        title: 'Raportet e Panelit',
        subtitle: 'Konkluzione të Veprueshme',
        desc: 'Hyni në raporte të detajuara dhe vizualizime përmes panelit tonë të fermerit. Merrni rekomandime për trajtimin, ujitjen dhe korrjen e optimizuar nga modelet parashikuese të IA.',
        details: ['Harta interaktive të fushës', 'Analitikë e trendeve', 'Rekomandime trajtimi', 'Parashikime rendimenti']
    },
];

const HowItWorks = () => {
    return (
        <div className="hiw-page">
            <section className="hiw-hero">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="section-tag">Si Funksionon</span>
                        <h1>Nga Ngritja te <span className="gradient-text">Konkluzionet e Veprueshme</span></h1>
                        <p>Zbuloni procesin me pesë hapa që transformon të dhënat e papërpunuara të fushës në vendime inteligjente bujqësore.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        style={{ marginTop: '50px' }}
                    >
                        <DroneSimulation />
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
                        <h2>Shikojeni në Veprim</h2>
                        <p>Planifikoni një demo të drejtpërdrejtë dhe shikoni sesi dronët tanë me IA transformojnë të dhënat në konkluzione të veprueshme për fermën tuaj.</p>
                        <Link to="/contact" className="btn-primary" id="hiw-demo-btn">Rezervo një Demo <ArrowRight size={20} /></Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
