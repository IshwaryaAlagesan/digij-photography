const { setWorldConstructor, World, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(30000);

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
    this.baseUrl = 'https://demosite-crm-app.netlify.app';
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  const headless = this.parameters.headless !== false;
  this.browser = await chromium.launch({ headless, slowMo: headless ? 0 : 300 });
  this.context = await this.browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
