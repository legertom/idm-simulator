"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Info, ChevronDown, CheckSquare, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// Helper for "Tabs"
function UserTypeTabs({ selected, onSelect }: { selected: string; onSelect: (tab: string) => void }) {
    return (
        <div className="flex text-sm border-b border-gray-200 mb-4">
            {["Students", "Teachers", "Staff"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => onSelect(tab)}
                    className={`px-4 py-2 font-medium transition-colors ${tab === selected
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

export function ConfigSettingsPanel() {
    const [selectedTab, setSelectedTab] = useState("Students");
    const [allowApostrophes, setAllowApostrophes] = useState<Record<string, boolean>>({
        Students: false,
        Teachers: false,
        Staff: false
    });
    const [givenNameFormula, setGivenNameFormula] = useState<Record<string, string>>({
        Students: "{{name.first}}",
        Teachers: "{{name.first}}",
        Staff: "{{name.first}}"
    });
    const [familyNameFormula, setFamilyNameFormula] = useState<Record<string, string>>({
        Students: "{{name.last}}",
        Teachers: "{{name.last}}",
        Staff: "{{name.last}}"
    });

    return (
        <Card className="border-t-4 border-t-blue-500 shadow-sm h-full">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-medium text-slate-600">Config Settings per User Type</CardTitle>
                <Info className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent className="space-y-4 text-sm pt-2">
                <UserTypeTabs selected={selectedTab} onSelect={setSelectedTab} />

                <div className="flex items-center space-x-2 mb-4">
                    <Checkbox
                        id={`allow-apostrophes-${selectedTab}`}
                        checked={allowApostrophes[selectedTab]}
                        onCheckedChange={(checked) => setAllowApostrophes(prev => ({ ...prev, [selectedTab]: !!checked }))}
                    />
                    <label htmlFor={`allow-apostrophes-${selectedTab}`} className="text-slate-800 font-medium">Allow Apostrophes in Email</label>
                </div>

                <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Set Ignore OU Behavior</label>
                    <Select defaultValue="ignore">
                        <SelectTrigger className="h-10 border-blue-400 ring-2 ring-blue-100 ring-offset-0">
                            <SelectValue placeholder="Ignore" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ignore">Ignore</SelectItem>
                            <SelectItem value="suspend">Suspend</SelectItem>
                            <SelectItem value="updateOnly">Update Only</SelectItem>
                            <SelectItem value="default">Default</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="border border-slate-200 rounded-sm p-3 bg-white mt-2">
                        <div className="text-[11px] text-slate-500 font-mono">e.g. {"{{name.last}}"}</div>
                    </div>
                </div>

                <div className="pt-4">
                    <Button className="bg-[#4a72f1] hover:bg-blue-600 text-white px-8 py-5 h-auto text-sm font-medium rounded-md">Update</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export function PasswordSettingsPanel() {
    const [selectedTab, setSelectedTab] = useState("Students");
    const [reset1stLogin, setReset1stLogin] = useState<Record<string, boolean>>({
        Students: false,
        Teachers: false,
        Staff: false
    });
    const [matchReset, setMatchReset] = useState<Record<string, boolean>>({
        Students: false,
        Teachers: false,
        Staff: false
    });

    const [isResetOpen, setIsResetOpen] = useState(true);
    const userTypeParams = selectedTab.toLowerCase(); // students, teachers, staff

    return (
        <Card className="border-t-4 border-t-blue-500 shadow-sm h-full">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-medium text-slate-600">Password Settings per User Type</CardTitle>
                <Info className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent className="space-y-6 text-sm pt-2">
                <div className="text-xs text-slate-500 mb-2">
                    See <span className="text-blue-500 cursor-pointer">this Guru card</span> for more details on IDM password settings.
                </div>

                <UserTypeTabs selected={selectedTab} onSelect={setSelectedTab} />

                <div className="space-y-2">
                    <h4 className="font-semibold text-slate-700">Reset password on 1st login for all {userTypeParams}</h4>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={`reset-1st-${selectedTab}`}
                            checked={reset1stLogin[selectedTab]}
                            onCheckedChange={(checked) => setReset1stLogin(prev => ({ ...prev, [selectedTab]: !!checked }))}
                        />
                        <label htmlFor={`reset-1st-${selectedTab}`} className="text-slate-700">Have {userTypeParams} reset password on 1st login</label>
                    </div>
                </div>

                <div className="space-y-2">
                    <h4 className="font-semibold text-slate-700">Reset passwords to password formula for {userTypeParams} on "match" operations</h4>
                    <div className="text-xs text-slate-500">
                        See <span className="text-blue-500 cursor-pointer">this Guru card</span> for more details on this feature.
                    </div>
                    <div className="flex items-start space-x-2">
                        <Checkbox
                            id={`match-reset-${selectedTab}`}
                            className="mt-0.5"
                            checked={matchReset[selectedTab]}
                            onCheckedChange={(checked) => setMatchReset(prev => ({ ...prev, [selectedTab]: !!checked }))}
                        />
                        <label htmlFor={`match-reset-${selectedTab}`} className="text-slate-700 leading-tight">Have "match" operations reset passwords to the password formula for {userTypeParams}</label>
                    </div>
                    <p className="text-xs text-slate-500 italic">
                        You will need to manually trigger a preview and run a sync after these are updated.
                    </p>
                    <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white w-24 h-8 mt-2">Update</Button>
                </div>

                <div className="border-t pt-4">
                    <div
                        className="flex justify-between items-center cursor-pointer mb-2"
                        onClick={() => setIsResetOpen(!isResetOpen)}
                    >
                        <h4 className="font-bold text-slate-700">Reset passwords for all {userTypeParams}</h4>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isResetOpen ? 'rotate-0' : 'rotate-90'}`} />
                    </div>
                    {isResetOpen && (
                        <div className="space-y-4">
                            <div className="space-y-2 text-sm text-slate-500 leading-relaxed">
                                <p>Trigger a preview first, then commit if it looks correct.</p>
                                <p>If you need to remove the password reset from preview, use the undo button.</p>
                                <p>If you want to do this for a subset of schools/grades, apply the filters first.</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white flex-1 h-12 text-sm font-medium">Trigger Preview</Button>
                                <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white flex-1 h-12 text-sm font-medium">Commit Preview</Button>
                                <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white flex-1 h-12 text-sm font-medium">Undo Preview</Button>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export function SyncSettingsPanel() {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        provisioning: true,
        sisReassign: true,
        archive: true,
        multiRole: true,
        graduation: true,
        syncSchedule: true,
        triggerSync: true
    });

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <Card className="border-t-4 border-t-blue-500 shadow-sm h-full">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-medium text-slate-600">Sync Settings</CardTitle>
                <Info className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent className="space-y-6 text-sm pt-4 px-2">

                {/* Section 1 */}
                <div className="space-y-2">
                    <div
                        className="flex justify-between items-center cursor-pointer group"
                        onClick={() => toggleSection('provisioning')}
                    >
                        <h4 className="font-semibold text-slate-700 text-sm">Update the provisioning block</h4>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openSections.provisioning ? 'rotate-0' : 'rotate-90'}`} />
                    </div>
                    {openSections.provisioning && (
                        <div className="pl-0 space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="prov-blocked" />
                                <label htmlFor="prov-blocked" className="text-slate-700">Provisioning Blocked</label>
                            </div>
                            <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white w-20 h-8 text-xs">Update</Button>
                        </div>
                    )}
                </div>

                {/* Section 2 */}
                <div className="space-y-2">
                    <div
                        className="flex justify-between items-center cursor-pointer group"
                        onClick={() => toggleSection('sisReassign')}
                    >
                        <h4 className="font-semibold text-slate-700 text-sm">Update the reassign on SIS ID behavior</h4>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openSections.sisReassign ? 'rotate-0' : 'rotate-90'}`} />
                    </div>
                    {openSections.sisReassign && (
                        <div className="pl-0 space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="sis-reassign" />
                                <label htmlFor="sis-reassign" className="text-slate-700">Allow reassign on SIS ID</label>
                            </div>
                            <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white w-20 h-8 text-xs">Update</Button>
                        </div>
                    )}
                </div>

                {/* Section 3 - Archive */}
                <div className="space-y-2">
                    <div
                        className="flex justify-between items-center cursor-pointer group"
                        onClick={() => toggleSection('archive')}
                    >
                        <h4 className="font-semibold text-slate-700 text-sm">Update the archive user behavior</h4>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openSections.archive ? 'rotate-0' : 'rotate-90'}`} />
                    </div>
                    {openSections.archive && (
                        <div className="space-y-3">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Set Archive User Behavior</label>
                                <Select>
                                    <SelectTrigger className="h-8 mt-1"><SelectValue placeholder="Select behavior" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="never">Never</SelectItem>
                                        <SelectItem value="on_all_archives">On All Archives</SelectItem>
                                        <SelectItem value="default">Default</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white w-20 h-8 text-xs mt-2">Update</Button>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-blue-800 uppercase">Set Unarchive User Behavior</label>
                                <Select>
                                    <SelectTrigger className="h-8 mt-1"><SelectValue placeholder="Select behavior" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="unarchive_any">Unarchive any active user (default)</SelectItem>
                                        <SelectItem value="unarchive_only">Unarchive only from archive OUs</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white w-20 h-8 text-xs mt-2">Update</Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Section 4 - Multi-role */}
                <div className="space-y-2">
                    <div
                        className="flex justify-between items-center cursor-pointer group"
                        onClick={() => toggleSection('multiRole')}
                    >
                        <h4 className="font-semibold text-slate-700 text-sm">Update the multi-role user behavior</h4>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openSections.multiRole ? 'rotate-0' : 'rotate-90'}`} />
                    </div>
                    {openSections.multiRole && (
                        <>
                            <div className="text-xs text-slate-500">
                                See <span className="text-blue-500 cursor-pointer">this Guru card</span> for more details on users with multiple roles.
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Set Multi-role User Behavior</label>
                                <Select defaultValue="teacher">
                                    <SelectTrigger className="h-8 mt-1"><SelectValue placeholder="Prefer Teacher Profile" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="teacher">Prefer Teacher Profile</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white w-20 h-8 text-xs mt-2">Update</Button>
                            </div>
                        </>
                    )}
                </div>

                {/* Section 5 - Graduation */}
                <div className="space-y-2">
                    <div
                        className="flex justify-between items-center cursor-pointer group"
                        onClick={() => toggleSection('graduation')}
                    >
                        <h4 className="font-semibold text-slate-700 text-sm">Update the graduation rollover date</h4>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openSections.graduation ? 'rotate-0' : 'rotate-90'}`} />
                    </div>
                    {openSections.graduation && (
                        <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Current Graduation Rollover Date</label>
                            <div className="border rounded p-2 mt-1">
                                <div className="text-[10px] font-bold text-slate-500 uppercase">ROLLOVER DATE</div>
                                <div className="text-base text-slate-900">2026-06-16</div>
                            </div>
                            <div className="text-xs font-bold text-slate-800 mt-1">Format: YYYY-MM-DD</div>
                            <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white w-20 h-8 text-xs mt-2">Update</Button>
                        </div>
                    )}
                </div>

                {/* Section 6 - Sync Schedule */}
                <div className="space-y-2">
                    <div
                        className="flex justify-between items-center cursor-pointer group"
                        onClick={() => toggleSection('syncSchedule')}
                    >
                        <h4 className="font-semibold text-slate-700 text-sm">Update the current IDM sync schedule</h4>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openSections.syncSchedule ? 'rotate-0' : 'rotate-90'}`} />
                    </div>
                    {openSections.syncSchedule && (
                        <>
                            <div className="text-xs text-slate-500">
                                See <span className="text-blue-500 cursor-pointer">this Guru card</span> for more details on IDM sync frequency.
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-700 uppercase flex items-center gap-1">
                                    Current IDM Sync Schedule <AlertTriangle className="h-3 w-3" />
                                </label>
                                <div className="border rounded p-2 mt-1">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase">SYNC SCHEDULE:</div>
                                    <div className="text-base text-slate-900 font-medium">5 1,7,13,19 * * ? *</div>
                                </div>
                                <div className="text-xs font-bold text-slate-800 mt-1">four times a day, every day</div>
                                <div className="text-[10px] text-slate-500 mt-1 leading-tight">
                                    Next 2 runs at: Wed Dec 31 2025 19:05:00 GMT-08:00 (PST), Thu Jan 01 2026 01:05:00 GMT-08:00 (PST)
                                </div>
                                <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white w-20 h-8 text-xs mt-2">Update</Button>
                            </div>
                        </>
                    )}
                </div>

                {/* Section 7 - Trigger Sync */}
                <div className="space-y-2 pt-2">
                    <div
                        className="flex justify-between items-center cursor-pointer group"
                        onClick={() => toggleSection('triggerSync')}
                    >
                        <h4 className="font-semibold text-slate-700 text-sm">Trigger a sync</h4>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openSections.triggerSync ? 'rotate-0' : 'rotate-90'}`} />
                    </div>
                    {openSections.triggerSync && (
                        <>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="secondary" className="bg-slate-100 text-slate-400 text-xs h-8" disabled>Trigger Preview</Button>
                                <Button variant="secondary" className="bg-slate-100 text-slate-400 text-xs h-8" disabled>Trigger Provision</Button>
                            </div>
                            <Button variant="secondary" className="bg-slate-100 text-slate-400 text-xs h-8 mt-1" disabled>Trigger Export Passwords Sync</Button>
                        </>
                    )}
                </div>

            </CardContent>
        </Card>
    );
}
