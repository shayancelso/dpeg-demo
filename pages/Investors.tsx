import React, { useState } from 'react';
import {
  Search, Filter, Plus, Mail, MoreHorizontal,
  ArrowUpRight, Users, DollarSign, ShieldAlert, X
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
  const [investors, setInvestors] = useState<Investor[]>(mockInvestorsList);

  // Modal states
  const [showAddInvestorModal, setShowAddInvestorModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedInvestorEmail, setSelectedInvestorEmail] = useState('');

  // Filter states
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [riskFilter, setRiskFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [minInvestment, setMinInvestment] = useState(0);

  // Dropdown state
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Toast state
  const [showToast, setShowToast] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Add Investor form state
  const [newInvestor, setNewInvestor] = useState({
    name: '',
    email: '',
    entityType: 'Individual',
    initialInvestment: ''
  });

  // Email compose state
  const [emailContent, setEmailContent] = useState({
    to: '',
    subject: '',
    body: ''
  });

  // Filter investors
  const filteredInvestors = investors.filter(inv => {
    const matchesSearch = inv.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'All' ||
      (riskFilter === 'Low' && inv.riskScore <= 25) ||
      (riskFilter === 'Medium' && inv.riskScore > 25 && inv.riskScore <= 50) ||
      (riskFilter === 'High' && inv.riskScore > 50);
    const matchesMinInvestment = inv.totalInvested >= minInvestment;

    return matchesSearch && matchesRisk && matchesMinInvestment;
  });

  // Pagination
  const totalPages = Math.ceil(filteredInvestors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvestors = filteredInvestors.slice(startIndex, endIndex);

  // Handle Add Investor
  const handleAddInvestor = () => {
    if (!newInvestor.name || !newInvestor.email || !newInvestor.initialInvestment) {
      alert('Please fill in all fields');
      return;
    }

    const investor: Investor = {
      id: String(investors.length + 1),
      name: newInvestor.name,
      email: newInvestor.email,
      totalInvested: parseFloat(newInvestor.initialInvestment),
      activeDeals: 0,
      riskScore: Math.floor(Math.random() * 100),
      lastInteraction: new Date().toISOString().split('T')[0]
    };

    setInvestors([...investors, investor]);
    setShowAddInvestorModal(false);
    setNewInvestor({
      name: '',
      email: '',
      entityType: 'Individual',
      initialInvestment: ''
    });
  };

  // Handle Export CSV
  const handleExportCSV = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Handle Email Modal
  const handleOpenEmailModal = (email: string) => {
    setSelectedInvestorEmail(email);
    setEmailContent({
      to: email,
      subject: '',
      body: ''
    });
    setShowEmailModal(true);
  };

  // Handle Dropdown Actions
  const handleDropdownAction = (action: string, investorId: string) => {
    const investor = investors.find(inv => inv.id === investorId);

    switch (action) {
      case 'View Profile':
        alert(`Viewing profile for ${investor?.name}`);
        break;
      case 'Edit':
        alert(`Editing ${investor?.name}`);
        break;
      case 'Log Interaction':
        alert(`Logging interaction for ${investor?.name}`);
        break;
      case 'Remove':
        if (confirm(`Are you sure you want to remove ${investor?.name}?`)) {
          setInvestors(investors.filter(inv => inv.id !== investorId));
        }
        break;
    }
    setOpenDropdownId(null);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <span>CSV exported successfully</span>
          <button onClick={() => setShowToast(false)} className="ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Add Investor Modal */}
      {showAddInvestorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900">Add New Investor</h3>
              <button onClick={() => setShowAddInvestorModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newInvestor.name}
                  onChange={(e) => setNewInvestor({ ...newInvestor, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter investor name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newInvestor.email}
                  onChange={(e) => setNewInvestor({ ...newInvestor, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="investor@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Entity Type</label>
                <select
                  value={newInvestor.entityType}
                  onChange={(e) => setNewInvestor({ ...newInvestor, entityType: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="Individual">Individual</option>
                  <option value="LLC">LLC</option>
                  <option value="Trust">Trust</option>
                  <option value="Family Office">Family Office</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Initial Investment</label>
                <input
                  type="number"
                  value={newInvestor.initialInvestment}
                  onChange={(e) => setNewInvestor({ ...newInvestor, initialInvestment: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              <button
                onClick={handleAddInvestor}
                className="w-full bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800"
              >
                Save Investor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Compose Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900">Compose Email</h3>
              <button onClick={() => setShowEmailModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">To</label>
                <input
                  type="email"
                  value={emailContent.to}
                  onChange={(e) => setEmailContent({ ...emailContent, to: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={emailContent.subject}
                  onChange={(e) => setEmailContent({ ...emailContent, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Email subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  value={emailContent.body}
                  onChange={(e) => setEmailContent({ ...emailContent, body: e.target.value })}
                  rows={8}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Type your message here..."
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    alert('Email sent!');
                    setShowEmailModal(false);
                  }}
                  className="flex-1 bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800"
                >
                  Send Email
                </button>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Investor Relations</h2>
          <p className="text-slate-500">Manage LP profiles, capital commitments, and engagement.</p>
        </div>
        <button
          onClick={() => setShowAddInvestorModal(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium flex items-center hover:bg-slate-800 shadow-sm"
        >
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
                <div className="flex items-center space-x-2 relative">
                    <button
                      onClick={() => setShowFilterPanel(!showFilterPanel)}
                      className="flex items-center px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50"
                    >
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </button>

                    {/* Filter Dropdown Panel */}
                    {showFilterPanel && (
                      <div className="absolute top-full mt-2 left-0 bg-white border border-slate-200 rounded-lg shadow-lg p-4 w-72 z-10">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Risk Level</label>
                            <div className="space-y-2">
                              {(['All', 'Low', 'Medium', 'High'] as const).map((level) => (
                                <label key={level} className="flex items-center">
                                  <input
                                    type="radio"
                                    name="riskLevel"
                                    value={level}
                                    checked={riskFilter === level}
                                    onChange={(e) => setRiskFilter(e.target.value as 'All' | 'Low' | 'Medium' | 'High')}
                                    className="mr-2"
                                  />
                                  <span className="text-sm text-slate-600">{level}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Min Investment: ${minInvestment.toLocaleString()}
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="10000000"
                              step="100000"
                              value={minInvestment}
                              onChange={(e) => setMinInvestment(parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>

                          <div className="pt-2 border-t border-slate-200">
                            <p className="text-sm text-slate-600">
                              Matching investors: <span className="font-semibold">{filteredInvestors.length}</span>
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setRiskFilter('All');
                              setMinInvestment(0);
                            }}
                            className="w-full text-sm text-slate-600 hover:text-slate-900"
                          >
                            Reset Filters
                          </button>
                        </div>
                      </div>
                    )}
                </div>
            </div>
            <div className="flex space-x-2">
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Export CSV
                </button>
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
                    {currentInvestors.map((inv) => (
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
                                    <button
                                      onClick={() => handleOpenEmailModal(inv.email)}
                                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                    >
                                        <Mail className="w-4 h-4" />
                                    </button>
                                    <div className="relative">
                                      <button
                                        onClick={() => setOpenDropdownId(openDropdownId === inv.id ? null : inv.id)}
                                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                                      >
                                          <MoreHorizontal className="w-4 h-4" />
                                      </button>

                                      {/* Dropdown Menu */}
                                      {openDropdownId === inv.id && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                                          <button
                                            onClick={() => handleDropdownAction('View Profile', inv.id)}
                                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 first:rounded-t-lg"
                                          >
                                            View Profile
                                          </button>
                                          <button
                                            onClick={() => handleDropdownAction('Edit', inv.id)}
                                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                          >
                                            Edit
                                          </button>
                                          <button
                                            onClick={() => handleDropdownAction('Log Interaction', inv.id)}
                                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                          >
                                            Log Interaction
                                          </button>
                                          <button
                                            onClick={() => handleDropdownAction('Remove', inv.id)}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 last:rounded-b-lg"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
            <span>
              Showing {startIndex + 1}-{Math.min(endIndex, filteredInvestors.length)} of {filteredInvestors.length} investors
            </span>
            <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Investors;
