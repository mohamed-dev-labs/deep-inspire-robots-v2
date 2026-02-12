import puppeteer from 'puppeteer';
import axios from 'axios';

export class WebTool {
    static async search(query) {
        // Simple search using a public API or fallback
        console.log(`Searching for: ${query}...`);
        try {
            // For demo purposes, we can use a mock or a simple search scraper
            // In a real app, you'd use Google Search API or DuckDuckGo
            return `Search results for "${query}": [Result 1, Result 2, Result 3]`;
        } catch (error) {
            return `Search failed: ${error.message}`;
        }
    }

    static async browse(url) {
        console.log(`Browsing URL: ${url}...`);
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        try {
            await page.goto(url, { waitUntil: 'networkidle2' });
            const content = await page.evaluate(() => document.body.innerText.slice(0, 2000));
            await browser.close();
            return content;
        } catch (error) {
            await browser.close();
            return `Browsing failed: ${error.message}`;
        }
    }
}
