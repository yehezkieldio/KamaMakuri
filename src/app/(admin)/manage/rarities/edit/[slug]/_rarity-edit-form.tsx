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
import { rarities } from "@/server/db/schema";

const formSchema = z.object({
    probability: z.coerce
        .number()
        .min(0, {
            message: "Probability must be at least 0.",
        })
        .refine(
            (value) => {
                const parts = value.toString().split(".");
                return !parts[1] || parts[1].length <= 2;
            },
            {
                message: `Number must have a maximum of 2 decimal places`,
            }
        ),
});

interface RarityFormProps {
    // Infer the type of the `rarity` prop from the server-side schema.
    // re: https://orm.drizzle.team/docs/goodies
    rarity: typeof rarities.$inferSelect;
}

export function RarityEditForm({ rarity }: RarityFormProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            probability: parseFloat(Number(rarity.probability).toFixed(2)),
        },
    });

    const editRarity = api.rarity.edit.useMutation({
        onSuccess: () => {
            router.back();
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        editRarity.mutate(
            {
                id: rarity.id,
                probability: values.probability.toString(),
            },
            {
                onError: (error) => {
                    form.setError("probability", {
                        type: "manual",
                        message: error.message,
                    });
                },
            }
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="probability"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Probability</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={editRarity.isPending}
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.1"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {editRarity.isPending ? (
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
