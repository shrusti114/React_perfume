const Product = require('../models/Product');

const askChatbot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.json({ reply: 'Hello! I am your Velvora AI Concierge. How can I assist you in finding the perfect fragrance today?' });
    }

    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('summer') || lowerMsg.includes('fresh') || lowerMsg.includes('light')) {
      const prods = await Product.find({ description: /fresh|summer|citrus/i }).limit(2);
      const suggestions = prods.length ? prods.map(p => p.name).join(' and ') : 'our exclusive fresh collection';
      return res.json({ 
        reply: `For a delightful fresh scent, I highly recommend checking out ${suggestions}. You can filter by "Fresh" in the shop page!` 
      });
    }

    if (lowerMsg.includes('gift') || lowerMsg.includes('recommend') || lowerMsg.includes('suggest') || lowerMsg.includes('best')) {
      const prods = await Product.find().sort({ price: -1 }).limit(1); // Premium product
      const premium = prods.length ? prods[0].name : 'our signature perfumes';
      return res.json({ 
        reply: `I suggest looking at our premium gifting options like ${premium}. Would you prefer sweet floral notes or something deep and musky?` 
      });
    }

    if (lowerMsg.includes('wood') || lowerMsg.includes('strong') || lowerMsg.includes('musk')) {
       return res.json({ 
        reply: 'Ah, you enjoy strong, deep profiles. Our Woody category features bold notes like cedar, oud, and sandalwood. You can rapidly sort and filter by "Woody" in our Shop!' 
      });     
    }
    
    return res.json({ 
      reply: 'Fascinating! As your Velvora AI Concierge, I suggest navigating to our Shop page where you can sort by "Newest" or apply filters to discover exactly what you are dreaming of.' 
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ reply: 'Sorry, I am experiencing a brief cognitive interruption. Please explore our Shop in the meantime!' });
  }
};

module.exports = { askChatbot };
