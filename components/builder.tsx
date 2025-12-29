"use client";
import { ComponentProps } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import "../builder-registry";

type BuilderPageProps = ComponentProps<typeof BuilderComponent>;

// Builder Public API Key set in .env.local
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export function RenderBuilderContent({ content, model }: BuilderPageProps) {
    // Call the useIsPreviewing hook to determine if 
    // the page is being previewed in Builder
    const isPreviewing = useIsPreviewing();
    // If "content" is available, the section passed to the BuilderComponent
    // is used to render the page. Otherwise, the section is not rendered.
    if (content || isPreviewing) {
        return <BuilderComponent content={content} model={model} />;
    }
    // If the "content" is unavailable and the page is not being previewed in Builder,
    // the DefaultErrorPage is rendered.
    return <DefaultErrorPage statusCode={404} />;
}
