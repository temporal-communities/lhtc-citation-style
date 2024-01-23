# LHTC CSL Citation Style

This project implements the [Living Handbook of Temporal Communities](https://www.temporal-communities.de/research/digital-communities/projects/lhtc/)’ citation style.

## Setup

To install all dependencies, run `npm install`.

## Usage

To compile the CSL file, run `npm run build`.
The compiled CSL file will be located in the `dist` folder.

## Testing

Test cases are defined in `test/reference-strings.json`.
These strings are compared to the output of the CSL processor for the bibliography items in `test/export.json`.

The CSL export may be fetched automatically using `npm run test:fetch`.
Export an appropriately authorised API key as `ZOTERO_API_KEY` in `.env`.

### Running tests

Mocha is used for testing. To run the tests, run `npm run test`.
Alternatively, to display diffs inline, run `npm run test:inline`.

A verbose display of the full bibliography can be achieved by passing the `--verbose` flag to the test script, e. g. `npm run test -- --verbose`.

### Adding tests

`test/export.json` contains the bibliography items to be tested.

A matching reference string referencing the bibliography item’s `id` must be added to `test/reference-strings.json`.

## Licence

> The LHTC CSL Style (i.e. `src/lhtc.csl` and its builds) is adapted from [chicago-author-date.csl](https://github.com/citation-style-language/styles/blob/master/chicago-author-date.csl) by Julian Onions et al., used under CC BY-SA 3.0.
> The LHTC CSL Style is licensed under CC BY-SA 4.0 by its authors.
