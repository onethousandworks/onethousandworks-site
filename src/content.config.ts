import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		// Campos específicos de review de livros
		livro: z.string().optional(),
		autorLivro: z.string().optional(),
		nota: z.number().min(1).max(5).optional(),
		linkCompra: z.string().url().optional(),
	}),
});

export const collections = { blog };
