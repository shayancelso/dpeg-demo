import React, { useState } from 'react';
import { FileText, Download, Printer, Wand2, CheckCircle, Search } from 'lucide-react';
import { DocTemplate } from '../types';
import { generateDocumentContent } from '../services/geminiService';

const templates: DocTemplate[] = [
    { id: '1', name: 'Capital Call Notice', category: 'Financial', lastModified: '2024-10-01' },
    { id: '2', name: 'Quarterly Distribution Letter', category: 'Financial', lastModified: '2024-09-15' },
    { id: '3', name: 'K-1 Tax Form Cover', category: 'Legal', lastModified: '2024-03-01' },
    { id: '4', name: 'Investor Update (General)', category: 'Update', lastModified: '2024-11-10' },
];

const mockInvestors = ['Global Ventures LLC', 'Estate Holdings Group', 'Dr. Sameer Patel'];

const DocumentCenter: React.FC = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<DocTemplate | null>(null);
    const [selectedInvestor, setSelectedInvestor] = useState<string>('');
    const [generatedContent, setGeneratedContent] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!selectedTemplate || !selectedInvestor) return;
        
        setIsGenerating(true);
        // Simulate pulling real data from the DB for the context
        const contextData = {
            amount: "$125,000.00",
            dueDate: "November 30, 2024",
            fund: "Multifamily Fund IV",
            bankDetails: "Chase Bank, Acct ****9988"
        };
        
        const content = await generateDocumentContent(
            selectedTemplate.name,
            selectedInvestor,
            contextData
        );
        
        setGeneratedContent(content);
        setIsGenerating(false);
    };

    return (
        <div className="h-full flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Document Center</h2>
                    <p className="text-slate-500">Automated legal and financial correspondence generation.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 h-[calc(100vh-160px)]">
                {/* Left: Template Selection */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search templates..." 
                                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1 p-2">
                        {templates.map(t => (
                            <div 
                                key={t.id}
                                onClick={() => setSelectedTemplate(t)}
                                className={`p-4 rounded-lg cursor-pointer mb-2 transition-colors ${selectedTemplate?.id === t.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50 border border-transparent'}`}
                            >
                                <div className="flex items-center mb-1">
                                    <FileText className={`w-4 h-4 mr-2 ${selectedTemplate?.id === t.id ? 'text-blue-600' : 'text-slate-400'}`} />
                                    <h4 className={`font-medium text-sm ${selectedTemplate?.id === t.id ? 'text-blue-900' : 'text-slate-700'}`}>{t.name}</h4>
                                </div>
                                <div className="flex justify-between items-center ml-6">
                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{t.category}</span>
                                    <span className="text-[10px] text-slate-400">{t.lastModified}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Configuration & Preview */}
                <div className="lg:col-span-2 flex flex-col space-y-4 h-full">
                    {/* Action Bar */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <select 
                                className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none"
                                value={selectedInvestor}
                                onChange={(e) => setSelectedInvestor(e.target.value)}
                            >
                                <option value="">Select Investor...</option>
                                {mockInvestors.map(inv => <option key={inv} value={inv}>{inv}</option>)}
                            </select>
                            
                            <button 
                                onClick={handleGenerate}
                                disabled={!selectedTemplate || !selectedInvestor || isGenerating}
                                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors
                                    ${!selectedTemplate || !selectedInvestor ? 'bg-slate-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800'}`}
                            >
                                {isGenerating ? (
                                    <>Generating...</>
                                ) : (
                                    <><Wand2 className="w-4 h-4 mr-2 text-yellow-400" /> Generate Draft</>
                                )}
                            </button>
                        </div>
                        
                        {generatedContent && (
                            <div className="flex space-x-2">
                                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg" title="Print">
                                    <Printer className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Download PDF">
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Editor/Preview */}
                    <div className="bg-white flex-1 rounded-xl shadow-sm border border-slate-200 p-8 overflow-y-auto relative">
                        {generatedContent ? (
                            <div className="max-w-2xl mx-auto font-serif text-slate-800 leading-relaxed">
                                <div className="mb-8 border-b border-slate-100 pb-4 flex justify-between items-end">
                                    <div>
                                        <h1 className="text-xl font-bold text-slate-900">Dhanani Private Equity Group</h1>
                                        <p className="text-xs text-slate-500">Sugar Land, TX • (281) 555-0123</p>
                                    </div>
                                    <p className="text-sm text-slate-500">October 24, 2024</p>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: generatedContent }} />
                                <div className="mt-12 pt-8 border-t border-slate-100">
                                    <p className="font-bold">Nazeer Dhanani</p>
                                    <p className="text-slate-500 text-sm">CEO & Principal</p>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-300">
                                <FileText className="w-16 h-16 mb-4 opacity-20" />
                                <p>Select a template and investor to generate a document.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentCenter;