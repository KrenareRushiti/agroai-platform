import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, ShoppingBag, Map as MapIcon,
    Settings, Bell, LogOut, Plane, Battery,
    Calendar, AlertTriangle, TrendingUp, CheckCircle2
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const userStats = [
        { label: 'Sipërfaqja Totale e Trajtuar', value: '1,240 ha', icon: <MapIcon size={20} />, color: '#10b981' },
        { label: 'Orët Totale të Fluturimit', value: '158 orë', icon: <Plane size={20} />, color: '#3b82f6' },
        { label: 'Shëndeti Mesatar i Baterisë', value: '94%', icon: <Battery size={20} />, color: '#f59e0b' },
        { label: 'Dronë Aktivë', value: '3', icon: <CheckCircle2 size={20} />, color: '#8b5cf6' },
    ];

    const myDrones = [
        { id: 1, name: 'AeroScout X1', status: 'Në Ajër', battery: '65%', health: 'Shkëlqyeshëm', lastMaintained: '2024-02-15' },
        { id: 2, name: 'AgroSpray Pro', status: 'Duke u Karikuar', battery: '20%', health: 'Mirë', lastMaintained: '2024-03-01' },
        { id: 3, name: 'TerraScan Elite', status: 'Gati', battery: '100%', health: 'Shkëlqyeshëm', lastMaintained: '2024-01-20' },
    ];

    const reminders = [
        { id: 1, type: 'warning', title: 'Zëvendësimi i Helikës', msg: 'Helika e AgroSpray Pro (#2) duhet të zëvendësohet pas 10 orësh fluturimi.', date: 'Së shpejti' },
        { id: 2, type: 'info', title: 'Përditësimi i Softuerit', msg: 'Algoritme të reja të vizionit IA janë të disponueshme për serinë AeroScout.', date: 'Sot' },
        { id: 3, type: 'success', title: 'Misioni u Përfundua', msg: 'Fusha "Veriu 40" u skanua 100%. Analiza e IA është gati.', date: 'Para 2h' },
    ];

    return (
        <div className="dashboard-page">
            <div className="dashboard-container container">
                {/* Sidebar */}
                <aside className="dash-sidebar glass">
                    <div className="user-profile">
                        <div className="user-avatar">JD</div>
                        <div className="user-info">
                            <h4>John Doe</h4>
                            <span>Fermer Premium</span>
                        </div>
                    </div>

                    <nav className="dash-nav">
                        <button className={`dash-nav-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                            <LayoutDashboard size={20} /> Përmbledhje
                        </button>
                        <button className={`dash-nav-link ${activeTab === 'drones' ? 'active' : ''}`} onClick={() => setActiveTab('drones')}>
                            <Plane size={20} /> Flota Ime
                        </button>
                        <button className={`dash-nav-link ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                            <ShoppingBag size={20} /> Historiku i Porosive
                        </button>
                        <button className={`dash-nav-link ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                            <Settings size={20} /> Cilësimet
                        </button>
                    </nav>

                    <button className="logout-btn">
                        <LogOut size={20} /> Dil
                    </button>
                </aside>

                {/* Main Content */}
                <main className="dash-content">
                    <header className="dash-header">
                        <h1>Paneli i <span className="gradient-text">Përgjithshëm</span></h1>
                        <div className="header-actions">
                            <button className="notif-btn"><Bell size={20} /><span className="dot"></span></button>
                            <span className="date-display">{new Date().toLocaleDateString('sq-AL', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </header>

                    {/* Stats Grid */}
                    <div className="stats-grid">
                        {userStats.map((stat, i) => (
                            <motion.div
                                key={i}
                                className="stat-card glass"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>{stat.icon}</div>
                                <div className="stat-info">
                                    <span className="label">{stat.label}</span>
                                    <h3>{stat.value}</h3>
                                </div>
                                <TrendingUp size={16} className="trend-icon" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="dash-main-grid">
                        {/* Fleet Section */}
                        <section className="fleet-section glass">
                            <div className="sec-header">
                                <h3>Flota Ime e Dronëve</h3>
                                <button className="btn-text">Shiko të Gjitha</button>
                            </div>
                            <div className="fleet-list">
                                {myDrones.map((drone) => (
                                    <div key={drone.id} className="fleet-item">
                                        <div className="drone-icon"><Plane size={24} /></div>
                                        <div className="drone-info">
                                            <h4>{drone.name}</h4>
                                            <span className={`status-badge ${drone.status.toLowerCase().replace(' ', '-')}`}>{drone.status}</span>
                                        </div>
                                        <div className="drone-specs">
                                            <div className="spec">
                                                <Battery size={14} /> <span>{drone.battery}</span>
                                            </div>
                                            <div className="spec">
                                                <AlertTriangle size={14} /> <span>{drone.health}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Reminders & Alerts */}
                        <section className="alerts-section glass">
                            <div className="sec-header">
                                <h3>Sinjalizimet & Mirëmbajtja</h3>
                                <button className="btn-text">Pastro të Gjitha</button>
                            </div>
                            <div className="alerts-list">
                                {reminders.map((alert) => (
                                    <div key={alert.id} className={`alert-item ${alert.type}`}>
                                        <div className="alert-header">
                                            <h4>{alert.title}</h4>
                                            <span>{alert.date}</span>
                                        </div>
                                        <p>{alert.msg}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Recent Recommendations */}
                    <section className="recommendations-section glass">
                        <h3>Rekomandime të Përdorimit nga IA</h3>
                        <div className="rec-grid">
                            <div className="rec-card">
                                <TrendingUp size={24} className="icon" />
                                <h4>Koha Optimale për Spërkatje</h4>
                                <p>Kushtet e motit janë ideale për operacionet e "AgroSpray Pro" nesër në mëngjes nga ora 5:00 paradite deri në orën 10:00 paradite.</p>
                                <button className="btn-primary-sm">Planifiko Misionin</button>
                            </div>
                            <div className="rec-card">
                                <AlertTriangle size={24} className="icon warning" />
                                <h4>U Zbulua Mungesë Uji</h4>
                                <p>Analiza e IA në Sektorin B-4 tregon shenja të hershme të mungesës së ujit. Rekomandohet misioni i hartëzimit TerraScan.</p>
                                <button className="btn-primary-sm">Fillo Hartëzimin</button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
