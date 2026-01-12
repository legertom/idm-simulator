import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SubscriptionPanel() {
    return (
        <Card className="border-t-4 border-t-blue-500 shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-medium text-slate-700">Subscription</CardTitle>
                <Info className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent className="space-y-6 text-sm pt-4">
                <div className="space-y-4">
                    <div>
                        <div className="uppercase font-bold text-slate-700 text-[10px] tracking-wider mb-1">Subscription Status</div>
                        <div className="text-slate-800">Active</div>
                    </div>
                    <div>
                        <div className="uppercase font-bold text-slate-700 text-[10px] tracking-wider mb-1">Invoice Emailed To</div>
                        <div className="text-slate-800">N/A</div>
                    </div>

                    <div className="border rounded p-2 bg-white">
                        <div className="uppercase font-bold text-slate-400 text-[10px] tracking-wider mb-1">Subscription Expires</div>
                        <div className="font-medium text-lg text-slate-900">06/30/2026</div>
                    </div>
                </div>

                <div className="text-slate-500 text-xs space-y-1">
                    <p>Note: please set the expiration date to the last full day the subscription is active.</p>
                    <p>For example, for a 1-year subscription starting July 1, 2024, set the end date as June 30, 2025.</p>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium" size="sm">
                    Update IDM Subscription
                </Button>
            </CardContent>
        </Card>
    );
}
