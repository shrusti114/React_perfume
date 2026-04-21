import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

import { 
  useAdminStats, useAdminUsers, useAdminOrders, 
  useAdminCategories, useAdminFeedback, useProducts,
  useUpdateUserStatus, useApproveSeller, useDeleteCategory,
  useDeleteFeedback, useUpdateOrderStatus,
  useCreateProduct, useUpdateProduct, useCreateCategory, useDeleteProduct,
  useAdminPayments, useSendNotification, useDeleteUser, useUpdateCategory
} from '../../hooks/useApi';

import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminOverview from './tabs/AdminOverview';
import AdminInventory from './tabs/AdminInventory';
import AdminRegisters from './tabs/AdminRegisters';
import AdminOperations from './tabs/AdminOperations';
import AdminSupport from './tabs/AdminSupport';

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Velocity confirmed. Welcome Eleanor. Interface is operational.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLiveMode, setIsLiveMode] = useState(false);

  // Queries
  const { data: statsData } = useAdminStats();
  const { data: usersData, isLoading: isUsersLoading } = useAdminUsers('');
  const { data: ordersData, isLoading: isOrdersLoading } = useAdminOrders();
  const { data: categoriesData, isLoading: isCategoriesLoading } = useAdminCategories();
  const { data: feedbackData, isLoading: isFeedbackLoading } = useAdminFeedback();
  const { data: productsData, isLoading: isProductsLoading } = useProducts({ search: '' });
  const { data: paymentsData, isLoading: isPaymentsLoading } = useAdminPayments();

  // Mutations
  const updateUserStatus = useUpdateUserStatus();
  const approveSeller = useApproveSeller();
  const deleteCategory = useDeleteCategory();
  const updateCategory = useUpdateCategory();
  const deleteFeedback = useDeleteFeedback();
  const updateOrderStatus = useUpdateOrderStatus();
  const createProduct = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const createCategoryMutation = useCreateCategory();
  const deleteUserMutation = useDeleteUser();
  const sendNotification = useSendNotification();

  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        queryClient.invalidateQueries({ queryKey: ['admin'] });
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isLiveMode, queryClient]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.toLowerCase();
    setChatMessages(prev => [...prev, { role: 'user', text: inputText }]);
    setInputText('');

    setTimeout(() => {
        let response = "Negative. I require more specific parameters to process that command.";
        if (userMsg.includes('stats')) {
            response = `Velocity check complete. Total platform revenue: $${statsData?.stats?.totalRevenue?.toLocaleString() || '420,000'}.`;
        } else if (userMsg.includes('hello')) {
            response = "Greetings, Eleanor. Voice and biometric authentication confirmed.";
        }
        setChatMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 1000);
  };

  const renderContent = () => {
    const props = {
      statsData, usersData, isUsersLoading, ordersData, isOrdersLoading,
      categoriesData, isCategoriesLoading, feedbackData, isFeedbackLoading,
      productsData, isProductsLoading, paymentsData, isPaymentsLoading,
      updateUserStatus, approveSeller, deleteCategory, updateCategory,
      deleteFeedback, updateOrderStatus, createProduct, updateProductMutation,
      deleteProductMutation, createCategoryMutation, deleteUserMutation,
      sendNotification
    };

    switch (activeTab) {
      case 'Dashboard': return <AdminOverview {...props} />;
      case 'Users': return <AdminRegisters {...props} viewRole="user" />;
      case 'Sellers': return <AdminRegisters {...props} viewRole="seller" />;
      case 'Products': 
      case 'Categories': return <AdminInventory {...props} />;
      case 'Orders': 
      case 'Payments': return <AdminOperations {...props} />;
      case 'Feedback': return <AdminSupport {...props} />;
      default: return <AdminOverview {...props} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${isDarkMode ? 'dark' : ''} bg-[var(--admin-bg)]`}>
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} setIsChatOpen={setIsChatOpen} />
      
      <main className="pl-80 min-h-screen">
        <AdminHeader 
          isLiveMode={isLiveMode} 
          setIsLiveMode={setIsLiveMode}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        
        <div className="p-12 max-w-[1600px] mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Velvora Assistant Floating Chat */}
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
          <div className="glass-panel w-96 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col h-[500px] border border-[var(--admin-panel-border)] bg-[var(--admin-panel)]/90 backdrop-blur-2xl">
              <div className="p-6 bg-[var(--admin-accent)] text-black flex justify-between items-center">
                  <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-black animate-pulse"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest font-elegant">Velvora Assistant</span>
                  </div>
                  <button onClick={() => setIsChatOpen(false)} className="text-black/50 hover:text-black font-bold">×</button>
              </div>
              <div className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-hide">
                  {chatMessages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] leading-relaxed ${m.role === 'user' ? 'bg-[var(--admin-accent)] text-black font-bold' : 'bg-white/5 text-[var(--admin-text-primary)] border border-white/5 italic'}`}>
                              {m.text}
                          </div>
                      </div>
                  ))}
              </div>
              <div className="p-4 border-t border-[var(--admin-panel-border)] flex gap-2">
                  <input 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Inquiry sequence..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[11px] outline-none text-[var(--admin-text-primary)] placeholder:text-neutral-500"
                  />
                  <button onClick={handleSendMessage} className="h-11 w-11 bg-[var(--admin-accent)] text-black rounded-xl flex items-center justify-center hover:scale-105 transition-transform"><TrendingUp size={16}/></button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
