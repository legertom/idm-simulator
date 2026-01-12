import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export function SyncsPanel() {
    return (
        <Card className="border-t-4 border-t-blue-500 shadow-sm col-span-1">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-medium text-slate-600 flex items-center gap-2">
                    Syncs <Info className="h-4 w-4 text-blue-600" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-sm pt-4">
                <div className="space-y-4">
                    {/* Sync ID */}
                    <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Last Sync Id</div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-slate-800 text-sm truncate max-w-[280px]">99b33a2e-41cc-5d51-84bb-11df22ecaf4a</span>
                            <span className="text-blue-600 text-xs font-medium cursor-pointer hover:underline">Copy</span>
                        </div>
                    </div>

                    {/* Last Sync Ran */}
                    <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Last Sync Ran</div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-slate-800 text-sm">2026-03-05T10:15:33.421Z</span>
                            <span className="text-blue-600 text-xs font-medium cursor-pointer hover:underline">Copy</span>
                        </div>
                    </div>

                    {/* Sync Behavior */}
                    <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Last Sync's Sync Behavior</div>
                        <div className="text-slate-800 text-sm mt-0.5">standardSync</div>
                    </div>

                    {/* Users Affected */}
                    <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-900">Users affected during last run:</div>
                        <ul className="pl-4 list-disc space-y-0.5 text-slate-800 text-sm">
                            <li>students: 1085</li>
                            <li>teachers: 75</li>
                            <li>staff: 119</li>
                        </ul>
                    </div>

                    {/* Counters */}
                    <div className="space-y-4 pt-1">
                        <div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Errors during last sync ran</div>
                            <div className="text-slate-800 text-sm mt-0.5 font-bold">0</div>
                        </div>

                        <div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Issues during last sync ran</div>
                            <div className="text-slate-800 text-sm mt-0.5 font-bold">0</div>
                        </div>

                        <div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Conflicts during last sync ran</div>
                            <div className="text-slate-800 text-sm mt-0.5 font-bold">0</div>
                        </div>
                    </div>

                    {/* Resolve Button */}
                    <div>
                        <Button variant="secondary" className="bg-slate-50 text-slate-400 font-medium h-9 w-40 rounded-sm border border-slate-100" disabled>
                            Resolve Conflicts
                        </Button>
                    </div>

                    {/* Sync Status */}
                    <div className="pt-2 border-t border-slate-100">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Most recent sync status</div>
                        <div className="text-slate-800 text-sm mt-1">changes-applied</div>
                        <Button variant="secondary" className="bg-slate-50 text-slate-400 font-medium h-9 w-40 rounded-sm border border-slate-100 mt-3" disabled>
                            Clear stuck sync
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
