let page;
let timeoutTest = 60000;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, timeoutTest);

  test(
    "The h1 header content",
    async () => {
      const firstLink = await page.$("header div div a");
      await firstLink.click();
      await page.waitForSelector("h1");
      const title2 = await page.title();
      expect(title2).toEqual(
        "GitHub for teams · Build like the best teams on the planet · GitHub"
      );
    },
    timeoutTest
  );

  test(
    "The first link attribute",
    async () => {
      const actual = await page.$eval("a", (link) => link.getAttribute("href"));
      expect(actual).toEqual("#start-of-content");
    },
    timeoutTest
  );

  test(
    "The page contains Sign in button",
    async () => {
      const btnSelector = ".btn-large-mktg.btn-mktg";
      await page.waitForSelector(btnSelector, {
        visible: true,
      });
      const actual = await page.$eval(btnSelector, (link) => link.textContent);
      expect(actual).toContain("Get started with Team");
    },
    timeoutTest
  );
});

// Задание 2
// test(
//   "GitHub for enterprises",
//   async () => {
//     await page.goto("https://github.com/enterprise");
//     await page.waitForSelector("h1");
//     const title = await page.title();
//     expect(title).toEqual(
//       "Enterprise · A smarter way to work together · GitHub"
//     );
//   },
//   timeoutTest
// );

// test(
//   "GitHub Actions Cheat Sheet",
//   async () => {
//     await page.goto(
//       "https://resources.github.com/actions/github-actions-cheat/"
//     );
//     await page.waitForSelector("h1");
//     const title = await page.title();
//     expect(title).toEqual("GitHub Actions Cheat Sheet - GitHub Resources");
//   },
//   timeoutTest
// );

// test(
//   "GitHub Actions Cheat Sheet",
//   async () => {
//     await page.goto("https://github.com/customer-stories/front");
//     await page.waitForSelector("h1");
//     const title = await page.title();
//     expect(title).toEqual("Front · GitHub");
//   },
//   timeoutTest
// );

const data = [
  [
    "https://github.com/enterprise",
    "Enterprise · A smarter way to work together · GitHub",
  ],
  [
    "https://resources.github.com/actions/github-actions-cheat/",
    "GitHub Actions Cheat Sheet - GitHub Resources",
  ],
  ["https://github.com/customer-stories/front", "Front · GitHub"],
];

test.each(data)(
  "Page header tests",
  async (url, expected) => {
    await page.goto(url);
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toEqual(expected);
  },
  timeoutTest
);
