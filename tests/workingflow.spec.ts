import { test, expect } from '@playwright/test';

test('Un usuario puede ver la tarea y verla en la lista', async ({ page }) => {
  // 1. Entrar en la app
  await page.goto('https://task-manager-react-livid.vercel.app');

  // 2. Crear tarea
  await page
		.getByPlaceholder('Escribe una nueva tarea')
		.fill('Probando Playwright');
  await page.getByRole('button', {name: 'Agregar tarea'}).click();

  // 3. Verla en la lista
  await expect(page.getByText('Probando Playwright')).toBeVisible();
});
