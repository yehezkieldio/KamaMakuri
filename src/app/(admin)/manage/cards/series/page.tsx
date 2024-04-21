import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ManageCardSeries() {
    return (
        <div>
            <Card className="bg-muted/40">
                <CardHeader>
                    <CardTitle>Card Series</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
