import React from 'react';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  BrainCircuit, 
  Settings, 
  PieChart, 
  FileText,
  Sliders,
  FileOutput
} from 'lucide-react';

interface SidebarProps {
  currentRole: UserRole;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRole, onNavigate, currentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: [UserRole.EXECUTIVE, UserRole.RELATIONSHIP_MANAGER] },
    { id: 'investor-portal', label: 'My Portfolio', icon: PieChart, roles: [UserRole.INVESTOR] },
    { id: 'deal-flow', label: 'Deal Flow', icon: Briefcase, roles: [UserRole.EXECUTIVE] },
    { id: 'modeling', label: 'Scenario Modeling', icon: Sliders, roles: [UserRole.EXECUTIVE] },
    { id: 'investors', label: 'Investors', icon: Users, roles: [UserRole.EXECUTIVE, UserRole.RELATIONSHIP_MANAGER] },
    { id: 'documents', label: 'Document Center', icon: FileOutput, roles: [UserRole.EXECUTIVE, UserRole.RELATIONSHIP_MANAGER] },
    { id: 'projects', label: 'Projects (Ops)', icon: FileText, roles: [UserRole.EXECUTIVE, UserRole.RELATIONSHIP_MANAGER] },
    { id: 'intelligence', label: 'DPEG Intelligence', icon: BrainCircuit, roles: [UserRole.EXECUTIVE, UserRole.RELATIONSHIP_MANAGER] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: [UserRole.EXECUTIVE, UserRole.INVESTOR, UserRole.RELATIONSHIP_MANAGER] },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-50">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold tracking-tight text-yellow-500">DPEG <span className="text-white">Nexus</span></h1>
        <p className="text-xs text-slate-400 mt-1">Invest. Manage. Scale.</p>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.filter(item => item.roles.includes(currentRole)).map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? 'bg-yellow-500 text-slate-900 shadow-md' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                {currentRole[0]}
            </div>
            <div className="ml-3">
                <p className="text-sm font-medium text-white">{currentRole.replace('_', ' ')}</p>
                <p className="text-xs text-slate-400">Online</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;