import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Map as MapIcon, Plane, Droplets, Battery, TrendingUp, Info, MapPin, MousePointer2, Trash2, Save } from 'lucide-react';
import { MapContainer, TileLayer, FeatureGroup, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import './Tools.css';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Tools = () => {
    const [activeTool, setActiveTool] = useState('calculator'); // 'calculator' or 'map'

    // Calculator State
    const [calcData, setCalcData] = useState({
        size: 50,
        crop: 'corn',
        budget: 10000,
        operation: 'monitoring'
    });
    const [recommendation, setRecommendation] = useState(null);

    // Map State
    const [area, setArea] = useState(0);
    const [mapItems, setMapItems] = useState([]);

    // Calculate recommendation
    useEffect(() => {
        let drone = '';
        let batteries = 0;
        let duration = 0;
        let improvement = 0;

        if (calcData.operation === 'monitoring') {
            if (calcData.size <= 100) drone = 'AeroScout X1';
            else if (calcData.size <= 500) drone = 'Plani Profesional (X1 + Pro)';
            else drone = 'HarvestGuard Max';
        } else if (calcData.operation === 'spraying') {
            drone = calcData.size <= 300 ? 'AgroSpray Pro' : 'HarvestGuard Max';
        } else {
            drone = 'TerraScan Elite';
        }

        batteries = Math.ceil(calcData.size / 50) + 1;
        duration = (calcData.size / 20).toFixed(1);
        improvement = calcData.operation === 'spraying' ? 60 : 35;

        setRecommendation({
            drone,
            batteries,
            duration,
            improvement,
            price: drone === 'AeroScout X1' ? '$4,999' : drone === 'AgroSpray Pro' ? '$12,499' : '$24,999+'
        });
    }, [calcData]);

    const handleCreated = (e) => {
        const { layerType, layer } = e;
        if (layerType === 'polygon') {
            const latlngs = layer.getLatLngs()[0];
            const areaInSqMeters = L.GeometryUtil.geodesicArea(latlngs);
            const areaInHectares = (areaInSqMeters / 10000).toFixed(2);
            setArea(prev => prev + parseFloat(areaInHectares));
            setMapItems(prev => [...prev, { id: L.stamp(layer), type: layerType, area: areaInHectares }]);
        }
    };

    const handleDeleted = (e) => {
        const { layers } = e;
        layers.eachLayer(layer => {
            const item = mapItems.find(i => i.id === L.stamp(layer));
            if (item) {
                setArea(prev => Math.max(0, prev - parseFloat(item.area)));
                setMapItems(prev => prev.filter(i => i.id !== L.stamp(layer)));
            }
        });
    };

    return (
        <div className="tools-page">
            <section className="tools-hero">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="section-tag">Mjetet Bujqësore</span>
                        <h1>Analizoni & <span className="gradient-text">Planifikoni Fermën Tuaj</span></h1>
                        <p>Përdorni mjetet tona interaktive për të llogaritur efikasitetin, planifikuar shtigjet e fluturimit dhe optimizuar operacionet e dronëve tuaj.</p>
                    </motion.div>

                    <div className="tool-switcher glass">
                        <button
                            className={`switch-btn ${activeTool === 'calculator' ? 'active' : ''}`}
                            onClick={() => setActiveTool('calculator')}
                        >
                            <Calculator size={20} /> Kalkulatori i Efikasitetit
                        </button>
                        <button
                            className={`switch-btn ${activeTool === 'map' ? 'active' : ''}`}
                            onClick={() => setActiveTool('map')}
                        >
                            <MapIcon size={20} /> Planifikuesi i Hartës së Fermës
                        </button>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <AnimatePresence mode="wait">
                        {activeTool === 'calculator' ? (
                            <motion.div
                                key="calculator"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="calculator-grid"
                            >
                                <div className="calc-inputs glass">
                                    <h3>Konfiguro Fermën Tënde</h3>
                                    <div className="input-group">
                                        <label>Madhësia e Fermës (Hektarë)</label>
                                        <input
                                            type="range"
                                            min="1" max="1000"
                                            value={calcData.size}
                                            onChange={(e) => setCalcData({ ...calcData, size: parseInt(e.target.value) })}
                                        />
                                        <div className="range-value">{calcData.size} ha</div>
                                    </div>

                                    <div className="input-group">
                                        <label>Lloji i Të Mbjellave</label>
                                        <select
                                            value={calcData.crop}
                                            onChange={(e) => setCalcData({ ...calcData, crop: e.target.value })}
                                        >
                                            <option value="corn">Misër</option>
                                            <option value="wheat">Grurë</option>
                                            <option value="rice">Oriz</option>
                                            <option value="soybeans">Fasule Soje</option>
                                            <option value="orchard">Pemëtore</option>
                                        </select>
                                    </div>

                                    <div className="input-group">
                                        <label>Operacioni Kryesor</label>
                                        <div className="radio-grid">
                                            <button
                                                className={`radio-btn ${calcData.operation === 'monitoring' ? 'active' : ''}`}
                                                onClick={() => setCalcData({ ...calcData, operation: 'monitoring' })}
                                            >
                                                <TrendingUp size={16} /> Monitorim
                                            </button>
                                            <button
                                                className={`radio-btn ${calcData.operation === 'spraying' ? 'active' : ''}`}
                                                onClick={() => setCalcData({ ...calcData, operation: 'spraying' })}
                                            >
                                                <Droplets size={16} /> Spërkatje
                                            </button>
                                            <button
                                                className={`radio-btn ${calcData.operation === 'mapping' ? 'active' : ''}`}
                                                onClick={() => setCalcData({ ...calcData, operation: 'mapping' })}
                                            >
                                                <MapIcon size={16} /> Hartëzim
                                            </button>
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label>Buxheti i Përafërt ($)</label>
                                        <input
                                            type="number"
                                            value={calcData.budget}
                                            onChange={(e) => setCalcData({ ...calcData, budget: parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <div className="calc-results glass highlight">
                                    <h3>Rekomandimi Ynë</h3>
                                    {recommendation && (
                                        <div className="results-content">
                                            <div className="rec-drone">
                                                <Plane size={32} className="icon-pulse" />
                                                <div>
                                                    <span className="label">Modeli i Rekomanduar</span>
                                                    <h4>{recommendation.drone}</h4>
                                                </div>
                                            </div>

                                            <div className="stats-grid">
                                                <div className="stat-card">
                                                    <Battery size={20} />
                                                    <span>{recommendation.batteries} bateri</span>
                                                    <small>kërkohet për mbulim të plotë</small>
                                                </div>
                                                <div className="stat-card">
                                                    <Plane size={20} />
                                                    <span>{recommendation.duration} orë</span>
                                                    <small>koha e vlerësuar e fluturimit</small>
                                                </div>
                                                <div className="stat-card">
                                                    <TrendingUp size={20} />
                                                    <span>+{recommendation.improvement}%</span>
                                                    <small>rritje produktiviteti</small>
                                                </div>
                                            </div>

                                            <div className="price-estimation">
                                                <span>Investimi Fillestar i Vlerësuar:</span>
                                                <span className="price">{recommendation.price}</span>
                                            </div>

                                            <button className="btn-primary full-width">Merr një Ofertë</button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="map"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="map-planner-container"
                            >
                                <div className="map-sidebar glass">
                                    <h3>Analiza e Tokës</h3>
                                    <div className="area-display">
                                        <span className="label">Sipërfaqja Totale e Zgjedhur</span>
                                        <div className="value">{area} <span>Hektarë</span></div>
                                    </div>

                                    <div className="map-info">
                                        <div className="info-item">
                                            <Info size={16} />
                                            <p>Përdorni mjetin poligon për të vizatuar kufijtë e fermës suaj.</p>
                                        </div>
                                        <div className="flight-estimation">
                                            <h4>Vlerësimi i Fluturimit</h4>
                                            <ul>
                                                <li>Fluturimet e nevojshme: {Math.ceil(area / 40)}</li>
                                                <li>Kohëzgjatja totale: {(area / 20).toFixed(1)} orë</li>
                                                <li>Mbulimi i vlerësuar: {area > 0 ? 'I shkëlqyer' : 'N/A'}</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="map-actions">
                                        <button className="btn-outline full-width"> <Save size={18} /> Ruaj Paraqitjen</button>
                                        <button className="btn-primary full-width"> <Plane size={18} /> Planifiko Fluturimin</button>
                                    </div>
                                </div>

                                <div className="map-wrapper glass">
                                    <MapContainer
                                        center={[41.8781, -87.6298]}
                                        zoom={13}
                                        scrollWheelZoom={true}
                                        style={{ height: '100%', width: '100%', borderRadius: '12px' }}
                                    >
                                        <TileLayer
                                            url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                                            maxZoom={20}
                                            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                                            attribution='&copy; Google Maps'
                                        />
                                        <FeatureGroup>
                                            <EditControl
                                                position="topright"
                                                onCreated={handleCreated}
                                                onDeleted={handleDeleted}
                                                draw={{
                                                    rectangle: false,
                                                    circle: false,
                                                    polyline: false,
                                                    circlemarker: false,
                                                    marker: false,
                                                }}
                                            />
                                        </FeatureGroup>
                                    </MapContainer>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
};

export default Tools;
