import React from 'react';
import { DealStage, AssetType } from '../types';
import { Plus, MapPin, DollarSign, Calendar } from 'lucide-react';

const mockDeals = [
    { id: '1', name: 'Sugar Land Town Center', type: AssetType.RETAIL, stage: DealStage.SOURCING, amount: '45M' },
    { id: '2', name: 'The Independent Heights', type: AssetType.MULTIFAMILY, stage: DealStage.UNDERWRITING, amount: '22M' },
    { id: '3', name: 'West Chase Parcel', type: AssetType.LAND, stage: DealStage.DUE_DILIGENCE, amount: '5.5M' },
    { id: '4', name: 'Marriott Galleria', type: AssetType.HOSPITALITY, stage: DealStage.CLOSED, amount: '38M' },
    { id: '5', name: 'Katy Logistics Park', type: AssetType.LAND, stage: DealStage.SOURCING, amount: '12M' },
];

const DealFlow: React.FC = () => {
    const columns = Object.values(DealStage);

    return (
        <div className="h-full flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Deal Pipeline</h2>
                    <p className="text-slate-500">Manage acquisitions from sourcing to closing.</p>
                </div>
                <button className="bg-yellow-500 text-slate-900 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-yellow-400">
                    <Plus className="w-4 h-4 mr-2" /> New Deal
                </button>
            </div>

            <div className="flex-1 overflow-x-auto">
                <div className="flex gap-4 h-full min-w-[1000px]">
                    {columns.map(stage => (
                        <div key={stage} className="flex-1 bg-slate-100 rounded-xl p-4 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-700">{stage}</h3>
                                <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-full">
                                    {mockDeals.filter(d => d.stage === stage).length}
                                </span>
                            </div>
                            
                            <div className="space-y-3 overflow-y-auto flex-1">
                                {mockDeals.filter(d => d.stage === stage).map(deal => (
                                    <div key={deal.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide
                                                ${deal.type === AssetType.MULTIFAMILY ? 'bg-blue-100 text-blue-700' : 
                                                  deal.type === AssetType.RETAIL ? 'bg-orange-100 text-orange-700' :
                                                  deal.type === AssetType.HOSPITALITY ? 'bg-purple-100 text-purple-700' : 
                                                  'bg-green-100 text-green-700'
                                                }`}>
                                                {deal.type}
                                            </span>
                                            <button className="text-slate-400 hover:text-slate-600">...</button>
                                        </div>
                                        <h4 className="font-bold text-slate-800 mb-1">{deal.name}</h4>
                                        <div className="space-y-1">
                                            <div className="flex items-center text-xs text-slate-500">
                                                <DollarSign className="w-3 h-3 mr-1" />
                                                <span>Est. {deal.amount}</span>
                                            </div>
                                            <div className="flex items-center text-xs text-slate-500">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                <span>Houston, TX</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DealFlow;