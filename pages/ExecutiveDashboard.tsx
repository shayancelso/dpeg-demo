import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, DollarSign, Database } from 'lucide-react';
import { IntegrationStatus } from '../types';
import { generateExecutiveSummary } from '../services/geminiService';

const COLORS = ['#d4af37', '#003366', '#94a3b8', '#1e293b'];

const mockFinancialData = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 }, // Intentionally low for AI to spot
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
  { name: 'Jul', revenue: 3490, expenses: 4300 },
];

const mockAssetAllocation = [
  { name: 'Multifamily', value: 45 },
  { name: 'Retail', value: 25 },
  { name: 'Hospitality', value: 20 },
  { name: 'Land', value: 10 },
];

const integrations: IntegrationStatus[] = [
  { service: 'QuickBooks', connected: true, lastSync: '2 mins ago', entitiesSynced: 87 },
  { service: 'AppFolio', connected: true, lastSync: '1 hour ago', entitiesSynced: 245 },
  { service: 'Procore', connected: true, lastSync: '5 mins ago', entitiesSynced: 12 },
  { service: 'CoStar', connected: true, lastSync: '1 day ago', entitiesSynced: 50 },
];

const ExecutiveDashboard: React.FC = () => {
  const [aiSummary, setAiSummary] = useState<string>('Generating real-time insights...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      // Simulate API delay
      setTimeout(async () => {
        const summary = await generateExecutiveSummary(JSON.stringify(mockFinancialData));
        setAiSummary(summary);
        setIsLoading(false);
      }, 1000);
    };
    fetchInsight();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Executive Overview</h2>
          <p className="text-slate-500">Real-time consolidated view across 250+ historical projects.</p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
            <Database className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Data Foundation: 98% Integrity</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total AUM</p>
              <h3 className="text-2xl font-bold text-slate-900">$1.24 B</h3>
            </div>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +12%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Investors</p>
              <h3 className="text-2xl font-bold text-slate-900">10,450</h3>
            </div>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +5%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Avg IRR (Realized)</p>
              <h3 className="text-2xl font-bold text-slate-900">22.4%</h3>
            </div>
            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full flex items-center">
              <Activity className="h-3 w-3 mr-1" /> Stable
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Distributions (YTD)</p>
              <h3 className="text-2xl font-bold text-slate-900">$45.2 M</h3>
            </div>
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
              <ArrowDownRight className="h-3 w-3 mr-1" /> Q3 Pending
            </span>
          </div>
        </div>
      </div>

      {/* AI Insight Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start space-x-4">
            <div className="p-3 bg-white/10 rounded-lg">
                <Activity className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">AI Financial Analyst Insight</h3>
                <div className="prose prose-invert max-w-none text-sm text-slate-300">
                    {isLoading ? (
                        <div className="animate-pulse flex space-x-4">
                           <div className="flex-1 space-y-2 py-1">
                             <div className="h-2 bg-slate-600 rounded"></div>
                             <div className="h-2 bg-slate-600 rounded"></div>
                           </div>
                        </div>
                    ) : (
                        <p className="whitespace-pre-line">{aiSummary}</p>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Consolidated Financials (QuickBooks ETL)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockFinancialData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="revenue" fill="#003366" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#d4af37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Asset Allocation</h3>
          <div className="h-72 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockAssetAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockAssetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
             </ResponsiveContainer>
             <div className="ml-8 space-y-2">
                {mockAssetAllocation.map((item, index) => (
                    <div key={item.name} className="flex items-center text-sm">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                        <span className="text-slate-600 font-medium">{item.name} ({item.value}%)</span>
                    </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Integration Status Strip */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">System Health & Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {integrations.map((int) => (
                <div key={int.service} className="flex items-center p-3 border border-slate-100 rounded-lg bg-slate-50">
                    <div className={`w-2 h-2 rounded-full mr-3 ${int.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                        <p className="text-sm font-bold text-slate-800">{int.service}</p>
                        <p className="text-xs text-slate-500">{int.entitiesSynced} entities • {int.lastSync}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;