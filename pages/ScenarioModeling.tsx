import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { Sliders, RefreshCw, Save, TrendingUp, AlertCircle, DollarSign, BrainCircuit, X, CheckCircle } from 'lucide-react';
import { ScenarioInputs } from '../types';
import { analyzeFinancialScenario } from '../services/geminiService';

const formatAiText = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^[-•]\s/gm, '&bull; ')
    .replace(/\n/g, '<br/>');
};

interface SavedScenario {
    id: string;
    name: string;
    inputs: ScenarioInputs;
    savedAt: string;
}

const ScenarioModeling: React.FC = () => {
  // Base Assumptions for "Multifamily Fund IV"
  const [inputs, setInputs] = useState<ScenarioInputs>({
    purchasePrice: 22000000,
    exitCapRate: 5.5,
    rentGrowth: 3.0,
    interestRate: 6.5,
    holdPeriod: 5,
    capexBudget: 1500000,
  });

  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([
    {
        id: '1',
        name: 'Conservative 10Y Hold',
        inputs: {
            purchasePrice: 22000000,
            exitCapRate: 6.5,
            rentGrowth: 2.0,
            interestRate: 7.0,
            holdPeriod: 10,
            capexBudget: 2000000,
        },
        savedAt: '2024-01-15'
    },
    {
        id: '2',
        name: 'Aggressive 3Y Flip',
        inputs: {
            purchasePrice: 22000000,
            exitCapRate: 5.0,
            rentGrowth: 5.0,
            interestRate: 6.0,
            holdPeriod: 3,
            capexBudget: 1000000,
        },
        savedAt: '2024-02-01'
    },
    {
        id: '3',
        name: 'Base Case 5Y',
        inputs: {
            purchasePrice: 22000000,
            exitCapRate: 5.5,
            rentGrowth: 3.0,
            interestRate: 6.5,
            holdPeriod: 5,
            capexBudget: 1500000,
        },
        savedAt: '2024-02-05'
    }
  ]);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  // Simplified Financial Engine (Client-Side Logic)
  const calculateProjections = () => {
    const data = [];
    let netOperatingIncome = inputs.purchasePrice * 0.055; // Initial 5.5% Cap
    let currentValue = inputs.purchasePrice;

    for (let year = 1; year <= 7; year++) {
      // Growth Logic
      netOperatingIncome = netOperatingIncome * (1 + inputs.rentGrowth / 100);

      // Value calculation based on Cap Rate compression/expansion
      // If year == holdPeriod, we apply the Exit Cap
      const impliedValue = netOperatingIncome / (inputs.exitCapRate / 100);

      // Debt Service (Interest Only for simplicity)
      const loanAmount = inputs.purchasePrice * 0.70; // 70% LTV
      const debtService = loanAmount * (inputs.interestRate / 100);

      const cashFlow = netOperatingIncome - debtService;

      data.push({
        year: `Year ${year}`,
        noi: Math.round(netOperatingIncome),
        cashFlow: Math.round(cashFlow),
        valuation: Math.round(impliedValue),
        isExitYear: year === inputs.holdPeriod
      });
    }
    return data;
  };

  const projections = calculateProjections();
  const exitYearData = projections.find(p => p.year === `Year ${inputs.holdPeriod}`);

  // Quick KPI Calcs
  const totalCashFlow = projections.slice(0, inputs.holdPeriod).reduce((acc, curr) => acc + curr.cashFlow, 0);
  const saleProceeds = (exitYearData?.valuation || 0) - (inputs.purchasePrice * 0.70); // Pay off loan from exit valuation
  const totalReturn = totalCashFlow + saleProceeds; // All cash returned to equity investor
  const equityInvested = inputs.purchasePrice * 0.30 + inputs.capexBudget;
  const equityMultiple = totalReturn / equityInvested; // Standard equity multiple: total distributions / equity invested
  const estimatedIRR = (Math.pow(Math.max(equityMultiple, 0), 1/inputs.holdPeriod) - 1) * 100;

  const handleRunAnalysis = async () => {
    setAnalyzing(true);
    const analysis = await analyzeFinancialScenario(JSON.stringify(inputs));
    setAiAnalysis(analysis);
    setAnalyzing(false);
  };

  const handleSaveScenario = () => {
    if (!scenarioName.trim()) return;

    const newScenario: SavedScenario = {
        id: Date.now().toString(),
        name: scenarioName,
        inputs: { ...inputs },
        savedAt: new Date().toISOString().split('T')[0]
    };

    setSavedScenarios([newScenario, ...savedScenarios]);
    setShowSaveModal(false);
    setShowSaveConfirmation(true);
    setScenarioName('');

    setTimeout(() => {
        setShowSaveConfirmation(false);
    }, 3000);
  };

  const handleLoadScenario = (scenario: SavedScenario) => {
    setInputs(scenario.inputs);
    setShowSaveModal(false);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Scenario Modeling</h2>
          <p className="text-slate-500">Stress test deal assumptions and visualize 'What-If' outcomes.</p>
        </div>
        <div className="flex space-x-2">
            <button
                onClick={() => setShowSaveModal(true)}
                className="flex items-center px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-600 hover:bg-slate-50"
            >
                <Save className="w-4 h-4 mr-2" /> Save Scenario
            </button>
            <button
                onClick={handleRunAnalysis}
                className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                disabled={analyzing}
            >
                {analyzing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <BrainCircuit className="w-4 h-4 mr-2 text-yellow-400" />}
                Run AI Risk Analysis
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        {/* Left Sidebar: Controls */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-y-auto">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                <Sliders className="w-4 h-4 mr-2" /> Key Variables
            </h3>

            <div className="space-y-6">
                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Interest Rate (%)</label>
                    <input
                        type="range" min="3" max="10" step="0.25"
                        value={inputs.interestRate}
                        onChange={(e) => setInputs({...inputs, interestRate: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                    />
                    <div className="flex justify-between text-sm mt-1 font-bold text-slate-900">{inputs.interestRate}%</div>
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Rent Growth (YoY %)</label>
                    <input
                        type="range" min="-2" max="10" step="0.5"
                        value={inputs.rentGrowth}
                        onChange={(e) => setInputs({...inputs, rentGrowth: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                    />
                    <div className="flex justify-between text-sm mt-1 font-bold text-slate-900">{inputs.rentGrowth}%</div>
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Exit Cap Rate (%)</label>
                    <input
                        type="range" min="3" max="10" step="0.25"
                        value={inputs.exitCapRate}
                        onChange={(e) => setInputs({...inputs, exitCapRate: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                    />
                    <div className="flex justify-between text-sm mt-1 font-bold text-slate-900">{inputs.exitCapRate}%</div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <label className="block text-xs font-medium text-slate-500 mb-2">Hold Period (Years)</label>
                    <div className="flex space-x-2">
                        {[3, 5, 7, 10].map(y => (
                            <button
                                key={y}
                                onClick={() => setInputs({...inputs, holdPeriod: y})}
                                className={`flex-1 py-1 text-xs rounded border ${inputs.holdPeriod === y ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'}`}
                            >
                                {y}Y
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {aiAnalysis && (
                <div className="mt-8 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="text-xs font-bold text-yellow-800 uppercase mb-2 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> AI Risk Assessment
                    </h4>
                    <p className="text-xs text-yellow-900 leading-relaxed"
                       dangerouslySetInnerHTML={{ __html: formatAiText(aiAnalysis) }} />
                </div>
            )}
        </div>

        {/* Right Area: Visualization */}
        <div className="lg:col-span-9 flex flex-col space-y-6">

            {/* KPI Strip */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-slate-500 uppercase">Proj. Leveraged IRR</p>
                    <p className={`text-2xl font-bold mt-1 ${estimatedIRR < 12 ? 'text-red-500' : 'text-green-600'}`}>
                        {estimatedIRR.toFixed(2)}%
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-slate-500 uppercase">Equity Multiple</p>
                    <p className={`text-2xl font-bold mt-1 ${equityMultiple < 1.5 ? 'text-yellow-500' : 'text-blue-900'}`}>
                        {equityMultiple.toFixed(2)}x
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-slate-500 uppercase">Total Profit (Exit)</p>
                    <p className="text-2xl font-bold mt-1 text-slate-900">
                        ${((totalReturn - equityInvested) / 1000000).toFixed(2)}M
                    </p>
                </div>
            </div>

            {/* Charts */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex-1">
                <h3 className="font-bold text-slate-800 mb-4">Cash Flow & Valuation Analysis</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={projections}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} />
                            <YAxis yAxisId="left" orientation="left" stroke="#003366" />
                            <YAxis yAxisId="right" orientation="right" stroke="#d4af37" />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="cashFlow" name="Cash Flow ($)" stroke="#003366" strokeWidth={2} />
                            <Line yAxisId="right" type="monotone" dataKey="valuation" name="Asset Valuation ($)" stroke="#d4af37" strokeWidth={2} strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Sensitivity Mini Table */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4 text-sm">Sensitivity Analysis: Interest Rate vs Exit Cap (IRR Impact)</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-center text-sm">
                        <thead>
                            <tr>
                                <th className="p-2 text-slate-400 font-medium text-xs">Exit Cap \ Int Rate</th>
                                <th className="p-2 bg-slate-50">5.5%</th>
                                <th className="p-2 bg-slate-50">6.0%</th>
                                <th className="p-2 bg-slate-50">6.5%</th>
                                <th className="p-2 bg-slate-50">7.0%</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[4.5, 5.0, 5.5, 6.0].map(cap => (
                                <tr key={cap}>
                                    <td className="p-2 font-bold bg-slate-50">{cap}%</td>
                                    {[5.5, 6.0, 6.5, 7.0].map(rate => {
                                        // Mock calc for visual grid
                                        const mockIrr = 22 - (rate * 1.5) - (cap * 0.8) + (inputs.rentGrowth);
                                        const color = mockIrr > 18 ? 'bg-green-100 text-green-800' : mockIrr > 12 ? 'bg-yellow-50 text-yellow-800' : 'bg-red-50 text-red-800';
                                        return (
                                            <td key={rate} className="p-2 border border-slate-100">
                                                <div className={`rounded py-1 font-medium ${color}`}>
                                                    {mockIrr.toFixed(1)}%
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>

      {/* Save Scenario Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4 relative">
                <button
                    onClick={() => setShowSaveModal(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                    <X className="w-5 h-5" />
                </button>

                <h3 className="text-xl font-bold text-slate-900 mb-6">Save Scenario</h3>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Scenario Name</label>
                    <input
                        type="text"
                        value={scenarioName}
                        onChange={(e) => setScenarioName(e.target.value)}
                        placeholder="e.g., Optimistic Growth Case"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleSaveScenario()}
                    />
                </div>

                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Current Parameters</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-slate-50 p-3 rounded">
                            <span className="text-slate-500">Interest Rate:</span>
                            <span className="font-semibold ml-2">{inputs.interestRate}%</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded">
                            <span className="text-slate-500">Rent Growth:</span>
                            <span className="font-semibold ml-2">{inputs.rentGrowth}%</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded">
                            <span className="text-slate-500">Exit Cap Rate:</span>
                            <span className="font-semibold ml-2">{inputs.exitCapRate}%</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded">
                            <span className="text-slate-500">Hold Period:</span>
                            <span className="font-semibold ml-2">{inputs.holdPeriod} years</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Saved Scenarios</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {savedScenarios.map(scenario => (
                            <div
                                key={scenario.id}
                                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer"
                                onClick={() => handleLoadScenario(scenario)}
                            >
                                <div>
                                    <p className="font-medium text-slate-900">{scenario.name}</p>
                                    <p className="text-xs text-slate-500">
                                        {scenario.inputs.holdPeriod}Y hold • {scenario.inputs.interestRate}% rate • {scenario.inputs.exitCapRate}% exit cap
                                    </p>
                                </div>
                                <p className="text-xs text-slate-400">{scenario.savedAt}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex space-x-3 mt-6">
                    <button
                        onClick={() => setShowSaveModal(false)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveScenario}
                        disabled={!scenarioName.trim()}
                        className={`flex-1 px-4 py-2 rounded-lg text-white ${
                            scenarioName.trim()
                                ? 'bg-slate-900 hover:bg-slate-800'
                                : 'bg-slate-300 cursor-not-allowed'
                        }`}
                    >
                        <Save className="w-4 h-4 inline mr-2" />
                        Save
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Save Confirmation Toast */}
      {showSaveConfirmation && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-3 rounded-lg shadow-xl flex items-center space-x-2 animate-fade-in z-50">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="font-medium">Scenario saved successfully</span>
        </div>
      )}
    </div>
  );
};

export default ScenarioModeling;
