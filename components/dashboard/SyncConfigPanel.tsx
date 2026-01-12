"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, ChevronRight, ChevronDown, Search, ArrowUpDown, Maximize2 } from "lucide-react";

// Recursive JsonNode Component
function JsonNode({ label, data, depth = 0 }: { label: string; data: any; depth?: number }) {
    const isObject = data !== null && typeof data === "object";
    const isArray = Array.isArray(data);

    // Default: Top level expanded, nested levels collapsed unless specified
    const [isOpen, setIsOpen] = useState(depth < 2);

    const keys = isObject ? Object.keys(data) : [];
    const count = isArray ? data.length : keys.length;

    const Icon = isOpen ? ChevronDown : ChevronRight;

    return (
        <div className="flex flex-col">
            <div
                className={`flex items-start py-0.5 hover:bg-slate-50 cursor-pointer group whitespace-nowrap`}
                style={{ paddingLeft: `${depth * 16}px` }}
                onClick={() => isObject && setIsOpen(!isOpen)}
            >
                <div className="mr-1 mt-1 text-slate-400 group-hover:text-slate-600 transition-colors">
                    {isObject ? <Icon className="h-3 w-3" /> : <div className="w-3" />}
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-green-700 font-mono text-[12px]">{label}</span>
                    {isObject && (
                        <span className="text-slate-400 font-mono text-[12px]">
                            {isArray ? `[${count}]` : `{${count}}`}
                        </span>
                    )}
                    {!isObject && (
                        <span className="text-slate-800 font-mono text-[12px]">
                            {": "}
                            {data === null ? (
                                <span className="text-blue-600 italic">null</span>
                            ) : typeof data === "boolean" ? (
                                <span className="text-orange-600">{data.toString()}</span>
                            ) : (
                                <span className="text-blue-600">"{data}"</span>
                            )}
                        </span>
                    )}
                </div>
            </div>
            {isObject && isOpen && (
                <div className="flex flex-col">
                    {keys.map((key) => (
                        <JsonNode key={key} label={key} data={data[key]} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

export function SyncConfigPanel() {
    // The "Super Schema" merged from Entra and Google screenshots
    const syncConfigData = {
        syncConfig: {
            configurationFlags: {
                provisioningBlocked: false
            },
            customSchemasByUserType: {
                staff: { customSchema: null },
                students: { customSchema: null },
                teachers: { customSchema: null }
            },
            filtersByUserType: {
                staff: {
                    excludeAll: true,
                    filterFormula: null
                },
                students: {
                    excludeAll: false,
                    filterFormula: null
                },
                teachers: {
                    excludeAll: true,
                    filterFormula: null
                }
            },
            graduationRolloverConfig: {
                lastSetDate: "2026-01-20T11:22:45.123Z",
                rolloverDate: "2026-07-20T00:00:00.000Z"
            },
            ignoredGroups: null,
            ignoredOrgUnits: null,
            isPaused: false,
            lastUpdatedTime: "2026-03-01T09:45:12.678Z",
            multiRoleUserBehavior: "preferTeacher",
            settingsRulesByUserType: {
                students: [
                    "Rule 1",
                    "Rule 2"
                ]
            },
            syncBehavior: "standardSync",
            userAttributesByUserType: {
                staff: {
                    adCustomSamAccountNameFormulas: null,
                    adUPNPrefixFormulas: null,
                    cleverPasswordsUsernameFormulas: [
                        {
                            allowBaseCaseUpdates: true,
                            formula: ["{{staff.credentials.district_username}}"]
                        }
                    ],
                    commonNameFormula: null,
                    domains: null,
                    emailFormulas: null,
                    familyNameFormula: null,
                    givenNameFormula: null,
                    passwordConfig: {
                        allowPasswordSave: false,
                        passwordFormula: ["{{staff.credentials.district_password}}"],
                        usePasswordFromConfig: "VALUE"
                    }
                },
                students: {
                    adCustomSamAccountNameFormulas: null,
                    adUPNPrefixFormulas: null,
                    cleverPasswordsUsernameFormulas: [
                        {
                            allowBaseCaseUpdates: true,
                            formula: ["{{student.student_number}}"]
                        }
                    ],
                    commonNameFormula: null,
                    domains: null,
                    emailFormulas: null,
                    familyNameFormula: null,
                    givenNameFormula: null,
                    passwordConfig: {
                        allowPasswordSave: false,
                        passwordFormula: [
                            "{{if in student.grade \"K 1\" \"mayton_pwd1\" \"\"}}",
                            "{{if in student.grade \"2 3 4\" \"Mayton_pwd2!\" \"\"}}",
                            "{{if in student.grade \"5 6 7 8\" \"Mayton_pwd3!\" \"\"}}"
                        ],
                        usePasswordFromConfig: "VALUE"
                    }
                },
                teachers: {
                    adCustomSamAccountNameFormulas: null,
                    adUPNPrefixFormulas: null,
                    cleverPasswordsUsernameFormulas: [
                        {
                            allowBaseCaseUpdates: true,
                            formula: ["{{teacher.credentials.district_username}}"]
                        }
                    ],
                    commonNameFormula: null,
                    domains: null,
                    emailFormulas: null,
                    familyNameFormula: null,
                    givenNameFormula: null,
                    passwordConfig: {
                        allowPasswordSave: false,
                        passwordFormula: ["{{teacher.credentials.district_password}}"],
                        usePasswordFromConfig: "VALUE"
                    }
                }
            },
            userTypeSettingsByUserType: {
                staff: { changePasswordOnNextLogin: true },
                students: { changePasswordOnNextLogin: false },
                teachers: { changePasswordOnNextLogin: true }
            },
            permissionsConfig: {
                studentPasswordVisibility: ["teacher"]
            }
        }
    };

    return (
        <Card className="border-t-4 border-t-blue-500 shadow-sm h-full flex flex-col">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-medium text-slate-600 flex items-center gap-2">
                    Sync Config <Info className="h-4 w-4 text-blue-600" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm pt-2 flex-grow overflow-auto">
                {/* JSON Toolbar */}
                <div className="border border-slate-200 rounded-sm">
                    <div className="bg-slate-50 border-b border-slate-200 flex items-center justify-between px-2 py-1">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <ArrowUpDown className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
                                <Maximize2 className="h-3 w-3 text-slate-400 hover:text-slate-600 cursor-pointer" />
                            </div>
                            <div className="flex items-center border rounded px-1 bg-white ml-2">
                                <span className="text-xs text-slate-600 px-1 border-r border-slate-200">View</span>
                                <ChevronDown className="h-3 w-3 text-slate-400 ml-1" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 border rounded px-2 bg-white flex-grow max-w-[140px] ml-4">
                            <Search className="h-3 w-3 text-slate-300" />
                            <input className="outline-none text-xs w-full py-0.5" />
                            <ChevronDown className="h-3 w-3 text-slate-300" />
                        </div>
                    </div>

                    {/* Recursive Tree Display */}
                    <div className="p-2 bg-white max-h-[600px] overflow-auto select-none">
                        {Object.entries(syncConfigData).map(([key, value]) => (
                            <JsonNode key={key} label={key} data={value} />
                        ))}
                    </div>
                </div>

                {/* Compare Section */}
                <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between cursor-pointer group mb-4">
                        <span className="font-bold text-slate-700">Compare past Sync Configs</span>
                        <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                    </div>

                    <div className="space-y-4 pl-1">
                        <p className="text-[11px] text-slate-500 italic">Select two IDM sync snapshots to compare the Sync Configs of.</p>
                        <p className="text-[11px] text-slate-500 italic -mt-2">Note: Order here matters! Changes will display as "added" or "deleted" based on the order of the syncs selected.</p>

                        <div className="space-y-3">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Sync 1</label>
                                <Select defaultValue="dec30">
                                    <SelectTrigger className="h-9 mt-1"><SelectValue placeholder="Select Sync" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dec30">[Sync] December 30th 2025 6:00am</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Sync 2</label>
                                <Select defaultValue="dec31">
                                    <SelectTrigger className="h-9 mt-1"><SelectValue placeholder="Select Sync" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dec31">[Sync] December 31st 2025 6:00am</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="pt-2 space-y-3">
                            <p className="font-bold text-slate-800 text-xs">Changes between "[Sync] December 30th 2025 6:00am" and "[Sync] December 31st 2025 6:00am"</p>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-green-700 uppercase">Added</label>
                                <div className="bg-slate-50 border border-slate-200 rounded p-2 text-xs font-mono text-slate-600">
                                    {"{}"}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-red-700 uppercase">Deleted</label>
                                <div className="bg-slate-50 border border-slate-200 rounded p-2 text-xs font-mono text-slate-600">
                                    {"{}"}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-orange-600 uppercase">Updated</label>
                                <div className="bg-slate-50 border border-slate-200 rounded p-2 text-xs font-mono text-slate-600">
                                    {"{}"}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 space-y-1 text-[10px] text-slate-500 leading-tight">
                            <p>"[Sync] December 30th 2025 6:00am" was last changed by 'id2-admin-impersonator' via 'id2_admin_metrics'</p>
                            <p>"[Sync] December 31st 2025 6:00am" was last changed by 'id2-admin-impersonator' via 'id2_admin_metrics'</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
