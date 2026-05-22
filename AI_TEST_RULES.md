# AI Test Generation Rules

This file is the contract for AI agents generating tests in this boilerplate. It takes precedence over the model's default style preferences.

## Source Of Truth

Use this boilerplate structure as the reference:

- `tests/e2e-specs/{domain}/{feature}.spec.ts`
- `tests/page-objects/{domain}/{feature}.po.ts`
- `tests/page-objects/common`
- `tests/utils/fixtures/playwright-fixtures.ts`
- `tests/utils/managers/ApiManager.ts`
- `tests/utils/services`
- `tests/utils/types`
- `tests/utils/test-data.ts`

## Spec Files

- Every spec imports `test` and `expect` from `@Tests/utils/fixtures/playwright-fixtures`.
- Spec file names are kebab-case and end with `.spec.ts`.
- `test.describe` describes the business area or user flow.
- `beforeAll` is used to seed data through API helpers or prepare shared state.
- `beforeEach` is used for navigation and context selection through Page Object methods.
- `afterAll` or the `cleanup` project is used to remove test data.
- Split longer tests into `test.step` blocks.
- Keep assertions explicit in the spec unless a repeated assertion block is extracted as a `check*` Page Object method.
- Keep spec-specific data in a local `data/` directory next to the spec.

## Page Objects

- A Page Object represents a page, tab, modal, or reusable UI fragment.
- Page Object files use the `.po.ts` suffix.
- Page Object classes extend `CommonPO`, unless they are very small composable fragments.
- Define locators as `readonly` class fields.
- Initialize locators in the constructor.
- Do not perform actions in constructors.
- Add modals and larger UI fragments as nested Page Objects.
- Put shared UI fragments in `tests/page-objects/common/sub-classes`.
- Use `composePO` when one Page Object should combine multiple reusable fragments.
- Keep page-level navigation methods on the Page Object, for example `navigateToDashboards`.
- If the app has shared navigation, expose it from `CommonPO` and use it from page-specific navigation methods.

## Locators

Use selectors in this order:

1. `getByTestId`
2. `getByRole`
3. `getByLabel`
4. `getByPlaceholder`
5. scoped text within a stable parent

Rules:

- Prefer semantic selectors and stable test IDs.
- Scope locators to tables, rows, cards, and modals.
- For tables, create `getRowBy...` methods.
- Do not use CSS selectors.
- Do not use text as the only selector when a stable `data-testid` or role is available.
- When selecting by visible text or accessible name, add `exact: true` whenever possible.

## Method Naming

Name methods after the action they perform:

- `clickNewDashboardButton`
- `enterName`
- `selectType`
- `toggleAdvancedSettings`
- `getDashboardRowByName`
- `checkDashboardRow`
- `waitForContentLoaded`
- `navigateToDashboard`

Every method or function with arguments must receive one destructured object argument.

Correct:

```ts
async enterName({ name }: { name: string }) {
    await this.nameInput.fill(name);
}
```

Incorrect:

```ts
async enterName(name: string) {
    await this.nameInput.fill(name);
}
```

Methods without arguments may omit parameters.

## Test Data

- Prefix data created by tests with `[E2E]`.
- Use a timestamp to distinguish data created locally and in CI.
- Do not assume a project-specific `RUN_ID`; that is usually an application-specific detail.
- Prefer API setup over long UI setup flows.
- The UI should test user behavior, not build every expensive precondition.
- Keep seed data used by one flow next to the spec in `data/`.
- Keep data shared by multiple domains in `tests/utils`.

## API Manager

- The first main task for an AI agent in a new project is to establish a reliable connection to the database or backend API so tests can perform CRUD operations for state generation and cleanup.
- `ApiManager` in this boilerplate is illustrative.
- In real projects, its implementation will likely depend heavily on the backend, API client, authentication, and data model.
- Services in `tests/utils/services` are also examples of a thin API layer, similar to generated or project-specific service clients.
- Types in `tests/utils/types` are illustrative; in real projects they will usually come from the app or generated API client.
- Preserve the e2e structure: seed data outside the UI, keep API helpers in `tests/utils/managers`, and use them in `beforeAll`/`afterAll`.
- Do not copy example endpoints without adapting them to the target project.

## Assertions

- Assertions should verify the business result, not just the absence of errors.
- After a saving action, verify the persisted result after reloading the page: table text, status, URL, toast, or field state.
- Do not assert implementation details unless they are visible to the user.
- `check*` Page Object methods are acceptable for repeated and stable assertion blocks.

## Synchronization

- Use Playwright auto-waiting.
- Use `waitForContentLoaded` only for global application loaders.
- Avoid `waitForTimeout`.
- If waiting for a request is necessary, use `page.waitForResponse` with a precise predicate.

## Comments

- Write comments only when they explain intent, not obvious code.
- Start every code comment with a lowercase letter.

## Adding New Page Object Fixture

1. Create `tests/page-objects/{domain}/{feature}.po.ts`.
2. Add the class to `tests/utils/fixtures/playwright-fixtures.ts`.
3. Add the fixture type to `PlaywrightFixtures`.
4. Use the fixture from the test callback.

Example:

```ts
type PlaywrightFixtures = {
    featurePage: FeaturePage;
};

export const test = base.extend<PlaywrightFixtures>({
    featurePage: async ({ page }, use) => {
        await use(new FeaturePage(page));
    },
});
```

## Review Checklist

Before finishing, verify that:

- the spec imports `test` and `expect` from the project fixture
- new methods with arguments use destructured object arguments
- locators live in Page Objects, not specs
- the test has stable setup and cleanup
- local data lives in `data/`
- there is no `test.only`
- there is no `waitForTimeout`
- code comments start with a lowercase letter
