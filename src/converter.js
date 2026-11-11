import path from 'node:path'
import { platform } from 'node:process'
import { Converter, getFileName } from '@hckrnews/converter'

/**
 * @typedef {import('@hckrnews/converter').Converter} ConverterObject
 * @typedef {object} Ppt2PdfConverterSpecificObject
 * @property {string} pdf
 * @property {string} converterForLinux
 * @typedef {ConverterObject & Ppt2PdfConverterSpecificObject} Ppt2PdfConverterObject
 */
/**
 * Converter
 */
class Ppt2PdfConverter extends Converter {
  /**
   * Get the converter.
   * @returns {string}
   */
  get converter () {
    const converters = {
      darwin: this.converterForMac,
      win32: this.converterForWindows,
      default: this.converterForLinux
    }

    if (this.customConverter) {
      return this.customConverter
    }

    if (converters[platform]) {
      return converters[platform]
    }

    return converters.default
  }

  /**
   * Get the converter binary for Linux.
   * @returns {string}
   */
  get converterForLinux () {
    return 'libreoffice'
  }

  /**
   * Get the converter binary for Mac.
   * @returns {string}
   */
  get converterForMac () {
    return '/Applications/LibreOffice.app/Contents/MacOS/soffice'
  }

  /**
   * Get the converter binary for Windows.
   * @returns {string}
   */
  get converterForWindows () {
    return 'soffice.exe'
  }

  /**
   * Get the LibreOffice convert-to filter.
   * @returns {string}
   */
  get convertTo () {
    return platform === 'win32' ? 'pdf:writer_pdf_Export' : 'pdf'
  }

  /**
   * Get the arguments passed to the converter binary.
   * @returns {string[]}
   */
  get args () {
    return [
      '--headless',
      '--convert-to',
      this.convertTo,
      '--outdir',
      path.resolve(this.output),
      path.resolve(this.oldFile.path)
    ]
  }

  /**
   * Get the pdf file path.
   * @param {string} fileName
   * @returns {string}
   */
  getPdfFile (fileName) {
    return `${this.output + path.parse(fileName).name}.pdf`
  }

  /**
   * Get the pdf filename.
   * @returns {string}
   */
  get pdf () {
    const fileName = getFileName(this.oldFile.path)

    return this.getPdfFile(fileName)
  }

  /**
   * Create the converter
   * @param {object} params
   * @param {string} params.file
   * @param {string} params.output
   * @param {string=} params.customConverter
   * @param {boolean=} params.sync
   * @returns {Ppt2PdfConverterObject}
   */
  static create ({ file, output, customConverter, sync = true }) {
    const converter = new Ppt2PdfConverter()

    converter.setSync(sync)
    converter.setFile(file)
    converter.setOutput(output)
    converter.setConverter(customConverter)

    return converter
  }
}

export default Ppt2PdfConverter
