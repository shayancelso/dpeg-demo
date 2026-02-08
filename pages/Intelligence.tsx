import React, { useState } from 'react';
import { predictNextBestAction } from '../services/geminiService';
import { BrainCircuit, Send, AlertTriangle, TrendingUp, UserCheck, CheckCircle, X } from 'lucide-react';
import { Investor } from '../types';

const mockInvestors: Investor[] = [
    { id: '1', name: 'Global Ventures LLC', totalInvested: 2500000, activeDeals: 4, riskScore: 85, lastInteraction: '2023-11-15', email: 'contact@gv.com' },
    { id: '2', name: 'Dr. Sameer Patel', totalInvested: 500000, activeDeals: 1, riskScore: 45, lastInteraction: '2024-05-10', email: 's.patel@md.com' },
    { id: '3', name: 'Estate Holdings Group', totalInvested: 12000000, activeDeals: 12, riskScore: 12, lastInteraction: '2024-05-20', email: 'invest@ehg.com' },
];

interface WorkflowStep {
    text: string;
    completed: boolean;
}

const Intelligence: React.FC = () => {
    const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [showWorkflow, setShowWorkflow] = useState(false);
    const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
    const [workflowComplete, setWorkflowComplete] = useState(false);

    const handleAnalyze = async (investor: Investor) => {
        setSelectedInvestor(investor);
        setLoading(true);
        setRecommendations([]);
        setShowWorkflow(false);
        setWorkflowComplete(false);

        // Simulate analyzing detailed profile data
        const profile = JSON.stringify({
            ...investor,
            engagementHistory: [
                "Opened last 3 emails but did not click links",
                "Declined last capital call due to liquidity",
                "Invested heavily in Multifamily in 2021"
            ]
        });

        const actions = await predictNextBestAction(profile);
        setRecommendations(actions);
        setLoading(false);
    };

    const handleExecuteWorkflow = () => {
        setShowWorkflow(true);
        setWorkflowComplete(false);

        const steps: WorkflowStep[] = [
            { text: 'Generating personalized email...', completed: false },
            { text: 'Scheduling follow-up call...', completed: false },
            { text: 'Creating CRM task...', completed: false }
        ];

        setWorkflowSteps(steps);

        // Animate step completion
        steps.forEach((step, index) => {
            setTimeout(() => {
                setWorkflowSteps(prev =>
                    prev.map((s, i) => i === index ? { ...s, completed: true } : s)
                );

                // After last step, show completion
                if (index === steps.length - 1) {
                    setTimeout(() => {
                        setWorkflowComplete(true);
                    }, 500);
                }
            }, (index + 1) * 1500);
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
            {/* Left Col: At-Risk Monitor */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                                <BrainCircuit className="mr-2 text-purple-600" />
                                Predictive Analytics Engine
                            </h2>
                            <p className="text-slate-500">RAG-powered investor retention scoring.</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs text-slate-500 uppercase border-b border-slate-100">
                                    <th className="py-3 px-4">Investor</th>
                                    <th className="py-3 px-4">Investment</th>
                                    <th className="py-3 px-4">Churn Risk</th>
                                    <th className="py-3 px-4">Last Touch</th>
                                    <th className="py-3 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockInvestors.map((inv) => (
                                    <tr key={inv.id} className="border-b border-slate-50 hover:bg-slate-50">
                                        <td className="py-4 px-4 font-medium text-slate-900">{inv.name}</td>
                                        <td className="py-4 px-4">${(inv.totalInvested / 1000000).toFixed(1)}M</td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center">
                                                <div className="w-24 h-2 bg-slate-200 rounded-full mr-2">
                                                    <div
                                                        className={`h-2 rounded-full ${inv.riskScore > 70 ? 'bg-red-500' : inv.riskScore > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                        style={{ width: `${inv.riskScore}%` }}
                                                    ></div>
                                                </div>
                                                <span className={`text-xs font-bold ${inv.riskScore > 70 ? 'text-red-600' : 'text-slate-600'}`}>{inv.riskScore}%</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-slate-500">{inv.lastInteraction}</td>
                                        <td className="py-4 px-4">
                                            <button
                                                onClick={() => handleAnalyze(inv)}
                                                className="text-sm text-blue-600 font-medium hover:text-blue-800"
                                            >
                                                Analyze
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Market Sentinel */}
                <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <TrendingUp className="mr-2 text-green-400" /> Market Sentinel Analysis
                    </h3>
                    <p className="text-slate-400 mb-4 text-sm">
                        AI continuously scans CoStar reports and local news to adjust asset valuations.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                            <p className="text-xs text-slate-400">Retail Portfolio B (Houston)</p>
                            <div className="flex items-center mt-2">
                                <AlertTriangle className="text-yellow-500 w-4 h-4 mr-2" />
                                <span className="text-sm font-medium">Weather Risk Alert: Hurricane Season Prep recommended.</span>
                            </div>
                         </div>
                         <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                            <p className="text-xs text-slate-400">Multifamily Fund IV (Austin)</p>
                            <div className="flex items-center mt-2">
                                <TrendingUp className="text-green-500 w-4 h-4 mr-2" />
                                <span className="text-sm font-medium">Rent Growth: +4.2% projected vs submarket.</span>
                            </div>
                         </div>
                    </div>
                </div>
            </div>

            {/* Right Col: Next Best Action */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">AI Recommendation Engine</h3>

                {selectedInvestor ? (
                    <div className="flex-1 flex flex-col">
                        <div className="mb-6">
                            <h4 className="font-semibold text-slate-800">{selectedInvestor.name}</h4>
                            <p className="text-sm text-slate-500">Churn Risk: <span className="text-red-500 font-bold">{selectedInvestor.riskScore}%</span></p>
                        </div>

                        {loading ? (
                            <div className="flex-1 flex items-center justify-center flex-col">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                                <p className="text-sm text-slate-500">Calculating retention strategy...</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recommendations.map((rec, idx) => (
                                    <div key={idx} className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="flex items-start">
                                            <UserCheck className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                                            <div>
                                                <p className="text-sm text-blue-900 font-medium">{rec}</p>
                                                <p className="text-xs text-blue-700 mt-1">Estimated Success Impact: High</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-6 pt-4 border-t">
                                    <button
                                        onClick={handleExecuteWorkflow}
                                        className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 flex items-center justify-center"
                                    >
                                        <Send className="w-4 h-4 mr-2" /> Execute Workflow
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-center p-6">
                        <p className="text-slate-400 text-sm">Select an investor from the table to generate Next-Best Actions.</p>
                    </div>
                )}
            </div>

            {/* Workflow Execution Panel */}
            {showWorkflow && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 relative">
                        <button
                            onClick={() => setShowWorkflow(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-xl font-bold text-slate-900 mb-6">Workflow Execution</h3>

                        <div className="space-y-4">
                            {workflowSteps.map((step, index) => (
                                <div key={index} className="flex items-center">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                                        step.completed
                                            ? 'bg-green-500'
                                            : 'bg-slate-200 animate-pulse'
                                    }`}>
                                        {step.completed && <CheckCircle className="w-4 h-4 text-white" />}
                                    </div>
                                    <p className={`text-sm ${step.completed ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                                        {step.text}
                                    </p>
                                </div>
                            ))}

                            {workflowComplete && (
                                <div className="mt-6 pt-6 border-t border-slate-200">
                                    <div className="flex items-center justify-center text-green-600">
                                        <CheckCircle className="w-6 h-6 mr-2" />
                                        <p className="font-semibold">Workflow executed successfully</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Intelligence;
