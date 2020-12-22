import File from './file.js';
import {
    folderExists,
    getFileName
} from './fs.js';
import {
    execSync
} from 'child_process';
import path from 'path';
import {
    platform
} from 'process';

/**
 * Converter
 */
class Converter {
    /**
     * Define the files array
     */
    constructor() {
        this.files = [];
        this.output = null;
        this.customConverter = null;
    }

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
     * Set the custom converter.
     *
     * @param {string} converter
     */
    setConverter(converter) {
        if (!converter) {
            return;
        }

        if (converter.constructor !== String) {
            throw new Error('Converter should be a string');
        }

        this.customConverter = converter;
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
     * Set the files
     *
     * @param {array} files
     */
    setFiles(files) {
        if (!files || files.constructor !== Array) {
            throw new Error('Files should be a array');
        }

        this.files = files.map((file) => File.create({
            filePath: file
        }));
    }

    /**
     * Set the output path
     *
     * @param {string} output
     */
    setOutput(output) {
        if (!output || output.constructor !== String) {
            throw new Error('Output should be a string');
        }

        if (!folderExists(output)) {
            throw new Error('Output folder doesnt exists');
        }

        this.output = output;
    }

    /**
     * Get the exec path
     *
     * @param {string} filePath
     *
     * @return {string}
     */
    getExecPath(filePath) {
        return this.converter + ' \'' + this.output + '\' \'' + filePath + '\'';
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
     * Convert ppt files to pdf files.
     *
     * @return {array}
     */
    convertPptToPdf() {
        return this.files.map((file) => {
            const fileName = getFileName(file.path);
            const output = execSync(this.getExecPath(file.path));

            return {
                file,
                fileName,
                output,
                pdf: this.getPdfFile(fileName)
            };
        });
    }

    /**
     * Create the converter
     *
     * @param {array} files
     * @param {string} output
     * @param {string} customConverter
     *
     * @return {object}
     */
    static create({
        files,
        output,
        customConverter
    }) {
        const converter = new Converter();

        converter.setFiles(files);
        converter.setOutput(output);
        converter.setConverter(customConverter);

        return converter;
    }
}

export default Converter;
