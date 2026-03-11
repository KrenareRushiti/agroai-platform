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
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [activeTab, setActiveTab] = useState('overview');
    const [editingDrone, setEditingDrone] = useState(null);

    // Mock data
    const [drones, setDrones] = useState([
        { id: 1, name: 'AeroScout X1', price: '$4,999', category: 'Monitoring', status: 'Active' },
        { id: 2, name: 'AgroSpray Pro', price: '$12,499', category: 'Spraying', status: 'Active' },
        { id: 3, name: 'TerraScan Elite', price: '$8,999', category: 'Mapping', status: 'Active' },
        { id: 4, name: 'HarvestGuard Max', price: '$24,999', category: 'Enterprise', status: 'Active' },
    ]);

    const [blogPosts, setBlogPosts] = useState([
        { id: 1, title: 'How AI is Transforming Agriculture', author: 'Dr. Maria Santos', status: 'Published', date: '2026-03-05' },
        { id: 2, title: 'Evolution of Agricultural Drones', author: 'James O\'Brien', status: 'Published', date: '2026-02-28' },
        { id: 3, title: 'Precision Spraying Cost Analysis', author: 'Aisha Patel', status: 'Draft', date: '2026-02-20' },
    ]);

    const inquiries = [
        { id: 1, name: 'John Smith', email: 'john@farm.com', subject: 'Demo Request', date: '2026-03-10', status: 'New' },
        { id: 2, name: 'Sarah Williams', email: 'sarah@agri.co', subject: 'Enterprise Pricing', date: '2026-03-09', status: 'Replied' },
        { id: 3, name: 'Mike Chen', email: 'mike@greenfield.com', subject: 'Technical Support', date: '2026-03-08', status: 'New' },
    ];

    const stats = [
        { icon: <Eye size={22} />, value: '12,458', label: 'Page Views', change: '+14%', color: '#2ECC71' },
        { icon: <Users size={22} />, value: '2,341', label: 'Visitors', change: '+8%', color: '#2E86C1' },
        { icon: <MessageSquare size={22} />, value: '156', label: 'Inquiries', change: '+23%', color: '#D4AC0D' },
        { icon: <DollarSign size={22} />, value: '$89,200', label: 'Revenue', change: '+18%', color: '#27AE60' },
    ];

    const sidebarItems = [
        { id: 'overview', icon: <BarChart3 size={20} />, label: 'Overview' },
        { id: 'products', icon: <Package size={20} />, label: 'Products' },
        { id: 'blog', icon: <FileText size={20} />, label: 'Blog Posts' },
        { id: 'inquiries', icon: <MessageSquare size={20} />, label: 'Inquiries' },
        { id: 'knowledge', icon: <Database size={20} />, label: 'AI Knowledge Base' },
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginData.email && loginData.password) {
            setIsLoggedIn(true);
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
                        <h1>Customer Inquiries</h1>
                        <div className="admin-table glass">
                            <table>
                                <thead>
                                    <tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Status</th></tr>
                                </thead>
                                <tbody>
                                    {inquiries.map(inq => (
                                        <tr key={inq.id}>
                                            <td><strong>{inq.name}</strong></td>
                                            <td>{inq.email}</td>
                                            <td>{inq.subject}</td>
                                            <td>{inq.date}</td>
                                            <td><span className={`status-badge ${inq.status.toLowerCase()}`}>{inq.status}</span></td>
                                        </tr>
                                    ))}
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
