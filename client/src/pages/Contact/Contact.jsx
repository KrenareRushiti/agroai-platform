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
                        <span className="section-tag">Na Kontaktoni</span>
                        <h1>Bisedo me <span className="gradient-text">ne</span></h1>
                        <p>Keni pyetje për dronët tanë? Dëshironi një demo live? Ne jemi këtu për t'ju ndihmuar.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container contact-grid">
                    <motion.div className="contact-info" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <h2>Informacioni i Kontaktit</h2>
                        <p>Na kontaktoni për kërkesa shitjeje, mbështetje, ose mundësi partneriteti.</p>
                        <div className="info-cards">
                            <div className="info-card glass">
                                <div className="info-icon"><Phone size={22} /></div>
                                <div>
                                    <strong>Telefoni</strong>
                                    <span>+1 (555) 123-4567</span>
                                </div>
                            </div>
                            <div className="info-card glass">
                                <div className="info-icon"><Mail size={22} /></div>
                                <div>
                                    <strong>Emaili</strong>
                                    <span>Aero Agro@gmail.com</span>
                                </div>
                            </div>
                            <div className="info-card glass">
                                <div className="info-icon"><MapPin size={22} /></div>
                                <div>
                                    <strong>Zyra</strong>
                                    <span>Prishtinë, Kosovë</span>
                                </div>
                            </div>
                            <div className="info-card glass">
                                <div className="info-icon"><Clock size={22} /></div>
                                <div>
                                    <strong>Orari</strong>
                                    <span>Hën-Pre: 8AM - 6PM PST</span>
                                </div>
                            </div>
                        </div>

                        {/* Map placeholder */}
                        <div className="map-container glass">
                            <iframe
                                title="AeroAgro AI Office Prishtina"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46940.16368817751!2d21.12353396911681!3d42.66291380963507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ee605110927%3A0x9365bfdf385eb95a!2sPristina%2C%20Kosovo!5e0!3m2!1sen!2s!4v1714000000000!5m2!1sen!2s"
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
                                <Mail size={18} /> Na Kontaktoni
                            </button>
                            <button className={`tab-btn ${activeTab === 'demo' ? 'active' : ''}`} onClick={() => setActiveTab('demo')}>
                                <Calendar size={18} /> Rezervo Demo
                            </button>
                        </div>

                        {submitted && (
                            <div className="success-msg">
                                ✓ Mesazhi juaj u dërgua! Ne do t'ju kthejmë përgjigje brenda 24 orëve.
                            </div>
                        )}

                        {activeTab === 'contact' ? (
                            <form className="contact-form glass" onSubmit={handleContactSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Emri i Plotë *</label>
                                        <input type="text" placeholder="John Doe" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Emaili *</label>
                                        <input type="email" placeholder="john@example.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Telefoni</label>
                                        <input type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Madhësia e Fermës</label>
                                        <select value={formData.farmSize} onChange={e => setFormData({ ...formData, farmSize: e.target.value })}>
                                            <option value="">Zgjidh madhësinë</option>
                                            <option value="small">Nën 100 akra</option>
                                            <option value="medium">100 - 500 akra</option>
                                            <option value="large">500 - 2000 akra</option>
                                            <option value="enterprise">2000+ akra</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Subjekti *</label>
                                    <input type="text" placeholder="Si mund t'ju ndihmojmë?" required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Mesazhi *</label>
                                    <textarea rows="5" placeholder="Na tregoni për nevojat tuaja..." required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                                </div>
                                <button type="submit" className="btn-primary" id="contact-submit-btn">
                                    <Send size={18} /> Dërgo Mesazhin
                                </button>
                            </form>
                        ) : (
                            <form className="contact-form glass" onSubmit={handleDemoSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Emri i Plotë *</label>
                                        <input type="text" placeholder="John Doe" required value={demoData.name} onChange={e => setDemoData({ ...demoData, name: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Emaili *</label>
                                        <input type="email" placeholder="john@example.com" required value={demoData.email} onChange={e => setDemoData({ ...demoData, email: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Kompania</label>
                                        <input type="text" placeholder="Kompania juaj" value={demoData.company} onChange={e => setDemoData({ ...demoData, company: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Data e Preferuar *</label>
                                        <input type="date" required value={demoData.date} onChange={e => setDemoData({ ...demoData, date: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Madhësia e Fermës *</label>
                                    <select required value={demoData.farmSize} onChange={e => setDemoData({ ...demoData, farmSize: e.target.value })}>
                                        <option value="">Zgjidh madhësinë</option>
                                        <option value="small">Nën 100 akra</option>
                                        <option value="medium">100 - 500 akra</option>
                                        <option value="large">500 - 2000 akra</option>
                                        <option value="enterprise">2000+ akra</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Shënime Shtesë</label>
                                    <textarea rows="4" placeholder="Keni tema specifike ose dronë që dëshironi të shihni?" value={demoData.notes} onChange={e => setDemoData({ ...demoData, notes: e.target.value })}></textarea>
                                </div>
                                <button type="submit" className="btn-primary" id="demo-submit-btn">
                                    <Calendar size={18} /> Rezervo Demo
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
