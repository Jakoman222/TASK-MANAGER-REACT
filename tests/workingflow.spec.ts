import { test, expect } from '@playwright/test';

test('Un usuario puede crear una tarea y verla en la lista', async ({
	page,
}) => {
	const taskText = `Probando Playwright ${Date.now()}`;

	page.on('console', (message) => {
		console.log(`Browser console: ${message.type()} - ${message.text()}`);
	});

	page.on('requestfailed', (request) => {
		console.log(
			`Request failed: ${request.method()} ${request.url()} - ${request.failure()?.errorText}`,
		);
	});

	await page.goto('/');

	await page.getByPlaceholder('Escribe una nueva tarea').fill(taskText);

	const responsePromise = page.waitForResponse(
		(response) =>
			response.url().endsWith('/tasks') &&
			response.request().method() === 'POST',
	);

	await page.getByRole('button', { name: 'Agregar tarea' }).click();

	const response = await responsePromise;

	console.log('POST URL:', response.url());
	console.log('POST status:', response.status());
	console.log('POST body:', await response.text());

	expect(response.ok()).toBe(true);

	await expect(page.getByText(taskText, { exact: true })).toBeVisible({
		timeout: 10_000,
	});
});
