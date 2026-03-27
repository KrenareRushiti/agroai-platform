import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Tag, Share2, Bookmark } from 'lucide-react';
import './BlogDetail.css';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const articles = [
    {
        id: 1,
        category: 'Bujqësi Inteligjente',
        title: 'Si IA po Transformon Bujqësinë Moderne',
        author: 'Dr. Maria Santos',
        date: '5 Mars, 2026',
        readTime: '8 min',
        image: 'https://images.unsplash.com/photo-1594411122171-87a419c8f9f0?q=80&w=2070&auto=format&fit=crop',
        content: `
            <p>Inteligjenca artificiale (IA) nuk është më vetëm një koncept futuristik në bujqësi; ajo është një mjet praktik që po rrit rendimentin dhe po ul kostot në mbarë botën. Përmes algoritmeve të mësimit makinerik, fermerët tani mund të analizojnë të dhënat e tokës në kohë reale.</p>
            
            <h2>Saktësia është kyçi</h2>
            <p>Sipas raporteve të fundit nga <em>The Journal of Agricultural Science</em>, përdorimi i analizës parashikuese mund të rrisë efikasitetin e ujitjes deri në 30%. Modelet tona të IA përdorin imazhe satelitore dhe të dhëna nga dronët për të krijuar harta të shëndetit të fushës.</p>
            
            <blockquote>
                IA nuk zëvendëson fermerin, por i jep atij sy që mund të shohin përtej spektrit të dukshëm.
            </blockquote>
            
            <h2>Citimi dhe Burimet</h2>
            <p>Ky artikull bazohet në kërkimet e <strong>FAO (Organizata e Kombeve të Bashkuara për Ushqimin dhe Bujqësinë)</strong> mbi Transformimin Dixhital në Bujqësi (2024), duke theksuar se integrimi i IA është jetik për sigurinë globale të ushqimit.</p>
        `
    },
    {
        id: 2,
        category: 'Teknologjia e Dronëve',
        title: 'Evolucioni i Dronëve Bujqësorë: 2020–2026',
        author: 'James O\'Brien',
        date: '28 Shk, 2026',
        readTime: '6 min',
        content: `
            <p>Që nga dronët e parë të thjeshtë deri te flotat autonome të sotme, rrugëtimi ka qenë i shpejtë. Sot, dronët si <em>AeroScout X1</em> përdorin përpunim në bord për të identifikuar problemet gjatë fluturimit.</p>
            
            <h2>Nga Monitorimi te Veprimi</h2>
            <p>Në vitin 2020, dronët kryesisht merrnin foto. Në vitin 2026, ata mund të marrin vendime autonome për dozimin e pesticideve pa ndërhyrjen e njeriut.</p>
            
            <blockquote>
                E ardhmja e bujqësisë ajrore qëndron në sinkronizimin e plotë mes flotave të dronëve.
            </blockquote>
            
            <h2>Burimet</h2>
            <p>Një studim nga <strong>University of Wageningen</strong> tregon se dronët modernë kanë një saktësi prej 98% në zbulimin e dëmtuesve në krahasim me 70% të monitorimit tradicional.</p>
        `
    },
    {
        id: 3,
        category: 'Optimizimi i të Mbjellave',
        title: 'Spërkatje me Precizion: Ulja e Kostove me 60%',
        author: 'Aisha Patel',
        date: '20 Shk, 2026',
        readTime: '5 min',
        content: `
            <p>Spërkatja me precizion është teknologjia që po kursen milionat. Duke targetuar vetëm bimët e sëmura, ne reduktojmë sasinë e kimikateve që përfundojnë në tokë dhe ujë.</p>
            
            <h2>Rezultatet e Provuara</h2>
            <p>Testet tona fushore tregojnë një rënie drastike të shpenzimeve për herbicide. Kjo jo vetëm që kursen para, por mbron biodiversitetin.</p>
            
            <blockquote>
                Nuk bëhet fjalë për të spërkatur më shumë, por për të spërkatur në vendin e duhur.
            </blockquote>
            
            <h2>Citimi</h2>
            <p>Referenca: <em>Precision Farming Technology Review, 2025</em> Botuar nga <strong>AgriSpray International</strong>.</p>
        `
    }
];

const BlogDetail = () => {
    const { id } = useParams();
    const article = articles.find(a => a.id === parseInt(id));

    if (!article) {
        return (
            <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px', textAlign: 'center' }}>
                <h2>Artikulli nuk u gjet.</h2>
                <Link to="/blog" className="btn-primary" style={{ marginTop: '20px' }}>Kthehu te Blogu</Link>
            </div>
        );
    }

    return (
        <div className="blog-detail-page">
            <div className="blog-detail-hero" style={{ background: `linear-gradient(rgba(10, 15, 26, 0.7), rgba(10, 15, 26, 0.9)), url(${article.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop'})` }}>
                <div className="container">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <Link to="/blog" className="back-link"><ArrowLeft size={18} /> Kthehu te Blogu</Link>
                        <span className="detail-category">{article.category}</span>
                        <h1 className="detail-title">{article.title}</h1>
                        <div className="detail-meta">
                            <div className="meta-item"><User size={16} /> {article.author}</div>
                            <div className="meta-item"><Clock size={16} /> {article.date}</div>
                            <div className="meta-item"><Tag size={16} /> {article.readTime} lexim</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container content-container">
                <div className="blog-body">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="blog-content"
                        dangerouslySetInnerHTML={{ __html: article.content }}>
                    </motion.div>

                    <div className="blog-sidebar">
                        <div className="sidebar-card glass">
                            <h3>Veprime</h3>
                            <button className="sidebar-btn"><Share2 size={18} /> Shpërndaj</button>
                            <button className="sidebar-btn"><Bookmark size={18} /> Ruaj Artikullin</button>
                        </div>
                        <div className="sidebar-card glass">
                            <h3>Rreth Autorit</h3>
                            <p><strong>{article.author}</strong> është një ekspert në teknologjinë bujqësore me dritë mbi 10 vite përvojë në industrinë e dronëve.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
