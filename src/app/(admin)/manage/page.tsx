import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerAuthSession } from "@/server/auth";

export default async function Manage() {
    const session = await getServerAuthSession();
    const user = session?.user;

    return (
        <div>
            <Card className="bg-muted/40">
                <CardHeader>
                    <CardTitle>Welcome back, {user?.name}.</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur.</CardDescription>
                </CardHeader>
                <CardContent>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum molestias facilis iure ab
                    quaerat aspernatur eveniet esse. Eveniet!
                </CardContent>
            </Card>
        </div>
    );
}
