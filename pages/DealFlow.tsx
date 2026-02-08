import React, { useState } from 'react';
import { DealStage, AssetType } from '../types';
import { Plus, MapPin, DollarSign, Calendar, X } from 'lucide-react';

interface Deal {
    id: string;
    name: string;
    type: AssetType;
    stage: DealStage;
    amount: string;
    location: string;
}

const initialMockDeals: Deal[] = [
    { id: '1', name: 'Sugar Land Town Center', type: AssetType.RETAIL, stage: DealStage.SOURCING, amount: '45M', location: 'Sugar Land, TX' },
    { id: '2', name: 'The Independent Heights', type: AssetType.MULTIFAMILY, stage: DealStage.UNDERWRITING, amount: '22M', location: 'Houston, TX' },
    { id: '3', name: 'West Chase Parcel', type: AssetType.LAND, stage: DealStage.DUE_DILIGENCE, amount: '5.5M', location: 'Houston, TX' },
    { id: '4', name: 'Marriott Galleria', type: AssetType.HOSPITALITY, stage: DealStage.CLOSED, amount: '38M', location: 'Houston, TX' },
    { id: '5', name: 'Katy Logistics Park', type: AssetType.LAND, stage: DealStage.SOURCING, amount: '12M', location: 'Katy, TX' },
];

const DealFlow: React.FC = () => {
    const [deals, setDeals] = useState<Deal[]>(initialMockDeals);
    const [showNewDealForm, setShowNewDealForm] = useState(false);
    const [selectedDealForMenu, setSelectedDealForMenu] = useState<string | null>(null);
    const [selectedDealForDetails, setSelectedDealForDetails] = useState<Deal | null>(null);

    // Form state
    const [newDealForm, setNewDealForm] = useState({
        name: '',
        type: AssetType.MULTIFAMILY,
        stage: DealStage.SOURCING,
        amount: '',
        location: ''
    });

    const columns = Object.values(DealStage);

    const handleSaveNewDeal = () => {
        if (!newDealForm.name || !newDealForm.amount || !newDealForm.location) {
            alert('Please fill in all fields');
            return;
        }

        const newDeal: Deal = {
            id: Date.now().toString(),
            name: newDealForm.name,
            type: newDealForm.type,
            stage: newDealForm.stage,
            amount: newDealForm.amount,
            location: newDealForm.location
        };

        setDeals([...deals, newDeal]);

        // Reset form
        setNewDealForm({
            name: '',
            type: AssetType.MULTIFAMILY,
            stage: DealStage.SOURCING,
            amount: '',
            location: ''
        });

        setShowNewDealForm(false);
    };

    const handleMenuAction = (action: string, deal: Deal) => {
        setSelectedDealForMenu(null);

        switch (action) {
            case 'View Details':
                setSelectedDealForDetails(deal);
                break;
            case 'Edit':
                alert(`Edit functionality for ${deal.name} - Coming soon`);
                break;
            case 'Move Stage':
                alert(`Move stage functionality for ${deal.name} - Coming soon`);
                break;
            case 'Archive':
                if (confirm(`Archive ${deal.name}?`)) {
                    setDeals(deals.filter(d => d.id !== deal.id));
                }
                break;
        }
    };

    const getTypeColor = (type: AssetType) => {
        switch (type) {
            case AssetType.MULTIFAMILY:
                return 'bg-blue-100 text-blue-700';
            case AssetType.RETAIL:
                return 'bg-orange-100 text-orange-700';
            case AssetType.HOSPITALITY:
                return 'bg-purple-100 text-purple-700';
            case AssetType.LAND:
                return 'bg-green-100 text-green-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Deal Pipeline</h2>
                    <p className="text-slate-500">Manage acquisitions from sourcing to closing.</p>
                </div>
                <button
                    onClick={() => setShowNewDealForm(true)}
                    className="bg-yellow-500 text-slate-900 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-yellow-400"
                >
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
                                    {deals.filter(d => d.stage === stage).length}
                                </span>
                            </div>

                            <div className="space-y-3 overflow-y-auto flex-1">
                                {deals.filter(d => d.stage === stage).map(deal => (
                                    <div key={deal.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${getTypeColor(deal.type)}`}>
                                                {deal.type}
                                            </span>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setSelectedDealForMenu(selectedDealForMenu === deal.id ? null : deal.id)}
                                                    className="text-slate-400 hover:text-slate-600 font-bold text-lg px-2"
                                                >
                                                    ...
                                                </button>

                                                {selectedDealForMenu === deal.id && (
                                                    <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-lg shadow-lg z-10 w-40">
                                                        <button
                                                            onClick={() => handleMenuAction('View Details', deal)}
                                                            className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm text-slate-700 first:rounded-t-lg"
                                                        >
                                                            View Details
                                                        </button>
                                                        <button
                                                            onClick={() => handleMenuAction('Edit', deal)}
                                                            className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm text-slate-700"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleMenuAction('Move Stage', deal)}
                                                            className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm text-slate-700"
                                                        >
                                                            Move Stage
                                                        </button>
                                                        <button
                                                            onClick={() => handleMenuAction('Archive', deal)}
                                                            className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm text-slate-700 last:rounded-b-lg text-red-600"
                                                        >
                                                            Archive
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-slate-800 mb-1">{deal.name}</h4>
                                        <div className="space-y-1">
                                            <div className="flex items-center text-xs text-slate-500">
                                                <DollarSign className="w-3 h-3 mr-1" />
                                                <span>Est. {deal.amount}</span>
                                            </div>
                                            <div className="flex items-center text-xs text-slate-500">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                <span>{deal.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* New Deal Form Panel */}
            {showNewDealForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-slate-900">Add New Deal</h3>
                            <button
                                onClick={() => setShowNewDealForm(false)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Deal Name
                                </label>
                                <input
                                    type="text"
                                    value={newDealForm.name}
                                    onChange={(e) => setNewDealForm({ ...newDealForm, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    placeholder="Enter deal name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Asset Type
                                </label>
                                <select
                                    value={newDealForm.type}
                                    onChange={(e) => setNewDealForm({ ...newDealForm, type: e.target.value as AssetType })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    {Object.values(AssetType).map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Deal Stage
                                </label>
                                <select
                                    value={newDealForm.stage}
                                    onChange={(e) => setNewDealForm({ ...newDealForm, stage: e.target.value as DealStage })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    {Object.values(DealStage).map(stage => (
                                        <option key={stage} value={stage}>{stage}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Estimated Amount
                                </label>
                                <input
                                    type="text"
                                    value={newDealForm.amount}
                                    onChange={(e) => setNewDealForm({ ...newDealForm, amount: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    placeholder="e.g., 25M"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={newDealForm.location}
                                    onChange={(e) => setNewDealForm({ ...newDealForm, location: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    placeholder="e.g., Houston, TX"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowNewDealForm(false)}
                                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveNewDeal}
                                className="flex-1 px-4 py-2 bg-yellow-500 text-slate-900 rounded-lg font-medium hover:bg-yellow-400"
                            >
                                Save Deal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Deal Details Modal */}
            {selectedDealForDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                    {selectedDealForDetails.name}
                                </h3>
                                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${getTypeColor(selectedDealForDetails.type)}`}>
                                    {selectedDealForDetails.type}
                                </span>
                            </div>
                            <button
                                onClick={() => setSelectedDealForDetails(null)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <div className="flex items-center text-slate-600 mb-1">
                                    <DollarSign className="w-4 h-4 mr-2" />
                                    <span className="text-sm font-medium">Estimated Amount</span>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 ml-6">${selectedDealForDetails.amount}</p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-lg">
                                <div className="flex items-center text-slate-600 mb-1">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span className="text-sm font-medium">Location</span>
                                </div>
                                <p className="text-lg text-slate-900 ml-6">{selectedDealForDetails.location}</p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-lg">
                                <div className="flex items-center text-slate-600 mb-1">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span className="text-sm font-medium">Current Stage</span>
                                </div>
                                <p className="text-lg font-semibold text-slate-900 ml-6">{selectedDealForDetails.stage}</p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-lg">
                                <p className="text-sm font-medium text-slate-600 mb-2">Deal ID</p>
                                <p className="text-sm text-slate-500 font-mono">#{selectedDealForDetails.id}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedDealForDetails(null)}
                            className="w-full mt-6 px-4 py-2 bg-yellow-500 text-slate-900 rounded-lg font-medium hover:bg-yellow-400"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DealFlow;
