import { PageParams } from "@/src/types/next";
import RouteError from "@/app/error";

export default async function RouteParams(props: PageParams<{ id: string }>) {

    try {

        return (
            <div>
            </div>
        )
    }
    catch (error) {
        return <RouteError />;
    }
}
