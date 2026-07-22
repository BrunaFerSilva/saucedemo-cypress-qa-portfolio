# Bug Report — Incorrect Product Images for `problem_user`

**Title:** All product images display the same incorrect image when logged in as `problem_user`

**Environment:**
- Application: SauceDemo (https://www.saucedemo.com)
- Browser: Chrome
- User account used: `problem_user`
- Date found: 2026-07-22

**Severity:** Medium

**Priority:** Medium

**Preconditions:**
- User has valid credentials for `problem_user` (password: `secret_sauce`)

**Steps to Reproduce:**
1. Go to https://www.saucedemo.com
2. Log in with username `problem_user` and password `secret_sauce`
3. Observe the product images on the Inventory page (`/inventory.html`)

**Expected Result:**
Each product should display its own distinct image, matching its name and description
(e.g. a backpack image for "Sauce Labs Backpack", a bike light image for "Sauce Labs
Bike Light", etc.).

**Actual Result:**
All 6 products display the exact same image (a dog holding a tennis ball), regardless
of which product they represent.

**Evidence:**
See `evidence-problem-user-images.png` in this folder.

**Additional Notes:**
This behavior does not occur with `standard_user`, where each product displays its own
correct image. This appears to be an intentionally seeded defect on SauceDemo's
`problem_user` account, used to let QAs practice bug identification and reporting —
it is not a defect in this project's automation. Confirmed manually through direct
exploration, independent of the automated test suite.