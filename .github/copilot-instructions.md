# House rules

- Language: modern JavaScript as ES modules (`.mjs`). UK English in all text and comments.
- No dependencies and no build step. Use only browser APIs and Node's built-in modules.
- Test with `npm test` (Node's built-in test runner). Run it before finishing and state the result in the pull request.
- Keep logic pure and testable in `logic.mjs`. Keep browser code (DOM) in `view.mjs`. Inject anything environmental, such as storage or the clock, so tests do not need a browser.
- Each feature lives in its own folder, `src/<feature-name>/`, with `logic.mjs`, `logic.test.mjs` and `view.mjs`. The view's default export is `mount(root)`.
- Register a feature by editing only its own numbered slot in `src/features.mjs`. Do not edit another slot, `index.html`, `src/main.mjs`, `src/booking.mjs`, `README.md` or `package.json`.
- Features talk to the page through the DOM and the `booking-submitted` event, never by editing each other's files.
- All fees, centres and dates in this project are made-up example data. Say so wherever they appear. No real people, no real registrations.
- The pull request says what changed, what you ran and what you did not verify.
