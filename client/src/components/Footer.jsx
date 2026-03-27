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
                        Fuqizimi i bujqësisë moderne me teknologjinë e dronëve me IA. Bujqësi precize për një të ardhme të qëndrueshme.
                    </p>
                    <div className="social-links">
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Twitter size={20} /></a>
                        <a href="#"><Linkedin size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h3>Lidhje të Shpejta</h3>
                    <ul>
                        <li><Link to="/products">Dronët</Link></li>
                        <li><Link to="/how-it-works">Si Funksionon</Link></li>
                        <li><Link to="/about">Rreth Nesh</Link></li>
                        <li><Link to="/dashboard">Paneli i Fermerit</Link></li>
                        <li><Link to="/blog">Blogu</Link></li>
                        <li><Link to="/contact">Kontakti</Link></li>
                    </ul>
                </div>

                <div className="footer-services">
                    <h3>Shërbimet</h3>
                    <ul>
                        <li><a href="#">Monitorimi i të Mbjellave</a></li>
                        <li><a href="#">Spërkatje me Precizion</a></li>
                        <li><a href="#">Hartëzimi i Fushës</a></li>
                        <li><a href="#">Kontrolli i Ujitjes</a></li>
                        <li><a href="#">Parashikimi i Prodhimit</a></li>
                    </ul>
                </div>

                <div className="footer-newsletter">
                    <h3>Buletini Informues</h3>
                    <p>Merrni përditësimet më të fundit në bujqësinë inteligjente.</p>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Adresa juaj e emailit" required />
                        <button type="submit">
                            <ArrowRight size={20} />
                        </button>
                    </form>
                    <div className="contact-info">
                        <div className="info-item">
                            <Phone size={16} />
                            <span>+383 44 123 456</span>
                        </div>
                        <div className="info-item">
                            <Mail size={16} />
                            <span>Aero Agro@gmail.com</span>
                        </div>
                        <div className="info-item">
                            <MapPin size={16} />
                            <span>Prishtinë, Kosovë</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; 2026 AeroAgro AI. Të gjitha të drejtat e rezervuara.</p>
                    <div className="bottom-links">
                        <a href="#">Politikat e Privatësisë</a>
                        <a href="#">Kushtet e Shërbimit</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
