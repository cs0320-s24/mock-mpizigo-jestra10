import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    // gets onto the webpage
    await page.goto('http://localhost:8000/');
  })

test('on page load, i see a login button', async ({ page }) => {
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load and login, i see a sign out button', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  // clicks the Login button
  await page.getByLabel('Login').click();
  
  await expect(page.getByLabel('Sign Out')).toBeVisible()
});

test('on page load, i dont see the input box until login', async ({ page }) => {
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()
  
  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command input')).toBeVisible()
})

test('on page load, login, and sign out, i dont see the input box', async ({ page }) => {
  await page.getByLabel('Login').click();
  // click the sign out button
  await page.getByLabel('Sign out').click();

  await expect(page.getByLabel('CommandInput')).not.toBeVisible()
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Login')).toBeVisible()
});

test('after I type into the input box, its text changes', async ({ page }) => {
  await page.getByLabel('Login').click();

  //type into the input box
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('banana');

  const mock_input = `banana`
  await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
});

test('on page load, i see a button', async ({ page }) => {
  await page.getByLabel('Login').click();
  
  // expect the Submit button
  await expect(page.getByRole('button', {name: 'Submit'})).toBeVisible()
});

test('after I click the button, my command gets pushed', async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('banana');
  await page.getByRole('button', {name: 'Submit'}).click();

  // looks through repl-history for the history of the pushed command
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Command not recognized");
});

test('on page load, login, command push, and sign out, i dont see the input box', async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('banana');
  // input a command and sign out
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByLabel('Sign out').click();

  await expect(page.getByLabel('CommandInput')).not.toBeVisible()
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Login')).toBeVisible()
});