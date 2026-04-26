import { LayoutDashboard } from "lucide-react";

export function DashboardView() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <LayoutDashboard size={48} className="text-white/10 mx-auto" />
        <p className="text-on-surface-variant italic">Dashboard content will be displayed here.</p>
      </div>
    </div>
  );
}
