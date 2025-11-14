import { z } from "zod";
import { OrderStatus, PrismaClient } from "@/generated/prisma/client";
import { Created, Forbidden, HttpError, NotFound, OK } from "./HttpErrors";

const prisma = new PrismaClient();

const productValidator = z
	.object({
		name: z.string().nonempty(),
		description: z.string().nonempty(),
		price: z.number().positive(),
		weight: z.number().positive(),
		categoryId: z.string().uuid(),
	})
	.strict();

const statusValidator = z.enum(
	Object.keys(OrderStatus) as [string, ...string[]],
);

const orderValidator = z
	.object({
		userName: z.string().nonempty(),
		userEmail: z.string().email(),
		userPhone: z.string().regex(/^\+?\d{1,14}$/),
		status: statusValidator.default("UNCONFIRMED"),
		orderItems: z.array(
			z.object({
				productId: z.string().uuid(),
				quantity: z.number().int().positive(),
			}),
		),
	})
	.strict();

const server = Bun.serve({
	routes: {
		"/api/ping": () => {
			throw new OK("pong");
		},

		"/api/products/:id": {
			GET: async (req) => {
				const { id } = req.params;
				const product = await prisma.product.findUnique({
					where: { id },
				});
				return Response.json(product);
			},
			PUT: async (req) => {
				const { id } = req.params;
				const body = await req.json();
				await prisma.product.update({
					where: { id },
					data: productValidator.partial().parse(body),
				});
				throw new OK();
			},
		},

		"/api/products": {
			GET: async () => Response.json(await prisma.product.findMany()),
			POST: async (req) => {
				const body = await req.json();
				await prisma.product.create({
					data: productValidator.parse(body),
				});
				throw new Created();
			},
		},

		"/api/categories": async () =>
			Response.json(await prisma.category.findMany()),

		"/api/orders": {
			GET: async () => Response.json(await prisma.order.findMany()),
			POST: async (req) => {
				const body = await req.json();
				const validated = orderValidator.parse(body);
				await prisma.order.create({
					data: {
						userName: validated.userName,
						userEmail: validated.userEmail,
						userPhone: validated.userPhone,
						status: validated.status as keyof typeof OrderStatus,
						orderItems: {
							create: validated.orderItems,
						},
					},
				});
				throw new Created();
			},
		},

		"/api/orders/:id": {
			PUT: async (req) => {
				const { id } = req.params;
				const body = await req.json();
				const order = await prisma.order.findUnique({ where: { id } });
				if (!order) {
					throw new NotFound();
				}
				const validated = orderValidator.partial().parse(body);
				if (
					order.status === "CANCELED" &&
					validated.status &&
					validated?.status !== "CANCELED"
				) {
					throw new Forbidden("Cannot modify a canceled order");
				}
				if (
					order.status === "COMPLETED" &&
					validated.status &&
					validated?.status !== "COMPLETED"
				) {
					throw new Forbidden("Cannot modify a completed order");
				}
				await prisma.order.update({
					where: { id },
					data: {
						userName: validated.userName,
						userEmail: validated.userEmail,
						userPhone: validated.userPhone,
						status: validated.status as keyof typeof OrderStatus,
					},
				});
				throw new OK();
			},
		},

		"/api/orders/status/:status": {
			GET: async (req) => {
				const { status } = req.params;
				try {
					statusValidator.parse(status);
				} catch (e) {
					if (e instanceof z.ZodError) {
						if (e.issues[0].code === "invalid_enum_value") {
							throw new NotFound();
						}
					}
					throw e;
				}
				const order = await prisma.order.findMany({
					where: { status: status as keyof typeof OrderStatus },
				});
				return Response.json(order);
			},
		},

		"/api/status": Response.json(Object.keys(OrderStatus)),
	},
	error(err: HttpError | unknown) {
		if (err instanceof HttpError) {
			return new Response(err.message, { status: err.status });
		}
		throw err;
	},
	port: 3001,
});

console.log(`Server running at ${server.url}`);
