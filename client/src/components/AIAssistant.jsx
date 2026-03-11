import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Brain, User, ChevronDown } from 'lucide-react';
import './AIAssistant.css';

const knowledgeBase = {
    greeting: "Hello! 👋 I'm AeroBot, your AI farming assistant. I can help you:\n\n• Learn about our AI-powered drones\n• Get drone recommendations for your farm\n• Explain pricing and plans\n• Guide you through features\n• Help you book a demo\n\nHow can I help you today?",

    responses: {
        drone: "We offer 4 AI-powered drones:\n\n🛩 **AeroScout X1** ($4,999) - Crop monitoring, 45min flight, 500 acres\n🛩 **AgroSpray Pro** ($12,499) - Precision spraying, 300 acres/hr\n🛩 **TerraScan Elite** ($8,999) - Field mapping, 1000 acres\n🛩 **HarvestGuard Max** ($24,999) - Enterprise fleet, 5000 acres\n\nWhich one would you like to learn more about?",

        recommend: "I'd love to recommend the right drone! Could you tell me:\n\n1. How large is your farm (in acres)?\n2. What's your main need? (monitoring, spraying, mapping, or all-in-one)\n\nBased on that, I'll find the perfect match! 🎯",

        small_farm: "For a small farm (under 100 acres), I recommend the **AeroScout X1** ($4,999 or $299/mo Starter Plan). It offers:\n\n✅ 45-minute flight time\n✅ Real-time crop health monitoring\n✅ AI disease detection\n✅ Mobile app control\n\nWant to book a demo? Just visit our Contact page!",

        medium_farm: "For a medium farm (100-500 acres), I recommend the **Professional Plan** ($799/mo) with:\n\n✅ AeroScout X1 + AgroSpray Pro combo\n✅ Full AI analytics suite\n✅ Precision spraying (60% less chemicals)\n✅ Multi-spectral imaging\n\nThis gives you monitoring AND spraying capabilities!",

        large_farm: "For a large farm (500+ acres), I recommend the **Enterprise Plan** ($1,999/mo) with the **HarvestGuard Max**:\n\n✅ Up to 5 coordinated drones\n✅ Unlimited coverage\n✅ Fleet AI coordination\n✅ Dedicated account manager\n✅ 24/7 premium support\n\nWould you like to schedule a personalized demo?",

        pricing: "Our pricing plans:\n\n💰 **Starter** - $299/mo\nBasic drone, 100 acres, limited AI\n\n💰 **Professional** - $799/mo (Most Popular)\nAdvanced drones, 500 acres, full AI\n\n💰 **Enterprise** - $1,999/mo\nFull fleet, unlimited, dedicated support\n\nAll plans include a 14-day free trial! Visit /pricing for full details.",

        agriculture: "AI drones help agriculture in many ways:\n\n🌱 **Crop Monitoring** - Detect diseases before they're visible\n💧 **Irrigation** - Find water stress with thermal imaging\n🎯 **Precision Spraying** - Apply chemicals only where needed\n🗺️ **Field Mapping** - High-res maps for planning\n📊 **Yield Prediction** - AI estimates your harvest\n\nAll powered by real-time AI analysis!",

        demo: "Great choice! You can book a demo in two ways:\n\n1. Visit our **Contact page** → click 'Book a Demo' tab\n2. Call us at **+1 (555) 123-4567**\n\nOur team will schedule a live flight demo at your farm or a virtual walkthrough. Demos are completely free! 🎉",

        how: "Here's how our system works:\n\n1️⃣ **Plan** - Set flight area via mobile app\n2️⃣ **Fly** - Drone navigates autonomously\n3️⃣ **Capture** - Sensors collect field data\n4️⃣ **Analyze** - AI processes images & data\n5️⃣ **Report** - Dashboard shows insights\n\nThe whole process takes about 30 minutes for a 100-acre field!",

        default: "I'm not sure I understood that completely. I can help with:\n\n• **Drones** - Our products and specs\n• **Recommendations** - Best drone for your farm\n• **Pricing** - Plans and costs\n• **How it works** - Our technology explained\n• **Demo** - Schedule a live demonstration\n\nWhat would you like to know? 🤔"
    }
};

const getResponse = (input) => {
    const lower = input.toLowerCase();

    if (lower.match(/drone|product|model|fleet/)) return knowledgeBase.responses.drone;
    if (lower.match(/recommend|suggest|best|which|right for/)) return knowledgeBase.responses.recommend;
    if (lower.match(/small|under 100|family|little farm/)) return knowledgeBase.responses.small_farm;
    if (lower.match(/medium|100.*(500|acre)|mid.?size/)) return knowledgeBase.responses.medium_farm;
    if (lower.match(/large|enterprise|big|500\+|1000|5000|commercial/)) return knowledgeBase.responses.large_farm;
    if (lower.match(/price|pricing|cost|plan|subscription/)) return knowledgeBase.responses.pricing;
    if (lower.match(/agriculture|farm|crop|help|benefit|why/)) return knowledgeBase.responses.agriculture;
    if (lower.match(/demo|book|schedule|try|test/)) return knowledgeBase.responses.demo;
    if (lower.match(/how|work|process|step/)) return knowledgeBase.responses.how;
    if (lower.match(/hi|hello|hey|good/)) return knowledgeBase.greeting;

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

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input.trim(), timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(() => {
            const response = getResponse(userMessage.content);
            setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }]);
            setIsTyping(false);
        }, 800 + Math.random() * 700);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickActions = [
        { label: '🛩️ View Drones', query: 'Show me your drones' },
        { label: '💰 Pricing', query: 'What are your pricing plans?' },
        { label: '🎯 Recommend', query: 'Recommend a drone for my farm' },
        { label: '📅 Demo', query: 'How do I book a demo?' },
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
                            <h4>AeroBot AI</h4>
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
                        placeholder="Ask about drones, pricing, farming..."
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
