import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerAuthSession } from "@/server/auth";

export default async function Manage() {
    const session = await getServerAuthSession();
    const user = session?.user;

    return (
        <div className="space-y-8">
            <Card className="bg-muted/40">
                <CardHeader>
                    <CardTitle>Welcome back, {user?.name}.</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
