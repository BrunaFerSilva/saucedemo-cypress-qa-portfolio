# SauceDemo E2E Test Automation — Cypress + Page Object Model

End-to-end test automation suite for [SauceDemo](https://www.saucedemo.com), covering
login, product inventory, cart, and checkout flows. Built with **Cypress**, following
the **Page Object Model**, with dynamic test data, CI/CD integration via GitHub
Actions, and linting with ESLint. Also includes a standalone **API testing suite**
(Vitest + Supertest) and an example of combining API and UI testing in a single flow.

## What this project demonstrates

- **Page Object Model (POM)** — selectors and page interactions are isolated from test logic
- **Business logic assertions** — e.g. validating that a sorted product list is
  mathematically ordered, or that a checkout total equals subtotal + tax, not just
  checking that text is visible
- **API testing** — covering GET, POST, PATCH, and DELETE against a REST API, including
  relationship integrity between resources and documenting the behavior of a fake API
  with incomplete data
- **API + UI integration** — using `cy.request()` as a fast pre-condition check before
  running a full UI flow
- **CI/CD pipeline** with GitHub Actions — lint + full test suite run automatically on every push
- **ESLint** — enforcing consistent code style
- **21 automated UI test cases** across 4 test suites (Login, Inventory, Cart, Checkout),
  plus **8 API test cases** across 2 test suites (Users, Posts)

## Tech stack

| Tool | Purpose |
|---|---|
| [Cypress](https://www.cypress.io/) | E2E test framework |
| [Vitest](https://vitest.dev/) | API test runner |
| [Supertest](https://github.com/ladjs/supertest) | HTTP assertions for API tests |
| ESLint | Code style and consistency |
| GitHub Actions | CI/CD pipeline |

## Project structure
```
├── cypress/
│ ├── e2e/ # Test specs (login, inventory, cart, checkout, api-support)
│ ├── fixtures/ # Test data (SauceDemo test users)
│ ├── pageObjects/ # Page Object classes (one per page/flow)
│ └── support/
├── api-tests/
│ └── tests/
│ ├── users.test.js # /users endpoint tests
│ └── posts.test.js # /posts endpoint tests (+ /comments relationship)
├── docs/
│ ├── test-plan.md
│ ├── test-cases.md
│ └── bug-report.md
├── .github/workflows/ # CI/CD pipeline
├── cypress.config.js
├── eslint.config.js
└── package.json
```
## How to run locally

```bash
npm install
npm run cy:open      # interactive mode
npm run cy:run       # headless mode (like CI)
npm run test:api     # API test suite (Vitest)
npm run lint          # run ESLint
```

## Test credentials (public, provided by SauceDemo)

| Username | Password | Purpose |
|---|---|---|
| `standard_user` | `secret_sauce` | Happy path |
| `locked_out_user` | `secret_sauce` | Blocked user validation |

## What's covered

### UI (Cypress)

- **Login:** valid/invalid credentials, locked out user, empty field validation
- **Inventory:** product listing, sorting (price asc/desc), adding/removing from cart
- **Cart:** adding/removing products, navigation, checkout entry point
- **Checkout:** full purchase flow, required field validation, total calculation

See [`docs/test-cases.md`](./docs/test-cases.md) for the full mapping between manual
test cases and automated coverage.

### API (Vitest + Supertest)

Suite against the public [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API:

- **Users:** list retrieval, single resource lookup, 404 handling for non-existent resources
- **Posts:** nested resource relationships (`/posts/:id/comments`), create (POST), partial
  update (PATCH), delete (DELETE), and behavior with incomplete request data

### API + UI Integration

`cypress/e2e/api-support.cy.js` demonstrates using `cy.request()` as a fast pre-condition
check before running a full UI flow — separating test *setup* (API) from *behavior
verification* (UI). If the API check fails, the browser never opens, saving execution
time in CI/CD pipelines.

## Continuous Integration

Every push and pull request to `main` triggers a GitHub Actions workflow that installs
dependencies, runs ESLint, and runs the full Cypress suite in headless mode.

---

*Built for learning and portfolio purposes. SauceDemo is a public demo application
maintained independently, intended specifically for test automation practice.
API tests run against JSONPlaceholder, a free fake API for testing and prototyping.*