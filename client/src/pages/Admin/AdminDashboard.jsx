import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Package, FileText, MessageSquare, Database, Users, Plus, Edit2, Trash2, Eye, TrendingUp, DollarSign, Globe, Activity, Lock, LogIn, ChevronDown, Image, Save } from 'lucide-react';
import './AdminDashboard.css';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const AdminDashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({ email: 'admin@aeroagro.ai', password: 'admin' });
    const [activeTab, setActiveTab] = useState('overview');

    // Live data from MongoDB
    const [orders, setOrders] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch data from backend
    const fetchData = async () => {
        setLoading(true);
        try {
            const resOrders = await fetch('http://localhost:5000/api/orders');
            const dataOrders = await resOrders.json();
            setOrders(dataOrders);

            const resInquiries = await fetch('http://localhost:5000/api/inquiries');
            const dataInquiries = await resInquiries.json();
            setInquiries(dataInquiries);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Mock data for other sections
    const [drones, setDrones] = useState([
        { id: 1, name: 'AeroScout X1', price: '$4,999', category: 'Monitoring', status: 'Active' },
        { id: 2, name: 'AgroSpray Pro', price: '$12,499', category: 'Spraying', status: 'Active' },
        { id: 3, name: 'TerraScan Elite', price: '$8,999', category: 'Mapping', status: 'Active' },
        { id: 4, name: 'HarvestGuard Max', price: '$24,999', category: 'Enterprise', status: 'Active' },
    ]);

    const [blogPosts, setBlogPosts] = useState([
        { id: 1, title: 'E ardhmja e Bujqësisë me Dronë', author: 'Admin', date: '2026-03-20', status: 'Published' }
    ]);

    const stats = [
        { icon: <DollarSign size={22} />, value: orders.length, label: 'Total Orders', change: '+100%', color: '#2ECC71' },
        { icon: <MessageSquare size={22} />, value: inquiries.length, label: 'Inquiries', change: '+100%', color: '#2E86C1' },
        { icon: <TrendingUp size={22} />, value: orders.filter(o => o.orderType === 'buy').length, label: 'Sales', change: '+15%', color: '#D4AC0D' },
        { icon: <Globe size={22} />, value: orders.filter(o => o.orderType === 'rent').length, label: 'Rentals', change: '+5%', color: '#27AE60' },
    ];

    const sidebarItems = [
        { id: 'overview', icon: <BarChart3 size={20} />, label: 'Overview' },
        { id: 'orders', icon: <DollarSign size={20} />, label: 'Orders (Sales/Rent)' },
        { id: 'inquiries', icon: <MessageSquare size={20} />, label: 'Inquiries' },
        { id: 'products', icon: <Package size={20} />, label: 'Products' },
        { id: 'knowledge', icon: <Database size={20} />, label: 'AI Knowledge' },
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginData.email && loginData.password) {
            setIsLoggedIn(true);
            fetchData();
        }
    };

    const deleteDrone = (id) => {
        setDrones(drones.filter(d => d.id !== id));
    };

    const deletePost = (id) => {
        setBlogPosts(blogPosts.filter(p => p.id !== id));
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-login-page">
                <motion.div className="login-card glass" initial="hidden" animate="visible" variants={fadeUp}>
                    <div className="login-header">
                        <Lock size={32} />
                        <h2>Admin Login</h2>
                        <p>Access the AeroAgro AI dashboard</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="admin@aeroagro.ai" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="••••••••" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} required />
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} id="admin-login-btn">
                            <LogIn size={18} /> Sign In
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar glass-dark">
                <div className="sidebar-header">
                    <h3>🚁 Admin Panel</h3>
                </div>
                <nav className="sidebar-nav">
                    {sidebarItems.map(item => (
                        <button key={item.id} className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
                <button className="sidebar-logout" onClick={() => setIsLoggedIn(false)}>
                    Logout
                </button>
            </aside>

            <main className="admin-main">
                {/* Overview */}
                {activeTab === 'overview' && (
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <h1>Dashboard Overview</h1>
                        <div className="stats-grid">
                            {stats.map((s, i) => (
                                <div key={i} className="stat-card glass">
                                    <div className="stat-card-icon" style={{ background: s.color + '22', color: s.color }}>{s.icon}</div>
                                    <div className="stat-card-info">
                                        <strong>{s.value}</strong>
                                        <span>{s.label}</span>
                                    </div>
                                    <div className="stat-change" style={{ color: s.color }}><TrendingUp size={14} /> {s.change}</div>
                                </div>
                            ))}
                        </div>

                        <div className="dashboard-grid">
                            <div className="chart-placeholder glass">
                                <h3>Site Traffic (Last 30 days)</h3>
                                <div className="chart-bars">
                                    {[65, 80, 45, 90, 72, 88, 60, 95, 78, 85, 70, 92].map((v, i) => (
                                        <div key={i} className="chart-bar" style={{ height: `${v}%` }}><span>{v}%</span></div>
                                    ))}
                                </div>
                                <div className="chart-labels">
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                                        <span key={i}>{m}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="recent-inquiries glass">
                                <h3>Recent Inquiries</h3>
                                {inquiries.map(inq => (
                                    <div key={inq.id} className="inquiry-item">
                                        <div>
                                            <strong>{inq.name}</strong>
                                            <span>{inq.subject}</span>
                                        </div>
                                        <span className={`status-badge ${inq.status.toLowerCase()}`}>{inq.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <div className="tab-header">
                            <h1>Manage Products</h1>
                            <button className="btn-primary" id="add-product-btn"><Plus size={18} /> Add Drone</button>
                        </div>
                        <div className="admin-table glass">
                            <table>
                                <thead>
                                    <tr><th>Name</th><th>Price</th><th>Category</th><th>Status</th><th>Actions</th></tr>
                                </thead>
                                <tbody>
                                    {drones.map(d => (
                                        <tr key={d.id}>
                                            <td><strong>{d.name}</strong></td>
                                            <td>{d.price}</td>
                                            <td><span className="category-badge">{d.category}</span></td>
                                            <td><span className="status-badge active">{d.status}</span></td>
                                            <td className="action-btns">
                                                <button className="action-btn edit"><Edit2 size={16} /></button>
                                                <button className="action-btn delete" onClick={() => deleteDrone(d.id)}><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* Blog Posts Tab */}
                {activeTab === 'blog' && (
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <div className="tab-header">
                            <h1>Manage Blog Posts</h1>
                            <button className="btn-primary" id="add-post-btn"><Plus size={18} /> New Post</button>
                        </div>
                        <div className="admin-table glass">
                            <table>
                                <thead>
                                    <tr><th>Title</th><th>Author</th><th>Date</th><th>Status</th><th>Actions</th></tr>
                                </thead>
                                <tbody>
                                    {blogPosts.map(p => (
                                        <tr key={p.id}>
                                            <td><strong>{p.title}</strong></td>
                                            <td>{p.author}</td>
                                            <td>{p.date}</td>
                                            <td><span className={`status-badge ${p.status.toLowerCase()}`}>{p.status}</span></td>
                                            <td className="action-btns">
                                                <button className="action-btn edit"><Edit2 size={16} /></button>
                                                <button className="action-btn delete" onClick={() => deletePost(p.id)}><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* Inquiries Tab */}
                {activeTab === 'inquiries' && (
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <h1>Kërkesat e Klientëve</h1>
                        <div className="admin-table glass">
                            <table>
                                <thead>
                                    <tr><th>Emri</th><th>Email</th><th>Subjekti</th><th>Data</th><th>Statusi</th></tr>
                                </thead>
                                <tbody>
                                    {inquiries.length > 0 ? inquiries.map(inq => (
                                        <tr key={inq._id}>
                                            <td><strong>{inq.name}</strong></td>
                                            <td>{inq.email}</td>
                                            <td>{inq.subject || 'Pa subjekt'}</td>
                                            <td>{new Date(inq.createdAt).toLocaleDateString()}</td>
                                            <td><span className={`status-badge ${inq.status.toLowerCase()}`}>{inq.status}</span></td>
                                        </tr>
                                    )) : <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>Nuk ka kërkesa akoma.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* Orders Tab (Sales & Rentals) */}
                {activeTab === 'orders' && (
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <h1>Porositë (Blerje & Qira)</h1>
                        <div className="admin-table glass">
                            <table>
                                <thead>
                                    <tr><th>Droni</th><th>Klienti</th><th>Lloji</th><th>Detajet</th><th>Statusi</th></tr>
                                </thead>
                                <tbody>
                                    {orders.length > 0 ? orders.map(order => (
                                        <tr key={order._id}>
                                            <td><strong>{order.droneName}</strong></td>
                                            <td>
                                                <div>{order.customerName}</div>
                                                <small style={{ opacity: 0.6 }}>{order.customerEmail} • {order.customerPhone}</small>
                                                {order.company && <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '4px' }}>🏢 {order.company}</div>}
                                            </td>
                                            <td>
                                                <span className={`status-badge ${order.orderType === 'buy' ? 'active' : 'pending'}`}>
                                                    {order.orderType === 'buy' ? 'Blerje' : 'Qira'}
                                                </span>
                                            </td>
                                            <td>
                                                {order.orderType === 'rent' ? (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                        <small>📅 {order.duration} / Fillimi: {new Date(order.startDate).toLocaleDateString()}</small>
                                                        <small>📍 {order.address}</small>
                                                        <small>🎯 {order.purpose}</small>
                                                        <small style={{ color: '#e74c3c' }}>🪪 ID: {order.idNumber}</small>
                                                    </div>
                                                ) : (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                        <small>📍 {order.address}</small>
                                                        <span>Postim Standard</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td><span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
                                        </tr>
                                    )) : <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>Nuk ka porosi akoma.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* Knowledge Base Tab */}
                {activeTab === 'knowledge' && (
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <div className="tab-header">
                            <h1>AI Knowledge Base</h1>
                            <button className="btn-primary" id="add-knowledge-btn"><Plus size={18} /> Add Entry</button>
                        </div>
                        <div className="knowledge-cards">
                            {[
                                { topic: 'Drone Specifications', entries: 12, updated: '2026-03-10' },
                                { topic: 'Pricing & Plans', entries: 8, updated: '2026-03-08' },
                                { topic: 'Agricultural Use Cases', entries: 15, updated: '2026-03-05' },
                                { topic: 'Technical Support FAQs', entries: 24, updated: '2026-03-01' },
                                { topic: 'Company Information', entries: 6, updated: '2026-02-28' },
                            ].map((kb, i) => (
                                <div key={i} className="kb-card glass">
                                    <div className="kb-icon"><Database size={24} /></div>
                                    <div className="kb-info">
                                        <h3>{kb.topic}</h3>
                                        <div className="kb-meta">
                                            <span>{kb.entries} entries</span>
                                            <span>Updated: {kb.updated}</span>
                                        </div>
                                    </div>
                                    <div className="kb-actions">
                                        <button className="action-btn edit"><Edit2 size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
