import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Welcome to Velvora! I am your AI Concierge. How may I assist you with your fragrance journey today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/chat/ask', { message: userMsg });
      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: 'My apologies, I am having trouble connecting.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-[#f8c8dc] text-black p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:scale-110 transition-transform z-50 animate-bounce flex items-center justify-center border border-pink-300 pointer-events-auto"
        >
          <Sparkles size={18} className="absolute top-2 right-2 opacity-50 text-black" />
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-black border border-[#f8c8dc]/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 pointer-events-auto shadow-[#f8c8dc]/10">
          {/* Header */}
          <div className="bg-[#f8c8dc]/10 p-4 flex justify-between items-center border-b border-[#f8c8dc]/20">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#f8c8dc]" size={20} />
              <h3 className="font-serif text-[#f8c8dc] font-bold text-lg">Velvora AI Concierge</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 font-sans text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl max-w-[85%] ${
                  msg.role === 'user' 
                    ? 'bg-[#f8c8dc] text-black rounded-tr-sm' 
                    : 'bg-white/10 text-white rounded-tl-sm border border-white/5'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-neutral-400 p-3 rounded-2xl rounded-tl-sm flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0.2s'}} />
                  <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0.4s'}} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 border-t border-[#f8c8dc]/20 bg-black flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about perfumes..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f8c8dc] transition-all font-sans text-sm"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || loading}
              className="bg-[#f8c8dc] text-black w-12 rounded-xl flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
