import { userColumns } from "@/app/(admin)/manage/users/_components/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/server";
import { PlusCircle } from "lucide-react";

export default async function ManageUsers() {
    const users = await api.user.all();

    return (
        <>
            <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" className="h-8 gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add User</span>
                    </Button>
                </div>
            </div>
            <Card className="bg-muted/40">
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                        Manage users and their roles. You can add, edit, and delete users from this page.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={userColumns} data={users} />
                </CardContent>
            </Card>
        </>
    );
}
