import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ManageRarityCards() {
    return (
        <div>
            <Card className="bg-muted/40">
                <CardHeader>
                    <CardTitle>Rarity Card</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
