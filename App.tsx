import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import InvestorPortal from './pages/InvestorPortal';
import DealFlow from './pages/DealFlow';
import Intelligence from './pages/Intelligence';
import ScenarioModeling from './pages/ScenarioModeling';
import DocumentCenter from './pages/DocumentCenter';
import Investors from './pages/Investors';
import ProjectsOps from './pages/ProjectsOps';
import Settings from './pages/Settings';
import { UserRole } from './types';

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.EXECUTIVE);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = `/${page}`;
  };

  // Simple role switcher for demo purposes
  const RoleSwitcher = () => (
    <div className="fixed top-4 right-6 z-50 bg-white shadow-lg border border-slate-200 rounded-full px-4 py-2 flex items-center space-x-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">View As:</span>
        <select 
            value={currentRole} 
            onChange={(e) => {
                const newRole = e.target.value as UserRole;
                setCurrentRole(newRole);
                // Redirect logic based on role
                if (newRole === UserRole.INVESTOR) {
                    handleNavigate('investor-portal');
                } else {
                    handleNavigate('dashboard');
                }
            }}
            className="text-sm font-medium text-slate-800 bg-transparent outline-none cursor-pointer"
        >
            <option value={UserRole.EXECUTIVE}>Executive Partner</option>
            <option value={UserRole.RELATIONSHIP_MANAGER}>Relationship Manager</option>
            <option value={UserRole.INVESTOR}>Investor (LP)</option>
        </select>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <RoleSwitcher />
      
      <Sidebar 
        currentRole={currentRole} 
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <main className="flex-1 ml-64 p-8">
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<ExecutiveDashboard />} />
                <Route path="/investor-portal" element={<InvestorPortal />} />
                <Route path="/deal-flow" element={<DealFlow />} />
                <Route path="/intelligence" element={<Intelligence />} />
                <Route path="/modeling" element={<ScenarioModeling />} />
                <Route path="/documents" element={<DocumentCenter />} />
                <Route path="/investors" element={<Investors />} />
                <Route path="/projects" element={<ProjectsOps />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Router>
      </main>
    </div>
  );
};

export default App;