import { expect, test } from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Login').click();
  await page.getByLabel('Command input').click();
})

test('no mode args inputted, in brief mode', async ({ page }) => {  
  await page.getByLabel('Command input').fill('mode');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Please include the mode you wish to switch to");
})

test('wrong mode args inputted, in brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('mode bleh');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Please specify a supported mode");
})

test('too many mode args inputted, in brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('mode mode mode');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("You have inputted too many arguments");
})

test('on mode brief inputted, command already in mode brief', async ({ page }) => {
  await page.getByLabel('Command input').fill('mode brief');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode brief');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("Already in mode brief");
})

test('on mode verbose inputted, command now in mode verbose', async ({ page }) => {
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Command: mode verboseOutput: Now in mode verbose");
})

test('on mode verbose & verbose inputted, command already in mode verbose', async ({ page }) => {
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("Command: mode verboseOutput: Already in mode verbose");
})

test('on mode verbose & brief inputted, command now in mode brief', async ({ page }) => {
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode brief');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("Now in mode brief");
})

test('no mode args inputted, in verbose mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("Command: modeOutput: Please include the mode you wish to switch to");
})

test('wrong mode args inputted, in verbose mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode bleh');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("Command: mode blehOutput: Please specify a supported mode");
})

test('too many mode args inputted, in verbose mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode mode mode');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("Command: mode mode modeOutput: You have inputted too many arguments");
})