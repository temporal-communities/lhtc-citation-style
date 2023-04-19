# LHTC CSL Citation Style

This project implements the [Living Handbook of Temporal Communities](https://www.temporal-communities.de/research/digital-communities/projects/lhtc/index.html)’ citation style.

### Title translation notes

This style allows users to supply a title translation for items.
To use this feature, add a property named `title-[lang]` to the bibliography item, where `[lang]` corresponds to the translation’s two-letter language code, e. g. `title-en` for an English translation of a Korean title.

The following variables are supported:

- `title-[lang]` for titles
- `collection-title-[lang]` for collection titles, e. g. a book chapter’s book title

> **Note:** This is a workaround not officially supported by the CSL specification.
> The style will therefore fail to validate against the [CSL schema](https://validator.citationstyles.org).
> Any warnings regarding this property can be ignored.

## Installation

To install all dependencies, run `npm install`.

## Usage

To compile the CSL file, run `npm run build`.
The compiled CSL files for all locales will be located in the `dist` folder.

## Testing

Test cases are defined in `test/reference-strings.json`.
These strings are compared to the output of the CSL processor for the bibliography items in `test/export.json`.

### Running tests

Mocha is used for testing. To run the tests, run `npm run test`.
Alternatively, to display diffs inline, run `npm run test:inline`.

A verbose display of the full bibliography can be achived by passing the `--verbose` flag to the test script, e. g. `npm run test -- --verbose`.

### Adding tests

`test/export.json` contains the bibliography items to be tested.
These must be exported from Zotero using the `Better CSL JSON` output format provided by [Better BibTeX](https://retorque.re/zotero-better-bibtex/).
A matching reference string referencing the bibliography item’s `id` must be added to `test/reference-strings.json`.

## Licence

> The LHTC CSL Style (i. e. `src/lhtc.csl` and its builds) is adapted from [chicago-author-date.csl](https://github.com/citation-style-language/styles/blob/master/chicago-author-date.csl) by Julian Onions et al., used under CC BY-SA 3.0.
> The LHTC CSL Style is licensed under CC BY-SA 4.0 by Viktor J. Illmer and Rebecca Hardie.
