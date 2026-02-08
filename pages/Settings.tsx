import React, { useState } from 'react';
import {
  Shield, Users, Bell, Database, Key, Globe,
  CheckCircle2, ToggleLeft, ToggleRight, Save, AlertCircle
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('roles');
  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState({
    emailDigest: true,
    dealAlerts: true,
    investorActivity: false,
    systemUpdates: true,
    weeklyReport: true,
  });

  const [integrations, setIntegrations] = useState({
    quickbooks: { enabled: true, lastSync: '2 mins ago', status: 'Connected' },
    appfolio: { enabled: true, lastSync: '1 hour ago', status: 'Connected' },
    procore: { enabled: true, lastSync: '5 mins ago', status: 'Connected' },
    costar: { enabled: true, lastSync: '1 day ago', status: 'Connected' },
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleIntegration = (key: keyof typeof integrations) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled, status: !prev[key].enabled ? 'Connected' : 'Disconnected' }
    }));
  };

  const sections = [
    { id: 'roles', label: 'Roles & Access', icon: Shield },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'general', label: 'General', icon: Globe },
  ];

  const roles = [
    { name: 'Executive Partner', permissions: ['Full Dashboard', 'Deal Flow', 'Scenario Modeling', 'All Reports', 'System Settings'], users: 3 },
    { name: 'Relationship Manager', permissions: ['Dashboard (Read)', 'Investor CRM', 'Document Center', 'Intelligence'], users: 8 },
    { name: 'Investor (LP)', permissions: ['Portfolio View', 'Document Downloads', 'Capital Call Responses'], users: 10450 },
  ];

  const teamMembers = [
    { name: 'Nazeer Dhanani', email: 'nazeer@dpeg.com', role: 'Executive Partner', status: 'Active', lastLogin: '2 hours ago' },
    { name: 'Sarah Mitchell', email: 'sarah.m@dpeg.com', role: 'Executive Partner', status: 'Active', lastLogin: '1 day ago' },
    { name: 'James Rodriguez', email: 'james.r@dpeg.com', role: 'Relationship Manager', status: 'Active', lastLogin: '3 hours ago' },
    { name: 'Emily Chen', email: 'emily.c@dpeg.com', role: 'Relationship Manager', status: 'Active', lastLogin: '5 hours ago' },
    { name: 'Marcus Thompson', email: 'marcus.t@dpeg.com', role: 'Relationship Manager', status: 'Invited', lastLogin: 'Never' },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Settings</h2>
          <p className="text-slate-500">RBAC, integrations, and system configuration.</p>
        </div>
        <button onClick={handleSave} className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-2" /> Settings saved successfully.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        {/* Left Nav */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 h-fit">
          {sections.map(s => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-1 transition-colors ${activeSection === s.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Icon className="w-4 h-4 mr-3" /> {s.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === 'roles' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Role-Based Access Control</h3>
              {roles.map((role, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900">{role.name}</h4>
                      <p className="text-xs text-slate-500">{role.users.toLocaleString()} users with this role</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Edit Permissions</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((p, j) => (
                      <span key={j} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'team' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Team Members</h3>
                <button className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-800">Invite Member</button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Role</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Last Login</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {teamMembers.map((m, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div><span className="font-medium text-slate-900">{m.name}</span></div>
                          <div className="text-xs text-slate-400">{m.email}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{m.role}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{m.status}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{m.lastLogin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Notification Preferences</h3>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
                {[
                  { key: 'emailDigest' as const, label: 'Daily Email Digest', desc: 'Receive a summary of all activity each morning' },
                  { key: 'dealAlerts' as const, label: 'Deal Stage Alerts', desc: 'Get notified when deals move to a new stage' },
                  { key: 'investorActivity' as const, label: 'Investor Activity', desc: 'Alerts when investors view documents or respond to capital calls' },
                  { key: 'systemUpdates' as const, label: 'System Updates', desc: 'Integration sync failures and system health alerts' },
                  { key: 'weeklyReport' as const, label: 'Weekly Performance Report', desc: 'Portfolio performance summary every Monday' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <button onClick={() => toggleNotification(item.key)} className="text-slate-600">
                      {notifications[item.key] ? <ToggleRight className="w-8 h-8 text-green-600" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">System Integrations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(Object.entries(integrations) as [keyof typeof integrations, typeof integrations[keyof typeof integrations]][]).map(([key, int]) => (
                  <div key={key} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-slate-900 capitalize">{key === 'quickbooks' ? 'QuickBooks' : key === 'appfolio' ? 'AppFolio' : key === 'procore' ? 'Procore' : 'CoStar'}</h4>
                        <p className="text-xs text-slate-500">Last sync: {int.lastSync}</p>
                      </div>
                      <button onClick={() => toggleIntegration(key)} className="text-slate-600">
                        {int.enabled ? <ToggleRight className="w-8 h-8 text-green-600" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}
                      </button>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${int.enabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={`text-sm font-medium ${int.enabled ? 'text-green-700' : 'text-red-600'}`}>{int.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'api' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">API Keys</h3>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-start">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-yellow-900">API keys provide full access to the DPEG Nexus platform. Keep them secure and never share them publicly.</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
                {[
                  { name: 'Gemini AI Service', key: 'gm-****************************a4Kf', created: 'Oct 15, 2024', lastUsed: '2 minutes ago' },
                  { name: 'Procore Webhook', key: 'pk-****************************x9Mn', created: 'Sep 01, 2024', lastUsed: '5 minutes ago' },
                  { name: 'AppFolio Sync', key: 'af-****************************j3Qr', created: 'Aug 20, 2024', lastUsed: '1 hour ago' },
                ].map((api, i) => (
                  <div key={i} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{api.name}</p>
                      <p className="text-xs text-slate-400 font-mono mt-1">{api.key}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Created: {api.created}</p>
                      <p className="text-xs text-slate-400">Last used: {api.lastUsed}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'general' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">General Settings</h3>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                  <input type="text" defaultValue="Dhanani Private Equity Group" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Primary Contact Email</label>
                  <input type="email" defaultValue="invest@dpeg.com" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Default Currency</label>
                  <select defaultValue="USD" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Fiscal Year Start</label>
                  <select defaultValue="jan" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                    <option value="jan">January</option>
                    <option value="apr">April</option>
                    <option value="jul">July</option>
                    <option value="oct">October</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                  <select defaultValue="cst" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                    <option value="cst">Central Time (CT) - Houston</option>
                    <option value="est">Eastern Time (ET)</option>
                    <option value="pst">Pacific Time (PT)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
