const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
	await prisma.task.upsert({
		where: { id: 1 },
		update: {},
		create: {
			id: 1,
			text: 'Tarea de ejemplo para pruebas con seed',
			completed: false,
		},
	});
	console.log('Seed ejecutado correctamente');
}

main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(`Error al ejecutar el seed: ${e}`);
		await prisma.$disconnect();
		process.exit(1);
	});
