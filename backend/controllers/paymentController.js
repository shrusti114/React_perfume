const processPayment = async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;
    
    // Process mock payment
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid payment amount' });
    }

    // Mock successful transaction
    const transactionId = 'txn_' + Math.random().toString(36).substr(2, 9);
    
    res.json({
      success: true,
      transactionId,
      message: 'Payment processed successfully',
      amount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { processPayment };
