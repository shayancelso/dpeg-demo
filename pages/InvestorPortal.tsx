import React from 'react';
import { Download, ExternalLink, FileText, PieChart as PieIcon } from 'lucide-react';

const InvestorPortal: React.FC = () => {
    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, Global Ventures LLC</h1>
                    <p className="text-slate-400 mb-6">Review your portfolio performance and recent distributions.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                            <p className="text-slate-400 text-sm">Total Equity Invested</p>
                            <p className="text-2xl font-bold text-white mt-1">$2.50 M</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                            <p className="text-slate-400 text-sm">Current Value (Est.)</p>
                            <p className="text-2xl font-bold text-green-400 mt-1">$3.15 M</p>
                        </div>
                         <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                            <p className="text-slate-400 text-sm">Total Distributions</p>
                            <p className="text-2xl font-bold text-yellow-400 mt-1">$450 K</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Investments */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-slate-900">Your Active Investments</h3>
                    
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-start mb-4 md:mb-0">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                    <PieIcon className="w-6 h-6 text-blue-700" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Multifamily Fund IV</h4>
                                    <p className="text-sm text-slate-500">Class A • Austin, TX</p>
                                    <div className="mt-2 flex space-x-4 text-sm">
                                        <span className="text-slate-600">Commitment: <strong>$1.0M</strong></span>
                                        <span className="text-green-600">IRR: <strong>18.5%</strong></span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50">
                                    Details
                                </button>
                                <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">
                                    K-1 Tax Form
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Documents & Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Documents</h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'Q3 2024 Investor Letter', date: 'Oct 15, 2024' },
                                { name: 'Fund IV Distribution Notice', date: 'Oct 01, 2024' },
                                { name: '2023 K-1 Tax Form', date: 'Mar 15, 2024' },
                            ].map((doc, idx) => (
                                <li key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="flex items-center">
                                        <FileText className="w-5 h-5 text-slate-400 mr-3 group-hover:text-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-700">{doc.name}</p>
                                            <p className="text-xs text-slate-400">{doc.date}</p>
                                        </div>
                                    </div>
                                    <Download className="w-4 h-4 text-slate-300 group-hover:text-slate-600" />
                                </li>
                            ))}
                        </ul>
                        <button className="w-full mt-6 text-sm text-blue-600 font-medium flex items-center justify-center hover:underline">
                            View All Documents <ExternalLink className="w-3 h-3 ml-1" />
                        </button>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-yellow-800 mb-2">Open Capital Call</h3>
                        <p className="text-sm text-yellow-700 mb-4">
                            Retail Portfolio B - Tranche 2 funding is due by Nov 15th.
                        </p>
                        <div className="flex justify-between items-center">
                             <span className="font-bold text-slate-900">$125,000.00</span>
                             <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium">Wire Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorPortal;