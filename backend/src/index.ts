import { app, prisma } from './app';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(`✅ Server running on port ${PORT}`);
	console.log('📂 Escuchando cambios en src/ para reiniciar...');
});

// Captura de errores y logs
process.on('unhandledRejection', (reason, promise) => {
	console.error('❌ Promise rechazada no manejada:', reason);
});

process.on('uncaughtException', (error) => {
	console.error('❌ Excepción no capturada:', error);
	process.exit(1);
});

// Desconectar Prisma gracefully
process.on('SIGINT', async () => {
	console.log('\n📌 Recibida señal SIGINT, cerrando servidor...');
	await prisma.$disconnect();
	server.close(() => {
		process.exit(0);
	});
});

process.on('SIGTERM', async () => {
	console.log('\n📌 Recibida señal SIGTERM, cerrando servidor...');
	await prisma.$disconnect();
	server.close(() => {
		process.exit(0);
	});
});
