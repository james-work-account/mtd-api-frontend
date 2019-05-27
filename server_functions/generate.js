const axios = require('axios')
const puppeteer = require('puppeteer')

const generateUser = async () => {
  const url =
    "https://test-api.service.hmrc.gov.uk/create-test-user/individuals";
  const body = JSON.parse(`{"serviceNames":["mtd-income-tax", "mtd-vat"]}`);
  const headers = {
    Accept: "application/vnd.hmrc.1.0+json",
    Authorization: "Bearer db8e884897a9347426f6a2c94dca566",
    "Content-Type": "application/json"
  };
  const response = await axios.post(url, body, {
    headers: headers
  });
  return response.data;
}

const grantAccess = async (userId, password) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const saScopes = "read:self-assessment+write:self-assessment+write:sent-invitations"
  const vatScopes = "read:vat+write:vat+write:sent-invitations"

  // Landing page
  await page.goto(`https://test-www.tax.service.gov.uk/oauth/authorize?client_id=5Z9oOif4hw8hlZlWXIwUH0YBwKsa&scope=${saScopes}+${vatScopes}&response_type=code&redirect_uri=http://localhost:9000&state=12345`)
  await Promise.all([
    page.click(".button"),
    page.waitForNavigation()
  ])
  // Login page
  await page.type("#userId", userId)
  await page.type("#password", password)
  await Promise.all([
    page.click(".button"),
    page.waitForNavigation()
  ])
  // Set up to get Bearer Token
  let oauthToken = null;
  page.setRequestInterception(true);
  page.on('request', request => {
    if (request.isNavigationRequest() && request.redirectChain().length) {
      oauthToken = request._url.split("code=")[1].split("&")[0] // get bearer from redirect URL
      request.abort();
    } else {
      request.continue()
    }
  });
  // Click authorise on confirmation page
  await Promise.all([
    page.click("#authorise"),
    page.waitForNavigation()
  ])
  await browser.close();
  return oauthToken;
}

const requestAccessToken = async (oauthToken) => {
  const url = "https://test-www.tax.service.gov.uk/oauth/token"
  const body = JSON.stringify({
    "client_id": "5Z9oOif4hw8hlZlWXIwUH0YBwKsa",
    "client_secret": "adb75b05-714e-44c8-986f-59fe1c566736",
    "grant_type": "authorization_code",
    "code": oauthToken,
    "redirect_uri": "http://localhost:9000"
  })
  const headers = {
    "Content-Type": "application/json"
  }
  const response = await axios.post(url, body, {
    headers: headers
  })
  return `Bearer ${response.data.access_token}`
}

module.exports = {
  generateUser,
  grantAccess,
  requestAccessToken
}
