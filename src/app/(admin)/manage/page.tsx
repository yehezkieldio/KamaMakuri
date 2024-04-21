import { getServerAuthSession } from "@/server/auth";

export default async function Manage() {
    const session = await getServerAuthSession();
    const user = session?.user;

    return (
        <div className="pt-8">
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
}
