import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ManageWishes() {
    return (
        <div>
            <Card className="bg-muted/40">
                <CardHeader>
                    <CardTitle>Wishes</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
