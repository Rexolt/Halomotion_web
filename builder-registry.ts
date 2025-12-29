'use client';
import { builder, Builder } from '@builder.io/react';
import { Hero } from '@/components/sections/Hero';
import { Philosophy } from '@/components/sections/Philosophy';
import { Marquee } from '@/components/sections/Marquee';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Work } from '@/components/sections/Work';
import { Team } from '@/components/sections/Team';
import { Contact } from '@/components/sections/Contact';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Hero, {
    name: 'Hero',
    inputs: [
        { name: 'title1', type: 'string', defaultValue: 'BEYOND' },
        { name: 'title2', type: 'string', defaultValue: 'REALITY' },
        { name: 'videoUrl', type: 'url', defaultValue: 'https://cdn.pixabay.com/video/2023/02/25/152085-802335503_large.mp4' }
    ],
});

Builder.registerComponent(Philosophy, {
    name: 'Philosophy',
    inputs: [
        { name: 'text', type: 'longText', defaultValue: 'A HaloMotion nem csupán rögzít...' }
    ],
});

Builder.registerComponent(Marquee, {
    name: 'Marquee',
    inputs: [],
});

Builder.registerComponent(Services, {
    name: 'Services',
    inputs: [],
});

Builder.registerComponent(Process, {
    name: 'Process',
    inputs: [],
});

Builder.registerComponent(Work, {
    name: 'Work',
    inputs: [
        {
            name: 'projects',
            type: 'list',
            subFields: [
                { name: 'id', type: 'string', required: true },
                { name: 'title', type: 'string', required: true },
                { name: 'category', type: 'string' },
                { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
                { name: 'video', type: 'file', allowedFileTypes: ['mp4', 'webm'] }
            ]
        }
    ],
});

Builder.registerComponent(Team, {
    name: 'Team',
    inputs: [],
});

Builder.registerComponent(Contact, {
    name: 'Contact',
    inputs: [],
});
