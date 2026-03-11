import React from 'react';
import { Link } from 'react-router-dom';
import { Drone, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <Link to="/" className="logo">
                        <Drone className="logo-icon" size={32} />
                        <span>AeroAgro AI</span>
                    </Link>
                    <p className="footer-desc">
                        Empowering modern agriculture with AI-powered drone technology. Precision farming for a sustainable future.
                    </p>
                    <div className="social-links">
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Twitter size={20} /></a>
                        <a href="#"><Linkedin size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/products">Drones</Link></li>
                        <li><Link to="/how-it-works">How It Works</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                    </ul>
                </div>

                <div className="footer-services">
                    <h3>Services</h3>
                    <ul>
                        <li><a href="#">Crop Monitoring</a></li>
                        <li><a href="#">Precision Spraying</a></li>
                        <li><a href="#">Field Mapping</a></li>
                        <li><a href="#">Irrigation Check</a></li>
                        <li><a href="#">Yield Prediction</a></li>
                    </ul>
                </div>

                <div className="footer-newsletter">
                    <h3>Newsletter</h3>
                    <p>Get the latest updates in smart farming.</p>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Your email address" required />
                        <button type="submit">
                            <ArrowRight size={20} />
                        </button>
                    </form>
                    <div className="contact-info">
                        <div className="info-item">
                            <Phone size={16} />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="info-item">
                            <Mail size={16} />
                            <span>contact@aeroagro.ai</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; 2026 AeroAgro AI. All rights reserved.</p>
                    <div className="bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
