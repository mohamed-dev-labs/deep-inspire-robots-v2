import puppeteer from 'puppeteer';
import chalk from 'chalk';

export class WebTool {
    static async search(query) {
        console.log(chalk.yellow(`\n[WebTool] Performing real-time deep search for: "${query}"`));
        try {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            return await this.browse(searchUrl, true);
        } catch (error) {
            return `Search failed: ${error.message}`;
        }
    }

    static async browse(url, isSearch = false) {
        console.log(chalk.blue(`[WebTool] Opening virtual browser (HEADFUL MODE) for: ${url}`));
        
        // تم تغيير headless إلى false لعرض المتصفح للمستخدم
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        try {
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

            let content;
            if (isSearch) {
                // استخراج نتائج البحث من جوجل
                content = await page.evaluate(() => {
                    const results = [];
                    document.querySelectorAll('div.g').forEach(el => {
                        const title = el.querySelector('h3')?.innerText;
                        const link = el.querySelector('a')?.href;
                        const snippet = el.querySelector('.VwiC3b')?.innerText;
                        if (title && link) results.push({ title, link, snippet });
                    });
                    return JSON.stringify(results.slice(0, 5), null, 2);
                });
            } else {
                // استخراج النص الأساسي من الصفحة
                content = await page.evaluate(() => {
                    return document.body.innerText.split('\n')
                        .filter(line => line.trim().length > 20)
                        .slice(0, 100)
                        .join('\n');
                });
            }

            // نترك المتصفح مفتوحاً لثوانٍ قليلة ليتمكن المستخدم من المشاهدة
            await new Promise(resolve => setTimeout(resolve, 5000));
            await browser.close();
            return content || "No content could be extracted.";
        } catch (error) {
            if (browser) await browser.close();
            return `Browsing failed: ${error.message}`;
        }
    }
}
