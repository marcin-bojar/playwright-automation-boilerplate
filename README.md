# Test Automation Boilerplate

Playwright + TypeScript test automation boilerplate. The structure is designed as a neutral starting point for new projects, with a focus on readable specs, Page Objects, API-based data setup, and AI-friendly rules.

## Goals

- provide one standard for humans and AI agents writing tests
- keep specs close to business domains
- keep UI interactions in Page Objects
- keep tests short, readable, and resilient to UI changes
- separate data setup, navigation, Page Objects, and assertions

## Structure

```text
.
├── .cursor/rules/e2e-test-generation.mdc
├── AI_TEST_RULES.md
├── playwright.config.ts
├── tests
│   ├── e2e-specs
│   │   └── example-dashboard
│   │       ├── dashboard.spec.ts
│   │       └── data
│   │           └── dashboard-fixtures.ts
│   ├── page-objects
│   │   ├── auth
│   │   ├── common
│   │   └── example-dashboard
│   ├── setup
│   │   ├── auth.setup.ts
│   │   └── cleanup.setup.ts
│   ├── state
│   │   └── no-auth.json
│   └── utils
│       ├── constants.ts
│       ├── env.ts
│       ├── fixtures
│       ├── managers
│       ├── services
│       ├── types
│       └── test-data.ts
```

## Core Rules

- Specs import `test` and `expect` only from `@Tests/utils/fixtures/playwright-fixtures`.
- A Page Object should represent a page, tab, modal, or clear UI fragment.
- `tests/e2e-specs` and `tests/page-objects` should follow a similar domain split.
- Keep spec-specific data in a local `data/` directory next to the spec.
- Keep page navigation in the relevant Page Object.
- Locators are `readonly` fields initialized in the Page Object constructor.
- Prefer selectors in this order: `getByTestId`, `getByRole`, `getByLabel`, `getByPlaceholder`, then scoped text within a stable parent only when needed.
- Methods with arguments receive one destructured object argument.
- Method names describe the action: `click*`, `enter*`, `select*`, `toggle*`, `get*`, `check*`, `waitFor*`, `navigateTo*`.
- Test-created data uses the `[E2E]` prefix and a timestamp.

The full AI contract is in `AI_TEST_RULES.md`.

## Installation

```bash
npm install
npm run install:browsers
```

Set environment variables according to `.env.example`:

```bash
BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:3000
E2E_USERNAME=user@example.com
E2E_PASSWORD=password
```

## Running Tests

```bash
npm run e2e
npm run e2e:ui
npm run e2e:debug
npm run typescript
```

## How To Add A New Test

1. Add or choose a domain in `tests/e2e-specs/{domain}`.
2. Add a Page Object in `tests/page-objects/{domain}`.
3. If the screen has a modal, tabs, or larger UI fragments, move them to `sub-classes`.
4. Register the Page Object in `tests/utils/fixtures/playwright-fixtures.ts`.
5. Add test data in a local `data/` directory if it is used only by this spec.
6. In the spec, use `beforeAll` for data creation, `beforeEach` for Page Object navigation, and `afterAll` or the `cleanup` project for cleanup.

## Example Spec Style

```ts
import { expect, test } from "@Tests/utils/fixtures/playwright-fixtures";

test.describe("Feature name", async () => {
    test.beforeEach(async ({ featurePage }) => {
        await featurePage.navigateToFeature();
    });

    test("User can perform the main action", async ({ featurePage }) => {
        await test.step("Perform action", async () => {
            await featurePage.clickPrimaryButton();
        });

        await test.step("Check result", async () => {
            await expect(featurePage.resultRow).toBeVisible();
        });
    });
});
```

## Example Page Object Style

```ts
export class FeaturePage extends CommonPO {
    readonly primaryButton: Locator;

    constructor(page: Page) {
        super(page);

        this.primaryButton = page.getByRole("button", { name: "Primary action" });
    }

    async clickPrimaryButton() {
        await this.primaryButton.click();
    }
}
```

## What To Avoid

- Do not instantiate Page Objects directly in specs, except in auth setup.
- Do not mix multiple domains in one spec when they can be separated.
- Do not use `waitForTimeout` as the default synchronization strategy.
- Do not hide assertions in Page Objects if the test becomes harder to read. `check*` methods are useful for repeated assertion blocks.
