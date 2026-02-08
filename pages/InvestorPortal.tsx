import React, { useState } from 'react';
import { Download, ExternalLink, FileText, PieChart as PieIcon, X } from 'lucide-react';

// Hardcoded investment data
const investments = [
    {
        id: 1,
        name: 'Multifamily Fund IV',
        type: 'Class A',
        location: 'Austin, TX',
        commitment: '$1.0M',
        irr: '18.5%',
        details: {
            fundName: 'Multifamily Fund IV',
            committedCapital: '$1,000,000',
            calledCapital: '$850,000',
            distributions: '$150,000',
            nav: '$1,200,000',
            vintageYear: '2022',
            strategy: 'This fund focuses on acquiring and managing Class A multifamily properties in high-growth markets across Texas. The strategy emphasizes value-add opportunities in emerging neighborhoods with strong demographic trends and job growth.'
        }
    },
    {
        id: 2,
        name: 'Industrial Logistics Fund II',
        type: 'Class B',
        location: 'Phoenix, AZ',
        commitment: '$750K',
        irr: '22.1%',
        details: {
            fundName: 'Industrial Logistics Fund II',
            committedCapital: '$750,000',
            calledCapital: '$600,000',
            distributions: '$180,000',
            nav: '$950,000',
            vintageYear: '2021',
            strategy: 'Focused on last-mile distribution centers and industrial warehouses serving e-commerce fulfillment. The fund targets properties in major logistics hubs with proximity to interstate highways and airports.'
        }
    },
    {
        id: 3,
        name: 'Office Value-Add Fund III',
        type: 'Class B+',
        location: 'Denver, CO',
        commitment: '$500K',
        irr: '15.3%',
        details: {
            fundName: 'Office Value-Add Fund III',
            committedCapital: '$500,000',
            calledCapital: '$400,000',
            distributions: '$75,000',
            nav: '$580,000',
            vintageYear: '2023',
            strategy: 'Value-add office repositioning in suburban Denver markets. The fund acquires underperforming Class B+ office buildings and implements capital improvements, amenity upgrades, and modern tenant experiences to capture higher rents.'
        }
    }
];

// Hardcoded documents
const allDocuments = [
    {
        id: 1,
        name: 'Q3 2024 Investor Letter',
        date: 'Oct 15, 2024',
        content: `Q3 2024 INVESTOR LETTER\n\nDear Limited Partners,\n\nWe are pleased to report another strong quarter of performance across our portfolio. The real estate market continued to show resilience despite economic headwinds.\n\nKey Highlights:\n• Portfolio occupancy reached 96.3%, up from 94.1% in Q2\n• Same-store NOI growth of 7.2% year-over-year\n• Completed two strategic acquisitions totaling $45M\n• Distributed $2.1M to investors this quarter\n\nMarket Outlook:\nWe remain cautiously optimistic about the fundamentals in our core markets. Migration trends continue to favor Sun Belt cities, and employment growth remains robust in our key metros.\n\nThank you for your continued partnership.\n\nSincerely,\nThe Investment Team`
    },
    {
        id: 2,
        name: 'Fund IV Distribution Notice',
        date: 'Oct 01, 2024',
        content: `DISTRIBUTION NOTICE\n\nFund: Multifamily Fund IV\nDistribution Date: October 15, 2024\nDistribution Amount: $50,000.00\n\nDistribution Breakdown:\n• Operating Cash Flow: $35,000\n• Refinancing Proceeds: $15,000\n\nThis distribution represents a 5.0% return on your invested capital for this quarter. Funds will be wired to your account on file within 3-5 business days.\n\nFor questions, please contact investor.relations@dpeg.com.\n\nThank you for your investment.`
    },
    {
        id: 3,
        name: '2023 K-1 Tax Form',
        date: 'Mar 15, 2024',
        content: `SCHEDULE K-1 (FORM 1065)\n2023 Tax Year\n\nPartner's Share of Income, Deductions, Credits, etc.\n\nPartnership: Multifamily Fund IV LP\nEIN: 82-1234567\n\nPartner Information:\nGlobal Ventures LLC\nEIN: 45-9876543\n\nPartner's Share:\n• Ordinary business income: $42,500\n• Net rental real estate income: $38,200\n• Interest income: $1,850\n• Section 179 deduction: ($5,000)\n\nThis is a summary. Please consult your tax advisor for filing.`
    },
    {
        id: 4,
        name: 'Q2 2024 Portfolio Update',
        date: 'Jul 20, 2024',
        content: `Q2 2024 PORTFOLIO UPDATE\n\nPortfolio Performance:\n• Total AUM: $285M across 18 properties\n• Weighted average occupancy: 94.8%\n• Quarterly NOI: $3.2M\n\nRecent Activity:\n• Sold Denver office property for $22M (32% IRR)\n• Acquired Phoenix industrial asset for $18M\n• Completed $4M in property improvements\n\nPipeline:\nWe are actively evaluating 6 acquisition opportunities totaling $67M in our target markets.`
    },
    {
        id: 5,
        name: 'Fund III Annual Report 2023',
        date: 'Jan 30, 2024',
        content: `ANNUAL REPORT 2023\nOffice Value-Add Fund III\n\nExecutive Summary:\nFund III delivered a 15.3% net IRR for the year, outperforming our target of 12-14%. The fund is now 85% deployed across 8 properties.\n\nKey Metrics:\n• Total equity raised: $125M\n• Properties acquired: 8\n• Total square footage: 1.2M SF\n• Average acquisition cap rate: 6.8%\n• Stabilized yield: 8.2%\n\nLooking ahead to 2024, we remain focused on value creation through operational improvements and strategic capital deployment.`
    },
    {
        id: 6,
        name: 'Q1 2024 Capital Call Notice',
        date: 'Jan 15, 2024',
        content: `CAPITAL CALL NOTICE\n\nFund: Industrial Logistics Fund II\nCall Amount: $75,000\nDue Date: February 1, 2024\n\nPurpose:\nFunding for the acquisition of a 125,000 SF last-mile distribution center in Tempe, Arizona.\n\nWire Instructions:\nBank: JP Morgan Chase\nRouting: 021000021\nAccount: 987654321\nReference: IL2-CC-Q124-[Your LP ID]\n\nPlease remit funds by the due date to avoid default provisions.`
    }
];

type ModalType = 'investment' | 'k1' | 'wire' | 'document' | null;

interface ModalState {
    type: ModalType;
    data?: any;
}

const InvestorPortal: React.FC = () => {
    const [modal, setModal] = useState<ModalState>({ type: null });
    const [showAllDocuments, setShowAllDocuments] = useState(false);

    const openInvestmentDetails = (investment: typeof investments[0]) => {
        setModal({ type: 'investment', data: investment.details });
    };

    const openK1Form = (investment: typeof investments[0]) => {
        setModal({
            type: 'k1',
            data: {
                fundName: investment.details.fundName,
                partnerName: 'Global Ventures LLC',
                partnerEIN: '45-9876543',
                ordinaryIncome: '$42,500',
                rentalIncome: '$38,200',
                interestIncome: '$1,850',
                section179: '$5,000'
            }
        });
    };

    const openWireDetails = () => {
        setModal({
            type: 'wire',
            data: {
                bankName: 'JP Morgan Chase Bank',
                routing: '021000021',
                account: '4478901234',
                accountName: 'Retail Portfolio B - LP Capital Account',
                reference: 'RP-B-T2-[Your LP ID]',
                amountDue: '$125,000.00',
                dueDate: 'November 15, 2024',
                purpose: 'Tranche 2 funding for Retail Portfolio B acquisition'
            }
        });
    };

    const openDocument = (doc: typeof allDocuments[0]) => {
        setModal({ type: 'document', data: doc });
    };

    const closeModal = () => {
        setModal({ type: null });
    };

    const displayedDocuments = showAllDocuments ? allDocuments : allDocuments.slice(0, 3);

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

                    {investments.map((investment) => (
                        <div key={investment.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-start mb-4 md:mb-0">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                    <PieIcon className="w-6 h-6 text-blue-700" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{investment.name}</h4>
                                    <p className="text-sm text-slate-500">{investment.type} • {investment.location}</p>
                                    <div className="mt-2 flex space-x-4 text-sm">
                                        <span className="text-slate-600">Commitment: <strong>{investment.commitment}</strong></span>
                                        <span className="text-green-600">IRR: <strong>{investment.irr}</strong></span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => openInvestmentDetails(investment)}
                                    className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50"
                                >
                                    Details
                                </button>
                                <button
                                    onClick={() => openK1Form(investment)}
                                    className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800"
                                >
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
                            {displayedDocuments.map((doc) => (
                                <li
                                    key={doc.id}
                                    onClick={() => openDocument(doc)}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                                >
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
                        <button
                            onClick={() => setShowAllDocuments(!showAllDocuments)}
                            className="w-full mt-6 text-sm text-blue-600 font-medium flex items-center justify-center hover:underline"
                        >
                            {showAllDocuments ? 'Show Less' : 'View All Documents'}
                            <ExternalLink className="w-3 h-3 ml-1" />
                        </button>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-yellow-800 mb-2">Open Capital Call</h3>
                        <p className="text-sm text-yellow-700 mb-4">
                            Retail Portfolio B - Tranche 2 funding is due by Nov 15th.
                        </p>
                        <div className="flex justify-between items-center">
                             <span className="font-bold text-slate-900">$125,000.00</span>
                             <button
                                onClick={openWireDetails}
                                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800"
                             >
                                Wire Details
                             </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Investment Details Modal */}
            {modal.type === 'investment' && modal.data && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-slate-900">Investment Details</h2>
                            <button
                                onClick={closeModal}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{modal.data.fundName}</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <p className="text-sm text-slate-600 mb-1">Committed Capital</p>
                                    <p className="text-lg font-bold text-slate-900">{modal.data.committedCapital}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <p className="text-sm text-slate-600 mb-1">Called Capital</p>
                                    <p className="text-lg font-bold text-slate-900">{modal.data.calledCapital}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <p className="text-sm text-slate-600 mb-1">Distributions</p>
                                    <p className="text-lg font-bold text-green-600">{modal.data.distributions}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <p className="text-sm text-slate-600 mb-1">Current NAV</p>
                                    <p className="text-lg font-bold text-blue-600">{modal.data.nav}</p>
                                </div>
                            </div>

                            <div className="border-t border-slate-200 pt-4">
                                <p className="text-sm text-slate-600 mb-2">Vintage Year</p>
                                <p className="text-base font-semibold text-slate-900">{modal.data.vintageYear}</p>
                            </div>

                            <div className="border-t border-slate-200 pt-4">
                                <p className="text-sm text-slate-600 mb-2">Investment Strategy</p>
                                <p className="text-base text-slate-700 leading-relaxed">{modal.data.strategy}</p>
                            </div>
                        </div>
                        <div className="sticky bottom-0 bg-slate-50 p-6 border-t border-slate-200">
                            <button
                                onClick={closeModal}
                                className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* K-1 Tax Form Modal */}
            {modal.type === 'k1' && modal.data && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-slate-900">K-1 Tax Form Preview</h2>
                            <button
                                onClick={closeModal}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="bg-slate-50 p-4 rounded-lg border-2 border-slate-200">
                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Schedule K-1 (Form 1065)</p>
                                <p className="text-lg font-bold text-slate-900">2023 Tax Year</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 mb-3">Partnership Information</h4>
                                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-600">Partnership Name:</span>
                                            <span className="text-sm font-medium text-slate-900">{modal.data.fundName} LP</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-600">Partnership EIN:</span>
                                            <span className="text-sm font-medium text-slate-900">82-1234567</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 mb-3">Partner Information</h4>
                                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-600">Partner Name:</span>
                                            <span className="text-sm font-medium text-slate-900">{modal.data.partnerName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-600">Partner EIN:</span>
                                            <span className="text-sm font-medium text-slate-900">{modal.data.partnerEIN}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 mb-3">Partner's Share of Income, Deductions, Credits</h4>
                                    <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                                        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                            <span className="text-sm text-slate-600">Ordinary business income</span>
                                            <span className="text-sm font-bold text-green-600">{modal.data.ordinaryIncome}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                            <span className="text-sm text-slate-600">Net rental real estate income</span>
                                            <span className="text-sm font-bold text-green-600">{modal.data.rentalIncome}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                            <span className="text-sm text-slate-600">Interest income</span>
                                            <span className="text-sm font-bold text-green-600">{modal.data.interestIncome}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">Section 179 deduction</span>
                                            <span className="text-sm font-bold text-slate-900">({modal.data.section179})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <strong>Note:</strong> This is a preview only. Please consult with your tax advisor for proper filing.
                                    The official K-1 form will be mailed to your address on file by March 15th.
                                </p>
                            </div>
                        </div>
                        <div className="sticky bottom-0 bg-slate-50 p-6 border-t border-slate-200 flex gap-3">
                            <button
                                onClick={closeModal}
                                className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                className="flex-1 border-2 border-slate-900 text-slate-900 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Wire Details Modal */}
            {modal.type === 'wire' && modal.data && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-slate-900">Wire Transfer Instructions</h2>
                            <button
                                onClick={closeModal}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-yellow-700">Amount Due</p>
                                        <p className="text-3xl font-bold text-yellow-900">{modal.data.amountDue}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-yellow-700">Due Date</p>
                                        <p className="text-lg font-bold text-yellow-900">{modal.data.dueDate}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 mb-3">Banking Information</h4>
                                    <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Bank Name</p>
                                            <p className="text-base font-semibold text-slate-900">{modal.data.bankName}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Routing Number</p>
                                                <p className="text-base font-mono font-semibold text-slate-900">{modal.data.routing}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Account Number</p>
                                                <p className="text-base font-mono font-semibold text-slate-900">{modal.data.account}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Account Name</p>
                                            <p className="text-base font-semibold text-slate-900">{modal.data.accountName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 mb-3">Wire Reference</h4>
                                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                                        <p className="text-xs text-red-600 uppercase tracking-wide mb-1 font-semibold">Important - Include This Reference</p>
                                        <p className="text-lg font-mono font-bold text-red-900">{modal.data.reference}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 mb-2">Purpose</h4>
                                    <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg">
                                        {modal.data.purpose}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <strong>Important:</strong> Please ensure all wire information is accurate and include the reference number.
                                    Wires typically take 1-2 business days to process. Contact us at capital@dpeg.com if you have questions.
                                </p>
                            </div>
                        </div>
                        <div className="sticky bottom-0 bg-slate-50 p-6 border-t border-slate-200 flex gap-3">
                            <button
                                onClick={closeModal}
                                className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                className="flex-1 border-2 border-slate-900 text-slate-900 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Print Instructions
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Document Preview Modal */}
            {modal.type === 'document' && modal.data && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">{modal.data.name}</h2>
                                <p className="text-sm text-slate-500 mt-1">{modal.data.date}</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                                <pre className="text-sm text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
                                    {modal.data.content}
                                </pre>
                            </div>
                        </div>
                        <div className="sticky bottom-0 bg-slate-50 p-6 border-t border-slate-200 flex gap-3">
                            <button
                                onClick={closeModal}
                                className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                className="flex-1 border-2 border-slate-900 text-slate-900 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvestorPortal;
