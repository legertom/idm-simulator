"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ChevronRight, ChevronDown, Search, ArrowUpDown, Maximize2 } from "lucide-react";

// Recursive JsonNode Component (Shared Pattern)
function JsonNode({ label, data, depth = 0 }: { label: string; data: any; depth?: number }) {
    const isObject = data !== null && typeof data === "object";
    const isArray = Array.isArray(data);
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

export function PasswordResetConfigPanel() {
    const pwResetData = {
        pwResetConfig: {
            config: {
                districtID: "64b8f2d1a9e3c500022f4b7e",
                enabledAuthMethods: null
            }
        }
    };

    return (
        <Card className="border-t-4 border-t-blue-500 shadow-sm h-full flex flex-col">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-medium text-slate-600 flex items-center gap-2">
                    Password Reset Config <Info className="h-4 w-4 text-blue-600" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm pt-2 flex-grow overflow-auto">
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

                    <div className="p-2 bg-white min-h-[120px] select-none">
                        {Object.entries(pwResetData).map(([key, value]) => (
                            <JsonNode key={key} label={key} data={value} />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
