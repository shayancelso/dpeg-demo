import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Mail, MoreHorizontal, 
  ArrowUpRight, Users, DollarSign, ShieldAlert 
} from 'lucide-react';
import { Investor } from '../types';

const mockInvestorsList: Investor[] = [
  { id: '1', name: 'Global Ventures LLC', totalInvested: 2500000, activeDeals: 4, riskScore: 85, lastInteraction: '2023-11-15', email: 'contact@gv.com' },
  { id: '2', name: 'Dr. Sameer Patel', totalInvested: 500000, activeDeals: 1, riskScore: 45, lastInteraction: '2024-05-10', email: 's.patel@md.com' },
  { id: '3', name: 'Estate Holdings Group', totalInvested: 12000000, activeDeals: 12, riskScore: 12, lastInteraction: '2024-05-20', email: 'invest@ehg.com' },
  { id: '4', name: 'Sarah Jenkins', totalInvested: 150000, activeDeals: 1, riskScore: 60, lastInteraction: '2024-01-12', email: 'sarah.j@gmail.com' },
  { id: '5', name: 'Tech Growth Fund I', totalInvested: 5500000, activeDeals: 6, riskScore: 25, lastInteraction: '2024-06-01', email: 'partners@techgrowth.io' },
  { id: '6', name: 'Michael & Angela Chang', totalInvested: 750000, activeDeals: 2, riskScore: 5, lastInteraction: '2024-06-15', email: 'chang.family@yahoo.com' },
  { id: '7', name: 'Redwood Family Office', totalInvested: 8200000, activeDeals: 9, riskScore: 30, lastInteraction: '2024-04-22', email: 'info@redwoodfo.com' },
];

const Investors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredInvestors = mockInvestorsList.filter(inv => 
    inv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header & Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Investor Relations</h2>
          <p className="text-slate-500">Manage LP profiles, capital commitments, and engagement.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium flex items-center hover:bg-slate-800 shadow-sm">
          <Plus className="w-4 h-4 mr-2" /> Add Investor
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">+12 New</span>
            </div>
            <p className="text-slate-500 text-xs uppercase font-semibold">Total Investors</p>
            <h3 className="text-2xl font-bold text-slate-900">10,450</h3>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-yellow-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">+5.2%</span>
            </div>
            <p className="text-slate-500 text-xs uppercase font-semibold">Total Capital Raised</p>
            <h3 className="text-2xl font-bold text-slate-900">$1.24 B</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                    <ArrowUpRight className="w-5 h-5 text-purple-600" />
                </div>
            </div>
            <p className="text-slate-500 text-xs uppercase font-semibold">Avg. Ticket Size</p>
            <h3 className="text-2xl font-bold text-slate-900">$250 K</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-red-50 rounded-lg">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                </div>
                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">High Priority</span>
            </div>
            <p className="text-slate-500 text-xs uppercase font-semibold">At-Risk Investors</p>
            <h3 className="text-2xl font-bold text-slate-900">142</h3>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col flex-1">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center space-x-4 flex-1">
                <div className="relative max-w-md w-full">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search investors by name, email, or entity..." 
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <button className="flex items-center px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </button>
                </div>
            </div>
            <div className="flex space-x-2">
                <button className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">Export CSV</button>
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                        <th className="px-6 py-4">Investor Name</th>
                        <th className="px-6 py-4">Total Invested</th>
                        <th className="px-6 py-4">Active Deals</th>
                        <th className="px-6 py-4">Churn Risk</th>
                        <th className="px-6 py-4">Last Contact</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredInvestors.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="font-medium text-slate-900">{inv.name}</span>
                                    <span className="text-xs text-slate-400">{inv.email}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-slate-700">
                                ${(inv.totalInvested).toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {inv.activeDeals} Funds
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className={`w-2 h-2 rounded-full mr-2 ${inv.riskScore > 50 ? 'bg-red-500' : inv.riskScore > 25 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                                    <span className="text-sm text-slate-600">{inv.riskScore}%</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">
                                {inv.lastInteraction}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                                        <Mail className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
            <span>Showing {filteredInvestors.length} of 10,450 investors</span>
            <div className="flex space-x-2">
                <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Previous</button>
                <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Investors;