"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export function FiltersPanel() {
    const [selectedTab, setSelectedTab] = useState("Students");
    const [formulas, setFormulas] = useState<Record<string, string>>({
        Students: '{{not in school.sis_id "HS120 MS305 ES411 ES412"}}',
        Teachers: "",
        Staff: ""
    });

    return (
        <Card className="border-t-4 border-t-blue-500 shadow-sm col-span-1">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-medium text-slate-600 flex items-center gap-2">
                    Filters <Info className="h-4 w-4 text-blue-600" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm pt-2">
                <div className="space-y-1">
                    <div className="text-xs text-slate-500">
                        See <span className="text-blue-500 cursor-pointer hover:underline">this Guru card</span> for more details on filter formulas.
                    </div>
                    <div className="text-xs text-slate-500">
                        Use <span className="text-blue-500 cursor-pointer hover:underline">the IDM template playground</span> to try formulas out on fake data.
                    </div>
                </div>

                <div className="flex text-sm border-b border-gray-200 mt-4">
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

                <div className="pt-4 space-y-3">
                    <h4 className="font-bold text-slate-700 text-sm">Filter Formula</h4>

                    <div className="border border-slate-200 rounded-sm p-3 bg-white min-h-[80px]">
                        <div className="text-[10px] uppercase font-extrabold text-slate-800 mb-1">Filterformula:</div>
                        <textarea
                            className="w-full bg-transparent border-none focus:ring-0 text-sm text-slate-700 font-mono resize-none h-auto outline-none"
                            value={formulas[selectedTab]}
                            onChange={(e) => setFormulas(prev => ({ ...prev, [selectedTab]: e.target.value }))}
                            rows={2}
                        />
                    </div>

                    <div className="pt-2">
                        <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white font-medium px-6 h-10 rounded-sm">
                            Update
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
