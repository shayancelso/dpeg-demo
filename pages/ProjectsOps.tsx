import React, { useState } from 'react';
import { 
  Hammer, Building, CheckCircle2, AlertCircle, 
  Video, FileText, BarChart3, Clock, ArrowRight
} from 'lucide-react';

const constructionProjects = [
    { id: 1, name: 'The Independent Heights', location: 'Houston, TX', budget: 22000000, spent: 8500000, progress: 38, status: 'On Schedule', contractor: 'DPR Construction', nextMilestone: 'Foundation Pour Complete' },
    { id: 2, name: 'Katy Logistics Park', location: 'Katy, TX', budget: 12000000, spent: 1000000, progress: 8, status: 'Delayed', contractor: 'Harvey Builders', nextMilestone: 'Site Clearing' },
    { id: 3, name: 'Sugar Land Mixed-Use', location: 'Sugar Land, TX', budget: 45000000, spent: 38000000, progress: 85, status: 'On Schedule', contractor: 'Tellepsen', nextMilestone: 'Interior Fit-out' },
];

const operatingAssets = [
    { id: 1, name: 'Marriott Galleria', type: 'Hospitality', occupancy: 82, noiVariance: 4.5, manager: 'Aimbridge' },
    { id: 2, name: 'Vintage Park Retail', type: 'Retail', occupancy: 96, noiVariance: 1.2, manager: 'Stream Realty' },
    { id: 3, name: 'Midtown Multifamily', type: 'Multifamily', occupancy: 94, noiVariance: -2.1, manager: 'Greystar' },
    { id: 4, name: 'Westchase Offices', type: 'Office', occupancy: 78, noiVariance: -5.4, manager: 'Transwestern' },
];

const ProjectsOps: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'construction' | 'operations'>('construction');

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
                                  <button className="flex-1 py-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center justify-center">
                                      <Video className="w-4 h-4 mr-2" /> Live Cam
                                  </button>
                                  <button className="flex-1 py-2 text-sm text-white bg-slate-900 rounded-lg hover:bg-slate-800 flex items-center justify-center">
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
                                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-end">
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