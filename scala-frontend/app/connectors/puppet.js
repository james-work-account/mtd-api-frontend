const puppeteer = require('puppeteer');

const grantAccess = async (userId, password) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  const saScopes = "read:self-assessment+write:self-assessment+write:sent-invitations";
  const vatScopes = "read:vat+write:vat+write:sent-invitations";

  // Landing page
  await page.goto(`https://test-www.tax.service.gov.uk/oauth/authorize?client_id=5Z9oOif4hw8hlZlWXIwUH0YBwKsa&scope=${saScopes}+${vatScopes}&response_type=code&redirect_uri=http://localhost:9000&state=12345`)
  await Promise.all([
    page.click(".button"),
    page.waitForNavigation()
  ]);
  // Login page
  await page.type("#userId", userId);
  await page.type("#password", password);
  await Promise.all([
    page.click(".button"),
    page.waitForNavigation()
  ]);
  // Set up to get Bearer Token
  let oauthToken = null;
  page.setRequestInterception(true);
  page.on('request', request => {
    if (request.isNavigationRequest() && request.redirectChain().length) {
      oauthToken = request._url.split("code=")[1].split("&")[0]; // get bearer from redirect URL
      request.abort();
    } else {
      request.continue()
    }
  });
  // Click authorise on confirmation page
  await Promise.all([
    page.click("#authorise"),
    page.waitForNavigation()
  ]);
  await browser.close();
  return oauthToken;
};
