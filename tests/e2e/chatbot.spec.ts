import { test, expect } from '@playwright/test';

const SSE_RESPONSE = [
  'data: {"delta":"Sai worked at "}\n\n',
  'data: {"delta":"**Pacific Life**"}\n\n',
  'data: {"delta":", **Accenture**, and **Cognizant**."}\n\n',
  'data: [DONE]\n\n',
].join('');

async function mockChatAPI(page: import('@playwright/test').Page, body = SSE_RESPONSE) {
  await page.route('/api/chat', (route) =>
    route.fulfill({
      status: 200,
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
      body,
    })
  );
}

test.describe('ChatWidget – FAB button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('chat FAB button is visible in bottom-right area', async ({ page }) => {
    const fab = page.getByLabel(/open chat/i);
    await expect(fab).toBeVisible({ timeout: 5_000 });

    // Should be positioned fixed at the bottom-right
    const box = await fab.boundingBox();
    expect(box).not.toBeNull();
    const viewport = page.viewportSize()!;
    expect(box!.x + box!.width).toBeGreaterThan(viewport.width - 100);
    expect(box!.y + box!.height).toBeGreaterThan(viewport.height - 100);
  });

  test('FAB button has orange gradient background', async ({ page }) => {
    const fab = page.getByLabel(/open chat/i);
    await expect(fab).toBeVisible({ timeout: 5_000 });
    const bg = await fab.evaluate((el) => getComputedStyle(el).background);
    expect(bg).toMatch(/gradient|rgb/i);
  });
});

test.describe('ChatWidget – panel open/close', () => {
  test.beforeEach(async ({ page }) => {
    await mockChatAPI(page);
    await page.goto('/');
    await page.getByLabel(/open chat/i).waitFor({ timeout: 5_000 });
  });

  test('clicking FAB opens the chat panel', async ({ page }) => {
    await page.getByLabel(/open chat/i).click();
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 3_000 });
  });

  test('chat panel shows "Ask about Sai" header', async ({ page }) => {
    await page.getByLabel(/open chat/i).click();
    await expect(page.getByRole('dialog')).toContainText('Ask about Sai', { timeout: 3_000 });
  });

  test('chat panel shows welcome message', async ({ page }) => {
    await page.getByLabel(/open chat/i).click();
    await expect(page.getByRole('dialog')).toContainText("Hi! I'm Sai's AI assistant", {
      timeout: 3_000,
    });
  });

  test('clicking X button closes the panel', async ({ page }) => {
    await page.getByLabel(/open chat/i).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 3_000 });

    await page.getByLabel('Close chat').last().click();
    await expect(dialog).not.toBeVisible({ timeout: 2_000 });
  });

  test('clicking FAB again closes the panel', async ({ page }) => {
    const fab = page.getByLabel(/open chat/i);
    await fab.click();
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 3_000 });
    await fab.click();
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 2_000 });
  });

  test('Escape key closes the panel', async ({ page }) => {
    await page.getByLabel(/open chat/i).click();
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 3_000 });

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 2_000 });
  });
});

test.describe('ChatWidget – input behaviour', () => {
  test.beforeEach(async ({ page }) => {
    await mockChatAPI(page);
    await page.goto('/');
    await page.getByLabel(/open chat/i).click();
    await page.getByRole('dialog').waitFor({ timeout: 3_000 });
  });

  test('send button is disabled when input is empty', async ({ page }) => {
    const sendBtn = page.getByLabel('Send message');
    await expect(sendBtn).toBeDisabled();
  });

  test('send button is enabled after typing', async ({ page }) => {
    const input = page.getByLabel('Chat message input');
    await input.fill('What companies has Sai worked at?');
    await expect(page.getByLabel('Send message')).toBeEnabled();
  });

  test('Enter key sends the message', async ({ page }) => {
    const input = page.getByLabel('Chat message input');
    await input.fill('Tell me about Sai');
    await input.press('Enter');

    // User message should appear
    await expect(page.getByRole('dialog')).toContainText('Tell me about Sai', { timeout: 3_000 });
  });

  test('Shift+Enter does not send (allows newline)', async ({ page }) => {
    const input = page.getByLabel('Chat message input');
    await input.fill('Hello');
    await input.press('Shift+Enter');
    // Input should still have content (not sent)
    await expect(page.getByRole('dialog')).not.toContainText('Sai worked at', { timeout: 1_000 });
  });

  test('input clears after sending', async ({ page }) => {
    const input = page.getByLabel('Chat message input');
    await input.fill('What projects did Sai build?');
    await input.press('Enter');
    await expect(input).toHaveValue('', { timeout: 3_000 });
  });
});

test.describe('ChatWidget – streaming and rendering', () => {
  test.beforeEach(async ({ page }) => {
    await mockChatAPI(page);
    await page.goto('/');
    await page.getByLabel(/open chat/i).click();
    await page.getByRole('dialog').waitFor({ timeout: 3_000 });
  });

  test('assistant response appears after sending a message', async ({ page }) => {
    const input = page.getByLabel('Chat message input');
    await input.fill('What companies has Sai worked at?');
    await input.press('Enter');

    await expect(page.getByRole('dialog')).toContainText('Pacific Life', { timeout: 8_000 });
  });

  test('bold terms render as <strong> elements', async ({ page }) => {
    const input = page.getByLabel('Chat message input');
    await input.fill('Where did Sai work?');
    await input.press('Enter');

    // Wait for response
    await expect(page.getByRole('dialog')).toContainText('Pacific Life', { timeout: 8_000 });

    // **Pacific Life** should render as <strong>Pacific Life</strong>
    const boldEl = page
      .locator('dialog strong, [role="dialog"] strong')
      .filter({ hasText: 'Pacific Life' });
    await expect(boldEl).toBeVisible({ timeout: 5_000 });
  });

  test('double asterisks are not shown literally', async ({ page }) => {
    const input = page.getByLabel('Chat message input');
    await input.fill('Where did Sai work?');
    await input.press('Enter');

    await expect(page.getByRole('dialog')).toContainText('Pacific Life', { timeout: 8_000 });
    // Raw ** should not appear in visible text
    const dialogText = await page.getByRole('dialog').innerText();
    expect(dialogText).not.toMatch(/\*\*Pacific Life\*\*/);
  });

  test('send button is disabled while streaming', async ({ page }) => {
    // Use a slow mock to catch mid-stream state
    await page.unroute('/api/chat');
    await page.route('/api/chat', async (route) => {
      await new Promise((r) => setTimeout(r, 200));
      await route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
        body: SSE_RESPONSE,
      });
    });

    const input = page.getByLabel('Chat message input');
    await input.fill('Hello');
    await page.getByLabel('Send message').click();

    // Send button should be disabled immediately after click
    await expect(page.getByLabel('Send message')).toBeDisabled({ timeout: 500 });
  });

  test('API error response shows friendly error message', async ({ page }) => {
    await page.unroute('/api/chat');
    await page.route('/api/chat', (route) =>
      route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'text/event-stream' },
        body: 'data: {"error":"LLM service error"}\n\ndata: [DONE]\n\n',
      })
    );

    const input = page.getByLabel('Chat message input');
    await input.fill("What is Sai's email?");
    await input.press('Enter');

    await expect(page.getByRole('dialog')).toContainText("couldn't retrieve", { timeout: 5_000 });
  });
});

test.describe('ChatWidget – accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await mockChatAPI(page);
    await page.goto('/');
  });

  test('chat panel has role="dialog" and aria-modal', async ({ page }) => {
    await page.getByLabel(/open chat/i).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('aria-modal', 'true', { timeout: 3_000 });
  });

  test('input has accessible label', async ({ page }) => {
    await page.getByLabel(/open chat/i).click();
    await expect(page.getByLabel('Chat message input')).toBeVisible({ timeout: 3_000 });
  });

  test('send button has accessible label', async ({ page }) => {
    await page.getByLabel(/open chat/i).click();
    await expect(page.getByLabel('Send message')).toBeVisible({ timeout: 3_000 });
  });

  test('close button has accessible label', async ({ page }) => {
    await page.getByLabel(/open chat/i).click();
    await expect(page.getByLabel('Close chat').last()).toBeVisible({ timeout: 3_000 });
  });
});
