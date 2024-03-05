import { expect, test } from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Login').click();
    await page.getByLabel('Command input').click();
})


test('view too many args inputted, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load data/simpleData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view blep');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("You have inputted too many arguments");
})

test('view simple data, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load data/simpleData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("hellomynameisbillybobandIlikeeatinghotdogs");
})

test('view simple data, verbose mode', async ({ page }) => {
    await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: 'Submit'}).click();
  
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load data/simpleData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[2]?.textContent;
  });
  expect(firstChild).toEqual("Command: viewOutput:hellomynameisbillybobandIlikeeatinghotdogs");
})

test('view header data, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load data/headerData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("nameagejobnimtelson420engineerashketchum12pokemontrainerandyvandam76professor");
})

test('view header data, verbose mode', async ({ page }) => {
    await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: 'Submit'}).click();
  
    await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load data/headerData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[2]?.textContent;
  });
  expect(firstChild).toEqual("Command: viewOutput:nameagejobnimtelson420engineerashketchum12pokemontrainerandyvandam76professor");
})

test('view malformed data, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load data/malformedData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("Iammalformeddatathethirdnicetomeetyou");
})

test('view malformed data, verbose mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: 'Submit'}).click();
  
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load data/malformedData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[2]?.textContent;
  });
  expect(firstChild).toEqual("Command: viewOutput:Iammalformeddatathethirdnicetomeetyou");
})

test('view view, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load data/malformedData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
    expect(firstChild).toEqual("Iammalformeddatathethirdnicetomeetyou");
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[2]?.textContent;
  });
  expect(secondChild).toEqual("Iammalformeddatathethirdnicetomeetyou");
})