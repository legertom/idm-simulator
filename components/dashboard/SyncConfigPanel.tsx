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

// Helper function to deep compare and find differences
function compareObjects(obj1: any, obj2: any, path = ''): { added: any; deleted: any; updated: any } {
    const added: any = {};
    const deleted: any = {};
    const updated: any = {};

    // Check for deleted and updated keys
    for (const key in obj1) {
        const currentPath = path ? `${path}.${key}` : key;
        if (!(key in obj2)) {
            deleted[currentPath] = obj1[key];
        } else if (typeof obj1[key] === 'object' && obj1[key] !== null && typeof obj2[key] === 'object' && obj2[key] !== null) {
            const nested = compareObjects(obj1[key], obj2[key], currentPath);
            Object.assign(added, nested.added);
            Object.assign(deleted, nested.deleted);
            Object.assign(updated, nested.updated);
        } else if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
            updated[currentPath] = { from: obj1[key], to: obj2[key] };
        }
    }

    // Check for added keys
    for (const key in obj2) {
        const currentPath = path ? `${path}.${key}` : key;
        if (!(key in obj1)) {
            added[currentPath] = obj2[key];
        }
    }

    return { added, deleted, updated };
}

export function SyncConfigPanel() {
    const [isCompareOpen, setIsCompareOpen] = useState(false);
    const [selectedSync1, setSelectedSync1] = useState("jan11");
    const [selectedSync2, setSelectedSync2] = useState("jan10");

    // Historical sync configs - one change per day
    const historicalSyncs: Record<string, any> = {
        // January 11, 2026 - Most recent (current state)
        jan11: {
            syncConfig: {
                configurationFlags: { provisioningBlocked: false },
                customSchemasByUserType: {
                    staff: { customSchema: null },
                    students: { customSchema: null },
                    teachers: { customSchema: null }
                },
                filtersByUserType: {
                    staff: { excludeAll: true, filterFormula: null },
                    students: { excludeAll: false, filterFormula: null },
                    teachers: { excludeAll: true, filterFormula: null }
                },
                graduationRolloverConfig: {
                    lastSetDate: "2026-01-11T08:00:00.000Z",
                    rolloverDate: "2026-06-16T00:00:00.000Z"
                },
                ignoredGroups: null,
                ignoredOrgUnits: null,
                isPaused: false,
                lastUpdatedTime: "2026-01-11T06:00:00.000Z",
                multiRoleUserBehavior: "preferTeacher",
                settingsRulesByUserType: {
                    students: ["Rule 1", "Rule 2"]
                },
                syncBehavior: "standardSync",
                userAttributesByUserType: {
                    staff: {
                        passwordConfig: {
                            allowPasswordSave: false,
                            passwordFormula: ["{{staff.credentials.district_password}}"],
                            usePasswordFromConfig: "VALUE"
                        }
                    },
                    students: {
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
            },
            metadata: {
                changedBy: "district-admin@mayton.edu",
                changedVia: "idm_admin_portal",
                timestamp: "2026-01-11T06:00:00.000Z"
            }
        },

        // January 10, 2026 - Changed graduation rollover date
        jan10: {
            syncConfig: {
                configurationFlags: { provisioningBlocked: false },
                customSchemasByUserType: {
                    staff: { customSchema: null },
                    students: { customSchema: null },
                    teachers: { customSchema: null }
                },
                filtersByUserType: {
                    staff: { excludeAll: true, filterFormula: null },
                    students: { excludeAll: false, filterFormula: null },
                    teachers: { excludeAll: true, filterFormula: null }
                },
                graduationRolloverConfig: {
                    lastSetDate: "2026-01-10T09:30:00.000Z",
                    rolloverDate: "2026-06-01T00:00:00.000Z"
                },
                ignoredGroups: null,
                ignoredOrgUnits: null,
                isPaused: false,
                lastUpdatedTime: "2026-01-10T06:00:00.000Z",
                multiRoleUserBehavior: "preferTeacher",
                settingsRulesByUserType: {
                    students: ["Rule 1", "Rule 2"]
                },
                syncBehavior: "standardSync",
                userAttributesByUserType: {
                    staff: {
                        passwordConfig: {
                            allowPasswordSave: false,
                            passwordFormula: ["{{staff.credentials.district_password}}"],
                            usePasswordFromConfig: "VALUE"
                        }
                    },
                    students: {
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
            },
            metadata: {
                changedBy: "district-admin@mayton.edu",
                changedVia: "idm_admin_portal",
                timestamp: "2026-01-10T06:00:00.000Z"
            }
        },

        // January 9, 2026 - Added ignoredOrgUnits filter
        jan09: {
            syncConfig: {
                configurationFlags: { provisioningBlocked: false },
                customSchemasByUserType: {
                    staff: { customSchema: null },
                    students: { customSchema: null },
                    teachers: { customSchema: null }
                },
                filtersByUserType: {
                    staff: { excludeAll: true, filterFormula: null },
                    students: { excludeAll: false, filterFormula: null },
                    teachers: { excludeAll: true, filterFormula: null }
                },
                graduationRolloverConfig: {
                    lastSetDate: "2026-01-09T10:15:00.000Z",
                    rolloverDate: "2026-06-01T00:00:00.000Z"
                },
                ignoredGroups: null,
                ignoredOrgUnits: ["/Archive", "/Suspended"],
                isPaused: false,
                lastUpdatedTime: "2026-01-09T06:00:00.000Z",
                multiRoleUserBehavior: "preferTeacher",
                settingsRulesByUserType: {
                    students: ["Rule 1", "Rule 2"]
                },
                syncBehavior: "standardSync",
                userAttributesByUserType: {
                    staff: {
                        passwordConfig: {
                            allowPasswordSave: false,
                            passwordFormula: ["{{staff.credentials.district_password}}"],
                            usePasswordFromConfig: "VALUE"
                        }
                    },
                    students: {
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
                        passwordConfig: {
                            allowPasswordSave: false,
                            passwordFormula: ["{{teacher.credentials.district_password}}"],
                            usePasswordFromConfig: "VALUE"
                        }
                    }
                },
                userTypeSettingsByUserType: {
                    staff: { changePasswordOnNextLogin: true },
                    students: { changePasswordOnNextLogin: true },
                    teachers: { changePasswordOnNextLogin: true }
                },
                permissionsConfig: {
                    studentPasswordVisibility: ["teacher"]
                }
            },
            metadata: {
                changedBy: "tech-coordinator@mayton.edu",
                changedVia: "idm_admin_portal",
                timestamp: "2026-01-09T06:00:00.000Z"
            }
        },

        // January 8, 2026 - Removed settingsRulesByUserType (deleted configuration)
        jan08: {
            syncConfig: {
                configurationFlags: { provisioningBlocked: false },
                customSchemasByUserType: {
                    staff: { customSchema: null },
                    students: { customSchema: null },
                    teachers: { customSchema: null }
                },
                filtersByUserType: {
                    staff: { excludeAll: true, filterFormula: null },
                    students: { excludeAll: false, filterFormula: null },
                    teachers: { excludeAll: true, filterFormula: null }
                },
                graduationRolloverConfig: {
                    lastSetDate: "2026-01-08T08:45:00.000Z",
                    rolloverDate: "2026-06-01T00:00:00.000Z"
                },
                ignoredGroups: null,
                ignoredOrgUnits: ["/Archive", "/Suspended"],
                isPaused: false,
                lastUpdatedTime: "2026-01-08T06:00:00.000Z",
                multiRoleUserBehavior: "preferStudent",
                syncBehavior: "standardSync",
                userAttributesByUserType: {
                    staff: {
                        passwordConfig: {
                            allowPasswordSave: false,
                            passwordFormula: ["{{staff.credentials.district_password}}"],
                            usePasswordFromConfig: "VALUE"
                        }
                    },
                    students: {
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
                        passwordConfig: {
                            allowPasswordSave: false,
                            passwordFormula: ["{{teacher.credentials.district_password}}"],
                            usePasswordFromConfig: "VALUE"
                        }
                    }
                },
                userTypeSettingsByUserType: {
                    staff: { changePasswordOnNextLogin: true },
                    students: { changePasswordOnNextLogin: true },
                    teachers: { changePasswordOnNextLogin: true }
                },
                permissionsConfig: {
                    studentPasswordVisibility: ["teacher"]
                }
            },
            metadata: {
                changedBy: "district-admin@mayton.edu",
                changedVia: "idm_admin_portal",
                timestamp: "2026-01-08T06:00:00.000Z"
            }
        },

        // January 7, 2026 - Added ignoredGroups filter and changed permissionsConfig
        jan07: {
            syncConfig: {
                configurationFlags: { provisioningBlocked: false },
                customSchemasByUserType: {
                    staff: { customSchema: null },
                    students: { customSchema: null },
                    teachers: { customSchema: null }
                },
                filtersByUserType: {
                    staff: { excludeAll: true, filterFormula: null },
                    students: { excludeAll: false, filterFormula: null },
                    teachers: { excludeAll: true, filterFormula: null }
                },
                graduationRolloverConfig: {
                    lastSetDate: "2026-01-07T07:20:00.000Z",
                    rolloverDate: "2026-06-01T00:00:00.000Z"
                },
                ignoredGroups: ["Test_Group", "Demo_Users"],
                ignoredOrgUnits: ["/Archive", "/Suspended"],
                isPaused: false,
                lastUpdatedTime: "2026-01-07T06:00:00.000Z",
                multiRoleUserBehavior: "preferStudent",
                syncBehavior: "standardSync",
                userAttributesByUserType: {
                    staff: {
                        passwordConfig: {
                            allowPasswordSave: false,
                            passwordFormula: ["{{staff.credentials.district_password}}"],
                            usePasswordFromConfig: "VALUE"
                        }
                    },
                    students: {
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
                        passwordConfig: {
                            allowPasswordSave: false,
                            passwordFormula: ["{{teacher.credentials.district_password}}"],
                            usePasswordFromConfig: "VALUE"
                        }
                    }
                },
                userTypeSettingsByUserType: {
                    staff: { changePasswordOnNextLogin: true },
                    students: { changePasswordOnNextLogin: true },
                    teachers: { changePasswordOnNextLogin: true }
                },
                permissionsConfig: {
                    studentPasswordVisibility: ["teacher", "staff"]
                }
            },
            metadata: {
                changedBy: "tech-coordinator@mayton.edu",
                changedVia: "idm_admin_portal",
                timestamp: "2026-01-07T06:00:00.000Z"
            }
        }
    };

    // Current sync config (most recent)
    const syncConfigData = historicalSyncs[selectedSync1] || historicalSyncs.jan11;

    // Compare the two selected syncs
    const sync1Data = historicalSyncs[selectedSync1];
    const sync2Data = historicalSyncs[selectedSync2];
    const comparison = compareObjects(sync2Data.syncConfig, sync1Data.syncConfig);

    const syncOptions = [
        { value: "jan11", label: "[Sync] January 11th 2026 6:00am" },
        { value: "jan10", label: "[Sync] January 10th 2026 6:00am" },
        { value: "jan09", label: "[Sync] January 9th 2026 6:00am" },
        { value: "jan08", label: "[Sync] January 8th 2026 6:00am" },
        { value: "jan07", label: "[Sync] January 7th 2026 6:00am" }
    ];

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
                        {Object.entries(syncConfigData.syncConfig).map(([key, value]) => (
                            <JsonNode key={key} label={key} data={value} />
                        ))}
                    </div>
                </div>

                {/* Compare Section */}
                <div className="pt-4 border-t border-slate-100">
                    <div
                        className="flex items-center justify-between cursor-pointer group mb-4"
                        onClick={() => setIsCompareOpen(!isCompareOpen)}
                    >
                        <span className="font-bold text-slate-700">Compare past Sync Configs</span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-transform ${isCompareOpen ? 'rotate-0' : '-rotate-90'}`} />
                    </div>

                    {isCompareOpen && (
                        <div className="space-y-4 pl-1">
                        <p className="text-[11px] text-slate-500 italic">Select two IDM sync snapshots to compare the Sync Configs of.</p>
                        <p className="text-[11px] text-slate-500 italic -mt-2">Note: Order here matters! Changes will display as "added" or "deleted" based on the order of the syncs selected.</p>

                        <div className="space-y-3">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Sync 1 (Newer)</label>
                                <Select value={selectedSync1} onValueChange={setSelectedSync1}>
                                    <SelectTrigger className="h-9 mt-1"><SelectValue placeholder="Select Sync" /></SelectTrigger>
                                    <SelectContent>
                                        {syncOptions.map(opt => (
                                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Sync 2 (Older)</label>
                                <Select value={selectedSync2} onValueChange={setSelectedSync2}>
                                    <SelectTrigger className="h-9 mt-1"><SelectValue placeholder="Select Sync" /></SelectTrigger>
                                    <SelectContent>
                                        {syncOptions.map(opt => (
                                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="pt-2 space-y-3">
                            <p className="font-bold text-slate-800 text-xs">
                                Changes between "{syncOptions.find(s => s.value === selectedSync2)?.label}" and "{syncOptions.find(s => s.value === selectedSync1)?.label}"
                            </p>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-green-700 uppercase">Added</label>
                                <div className="bg-slate-50 border border-slate-200 rounded p-2 text-xs font-mono text-slate-600 max-h-40 overflow-auto">
                                    <pre className="whitespace-pre-wrap">{JSON.stringify(comparison.added, null, 2)}</pre>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-red-700 uppercase">Deleted</label>
                                <div className="bg-slate-50 border border-slate-200 rounded p-2 text-xs font-mono text-slate-600 max-h-40 overflow-auto">
                                    <pre className="whitespace-pre-wrap">{JSON.stringify(comparison.deleted, null, 2)}</pre>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-orange-600 uppercase">Updated</label>
                                <div className="bg-slate-50 border border-slate-200 rounded p-2 text-xs font-mono text-slate-600 max-h-40 overflow-auto">
                                    <pre className="whitespace-pre-wrap">{JSON.stringify(comparison.updated, null, 2)}</pre>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 space-y-1 text-[10px] text-slate-500 leading-tight">
                            <p>"{syncOptions.find(s => s.value === selectedSync2)?.label}" was last changed by '{sync2Data.metadata.changedBy}' via '{sync2Data.metadata.changedVia}'</p>
                            <p>"{syncOptions.find(s => s.value === selectedSync1)?.label}" was last changed by '{sync1Data.metadata.changedBy}' via '{sync1Data.metadata.changedVia}'</p>
                        </div>
                    </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
