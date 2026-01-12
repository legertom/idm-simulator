"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertTriangle } from "lucide-react";

export function GoogleSchemaPanel() {
    const [selectedTab, setSelectedTab] = useState("Students");
    const [schemas, setSchemas] = useState<Record<string, any[]>>({
        Students: [],
        Teachers: [],
        Staff: []
    });

    return (
        <Card className="border-t-4 border-t-blue-500 shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-medium text-slate-600 flex items-center gap-2">
                    Google Custom Schemas <Info className="h-4 w-4 text-blue-600" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm pt-2">
                <Alert className="bg-white border-orange-300 text-slate-800 rounded-sm">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <div className="ml-2">
                        <AlertTitle className="text-slate-900 font-bold text-lg mb-1">Before modifying the Google Schemas</AlertTitle>
                        <AlertDescription className="text-slate-800 space-y-1">
                            <p>1. Ensure the feature flag "idm-google-custom-user-fields" is turned on for the district.</p>
                            <p>2. Have the district re-authorize Google via the Clever IDM Dashboard.</p>
                        </AlertDescription>
                    </div>
                </Alert>

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

                <div className="pt-2">
                    <p className="text-slate-600 mb-4 italic">Edit or delete an existing Google Custom Field:</p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="py-2 px-4 font-semibold text-slate-600 uppercase tracking-tight">Display Name</th>
                                    <th className="py-2 px-4 font-semibold text-slate-600 uppercase tracking-tight">External Field Name</th>
                                    <th className="py-2 px-4 font-semibold text-slate-600 uppercase tracking-tight">Field Values</th>
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
                            Add Custom Field
                        </Button>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white font-medium px-4 h-10 rounded-sm">
                        Update Google Schemas
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
