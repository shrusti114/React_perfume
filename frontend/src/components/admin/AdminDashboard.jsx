import React, { useState } from 'react';
import { 
  Users, Store, Box, ShoppingCart, CreditCard, FolderTree, 
  ShoppingBag, MessageSquare, BarChart3, CheckCircle, ShieldAlert
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, ResponsiveContainer,
  BarChart, Bar, Tooltip as BarTooltip,
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend
} from 'recharts';

// Data for Data Reports
const salesVelocityData = [
  { name: 'Jan', sales: 12000 },
  { name: 'Feb', sales: 19000 },
  { name: 'Mar', sales: 15000 },
  { name: 'Apr', sales: 22000 },
  { name: 'May', sales: 28000 },
  { name: 'Jun', sales: 34000 },
];
const userGrowthData = [
  { role: 'Users', count: 420 },
  { role: 'Sellers', count: 34 },
  { role: 'Admins', count: 2 },
];
const categoryPopularityData = [
  { name: 'Floral', value: 45 },
  { name: 'Woody', value: 30 },
  { name: 'Citrus', value: 15 },
  { name: 'Oriental', value: 10 },
];
const PIE_COLORS = ['#FFD1DC', '#000000', '#A3A3A3', '#FAFAFA'];

// Mock Grid Data for Management Lists
const mockSellers = [
  { _id: 'S001', name: 'Tanya Fragrances', email: 'tanya@gmail.com', stock: 120, isVerified: true },
  { _id: 'S002', name: 'Aroma Atelier', email: 'contact@aroma.com', stock: 45, isVerified: false },
  { _id: 'S003', name: 'Velvet Scents', email: 'sales@velvet.net', stock: 200, isVerified: true }
];

const mockUsers = [
  { _id: 'U001', name: 'Shrusti', email: 'shrusti@gmail.com', role: 'user', isVerified: true },
  { _id: 'U002', name: 'Liam', email: 'liam@domain.com', role: 'user', isVerified: false }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Data Reports');

  // Exact strings from Customer Prompt mapping to Admin Capabilities
  const navLinks = [
    { name: 'User Manager', icon: <Users size={20} />, collection: 'Users' },
    { name: 'Seller Center', icon: <Store size={20} />, collection: 'Users' },
    { name: 'Product Vault', icon: <Box size={20} />, collection: 'Products' },
    { name: 'Order Tracker', icon: <ShoppingCart size={20} />, collection: 'Orders' },
    { name: 'Payment Logs', icon: <CreditCard size={20} />, collection: 'Payments' },
    { name: 'Categories', icon: <FolderTree size={20} />, collection: 'Categories' },
    { name: 'Cart Analysis', icon: <ShoppingBag size={20} />, collection: 'Cart' },
    { name: 'Review Board', icon: <MessageSquare size={20} />, collection: 'Reviews' },
    { name: 'Data Reports', icon: <BarChart3 size={20} />, collection: 'Reports' },
  ];

  const renderGridTable = () => {
    // If we're on Seller Center or User Manager, show a beautifully styled Data Grid.
    const isSeller = activeTab === 'Seller Center';
    const isUser = activeTab === 'User Manager';
    const data = isSeller ? mockSellers : (isUser ? mockUsers : []);

    return (
      <div className="bg-[#0a0a0a] rounded-3xl border border-[#FFD1DC]/10 overflow-hidden shadow-xl mt-8">
        <div className="p-8 border-b border-[#FFD1DC]/10 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-elegant text-white mb-2">{activeTab} Grid</h3>
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest text-[#FFD1DC]">Config Status & File Management</p>
          </div>
          <span className="bg-[#FFD1DC]/20 text-[#FFD1DC] px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold border border-[#FFD1DC]/30">Active Collection Sync</span>
        </div>
        
        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">
                  <th className="p-6 font-medium">Record ID</th>
                  <th className="p-6 font-medium">Name / Email</th>
                  {isSeller && <th className="p-6 font-medium">Total Inventory</th>}
                  {!isSeller && <th className="p-6 font-medium">Account Role</th>}
                  <th className="p-6 font-medium">Verification</th>
                  <th className="p-6 font-medium text-right">Config Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FFD1DC]/5">
                {data.map(record => (
                  <tr key={record._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 text-[#FFD1DC] font-bold text-xs">{record._id}</td>
                    <td className="p-6 flex items-center gap-4">
                      <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center text-white font-elegant">{record.name.charAt(0)}</div>
                      <div>
                        <p className="text-white font-medium">{record.name}</p>
                        <p className="text-neutral-500 text-[10px] lowercase tracking-wide font-sans">{record.email}</p>
                      </div>
                    </td>
                    {isSeller && <td className="p-6 text-neutral-300 font-light">{record.stock} Units</td>}
                    {!isSeller && <td className="p-6 text-neutral-300 font-bold uppercase tracking-widest text-[10px]">{record.role}</td>}
                    <td className="p-6">
                      {record.isVerified ? (
                        <span className="inline-flex items-center gap-1.5 text-[#FFD1DC] text-[10px] font-bold uppercase tracking-widest">
                          <CheckCircle size={14} /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-neutral-500 text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                          <ShieldAlert size={14} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="p-6 text-right">
                      <button className="px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all bg-[#000000] border border-[#FFD1DC]/30 text-[#FFD1DC] hover:bg-[#FFD1DC] hover:text-[#000000]">
                        Edit Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center">
            <h4 className="text-xl font-elegant text-white mb-4">No Data Populated</h4>
            <p className="text-neutral-500 uppercase tracking-widest text-xs font-bold leading-relaxed max-w-sm mx-auto">This Data Grid is currently empty. Connect to the MongoDB Collection to pull real-time configuration arrays.</p>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (activeTab === 'Data Reports') {
      return (
        <div className="space-y-8 animate-in fade-in duration-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black border border-[#FFD1DC]/30 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="text-[#FFD1DC] font-bold uppercase tracking-widest text-[10px] mb-3">Total Revenue</h3>
              <p className="text-4xl font-elegant">$130,000</p>
            </div>
            <div className="bg-black border border-[#FFD1DC]/30 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="text-[#FFD1DC] font-bold uppercase tracking-widest text-[10px] mb-3">Active Users</h3>
              <p className="text-4xl font-elegant">456</p>
            </div>
            <div className="bg-black border border-[#FFD1DC]/30 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="text-[#FFD1DC] font-bold uppercase tracking-widest text-[10px] mb-3">Products Listed</h3>
              <p className="text-4xl font-elegant">1,248</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white shadow-lg rounded-[2rem] p-8 lg:p-10 border-t-8 border-black">
              <h3 className="text-2xl font-elegant text-black mb-8">Sales Velocity Tracking</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesVelocityData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                    <LineTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="sales" stroke="#000000" strokeWidth={4} dot={{ fill: '#FFD1DC', strokeWidth: 3 }} activeDot={{ r: 8, fill: '#000' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-[2rem] p-8 lg:p-10 border-t-8 border-black">
              <h3 className="text-2xl font-elegant text-black mb-8">Role Growth Dynamics</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="role" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                    <BarTooltip cursor={{ fill: '#fafafa' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="count" fill="#FFD1DC" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-[2rem] p-8 lg:p-12 border-t-8 border-black lg:col-span-2">
              <h3 className="text-3xl font-elegant text-black mb-4 text-center">Catalog Popularity</h3>
              <p className="text-center font-bold uppercase tracking-widest text-[#FFD1DC] text-[10px] mb-8">Category Distributions</p>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryPopularityData} cx="50%" cy="50%" labelLine={false} outerRadius={120} dataKey="value" stroke="none">
                      {categoryPopularityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <PieTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default to the Data Grid for all other tabs
    return renderGridTable();
  };

  return (
    <div className="flex bg-[#000000] min-h-screen font-sans selection:bg-[#FFD1DC] selection:text-[#000000]">
      
      {/* Sidebar Navigation */}
      <aside className="bg-black border-r border-[#FFD1DC]/10 h-screen w-72 text-white p-6 fixed z-20 flex flex-col overflow-y-auto">
        <div className="mb-12 text-center pt-4">
          <h1 className="text-4xl font-elegant tracking-wide text-[#FFD1DC] drop-shadow-lg mb-2">Westion Setup</h1>
          <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">System Command Center</p>
        </div>

        <nav className="flex-1 space-y-2.5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => setActiveTab(link.name)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                activeTab === link.name 
                  ? 'bg-white text-black shadow-lg scale-105' 
                  : 'text-neutral-400 hover:text-[#000000] hover:bg-[#FFD1DC]'
              }`}
            >
              <div className="flex items-center gap-4">
                {link.icon}
                <span className="text-left mt-0.5">{link.name}</span>
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="ml-72 flex-1 p-8 lg:p-14 bg-gradient-to-b from-[#0a0a0a] to-[#000000] min-h-screen">
        <header className="flex justify-between items-end border-b border-[#FFD1DC]/10 pb-8 mb-10">
          <div>
            <h2 className="text-5xl font-elegant text-white mb-2">{activeTab}</h2>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#FFD1DC] animate-pulse"></span>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FFD1DC]">Connected Output Stream</p>
            </div>
          </div>
          <button className="bg-black border border-[#FFD1DC] text-[#FFD1DC] hover:bg-[#FFD1DC] hover:text-black font-bold uppercase tracking-widest text-[10px] py-3 px-8 rounded-full transition-all duration-300 shadow-xl hidden sm:block">
            Export Module Data
          </button>
        </header>

        {renderContent()}

      </main>
    </div>
  );
};

export default AdminDashboard;
