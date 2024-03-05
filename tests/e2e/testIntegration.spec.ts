import { expect, test } from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Login').click();
    await page.getByLabel('Command input').click();
})

test('view no load, brief mode', async ({ page }) => {    
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Please load a non-empty csv before running the view command");

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load data/simpleData.csv');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[2]?.textContent;
  });
  expect(secondChild).toEqual("hellomynameisbillybobandIlikeeatinghotdogs");
})

test('search no load, brief mode', async ({ page }) => {    
    await page.getByLabel('Command input').fill('search 1 hello');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Please load a non-empty csv before running the search command");

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load data/simpleData.csv');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 1 hello');
  await page.getByRole('button', {name: 'Submit'}).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[2]?.textContent;
  });
  expect(secondChild).toEqual("hellomyname");
})

test('search and view no load, brief mode', async ({ page }) => {    
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Please load a non-empty csv before running the view command");

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 1 hello');
  await page.getByRole('button', {name: 'Submit'}).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual("Please load a non-empty csv before running the search command");
})

test('view after load wrong, brief mode', async ({ page }) => {    
    await page.getByLabel('Command input').fill('load blep');
  await page.getByRole('button', { name: 'Submit' }).click();  

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Please give a supported file path");
  
  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual("Please load a non-empty csv before running the view command");
})

test('search after load wrong, brief mode', async ({ page }) => {    
    await page.getByLabel('Command input').fill('load blep');
  await page.getByRole('button', { name: 'Submit' }).click();  

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Please give a supported file path");
  
  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 1 hello');
  await page.getByRole('button', {name: 'Submit'}).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual("Please load a non-empty csv before running the search command");
})

test('load load view, brief mode', async ({ page }) => {    
    await page.getByLabel('Command input').fill('load data/simpleData.csv');
  await page.getByRole('button', { name: 'Submit' }).click();  
  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load data/repeatedData.csv');
  await page.getByRole('button', { name: 'Submit' }).click();  

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[2]?.textContent;
  });
  expect(firstChild).toEqual("whatwhatwhatahyosupwhatyooopswhatwhatwhat");
})

test('load load search, brief mode', async ({ page }) => {    
    await page.getByLabel('Command input').fill('load data/simpleData.csv');
  await page.getByRole('button', { name: 'Submit' }).click();  
  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load data/repeatedData.csv');
  await page.getByRole('button', { name: 'Submit' }).click();  

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 1 what');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[2]?.textContent;
  });
  expect(firstChild).toEqual("whatwhatwhatwhatyooopswhatwhatwhat");

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 1 hello');
  await page.getByRole('button', {name: 'Submit'}).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[3]?.textContent;
  });
  expect(secondChild).toEqual("No instances of value: hello were found in column: 1");
})

test('view search view, brief mode', async ({ page }) => {    
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

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 3 bob');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[3]?.textContent;
  });
  expect(secondChild).toEqual("hellomynameisbillybobandIlikeeatinghotdogs");
})

test('search view search, brief mode', async ({ page }) => {    
    await page.getByLabel('Command input').fill('load data/simpleData.csv');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 3 bob');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("isbillybob");
  
  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 3 bob');
  await page.getByRole('button', { name: 'Submit' }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[3]?.textContent;
  });
  expect(secondChild).toEqual("isbillybob");
})

test('view mode view mode view, brief mode', async ({ page }) => {    
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

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();
  
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[3]?.textContent;
  });
  expect(secondChild).toEqual("Command: viewOutput:hellomynameisbillybobandIlikeeatinghotdogs");

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('mode brief');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submit'}).click();
  
  const thirdChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[5]?.textContent;
  });
  expect(thirdChild).toEqual("hellomynameisbillybobandIlikeeatinghotdogs");
})

test('search mode search mode search, brief mode', async ({ page }) => {    
    await page.getByLabel('Command input').fill('load data/simpleData.csv');
  await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search my hot');
  await page.getByRole('button', {name: 'Submit'}).click();
  
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("eatinghotdogs");

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search my hot');
  await page.getByRole('button', {name: 'Submit'}).click();
  
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[3]?.textContent;
  });
  expect(secondChild).toEqual("Command: search my hotOutput:eatinghotdogs");

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('mode brief');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search my hot');
  await page.getByRole('button', {name: 'Submit'}).click();
  
  const thirdChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[5]?.textContent;
  });
  expect(thirdChild).toEqual("eatinghotdogs");
})

