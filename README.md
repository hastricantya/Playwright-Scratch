🧪 Playwright TypeScript Automation - SauceDemo

This project is an end-to-end automation testing framework using Playwright with TypeScript, implementing the Page Object Model (POM) design pattern. The test target is the demo e-commerce website SauceDemo.

🚀 Tech Stack
- Playwright (End-to-End Testing Framework)
- TypeScript
- Node.js
- Page Object Model (POM)
- GitHub Actions (CI/CD)
- SauceDemo (Demo Web Application)
  
📌 Project Objective
This framework is built to demonstrate:
- Scalable automation framework using Page Object Model
- Clean separation of test logic, page objects, and test data
- Reliable end-to-end testing for critical user flows
- CI/CD integration using GitHub Actions
- Maintainable and reusable automation structure

🧠 Page Object Model (POM)
Each page contains locators and reusable actions to ensure:
- Better maintainability
- Code reusability
- Cleaner test structure

📊 Test Data Management
This framework uses separated test data files to improve maintainability and scalability.
Why separated test data?
- Avoid hardcoded values inside tests
- Easier maintenance when data changes
- Reusable across multiple test cases
- Cleaner and more readable test scripts

🧪 Test Coverage
🔐 Login Flow
- Valid login (positive case)
- Invalid login (negative case)
- Locked-out user validation
- Error message assertion
🛒 Checkout Flow (E2E)
- Login with valid user
- Add product to cart
- Verify cart items
- Complete checkout process
- Validate order success message
- Invalid postal Code
- Verify total amount & tax
  
⚙️ CI/CD Pipeline (GitHub Actions)
Automated CI/CD is implemented using GitHub Actions.
Features:
- Trigger on push and pull request
- Install dependencies
- Install Playwright browsers
- Run full test suite
- Upload test reports as artifacts

📊 Test Report
Playwright generates an HTML report after execution.
Run locally:
npx playwright show-report
In CI/CD:
Report is uploaded as GitHub Actions artifact for traceability
