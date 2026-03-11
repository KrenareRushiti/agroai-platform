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
        id: 1, category: 'Smart Farming',
        title: 'How AI is Transforming Modern Agriculture',
        excerpt: 'Discover how artificial intelligence and machine learning are revolutionizing farming practices, from soil analysis to yield prediction.',
        author: 'Dr. Maria Santos', date: 'March 5, 2026', readTime: '8 min read',
        color: '#2ECC71',
    },
    {
        id: 2, category: 'Drone Technology',
        title: 'The Evolution of Agricultural Drones: 2020–2026',
        excerpt: 'A comprehensive look at how drone technology has evolved over the past six years and what the future holds for aerial farming.',
        author: 'James O\'Brien', date: 'Feb 28, 2026', readTime: '6 min read',
        color: '#2E86C1',
    },
    {
        id: 3, category: 'Crop Optimization',
        title: 'Precision Spraying: Reducing Costs by 60%',
        excerpt: 'Learn how AI-guided precision spraying can dramatically cut chemical usage while improving crop protection effectiveness.',
        author: 'Aisha Patel', date: 'Feb 20, 2026', readTime: '5 min read',
        color: '#D4AC0D',
    },
    {
        id: 4, category: 'Agricultural AI',
        title: 'Computer Vision for Early Disease Detection',
        excerpt: 'How multispectral imaging combined with deep learning models can detect plant diseases days before they become visible.',
        author: 'Dr. Chen Wei', date: 'Feb 15, 2026', readTime: '10 min read',
        color: '#2ECC71',
    },
    {
        id: 5, category: 'Smart Farming',
        title: 'The Economics of Drone-Powered Farming',
        excerpt: 'An ROI analysis of adopting AI drone technology for farms of different sizes, from family operations to commercial enterprises.',
        author: 'Sarah Johnson', date: 'Feb 8, 2026', readTime: '7 min read',
        color: '#2E86C1',
    },
    {
        id: 6, category: 'Crop Optimization',
        title: 'NDVI Mapping: A Farmer\'s Guide to Crop Health',
        excerpt: 'Understanding Normalized Difference Vegetation Index data and how it helps you make smarter irrigation and fertilization decisions.',
        author: 'Dr. Maria Santos', date: 'Jan 30, 2026', readTime: '9 min read',
        color: '#D4AC0D',
    },
];

const Blog = () => {
    return (
        <div className="blog-page">
            <section className="blog-hero">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="section-tag">Blog & Resources</span>
                        <h1>Insights on <span className="gradient-text">Smart Agriculture</span></h1>
                        <p>Expert articles on AI, drones, and the future of precision farming.</p>
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
                                    <button className="blog-read-more">
                                        Read Article <ArrowRight size={16} />
                                    </button>
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
