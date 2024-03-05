import { expect, test } from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Login').click();
    await page.getByLabel('Command input').click();
})

test('no load args inputted, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Please include the file you want to load");
})

test('wrong load args inputted, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load blep');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Please give a supported file path");
})

test('too many load args inputted, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load blep blop');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("You have inputted too many arguments");
})

test('load empty file inputted, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load data/emptyData.csv');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Please load a non-empty file");
})

test('load successful, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load data/simpleData.csv');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("File successfully loaded");
})

test('load twice, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load data/simpleData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load data/simpleData.csv');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("File is already loaded");
})
