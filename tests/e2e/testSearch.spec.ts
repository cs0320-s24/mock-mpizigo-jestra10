import { expect, test } from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Login').click();
    await page.getByLabel('Command input').click();
})

test('search too many args inputted, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load data/simpleData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search blep blop bloop');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("Error: undesired number of arguments. Please follow the format of \'search <column> <value>\'");
})

test('search too few args inputted, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load data/simpleData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("Error: undesired number of arguments. Please follow the format of \'search <column> <value>\'");
})

test('search simple data value exists, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load data/simpleData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 1 hello');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
    expect(firstChild).toEqual("hellomyname");

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search hello eating');
  await page.getByRole('button', {name: 'Submit'}).click();
    
    const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[2]?.textContent;
  });
  expect(secondChild).toEqual("eatinghotdogs");
})

test('search simple data value exists, verbose mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: 'Submit'}).click();
  
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load data/simpleData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 1 hello');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[2]?.textContent;
  });
    expect(firstChild).toEqual("Command: search 1 helloOutput:hellomyname");

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search hello eating');
  await page.getByRole('button', {name: 'Submit'}).click();
    
    const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[3]?.textContent;
  });
  expect(secondChild).toEqual("Command: search hello eatingOutput:eatinghotdogs");
})

test('search simple data value does not exist, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('load data/simpleData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 1 booyah');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
    expect(firstChild).toEqual("No instances of value: booyah were found in column: 1");
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search hello booyah');
  await page.getByRole('button', {name: 'Submit'}).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[2]?.textContent;
  });
  expect(secondChild).toEqual("No instances of value: booyah were found in column: hello");
})

test('search simple data value does not exist, verbose mode', async ({ page }) => {
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: 'Submit'}).click();
  
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load data/simpleData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 1 booyah');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[2]?.textContent;
  });
    expect(firstChild).toEqual("Command: search 1 booyahOutput: No instances of value: booyah were found in column: 1");
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search hello booyah');
  await page.getByRole('button', {name: 'Submit'}).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[3]?.textContent;
  });
  expect(secondChild).toEqual("Command: search hello booyahOutput: No instances of value: booyah were found in column: hello");
})

test('search simple data value multiple, brief mode', async ({ page }) => {
 await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load data/repeatedData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 1 what');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("whatwhatwhatwhatyooopswhatwhatwhat");
})

test('search simple data value wrong col, brief mode', async ({ page }) => {  
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load data/simpleData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 2 hello');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(firstChild).toEqual("No instances of value: hello were found in column: 2");
})

test('search malformed, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load data/malformedData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 2 data');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
    expect(firstChild).toEqual("malformeddatathethird");
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 3 the');
  await page.getByRole('button', {name: 'Submit'}).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[2]?.textContent;
  });
  expect(secondChild).toEqual("Error: index 3 is out of range of data set");
})

test('search search, brief mode', async ({ page }) => {
  await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load data/malformedData.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 2 data');
  await page.getByRole('button', {name: 'Submit'}).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
    expect(firstChild).toEqual("malformeddatathethird");
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 2 data');
  await page.getByRole('button', {name: 'Submit'}).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[2]?.textContent;
  });
  expect(secondChild).toEqual("malformeddatathethird");
})
