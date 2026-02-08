import React, { useState } from 'react';
import {
  Hammer, Building, CheckCircle2, AlertCircle,
  Video, FileText, BarChart3, Clock, ArrowRight, X,
  TrendingUp, DollarSign, Users, Calendar, AlertTriangle
} from 'lucide-react';

const constructionProjects = [
    { id: 1, name: 'The Independent Heights', location: 'Houston, TX', budget: 22000000, spent: 8500000, progress: 38, status: 'On Schedule', contractor: 'DPR Construction', nextMilestone: 'Foundation Pour Complete' },
    { id: 2, name: 'Katy Logistics Park', location: 'Katy, TX', budget: 12000000, spent: 1000000, progress: 8, status: 'Delayed', contractor: 'Harvey Builders', nextMilestone: 'Site Clearing' },
    { id: 3, name: 'Sugar Land Mixed-Use', location: 'Sugar Land, TX', budget: 45000000, spent: 38000000, progress: 85, status: 'On Schedule', contractor: 'Tellepsen', nextMilestone: 'Interior Fit-out' },
];

const projectReports: Record<number, { milestones: {name: string; date: string; status: string}[]; risks: string[]; changeOrders: {description: string; amount: number; status: string}[]; inspections: {type: string; date: string; result: string}[] }> = {
    1: {
        milestones: [
            { name: 'Site Prep & Demolition', date: 'Jan 15, 2024', status: 'Complete' },
            { name: 'Excavation & Grading', date: 'Mar 01, 2024', status: 'Complete' },
            { name: 'Foundation Pour Complete', date: 'Jun 15, 2024', status: 'In Progress' },
            { name: 'Structural Steel Erection', date: 'Sep 01, 2024', status: 'Pending' },
            { name: 'Building Envelope', date: 'Dec 15, 2024', status: 'Pending' },
        ],
        risks: ['Supply chain delay on structural steel (2-week buffer)', 'Subcontractor labor shortage for electrical'],
        changeOrders: [
            { description: 'Additional soil remediation - Phase 2', amount: 185000, status: 'Approved' },
            { description: 'Upgraded HVAC units per tenant spec', amount: 320000, status: 'Pending' },
        ],
        inspections: [
            { type: 'Foundation - Rebar Placement', date: 'May 22, 2024', result: 'Passed' },
            { type: 'Soil Compaction Test', date: 'Feb 10, 2024', result: 'Passed' },
            { type: 'Erosion Control', date: 'Jan 20, 2024', result: 'Passed' },
        ],
    },
    2: {
        milestones: [
            { name: 'Permit Approval', date: 'Apr 01, 2024', status: 'Complete' },
            { name: 'Site Clearing', date: 'Jun 01, 2024', status: 'In Progress' },
            { name: 'Utility Rough-In', date: 'Aug 15, 2024', status: 'Pending' },
            { name: 'Slab Pour', date: 'Oct 01, 2024', status: 'Pending' },
        ],
        risks: ['Permit delay from Harris County (resolved)', 'Weather delays during hurricane season', 'Environmental review pending for wetland setback'],
        changeOrders: [
            { description: 'Retaining wall addition - east boundary', amount: 95000, status: 'Approved' },
        ],
        inspections: [
            { type: 'Environmental Phase I', date: 'Mar 15, 2024', result: 'Conditional' },
            { type: 'Survey & Boundary Stake', date: 'Apr 10, 2024', result: 'Passed' },
        ],
    },
    3: {
        milestones: [
            { name: 'Site Prep', date: 'Jan 10, 2023', status: 'Complete' },
            { name: 'Foundation & Structure', date: 'Jun 01, 2023', status: 'Complete' },
            { name: 'Building Envelope', date: 'Nov 15, 2023', status: 'Complete' },
            { name: 'Interior Fit-out', date: 'May 01, 2024', status: 'In Progress' },
            { name: 'Final Inspection & CO', date: 'Aug 01, 2024', status: 'Pending' },
        ],
        risks: ['Minor punch list items on floors 3-5', 'Elevator commissioning scheduled for July'],
        changeOrders: [
            { description: 'Lobby redesign - marble upgrade', amount: 450000, status: 'Approved' },
            { description: 'Additional parking level signage', amount: 28000, status: 'Approved' },
            { description: 'Retail tenant TI allowance increase', amount: 175000, status: 'Pending' },
        ],
        inspections: [
            { type: 'Fire Suppression System', date: 'Apr 20, 2024', result: 'Passed' },
            { type: 'Electrical - Floors 1-3', date: 'Mar 15, 2024', result: 'Passed' },
            { type: 'Plumbing Rough-In', date: 'Feb 01, 2024', result: 'Passed' },
            { type: 'Structural - Final', date: 'Oct 10, 2023', result: 'Passed' },
        ],
    },
};

const assetAnalytics: Record<number, { monthlyRevenue: {month: string; revenue: number; expenses: number}[]; leaseExpiry: {tenant: string; sqft: number; expiry: string; rent: number}[]; capex: {item: string; amount: number; date: string}[] }> = {
    1: {
        monthlyRevenue: [
            { month: 'Jan', revenue: 1850000, expenses: 920000 }, { month: 'Feb', revenue: 1920000, expenses: 910000 },
            { month: 'Mar', revenue: 2100000, expenses: 950000 }, { month: 'Apr', revenue: 1780000, expenses: 880000 },
            { month: 'May', revenue: 2050000, expenses: 940000 }, { month: 'Jun', revenue: 1950000, expenses: 960000 },
        ],
        leaseExpiry: [
            { tenant: 'Marriott International', sqft: 285000, expiry: 'Dec 2031', rent: 42.50 },
        ],
        capex: [
            { item: 'Pool & Spa Renovation', amount: 350000, date: 'Q3 2024' },
            { item: 'Conference Room AV Upgrade', amount: 85000, date: 'Q4 2024' },
        ],
    },
    2: {
        monthlyRevenue: [
            { month: 'Jan', revenue: 420000, expenses: 145000 }, { month: 'Feb', revenue: 425000, expenses: 148000 },
            { month: 'Mar', revenue: 430000, expenses: 142000 }, { month: 'Apr', revenue: 435000, expenses: 150000 },
            { month: 'May', revenue: 432000, expenses: 146000 }, { month: 'Jun', revenue: 440000, expenses: 152000 },
        ],
        leaseExpiry: [
            { tenant: 'Target', sqft: 125000, expiry: 'Mar 2028', rent: 18.75 },
            { tenant: 'Trader Joe\'s', sqft: 14000, expiry: 'Sep 2026', rent: 32.00 },
            { tenant: 'CVS Pharmacy', sqft: 10000, expiry: 'Jan 2027', rent: 28.50 },
        ],
        capex: [
            { item: 'Parking Lot Reseal', amount: 65000, date: 'Q2 2024' },
        ],
    },
    3: {
        monthlyRevenue: [
            { month: 'Jan', revenue: 380000, expenses: 165000 }, { month: 'Feb', revenue: 385000, expenses: 168000 },
            { month: 'Mar', revenue: 378000, expenses: 170000 }, { month: 'Apr', revenue: 390000, expenses: 172000 },
            { month: 'May', revenue: 395000, expenses: 169000 }, { month: 'Jun', revenue: 388000, expenses: 175000 },
        ],
        leaseExpiry: [
            { tenant: 'Unit Mix - 240 units', sqft: 196000, expiry: 'Rolling', rent: 1.95 },
        ],
        capex: [
            { item: 'Unit Renovations - Phase 2 (40 units)', amount: 520000, date: 'Q3 2024' },
            { item: 'Amenity Center Refresh', amount: 180000, date: 'Q1 2025' },
        ],
    },
    4: {
        monthlyRevenue: [
            { month: 'Jan', revenue: 290000, expenses: 180000 }, { month: 'Feb', revenue: 285000, expenses: 178000 },
            { month: 'Mar', revenue: 275000, expenses: 182000 }, { month: 'Apr', revenue: 270000, expenses: 185000 },
            { month: 'May', revenue: 268000, expenses: 183000 }, { month: 'Jun', revenue: 265000, expenses: 188000 },
        ],
        leaseExpiry: [
            { tenant: 'Deloitte', sqft: 45000, expiry: 'Jun 2025', rent: 24.00 },
            { tenant: 'Regus Flex', sqft: 18000, expiry: 'Dec 2024', rent: 22.00 },
            { tenant: 'Vacant - Floor 4', sqft: 22000, expiry: 'N/A', rent: 0 },
        ],
        capex: [
            { item: 'Lobby Modernization', amount: 275000, date: 'Q4 2024' },
            { item: 'HVAC System Replacement', amount: 420000, date: 'Q1 2025' },
        ],
    },
};

const operatingAssets = [
    { id: 1, name: 'Marriott Galleria', type: 'Hospitality', occupancy: 82, noiVariance: 4.5, manager: 'Aimbridge' },
    { id: 2, name: 'Vintage Park Retail', type: 'Retail', occupancy: 96, noiVariance: 1.2, manager: 'Stream Realty' },
    { id: 3, name: 'Midtown Multifamily', type: 'Multifamily', occupancy: 94, noiVariance: -2.1, manager: 'Greystar' },
    { id: 4, name: 'Westchase Offices', type: 'Office', occupancy: 78, noiVariance: -5.4, manager: 'Transwestern' },
];

const ProjectsOps: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'construction' | 'operations'>('construction');
  const [liveCamProject, setLiveCamProject] = useState<number | null>(null);
  const [reportProject, setReportProject] = useState<number | null>(null);
  const [analyticsAsset, setAnalyticsAsset] = useState<number | null>(null);

  const activeReport = reportProject ? projectReports[reportProject] : null;
  const activeProjectName = reportProject ? constructionProjects.find(p => p.id === reportProject)?.name : '';
  const activeAnalytics = analyticsAsset ? assetAnalytics[analyticsAsset] : null;
  const activeAssetName = analyticsAsset ? operatingAssets.find(a => a.id === analyticsAsset)?.name : '';

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Operations & Construction</h2>
          <p className="text-slate-500">Real-time project tracking via Procore & AppFolio integrations.</p>
        </div>
        <div className="bg-white p-1 rounded-lg border border-slate-200 flex">
            <button
                onClick={() => setActiveTab('construction')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${activeTab === 'construction' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
                <Hammer className="w-4 h-4 mr-2" /> Active Construction
            </button>
            <button
                onClick={() => setActiveTab('operations')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${activeTab === 'operations' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
                <Building className="w-4 h-4 mr-2" /> Stabilized Assets
            </button>
        </div>
      </div>

      {/* Live Cam Modal */}
      {liveCamProject && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setLiveCamProject(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Live Cam - {constructionProjects.find(p => p.id === liveCamProject)?.name}</h3>
              <button onClick={() => setLiveCamProject(null)} className="p-1 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5 text-slate-500" /></button>
            </div>
            <div className="p-6">
              <div className="bg-slate-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center"><div className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></div>LIVE</div>
                <div className="absolute top-3 right-3 text-white/60 text-xs font-mono">CAM-0{liveCamProject} | {new Date().toLocaleTimeString()}</div>
                <div className="text-center">
                  <Video className="w-16 h-16 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">Procore Site Camera Feed</p>
                  <p className="text-slate-500 text-xs mt-1">{constructionProjects.find(p => p.id === liveCamProject)?.location}</p>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <span className="text-white/40 text-[10px]">Powered by Procore Construction Cameras</span>
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-white/60 text-xs cursor-pointer hover:bg-white/20">1x</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-slate-500">Camera</p>
                  <p className="font-bold text-slate-900 text-sm">North Tower</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-slate-500">Last Motion</p>
                  <p className="font-bold text-slate-900 text-sm">2 mins ago</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-slate-500">Workers On-Site</p>
                  <p className="font-bold text-slate-900 text-sm">{liveCamProject === 1 ? '47' : liveCamProject === 2 ? '12' : '83'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportProject && activeReport && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setReportProject(null)}>
          <div className="bg-white rounded-xl max-w-3xl w-full shadow-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-slate-100 sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-bold text-slate-900">Construction Report</h3>
                <p className="text-sm text-slate-500">{activeProjectName}</p>
              </div>
              <button onClick={() => setReportProject(null)} className="p-1 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5 text-slate-500" /></button>
            </div>
            <div className="p-6 space-y-6">
              {/* Milestones */}
              <div>
                <h4 className="font-bold text-slate-800 mb-3 flex items-center"><Calendar className="w-4 h-4 mr-2 text-blue-600" /> Milestone Tracker</h4>
                <div className="space-y-2">
                  {activeReport.milestones.map((m, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${m.status === 'Complete' ? 'bg-green-500' : m.status === 'In Progress' ? 'bg-yellow-500' : 'bg-slate-300'}`}></div>
                        <span className="text-sm font-medium text-slate-800">{m.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-slate-500">{m.date}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.status === 'Complete' ? 'bg-green-100 text-green-700' : m.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'}`}>{m.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks */}
              <div>
                <h4 className="font-bold text-slate-800 mb-3 flex items-center"><AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" /> Active Risks</h4>
                <div className="space-y-2">
                  {activeReport.risks.map((r, i) => (
                    <div key={i} className="flex items-start p-3 rounded-lg bg-yellow-50 border border-yellow-100">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-yellow-900">{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Change Orders */}
              <div>
                <h4 className="font-bold text-slate-800 mb-3 flex items-center"><DollarSign className="w-4 h-4 mr-2 text-green-600" /> Change Orders</h4>
                <table className="w-full text-sm">
                  <thead><tr className="text-xs text-slate-500 uppercase border-b"><th className="pb-2 text-left">Description</th><th className="pb-2 text-right">Amount</th><th className="pb-2 text-right">Status</th></tr></thead>
                  <tbody>
                    {activeReport.changeOrders.map((co, i) => (
                      <tr key={i} className="border-b border-slate-50">
                        <td className="py-2 text-slate-800">{co.description}</td>
                        <td className="py-2 text-right font-medium">${co.amount.toLocaleString()}</td>
                        <td className="py-2 text-right"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${co.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{co.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Inspections */}
              <div>
                <h4 className="font-bold text-slate-800 mb-3 flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-blue-600" /> Inspections</h4>
                <div className="space-y-2">
                  {activeReport.inspections.map((ins, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                      <span className="text-sm font-medium text-slate-800">{ins.type}</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-slate-500">{ins.date}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ins.result === 'Passed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{ins.result}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {analyticsAsset && activeAnalytics && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setAnalyticsAsset(null)}>
          <div className="bg-white rounded-xl max-w-3xl w-full shadow-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-slate-100 sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-bold text-slate-900">Asset Analytics</h3>
                <p className="text-sm text-slate-500">{activeAssetName}</p>
              </div>
              <button onClick={() => setAnalyticsAsset(null)} className="p-1 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5 text-slate-500" /></button>
            </div>
            <div className="p-6 space-y-6">
              {/* Revenue Table */}
              <div>
                <h4 className="font-bold text-slate-800 mb-3 flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-green-600" /> Monthly Revenue vs Expenses</h4>
                <table className="w-full text-sm">
                  <thead><tr className="text-xs text-slate-500 uppercase border-b"><th className="pb-2 text-left">Month</th><th className="pb-2 text-right">Revenue</th><th className="pb-2 text-right">Expenses</th><th className="pb-2 text-right">NOI</th></tr></thead>
                  <tbody>
                    {activeAnalytics.monthlyRevenue.map((m, i) => (
                      <tr key={i} className="border-b border-slate-50">
                        <td className="py-2 text-slate-800">{m.month}</td>
                        <td className="py-2 text-right font-medium text-green-700">${(m.revenue / 1000).toFixed(0)}K</td>
                        <td className="py-2 text-right text-red-600">${(m.expenses / 1000).toFixed(0)}K</td>
                        <td className="py-2 text-right font-bold text-slate-900">${((m.revenue - m.expenses) / 1000).toFixed(0)}K</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Lease Expiry */}
              <div>
                <h4 className="font-bold text-slate-800 mb-3 flex items-center"><Users className="w-4 h-4 mr-2 text-blue-600" /> Lease Schedule</h4>
                <table className="w-full text-sm">
                  <thead><tr className="text-xs text-slate-500 uppercase border-b"><th className="pb-2 text-left">Tenant</th><th className="pb-2 text-right">Sq Ft</th><th className="pb-2 text-right">Rent/SF</th><th className="pb-2 text-right">Expiry</th></tr></thead>
                  <tbody>
                    {activeAnalytics.leaseExpiry.map((l, i) => (
                      <tr key={i} className="border-b border-slate-50">
                        <td className="py-2 text-slate-800 font-medium">{l.tenant}</td>
                        <td className="py-2 text-right">{l.sqft.toLocaleString()}</td>
                        <td className="py-2 text-right">{l.rent > 0 ? `$${l.rent.toFixed(2)}` : '-'}</td>
                        <td className="py-2 text-right"><span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{l.expiry}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CapEx */}
              <div>
                <h4 className="font-bold text-slate-800 mb-3 flex items-center"><DollarSign className="w-4 h-4 mr-2 text-yellow-600" /> Planned Capital Expenditures</h4>
                <div className="space-y-2">
                  {activeAnalytics.capex.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                      <span className="text-sm font-medium text-slate-800">{c.item}</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-bold text-slate-900">${c.amount.toLocaleString()}</span>
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{c.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'construction' ? (
          <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {constructionProjects.map(project => (
                      <div key={project.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                          <div className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                  <div>
                                      <h3 className="font-bold text-lg text-slate-900">{project.name}</h3>
                                      <p className="text-sm text-slate-500 flex items-center mt-1">
                                          <Building className="w-3 h-3 mr-1" /> {project.location}
                                      </p>
                                  </div>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${project.status === 'Delayed' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                      {project.status}
                                  </span>
                              </div>

                              <div className="mb-6">
                                  <div className="flex justify-between text-sm mb-1">
                                      <span className="text-slate-600">Completion</span>
                                      <span className="font-bold text-slate-900">{project.progress}%</span>
                                  </div>
                                  <div className="w-full bg-slate-100 rounded-full h-2">
                                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                                  </div>
                                  <div className="mt-2 text-xs text-slate-400 text-right flex items-center justify-end">
                                      <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" /> Synced with Procore
                                  </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="bg-slate-50 p-3 rounded-lg">
                                      <p className="text-xs text-slate-500">Budget Spent</p>
                                      <p className="font-semibold text-slate-900">${(project.spent / 1000000).toFixed(1)}M <span className="text-slate-400 font-normal">/ {(project.budget / 1000000).toFixed(1)}M</span></p>
                                  </div>
                                  <div className="bg-slate-50 p-3 rounded-lg">
                                      <p className="text-xs text-slate-500">Next Milestone</p>
                                      <p className="font-semibold text-slate-900 text-xs truncate" title={project.nextMilestone}>{project.nextMilestone}</p>
                                  </div>
                              </div>

                              <div className="flex space-x-2 pt-4 border-t border-slate-100">
                                  <button
                                      onClick={() => setLiveCamProject(project.id)}
                                      className="flex-1 py-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center justify-center"
                                  >
                                      <Video className="w-4 h-4 mr-2" /> Live Cam
                                  </button>
                                  <button
                                      onClick={() => setReportProject(project.id)}
                                      className="flex-1 py-2 text-sm text-white bg-slate-900 rounded-lg hover:bg-slate-800 flex items-center justify-center"
                                  >
                                      <FileText className="w-4 h-4 mr-2" /> Report
                                  </button>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-slate-900">Portfolio Performance</h3>
                  <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> AppFolio Data Synced: 12 mins ago
                  </div>
              </div>
              <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500">
                      <tr>
                          <th className="px-6 py-4">Asset Name</th>
                          <th className="px-6 py-4">Type</th>
                          <th className="px-6 py-4">Occupancy</th>
                          <th className="px-6 py-4">NOI Variance (YTD)</th>
                          <th className="px-6 py-4">Property Manager</th>
                          <th className="px-6 py-4"></th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      {operatingAssets.map(asset => (
                          <tr key={asset.id} className="hover:bg-slate-50">
                              <td className="px-6 py-4 font-medium text-slate-900">{asset.name}</td>
                              <td className="px-6 py-4">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide
                                      ${asset.type === 'Multifamily' ? 'bg-blue-100 text-blue-700' :
                                        asset.type === 'Retail' ? 'bg-orange-100 text-orange-700' :
                                        asset.type === 'Hospitality' ? 'bg-purple-100 text-purple-700' :
                                        'bg-slate-100 text-slate-700'
                                      }`}>
                                      {asset.type}
                                  </span>
                              </td>
                              <td className="px-6 py-4">
                                  <div className="flex items-center">
                                      <div className="w-16 h-1.5 bg-slate-200 rounded-full mr-2">
                                          <div className={`h-1.5 rounded-full ${asset.occupancy > 90 ? 'bg-green-500' : asset.occupancy > 80 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${asset.occupancy}%` }}></div>
                                      </div>
                                      <span className="text-sm font-medium">{asset.occupancy}%</span>
                                  </div>
                              </td>
                              <td className="px-6 py-4">
                                  <span className={`font-medium ${asset.noiVariance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                      {asset.noiVariance > 0 ? '+' : ''}{asset.noiVariance}%
                                  </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-500">{asset.manager}</td>
                              <td className="px-6 py-4 text-right">
                                  <button
                                      onClick={() => setAnalyticsAsset(asset.id)}
                                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-end"
                                  >
                                      Analytics <ArrowRight className="w-3 h-3 ml-1" />
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      )}
    </div>
  );
};

export default ProjectsOps;
