const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('Iden Challenge Extract Product Data', async ({ page, context }) => {
    const storageState = 'auth.json';

    // Load session if available
    if (fs.existsSync(storageState)) {
        await context.addCookies(JSON.parse(fs.readFileSync(storageState, 'utf-8')).cookies);
        console.log("✅ Loaded existing session.");
    } else {
        // If no session exists, login and save session
        await page.goto('http://localhost:3000/login');
        await page.fill('input[name="username"]', 'testuser');
        await page.fill('input[name="password"]', 'password');
        await page.click('button[type="submit"]');
        await page.waitForURL('http://localhost:3000/dashboard');

        // Save session
        fs.writeFileSync(storageState, JSON.stringify({ cookies: await context.cookies() }));
        console.log("✅ New session saved.");
    }

    // Valid paths with product table
    const possiblePaths = [
        'http://localhost:3000/products', // Only keep the valid path
    ];

    let pageFound = false;
    for (let path of possiblePaths) {
        await page.goto(path);
        await page.waitForTimeout(1000); // Give time to load

        // Log the page HTML to see if the table exists
        const pageContent = await page.content();
        console.log(pageContent);

        if (await page.locator('pre').count() > 0) {
            console.log(`✅ Product data found at: ${path}`);
            pageFound = true;
            break;
        }
    }

    if (!pageFound) {
        console.error("❌ No product table found in possible paths.");
        return;
    }

    // Extract product data (directly from the logged JSON)
    const productDataText = await page.locator('pre').textContent();
    const allProducts = JSON.parse(productDataText);

    console.log("✅ Extracted All Product Data:", allProducts);

    // Save to JSON file
    fs.writeFileSync('product_data.json', JSON.stringify(allProducts, null, 2));
    console.log("📂 All product data exported to 'product_data.json'.");
});































