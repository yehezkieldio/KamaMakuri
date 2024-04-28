"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { raritiesEnum } from "@/server/db/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    name: z.enum(raritiesEnum),
    probability: z.coerce.number().min(0, {
        message: "Probability must be at least 0.",
    }),
});

interface RarityFormProps {
    rarities: {
        id: string;
        name: "D" | "C" | "B" | "A" | "S" | "SS" | "SSR";
        probability: number;
    }[];
}

function getRemainingRarities(rarities: RarityFormProps["rarities"]) {
    const rarityNames = rarities.map((rarity) => rarity.name);
    return raritiesEnum.filter((rarity) => !rarityNames.includes(rarity));
}

export function RarityForm({ rarities }: RarityFormProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "A",
            probability: 0,
        },
    });

    const createRarity = api.rarity.create.useMutation({
        onSuccess: () => {
            router.back();
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        createRarity.mutate({
            name: values.name,
            probability: values.probability,
        });
    }

    const remainingRarities = getRemainingRarities(rarities);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <Select
                                disabled={createRarity.isPending}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a rarity type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {remainingRarities.map((rarity) => (
                                        <SelectItem key={rarity} value={rarity}>
                                            {rarity}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="probability"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Probability</FormLabel>
                            <FormControl>
                                <Input disabled={createRarity.isPending} type="number" placeholder="0.1" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {createRarity.isPending ? (
                    <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button type="submit">Submit</Button>
                )}
            </form>
        </Form>
    );
}
