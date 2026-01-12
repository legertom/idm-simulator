import { ConfigPanel } from "@/components/dashboard/ConfigPanel";
import { SubscriptionPanel } from "@/components/dashboard/SubscriptionPanel";
import { SyncConfigPanel } from "@/components/dashboard/SyncConfigPanel";
import { PasswordResetConfigPanel } from "@/components/dashboard/PasswordResetConfigPanel";
import { FiltersPanel } from "@/components/dashboard/FiltersPanel";
import { SyncsPanel } from "@/components/dashboard/SyncsPanel";
import { GoogleSchemaPanel } from "@/components/dashboard/GoogleSchemaPanel";
import { CustomExportsPanel } from "@/components/dashboard/CustomExportsPanel";
import { ConfigSettingsPanel, PasswordSettingsPanel, SyncSettingsPanel } from "@/components/dashboard/ConfigSettingsPanel";
import { UserAssociationsPanel } from "@/components/dashboard/UserAssociationsPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50/50 text-slate-900 p-8 font-sans">
      <header className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
          Mayton County Unified School District 42 (GA) - US
        </h1>
        <nav className="mt-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6 whitespace-nowrap text-[13px] text-slate-500 font-medium pb-2 border-b border-slate-100">
            <span className="hover:text-blue-600 cursor-pointer">Info</span>
            <span className="hover:text-blue-600 cursor-pointer">Team Members</span>
            <span className="hover:text-blue-600 cursor-pointer">Apps</span>
            <span className="hover:text-blue-600 cursor-pointer">Holds</span>
            <span className="hover:text-blue-600 cursor-pointer">Timeline</span>
            <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><rect width="4" height="4" x="7" y="7" /><rect width="4" height="4" x="13" y="13" /><rect width="4" height="4" x="7" y="13" /><rect width="4" height="4" x="13" y="7" /></svg>
              SSO & Badges
            </span>
            <span className="hover:text-blue-600 cursor-pointer">LMS</span>
            <span className="hover:text-blue-600 cursor-pointer">Sharing Analyst</span>
            <span className="hover:text-blue-600 cursor-pointer">District Pulse</span>
            <span className="hover:text-blue-600 cursor-pointer">Sync Settings</span>
            <span className="hover:text-blue-600 cursor-pointer">SFTP Files</span>
            <span className="hover:text-blue-600 cursor-pointer">Library</span>
            <span className="hover:text-blue-600 cursor-pointer">MDR and NCES</span>
            <span className="text-blue-600 font-bold border-b-2 border-blue-600 pb-2 -mb-2">IDM</span>
            <span className="hover:text-blue-600 cursor-pointer">Google Classroom</span>
            <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              MFA
            </span>
            <span className="hover:text-slate-800 cursor-pointer ml-2">App Store</span>
            <span className="hover:text-slate-800 cursor-pointer">Advanced</span>
          </div>
        </nav>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1600px] mx-auto">
        {/* Row 1 */}
        <ConfigPanel />
        <SubscriptionPanel />

        {/* Row 2 */}
        <SyncConfigPanel />
        <PasswordResetConfigPanel />

        {/* Row 3 */}
        <FiltersPanel />
        <SyncsPanel />

        {/* Row 4 */}
        <GoogleSchemaPanel />
        <CustomExportsPanel />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-[1600px] mx-auto">
        <ConfigSettingsPanel />
        <PasswordSettingsPanel />
        <SyncSettingsPanel />
      </div>

      <div className="mt-8 max-w-[1600px] mx-auto">
        <UserAssociationsPanel />
      </div>
    </div>
  );
}
