# @hckrnews/ppt2pdf
Convert ppt to pdf.

If you want convert powerpoint files to pdf, you can do it with this script.

## Requirements

The package requires the following software to be installed:

* LibreOffice

## Installation

    npm install @hckrnews/ppt2pdf

Debian/Ubuntu:

    sudo apt install libreoffice

## Example usage

```
import Converter from '../src/converter.js';

const converter = Converter.create({
    file:   'test/OPW 733 Tienduizend redenen.ppt',
    output: 'output/'
});

const result = converter.convertPptToPdf();
```

## Props

file: path to the file.

output: Output folder.

customConverter: set a custom converter


## Test the package.

```
npm test
```

This will run all the tests in the test folder with mocha.

If you only want to check the eslint rules, just run.

```
npm run lint
```
