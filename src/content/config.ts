import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(''),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('Karol Leszczyński'),
    readingTime: z.number().optional(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
