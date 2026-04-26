/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { UploadView } from "./components/views/UploadView";
import { DashboardView } from "./components/views/DashboardView";

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "upload">("upload");

  return (
    <div className="flex min-h-screen bg-transparent selection:bg-primary/30">
      <div className="mesh-bg" />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header activeTab={activeTab} />

        <main className="px-10 pb-10 max-w-[1600px] w-full">
          {activeTab === "upload" ? <UploadView /> : <DashboardView />}
        </main>
      </div>
    </div>
  );
}
