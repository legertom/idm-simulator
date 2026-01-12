import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export function ConfigPanel() {
    return (
        <Card className="border-t-4 border-t-blue-500 shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-medium text-slate-600">Configs</CardTitle>
                <FileText className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent className="space-y-6 text-sm pt-4">
                <div className="text-base text-slate-500">
                    Click the dropdown button to switch between different configs:
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-blue-700 font-bold text-lg cursor-pointer">
                        Google <span className="text-[10px] scale-x-125">▼</span>
                    </div>

                    <span className="text-blue-700 text-sm font-bold cursor-pointer hover:underline">Rename Config</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-start max-w-lg">
                            <div className="flex-1">
                                <div className="uppercase font-bold text-slate-700 text-[11px] tracking-wide mb-1">CONFIG ID</div>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="font-mono text-slate-600 text-sm">abc123d4-e5f6-789a-bc01-23456789def0</span>
                                    <span className="text-blue-600 text-sm font-medium cursor-pointer hover:underline">Copy</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="uppercase font-bold text-slate-700 text-[11px] tracking-wide mb-1">SYNC BEHAVIOR</div>
                                <div className="text-slate-800 text-sm mt-1">standardSync</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <div className="uppercase font-bold text-slate-700 text-[11px] tracking-wide mb-1">CONFIG TYPE</div>
                        <div className="text-slate-800 font-medium mt-1">google</div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <div className="uppercase font-bold text-slate-700 text-[11px] tracking-wide mb-1">URL</div>
                        <div className="text-slate-800 mt-1">mayton42.edu</div>
                    </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                    <Button variant="destructive" className="bg-[#b71c1c] hover:bg-[#a51a1a] font-medium text-white px-5 rounded-md text-sm h-10 shadow-sm">Pause syncs</Button>
                    <Button variant="destructive" className="bg-[#b71c1c] hover:bg-[#a51a1a] font-medium text-white px-5 rounded-md text-sm h-10 shadow-sm">Delete Config</Button>
                    <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] font-medium text-white px-5 rounded-md text-sm h-10 shadow-sm">Add additional Google destination</Button>
                </div>
            </CardContent>
        </Card>
    );
}
