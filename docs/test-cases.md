# Test Cases — SauceDemo E2E Automation

## Login

| ID | Title | Steps | Expected Result | Automated |
|---|---|---|---|---|
| LOGIN-01 | Valid user logs in successfully | 1. Enter valid username/password 2. Click Login | User is redirected to `/inventory.html` | ✅ |
| LOGIN-02 | Locked out user is blocked | 1. Enter `locked_out_user` credentials 2. Click Login | Error message "this user has been locked out" is shown | ✅ |
| LOGIN-03 | Invalid credentials are rejected | 1. Enter non-existent username/password 2. Click Login | Error message "do not match" is shown | ✅ |
| LOGIN-04 | Empty fields are rejected | 1. Leave both fields empty 2. Click Login | Error message "Username is required" is shown | ✅ |

## Inventory

| ID | Title | Steps | Expected Result | Automated |
|---|---|---|---|---|
| INV-01 | Products page title is displayed | 1. Land on inventory page | Title shows "Products" | ✅ |
| INV-02 | Add single product to cart | 1. Click "Add to cart" on one product | Cart badge shows "1" | ✅ |
| INV-03 | All 6 products are displayed | 1. Land on inventory page | 6 products are visible | ✅ |
| INV-04 | Add multiple products to cart | 1. Add 3 different products | Cart badge shows "3" | ✅ |
| INV-05 | Remove product directly from inventory | 1. Add product 2. Click same button again (now "Remove") | Cart badge disappears | ✅ |
| INV-06 | Sort products price low to high | 1. Select "Price (low to high)" | Product list is ordered ascending by price | ✅ |
| INV-07 | Sort products price high to low | 1. Select "Price (high to low)" | Product list is ordered descending by price | ✅ |

## Cart

| ID | Title | Steps | Expected Result | Automated |
|---|---|---|---|---|
| CART-01 | Added products appear in cart | 1. Add 2 products 2. Go to cart | Cart shows 2 items | ✅ |
| CART-02 | Remove product from cart | 1. Add 2 products 2. Remove one from cart | Cart shows 1 item remaining | ✅ |
| CART-03 | Continue shopping returns to inventory | 1. Click "Continue Shopping" | User is redirected to `/inventory.html` | ✅ |
| CART-04 | Checkout is reachable with items in cart | 1. Click "Checkout" | User is redirected to `/checkout-step-one.html` | ✅ |

## Checkout

| ID | Title | Steps | Expected Result | Automated |
|---|---|---|---|---|
| CHK-01 | Proceeds to next step with valid information | 1. Fill first name, last name, postal code 2. Click Continue | User is redirected to `/checkout-step-two.html` | ✅ |
| CHK-02 | Total is calculated correctly | 1. Complete checkout step one | Total equals Item total + Tax | ✅ |
| CHK-03 | Purchase completes successfully | 1. Fill information 2. Click Continue 3. Click Finish | User is redirected to `/checkout-complete.html` | ✅ |
| CHK-04 | Checkout blocks missing first name | 1. Leave First Name empty 2. Click Continue | Error message "First Name is required" is shown | ✅ |
| CHK-05 | Checkout blocks missing last name | 1. Leave Last Name empty 2. Click Continue | Error message "Last Name is required" is shown | ✅ |
| CHK-06 | Checkout blocks missing postal code | 1. Leave Postal Code empty 2. Click Continue | Error message "Postal Code is required" is shown | ✅ |