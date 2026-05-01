import { Search } from "lucide-react";

interface HeaderProps {
  activeTab: "upload";
}

export function Header({ activeTab }: HeaderProps) {
  return (
    <header className="h-20 flex items-center justify-between px-10">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Video Intelligence
        </h2>
        <p className="text-sm text-on-surface-variant">
          Analyze and optimize your video content.
        </p>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-2 text-sm focus:outline-none focus:border-white/30 w-48 transition-all focus:w-64"
          />
        </div>
        <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary" />
          <span className="text-sm font-medium text-white">Alex Rivera</span>
        </div>
      </div>
    </header>
  );
}
