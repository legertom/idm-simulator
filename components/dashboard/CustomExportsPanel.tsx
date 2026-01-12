"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";

export function CustomExportsPanel() {
    const [selectedTab, setSelectedTab] = useState("Students");
    const [enabled, setEnabled] = useState<Record<string, boolean>>({
        Students: true,
        Teachers: false,
        Staff: false
    });
    const [includeHeaders, setIncludeHeaders] = useState<Record<string, boolean>>({
        Students: false,
        Teachers: false,
        Staff: false
    });

    return (
        <Card className="border-t-4 border-t-blue-500 shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-medium text-slate-600 flex items-center gap-2">
                    Custom Exports <Info className="h-4 w-4 text-blue-600" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm pt-2">
                <div className="text-xs text-slate-500 mb-2">
                    See <span className="text-blue-500 cursor-pointer">this Guru card</span> for more details on custom exports.
                </div>

                <div className="flex text-sm border-b border-gray-200">
                    {["Students", "Teachers", "Staff"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`px-4 py-2 font-medium transition-colors ${tab === selectedTab
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="space-y-1 pt-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={`export-enabled-${selectedTab}`}
                            className="border-slate-300 data-[state=checked]:bg-blue-600 rounded-sm"
                            checked={enabled[selectedTab]}
                            onCheckedChange={(checked) => setEnabled(prev => ({ ...prev, [selectedTab]: !!checked }))}
                        />
                        <label htmlFor={`export-enabled-${selectedTab}`} className="text-slate-800 font-medium">Enabled</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={`export-headers-${selectedTab}`}
                            className="border-slate-300 data-[state=checked]:bg-blue-600 rounded-sm"
                            checked={includeHeaders[selectedTab]}
                            onCheckedChange={(checked) => setIncludeHeaders(prev => ({ ...prev, [selectedTab]: !!checked }))}
                        />
                        <label htmlFor={`export-headers-${selectedTab}`} className="text-slate-800 font-medium">Include Headers</label>
                    </div>
                </div>

                <div className="pt-2">
                    <p className="text-slate-600 mb-4 italic">Edit or delete a column on the export:</p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="py-2 px-4 font-semibold text-slate-600 uppercase tracking-tight">Column Header</th>
                                    <th className="py-2 px-4 font-semibold text-slate-600 uppercase tracking-tight">Column Type</th>
                                    <th className="py-2 px-4 font-semibold text-slate-600 uppercase tracking-tight">Template (optional)</th>
                                    <th className="py-2 px-4 font-semibold text-slate-600 uppercase tracking-tight text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-slate-400 font-medium uppercase tracking-widest">
                                        NO DATA FOR {selectedTab.toUpperCase()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 h-9 rounded-sm">
                            Add Field
                        </Button>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white font-medium px-4 h-10 rounded-sm">
                        Update Export Settings
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
