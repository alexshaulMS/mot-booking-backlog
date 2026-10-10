# MOT booking backlog

A deliberately plain MOT booking page, used as a workshop demo of the GitHub Copilot cloud agent working through a backlog of feature requests, each as its own issue and pull request. All data is made up.

## Run it

```
npm start
```

Then open http://localhost:8080. Run the tests with `npm test`.

## Layout

- `index.html`: the page. A booking form and an empty `#app` area that features mount into.
- `src/main.mjs`: handles the form and mounts features.
- `src/features.mjs`: eight numbered slots, one per feature, so features can be developed in parallel.
- `.github/copilot-instructions.md`: the house rules for Copilot.
