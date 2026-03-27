import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Brain, User, ChevronDown } from 'lucide-react';
import './AIAssistant.css';

const knowledgeBase = {
    greeting: "Përshëndetje! 👋 Unë jam AeroBot, arkitekti juaj i fermës me IA. Unë mund t'ju ndihmoj të optimizoni fermën tuaj me teknologjinë e dronëve.\n\nMë pyesni për:\n• Rekomandime për dronë bazuar në madhësinë e fermës suaj\n• Jetëgjatësia e baterisë dhe specifikat e mbulimit\n• Strategji për spërkatje me precizion\n• Hartëzimi dhe analiza e ujitjes\n\nSa hektarë po menaxhoni sot?",

    responses: {
        drone: "Flota jonë përfshin:\n\n🛩 **AeroScout X1**: Monitorimi i të mbjellave ($4,999). Më i miri për zbulimin e sëmundjeve dhe problemeve të bimëve.\n🛩 **AgroSpray Pro**: Spërkatje me precizion ($12,499). Ul përdorimin e kimikateve me 60%.\n🛩 **TerraScan Elite**: Hartëzim & Ujitje ($8,999). Topografi me rezolucion të lartë dhe harta për mungesën e ujit.\n🛩 **HarvestGuard Max**: Flotë për ndërmarrje ($24,999). Koordinon deri në 5 dronë për operacione të mëdha.",

        hectares: (h) => {
            if (h < 20) return `Për ${h} hektarë, **AeroScout X1** është i përsosur. Ai mund të mbulojë deri në 500 akra (afërsisht 200 ha) në një mision të vetëm. Do t'ju nevojiten vetëm 1-2 bateri për një ditë të plotë monitorimi.`;
            if (h < 100) return `Për ${h} hektarë, unë rekomandoj **AgroSpray Pro** për trajtim ose **TerraScan Elite** për hartëzim. Me gjasë do t'ju nevojiten 3-4 bateri dhe 2-3 fluturime për të mbuluar zonën plotësisht.`;
            return `Për një operacion të madh prej ${h} hektarësh, duhet të merrni në konsideratë flotën e ndërmarrjes **HarvestGuard Max**. Ai lejon koordinimin e shumë dronëve për të mbuluar zona të mëdha në një fraksion kohe.`;
        },

        battery: "Bateritë e dronëve zakonisht zgjasin 35–60 minuta në varësi të modelit dhe ngarkesës. \n\n• **X1**: 45 min\n• **AgroSpray**: 35 min (më i rëndë për shkak të rezervuarit)\n• **TerraScan**: 55 min\n• **HarvestGuard**: 60 min.\n\nNe rekomandojmë një rrotullim 'Tre-Bateri' (një në fluturim, një duke u karikuar, një gati) për operacion të vazhdueshëm.",

        spraying: "Sistemi ynë inteligjent i spërkatjes përdor **Aplikim me Normë të Ndryshueshme (VRA)**. Analizon shëndetin e të mbjellave në kohë reale dhe spërkat vetëm aty ku zbulohet ndonjë problem ose dëmtues. Kjo mund të kursejë deri në 60% të pesticideve dhe 40% në pleh.",

        mapping: "Hartëzimi ju ndihmon të vizualizoni mungesën e ujit, shëndetin e tokës (NDVI) dhe ndryshimet topografike. **TerraScan Elite** yni prodhon harta me rezolucion 2cm/pixel, të përsosura për planifikimin e ujitjes me precizion.",

        default: "Unë mund t'ju ndihmoj me specifikat e dronëve, llogaritjet e efikasitetit dhe strategjitë bujqësore. \n\nProvo të pyesësh: 'Cili dron për 50 hektarë?' ose 'Sa zgjat bateria?'"
    }
};

const getResponse = (input) => {
    const lower = input.toLowerCase();

    // Check for number + hectare/acre
    const areaMatch = lower.match(/(\d+)\s*(hectar|hectare|ha|acre|ac)/);
    if (areaMatch) {
        const value = parseInt(areaMatch[1]);
        const hectares = areaMatch[2].startsWith('ac') ? value * 0.404 : value;
        return knowledgeBase.responses.hectares(hectares);
    }

    if (lower.match(/dron|drone|product|model|fleet/)) return knowledgeBase.responses.drone;
    if (lower.match(/bateri|battery|last|flight time|how long/)) return knowledgeBase.responses.battery;
    if (lower.match(/spërkatje|spray|pesticid|pesticide|pleh/)) return knowledgeBase.responses.spraying;
    if (lower.match(/hart|harta|map|survey|topograph|ndvi/)) return knowledgeBase.responses.mapping;
    if (lower.match(/rekomando|rekomandim|suggest|best|which|cili/)) return "Unë mund t'ju rekomandoj një dron! Të lutem më trego madhësinë e fermës tënde (p.sh. 'Cili dron për 20 hektarë?')";
    if (lower.match(/përshëndetje|tung|hi|hello|hey|good/)) return knowledgeBase.greeting;

    return knowledgeBase.responses.default;
};

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: knowledgeBase.greeting, timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input.trim(), timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage.content })
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(prev => [...prev, { role: 'assistant', content: data.response, timestamp: new Date() }]);
            } else {
                throw new Error('Backend unavailable');
            }
        } catch (error) {
            console.log('Using local knowledge base fallback');
            // Fallback to local logic
            setTimeout(() => {
                const response = getResponse(userMessage.content);
                setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }]);
            }, 800 + Math.random() * 700);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickActions = [
        { label: '🛩️ Shiko Dronët', query: 'Më trego dronët e tu' },
        { label: '💰 Çmimet', query: 'Cilat janë planet e çmimeve?' },
        { label: '🎯 Rekomando', query: 'Rekomando një dron për fermën time' },
        { label: '📅 Demo', query: 'Si mund të rezervoj një demo?' },
    ];

    return (
        <>
            {/* Floating Button */}
            <button className={`ai-fab ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)} id="ai-assistant-btn">
                {isOpen ? <X size={24} /> : <Brain size={28} />}
                {!isOpen && <span className="fab-pulse" />}
            </button>

            {/* Chat Window */}
            <div className={`ai-chat-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-avatar"><Brain size={22} /></div>
                        <div>
                            <h4>AeroBot IA</h4>
                            <span className="online-status">● Online</span>
                        </div>
                    </div>
                    <button className="chat-close" onClick={() => setIsOpen(false)}>
                        <ChevronDown size={22} />
                    </button>
                </div>

                <div className="chat-messages">
                    {messages.map((msg, i) => (
                        <div key={i} className={`chat-message ${msg.role}`}>
                            <div className="msg-avatar">
                                {msg.role === 'assistant' ? <Brain size={16} /> : <User size={16} />}
                            </div>
                            <div className="msg-bubble">
                                <p>{msg.content}</p>
                                <span className="msg-time">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="chat-message assistant">
                            <div className="msg-avatar"><Brain size={16} /></div>
                            <div className="msg-bubble typing">
                                <span className="dot" /><span className="dot" /><span className="dot" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {messages.length <= 1 && (
                    <div className="quick-actions">
                        {quickActions.map((qa, i) => (
                            <button key={i} className="qa-btn" onClick={() => { setInput(qa.query); }}>
                                {qa.label}
                            </button>
                        ))}
                    </div>
                )}

                <div className="chat-input-area">
                    <input
                        type="text"
                        placeholder="Pyesni rreth dronëve, çmimeve, fermës..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        id="ai-chat-input"
                    />
                    <button className="send-btn" onClick={handleSend} disabled={!input.trim()} id="ai-send-btn">
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default AIAssistant;
