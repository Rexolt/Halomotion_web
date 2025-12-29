import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";

// Builder Public API Key set in .env.local
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
    params: Promise<{
        page: string[];
    }>;
}

export default async function Page(props: PageProps) {
    const params = await props.params;
    const model = "page";
    const content = await builder
        .get(model, {
            userAttributes: {
                urlPath: "/" + (params?.page?.join("/") || ""),
            },
        })
        .toPromise();

    return (
        <>
            <RenderBuilderContent content={content} model={model} />
        </>
    );
}
