import { createServerFn } from "@tanstack/react-start";
import { and, eq, gte, lte } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/index";
import { events, insertEventSchema } from "@/db/schema";

// Schema for date range query
const dateRangeSchema = z.object({
	userId: z.string().uuid(),
	startDate: z.coerce.date(),
	endDate: z.coerce.date(),
});

// Schema for creating an event
const createEventSchema = insertEventSchema
	.omit({ id: true, createdAt: true, updatedAt: true })
	.extend({
		userId: z.string().uuid(),
	});

// Schema for updating an event
const updateEventSchema = z.object({
	id: z.string().uuid(),
	userId: z.string().uuid(),
	title: z.string().min(1).max(200).optional(),
	description: z.string().optional().nullable(),
	startAt: z.coerce.date().optional(),
	endAt: z.coerce.date().optional(),
	color: z
		.string()
		.regex(/^#[0-9A-Fa-f]{6}$/)
		.optional()
		.nullable(),
});

// Schema for deleting an event
const deleteEventSchema = z.object({
	id: z.string().uuid(),
	userId: z.string().uuid(),
});

// GET: Fetch events for a date range
export const getEvents = createServerFn({ method: "GET" })
	.inputValidator((input: z.infer<typeof dateRangeSchema>) =>
		dateRangeSchema.parse(input),
	)
	.handler(async ({ data }) => {
		const { userId, startDate, endDate } = data;

		const result = await db.query.events.findMany({
			where: and(
				eq(events.userId, userId),
				gte(events.startAt, startDate),
				lte(events.endAt, endDate),
			),
			orderBy: (events, { asc }) => [asc(events.startAt)],
		});

		return result;
	});

// POST: Create a new event
export const createEvent = createServerFn({ method: "POST" })
	.inputValidator((input: z.infer<typeof createEventSchema>) =>
		createEventSchema.parse(input),
	)
	.handler(async ({ data }) => {
		const [newEvent] = await db.insert(events).values(data).returning();
		return newEvent;
	});

// POST: Update an event
export const updateEvent = createServerFn({ method: "POST" })
	.inputValidator((input: z.infer<typeof updateEventSchema>) =>
		updateEventSchema.parse(input),
	)
	.handler(async ({ data }) => {
		const { id, userId, ...updateData } = data;

		// Only update fields that are provided
		const fieldsToUpdate: Record<string, unknown> = {
			updatedAt: new Date(),
		};

		if (updateData.title !== undefined) fieldsToUpdate.title = updateData.title;
		if (updateData.description !== undefined)
			fieldsToUpdate.description = updateData.description;
		if (updateData.startAt !== undefined)
			fieldsToUpdate.startAt = updateData.startAt;
		if (updateData.endAt !== undefined) fieldsToUpdate.endAt = updateData.endAt;
		if (updateData.color !== undefined) fieldsToUpdate.color = updateData.color;

		const [updated] = await db
			.update(events)
			.set(fieldsToUpdate)
			.where(and(eq(events.id, id), eq(events.userId, userId)))
			.returning();

		return updated;
	});

// POST: Delete an event
export const deleteEvent = createServerFn({ method: "POST" })
	.inputValidator((input: z.infer<typeof deleteEventSchema>) =>
		deleteEventSchema.parse(input),
	)
	.handler(async ({ data }) => {
		await db
			.delete(events)
			.where(and(eq(events.id, data.id), eq(events.userId, data.userId)));

		return { success: true };
	});
