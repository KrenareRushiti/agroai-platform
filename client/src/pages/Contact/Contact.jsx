import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Clock, Calendar } from 'lucide-react';
import './Contact.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } })
};

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', farmSize: '' });
    const [demoData, setDemoData] = useState({ name: '', email: '', company: '', date: '', farmSize: '', notes: '' });
    const [activeTab, setActiveTab] = useState('contact');
    const [submitted, setSubmitted] = useState(false);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    const handleDemoSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <div className="container">
                    <motion.div className="section-header" initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="section-tag">Get in Touch</span>
                        <h1>Let's Start a <span className="gradient-text">Conversation</span></h1>
                        <p>Have questions about our drones? Want a live demo? We're here to help.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container contact-grid">
                    <motion.div className="contact-info" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <h2>Contact Information</h2>
                        <p>Reach out to us for sales inquiries, support, or partnership opportunities.</p>
                        <div className="info-cards">
                            <div className="info-card glass">
                                <div className="info-icon"><Phone size={22} /></div>
                                <div>
                                    <strong>Phone</strong>
                                    <span>+1 (555) 123-4567</span>
                                </div>
                            </div>
                            <div className="info-card glass">
                                <div className="info-icon"><Mail size={22} /></div>
                                <div>
                                    <strong>Email</strong>
                                    <span>contact@aeroagro.ai</span>
                                </div>
                            </div>
                            <div className="info-card glass">
                                <div className="info-icon"><MapPin size={22} /></div>
                                <div>
                                    <strong>Office</strong>
                                    <span>123 AgTech Blvd, San Jose, CA 95134</span>
                                </div>
                            </div>
                            <div className="info-card glass">
                                <div className="info-icon"><Clock size={22} /></div>
                                <div>
                                    <strong>Hours</strong>
                                    <span>Mon-Fri: 8AM - 6PM PST</span>
                                </div>
                            </div>
                        </div>

                        {/* Map placeholder */}
                        <div className="map-container glass">
                            <iframe
                                title="AeroAgro AI Office"
                                src="https://www.openstreetmap.org/export/embed.html?bbox=-121.95,37.35,-121.85,37.40&layer=mapnik"
                                width="100%"
                                height="250"
                                style={{ border: 0, borderRadius: '12px' }}
                                loading="lazy"
                            ></iframe>
                        </div>
                    </motion.div>

                    <motion.div className="contact-form-area" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                        <div className="form-tabs">
                            <button className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>
                                <Mail size={18} /> Contact Us
                            </button>
                            <button className={`tab-btn ${activeTab === 'demo' ? 'active' : ''}`} onClick={() => setActiveTab('demo')}>
                                <Calendar size={18} /> Book a Demo
                            </button>
                        </div>

                        {submitted && (
                            <div className="success-msg">
                                ✓ Your message has been sent! We'll get back to you within 24 hours.
                            </div>
                        )}

                        {activeTab === 'contact' ? (
                            <form className="contact-form glass" onSubmit={handleContactSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name *</label>
                                        <input type="text" placeholder="John Doe" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input type="email" placeholder="john@example.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Farm Size</label>
                                        <select value={formData.farmSize} onChange={e => setFormData({ ...formData, farmSize: e.target.value })}>
                                            <option value="">Select farm size</option>
                                            <option value="small">Under 100 acres</option>
                                            <option value="medium">100 - 500 acres</option>
                                            <option value="large">500 - 2000 acres</option>
                                            <option value="enterprise">2000+ acres</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Subject *</label>
                                    <input type="text" placeholder="How can we help?" required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Message *</label>
                                    <textarea rows="5" placeholder="Tell us about your needs..." required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                                </div>
                                <button type="submit" className="btn-primary" id="contact-submit-btn">
                                    <Send size={18} /> Send Message
                                </button>
                            </form>
                        ) : (
                            <form className="contact-form glass" onSubmit={handleDemoSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name *</label>
                                        <input type="text" placeholder="John Doe" required value={demoData.name} onChange={e => setDemoData({ ...demoData, name: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input type="email" placeholder="john@example.com" required value={demoData.email} onChange={e => setDemoData({ ...demoData, email: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Company</label>
                                        <input type="text" placeholder="Your company" value={demoData.company} onChange={e => setDemoData({ ...demoData, company: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Preferred Date *</label>
                                        <input type="date" required value={demoData.date} onChange={e => setDemoData({ ...demoData, date: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Farm Size *</label>
                                    <select required value={demoData.farmSize} onChange={e => setDemoData({ ...demoData, farmSize: e.target.value })}>
                                        <option value="">Select farm size</option>
                                        <option value="small">Under 100 acres</option>
                                        <option value="medium">100 - 500 acres</option>
                                        <option value="large">500 - 2000 acres</option>
                                        <option value="enterprise">2000+ acres</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Additional Notes</label>
                                    <textarea rows="4" placeholder="Any specific topics or drones you'd like to see?" value={demoData.notes} onChange={e => setDemoData({ ...demoData, notes: e.target.value })}></textarea>
                                </div>
                                <button type="submit" className="btn-primary" id="demo-submit-btn">
                                    <Calendar size={18} /> Schedule Demo
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
