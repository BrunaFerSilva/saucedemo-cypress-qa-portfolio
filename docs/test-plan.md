# Test Plan — SauceDemo E2E Automation

## 1. Objective
Validate the core user flows of the SauceDemo web application
(https://www.saucedemo.com), covering authentication, product browsing, cart
management, and checkout, using automated end-to-end tests.

## 2. Scope

### In scope
- Login (valid credentials, locked out user, invalid credentials, empty fields)
- Inventory page (product listing, sorting, adding to cart)
- Cart (adding/removing items, navigation)
- Checkout (happy path, field validation, total calculation)

### Out of scope
- Performance/load testing
- Cross-browser visual regression testing
- Mobile responsiveness

## 3. Test Approach
- **Tool:** Cypress (JavaScript)
- **Design pattern:** Page Object Model (POM) — selectors and page interactions
  are isolated from test logic
- **Test data:** static fixtures (fixed users provided by SauceDemo)
- **CI/CD:** tests run automatically on every push and pull request via GitHub Actions

## 4. Environment
| Item | Detail |
|---|---|
| Application under test | https://www.saucedemo.com |
| Browser | Electron (default, via Cypress) |
| Test framework | Cypress 15.x |

## 5. Entry Criteria
- Application is accessible and responding (no outage)
- Test environment/fixtures are available

## 6. Exit Criteria
- All planned test cases have been executed
- No open Critical or High severity defects remain unaddressed
- CI pipeline passes on the main branch

## 7. Risks & Assumptions
- SauceDemo is a public demo application; its behavior is assumed stable, but
  any change to selectors or flows by its maintainers could break tests
  (mitigated by using `data-test` attributes, which are more stable than CSS classes)
- Some SauceDemo users (e.g. `locked_out_user`) are intentionally restricted to
  simulate real-world scenarios; this is expected behavior, not a defect

## 8. Deliverables
- Automated test suite (this repository)
- Test case documentation (`test-cases.md`)
- Bug report example (`bug-report.md`)