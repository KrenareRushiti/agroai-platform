import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Tag, User } from 'lucide-react';
import './Blog.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } })
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const articles = [
    {
        id: 1, category: 'Bujqësi Inteligjente',
        title: 'Si IA po Transformon Bujqësinë Moderne',
        excerpt: 'Zbuloni se si inteligjenca artificiale dhe mësimi makinerik po revolucionarizojnë praktikat bujqësore, nga analiza e tokës deri te parashikimi i rendimentit.',
        author: 'Dr. Maria Santos', date: '5 Mars, 2026', readTime: 'Lexim 8 min',
        color: '#2ECC71',
    },
    {
        id: 2, category: 'Teknologjia e Dronëve',
        title: 'Evolucioni i Dronëve Bujqësorë: 2020–2026',
        excerpt: 'Një vështrim gjithëpërfshirës se si ka evoluar teknologjia e dronëve gjatë gjashtë viteve të fundit dhe çfarë mban e ardhmja për bujqësinë ajrore.',
        author: 'James O\'Brien', date: '28 Shk, 2026', readTime: 'Lexim 6 min',
        color: '#2E86C1',
    },
    {
        id: 3, category: 'Optimizimi i të Mbjellave',
        title: 'Spërkatje me Precizion: Ulja e Kostove me 60%',
        excerpt: 'Mësoni si spërkatja me precizion e udhëhequr nga IA mund të ulë ndjeshëm përdorimin e kimikateve duke përmirësuar efektivitetin e mbrojtjes së të mbjellave.',
        author: 'Aisha Patel', date: '20 Shk, 2026', readTime: 'Lexim 5 min',
        color: '#D4AC0D',
    },
    {
        id: 4, category: 'IA Bujqësore',
        title: 'Vizioni Kompjuterik për Zbulimin e Hershëm të Sëmundjeve',
        excerpt: 'Si imazhet multispektrale të kombinuara me modelet e mësimit të thellë mund të zbulojnë sëmundjet e bimëve ditë para se të bëhen të dukshme.',
        author: 'Dr. Chen Wei', date: '15 Shk, 2026', readTime: 'Lexim 10 min',
        color: '#2ECC71',
    },
    {
        id: 5, category: 'Bujqësi Inteligjente',
        title: 'Ekonomia e Bujqësisë së Fuqizuar nga Dronët',
        excerpt: 'Një analizë e ROI (Kthimi nga Investimi) e adoptimit të teknologjisë së dronëve me IA për ferma të madhësive të ndryshme, nga operacionet familjare te ndërmarrjet komerciale.',
        author: 'Sarah Johnson', date: '8 Shk, 2026', readTime: 'Lexim 7 min',
        color: '#2E86C1',
    },
    {
        id: 6, category: 'Optimizimi i të Mbjellave',
        title: 'Hartëzimi NDVI: Udhëzues për Fermerët Mbi Shëndetin e të Mbjellave',
        excerpt: 'Kuptimi i të dhënave të Indeksit të Diferencës së Normalizuar të Vegjetacionit dhe si ju ndihmon të merrni vendime më të zgjuara për ujitjen dhe plehërimin.',
        author: 'Dr. Maria Santos', date: '30 Jan, 2026', readTime: 'Lexim 9 min',
        color: '#D4AC0D',
    },
];

const Blog = () => {
    return (
        <div className="blog-page">
            <section className="blog-hero">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="section-tag">Blogu & Burimet</span>
                        <h1>Njohuri mbi <span className="gradient-text">Bujqësinë Inteligjente</span></h1>
                        <p>Artikuj nga ekspertë mbi IA, dronë, dhe të ardhmen e bujqësisë me precizion.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <motion.div className="blog-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        {articles.map((article, i) => (
                            <motion.article key={article.id} className="blog-card glass" variants={fadeUp} custom={i}>
                                <div className="blog-card-image" style={{ background: `linear-gradient(135deg, ${article.color}22, ${article.color}08)` }}>
                                    <span className="blog-category" style={{ background: article.color + '33', color: article.color }}>
                                        <Tag size={12} /> {article.category}
                                    </span>
                                </div>
                                <div className="blog-card-content">
                                    <h3>{article.title}</h3>
                                    <p>{article.excerpt}</p>
                                    <div className="blog-card-meta">
                                        <div className="meta-author"><User size={14} />{article.author}</div>
                                        <div className="meta-date"><Clock size={14} />{article.readTime}</div>
                                    </div>
                                    <Link to={`/blog/${article.id}`} className="blog-read-more">
                                        Lexo Artikullin <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
