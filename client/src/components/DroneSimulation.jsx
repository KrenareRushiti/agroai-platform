import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Droplets } from 'lucide-react';

const DroneSimulation = () => {
    const [isSpraying, setIsSpraying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => (prev + 0.5) % 100);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Drone flight path calculation
    const getDronePos = (p) => {
        const x = p * 8; // move across
        const row = Math.floor(x / 400);
        const rowX = x % 400;
        const currentX = row % 2 === 0 ? rowX : 400 - rowX;
        const currentY = row * 40;
        return { x: currentX, y: currentY };
    };

    const dronePos = getDronePos(progress * 10);

    return (
        <div className="drone-simulation glass" style={{ padding: '40px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
            <div className="sim-header" style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h4 style={{ color: 'var(--primary)' }}>Live Operation Simulation</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Visualizing Autonomous Spraying Pattern</p>
                </div>
                <button
                    className={`btn-outline ${isSpraying ? 'active-spray' : ''}`}
                    onClick={() => setIsSpraying(!isSpraying)}
                    style={{ fontSize: '0.8rem', padding: '8px 16px' }}
                >
                    <Droplets size={14} /> {isSpraying ? 'Stop Spraying' : 'Start Spraying'}
                </button>
            </div>

            <div className="sim-viewport" style={{
                height: '300px',
                background: 'rgba(16, 185, 129, 0.05)',
                borderRadius: '12px',
                position: 'relative',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                backgroundImage: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}>
                {/* Sprayed area visualization */}
                <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                    {/* Simulated rows */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <rect
                            key={i}
                            x="0" y={i * 40 + 10}
                            width={progress * 8 > i * 400 ? '100%' : '0'}
                            height="20"
                            fill="rgba(16, 185, 129, 0.2)"
                            style={{ transition: 'width 0.1s linear' }}
                        />
                    ))}
                </svg>

                {/* Drone */}
                <motion.div
                    animate={{ x: dronePos.x, y: dronePos.y }}
                    transition={{ type: 'tween', ease: 'linear', duration: 0.05 }}
                    style={{
                        position: 'absolute',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <div style={{
                        color: 'var(--primary)',
                        filter: 'drop-shadow(0 0 10px rgba(124, 58, 237, 0.5))',
                        transform: dronePos.x > 380 || dronePos.x < 20 ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                    }}>
                        <Plane size={32} />
                    </div>
                    {isSpraying && (
                        <motion.div
                            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.2, 0.8] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                            style={{ color: '#10b981', marginTop: '-5px' }}
                        >
                            <Droplets size={16} />
                        </motion.div>
                    )}
                </motion.div>

                {/* Legend */}
                <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '15px',
                    fontSize: '0.7rem',
                    color: 'var(--text-secondary)',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '5px 10px',
                    borderRadius: '5px'
                }}>
                    Coverage: {Math.floor(progress)}% | Alt: 15m | Velocity: 8m/s
                </div>
            </div>

            <style>{`
                .active-spray {
                    background: rgba(16, 185, 129, 0.2) !important;
                    border-color: #10b981 !important;
                    color: #10b981 !important;
                }
            `}</style>
        </div>
    );
};

export default DroneSimulation;
