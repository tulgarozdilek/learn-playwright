import { test, expect } from '@playwright/test';
import { beforeEach, describe } from 'node:test';



describe('New Todo', async () => {
  test.beforeEach('navigate tot todo app', async ({ page }) => {
    await page.goto('');
  })

  test('active and completed filters', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?')
    await todoInput.fill('water the plants');
    await todoInput.press('Enter');
    await todoInput.fill('feed the dog');
    await todoInput.press('Enter');
    await page.locator('li').filter({ hasText: 'water the plants' }).getByLabel('Toggle Todo').check();
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(page.getByTestId('todo-title')).toContainText('feed the dog');
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.getByTestId('todo-title')).toContainText('water the plants');
  });

  test('text field is cleared when item is adedd', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?')
    await todoInput.fill("water the plants");
    await todoInput.press('Enter');
    await expect(page.getByPlaceholder('What needs to be done?')).toBeEmpty();
  })
})
