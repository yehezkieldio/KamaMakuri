import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ManageCards() {
    return (
        <div>
            <Card className="bg-muted/40">
                <CardHeader>
                    <CardTitle>Cards</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
