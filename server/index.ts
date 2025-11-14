import { z } from "zod";
import { OrderStatus, PrismaClient } from "@/generated/prisma/client";
import { Created, HttpError, NotFound, OK } from "./HttpErrors";

const prisma = new PrismaClient();

const productValidator = z.object({
	name: z.string().nonempty(),
	description: z.string().nonempty(),
	price: z.number().positive(),
	weight: z.number().positive(),
    categoryId: z.string().uuid(),
}).strict();

type Product = z.infer<typeof productValidator>;

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
					data: body,
				});
				throw new OK();
			},
		},

		"/api/products": {
			GET: async () => Response.json(await prisma.product.findMany()),
			POST: async (req) => {
				const body = await req.json();
				const validated = productValidator.parse(body);
				await prisma.product.create({
					data: {
                        ...validated,
                        category: { connect: { id: validated.categoryId } },
                    },
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
				await prisma.order.create({
					data: body,
				});
				throw new Created();
			},
		},

		"/api/orders/:id": {
			PUT: async (req) => {
				const { id } = req.params;
				const body = await req.json();
				await prisma.order.update({
					where: { id },
					data: body,
				});
				throw new OK();
			},
		},

		"/api/orders/status/:status": {
			GET: async (req) => {
				const { status } = req.params;
				const statusValidator = z.enum(
					Object.keys(OrderStatus) as [string, ...string[]],
				);
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