import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";

export function UserAssociationsPanel() {
    return (
        <Card className="border-t-4 border-t-blue-500 shadow-sm col-span-1 md:col-span-2">
            <CardHeader className="pb-2 border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="text-lg font-medium text-slate-800">User Associations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6 text-sm">

                {/* Lookup Section */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-slate-700">Lookup User Associations</h3>
                    <p className="text-slate-500 text-xs">
                        Paste the Google Emails, Clever User IDs, or immutable Ids (External State ID) separated by commas or newlines.
                    </p>
                    <Textarea className="font-mono text-xs min-h-[100px]" placeholder="user@example.com, 5f4d..." />
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Lookup</Button>
                </div>

                <div className="border-t border-slate-200 my-4"></div>

                {/* Delete Section */}
                <div className="space-y-2 bg-red-50 p-4 rounded border border-red-100">
                    <h3 className="font-semibold text-red-800">Delete User Associations</h3>
                    <p className="text-red-600 text-xs">
                        Click the Delete button to delete all the user associations from the table above.
                    </p>
                    <Button size="sm" variant="destructive">Delete</Button>
                </div>

                <div className="border-t border-slate-200 my-4"></div>

                {/* Create Section */}
                {/* Create Section */}
                <div className="space-y-6">
                    <h3 className="text-base font-semibold text-slate-700">Create User Association</h3>

                    <div className="border border-slate-200 rounded-sm overflow-hidden">
                        {/* Field 1 */}
                        <div className="border-b border-slate-200 p-3 bg-white">
                            <label className="block text-[10px] uppercase font-bold text-slate-700 mb-1">CLEVER USER ID:</label>
                            <input className="w-full outline-none text-sm text-slate-800 placeholder:text-slate-300" />
                        </div>

                        {/* Field 2 */}
                        <div className="border-b border-slate-200 p-3 bg-white">
                            <label className="block text-[10px] uppercase font-bold text-slate-700 mb-1">GOOGLE EMAIL</label>
                            <input className="w-full outline-none text-sm text-slate-800 placeholder:text-slate-300" />
                        </div>

                        {/* Field 3 */}
                        <div className="border-b border-slate-200 p-3 bg-white">
                            <label className="block text-[10px] uppercase font-bold text-slate-700 mb-1">GOOGLE ID, TYPE IN ANYTHING LIKE MANUAL-ID-04-24-2023, MUST BE UNIQUE</label>
                            <input className="w-full outline-none text-sm text-slate-800 placeholder:text-slate-300" />
                        </div>

                        {/* Field 4 */}
                        <div className="p-3 bg-white">
                            <label className="block text-[10px] uppercase font-bold text-slate-700 mb-1">SIS ID</label>
                            <input className="w-full outline-none text-sm text-slate-800 placeholder:text-slate-300" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-600">User Type</label>
                        <Select defaultValue="student">
                            <SelectTrigger className="h-10 border-slate-200">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="student">student</SelectItem>
                                <SelectItem value="teacher">teacher</SelectItem>
                                <SelectItem value="staff">staff</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="pt-2">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 h-auto text-sm">Save</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
