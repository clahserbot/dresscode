CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`price` real NOT NULL,
	`sizes` text NOT NULL,
	`category` text NOT NULL,
	`r2_image_url` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`category`) REFERENCES `categories`(`slug`) ON UPDATE no action ON DELETE no action
);
