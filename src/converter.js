import path from 'path';
import {
    platform
} from 'process';
import {
    Converter,
    getFileName
} from '@hckrnews/converter';

/**
 * Converter
 */
class Ppt2PdfConverter extends Converter {
    /**
     * Get the converter.
     *
     * @return {string}
     */
    get converter() {
        const converters = {
            darwin:  this.converterForMac,
            win32:   this.converterForWindows,
            default: this.converterForLinux
        };

        if (this.customConverter) {
            return this.customConverter;
        }

        if (converters[platform]) {
            return converters[platform];
        }

        return converters.default;
    }

    /**
     * Get the converter for Linux.
     *
     * @return {string}
     */
    get converterForLinux() {
        return 'libreoffice --headless --convert-to pdf --outdir';
    }

    /**
     * Get the converter for Mac.
     *
     * @return {string}
     */
    get converterForMac() {
        const sOfficeMac = '/Applications/LibreOffice.app/Contents/MacOS/soffice';

        return sOfficeMac + ' --headless --convert-to pdf --outdir';
    }

    /**
     * Get the converter for Mac.
     *
     * @return {strring}
     */
    get converterForWindows() {
        return 'soffice.exe --headless --convert-to pdf:writer_pdf_Export --outdir';
    }

    /**
     * Get the exec path
     *
     * @return {string}
     */
    get execPath() {
        return this.converter + ' "' + this.output + '" "' + this.oldFile.path + '"';
    }

    /**
     * Get the pdf file path.
     *
     * @param {string} fileName
     *
     * @return {string}
     */
    getPdfFile(fileName) {
        return this.output + path.parse(fileName).name + '.pdf';
    }

    /**
     * Get the pdf filename.
     */
    get pdf() {
        const fileName = getFileName(this.oldFile.path);

        return this.getPdfFile(fileName);
    }

    /**
     * Create the converter
     *
     * @param {string} file
     * @param {string} output
     * @param {string} customConverter
     *
     * @return {object}
     */
    static create({
        file,
        output,
        customConverter
    }) {
        const converter = new Ppt2PdfConverter();

        converter.setFile(file);
        converter.setOutput(output);
        converter.setConverter(customConverter);

        return converter;
    }
}

export default Ppt2PdfConverter;
