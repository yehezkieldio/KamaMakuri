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

const formSchema = z.object({
    name: z.enum(raritiesEnum),
    probability: z.coerce.number().min(0, {
        message: "Probability must be at least 0.",
    }),
});

export function RarityForm() {
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={createRarity.isPending} placeholder="S" {...field} />
                            </FormControl>
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
