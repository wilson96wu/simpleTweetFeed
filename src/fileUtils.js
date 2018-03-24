/**
 * Created by WilsonW on 3/23/2018.
 */
/**
 * AMD, CommonJS, Global compatible Script Wrapper
 * https://github.com/umdjs/umd
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
        /* istanbul ignore next */
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.fileUtils = factory();
    }
}(this, function () {

    const CRLF = '\r\n';
    const LF = '\n';
    /**
     * read file synchronous
     ** @param fileName - the name of the text file
     */
    return {
        readFile: function (fileName, fileSystem) {
            if (fileName.split('.').pop().toLowerCase() !== 'txt') {
                throw new Error('Wrong file type!');
            }
            var txt = fileSystem.readFileSync(fileName, 'utf-8');
            var lineSeparator = txt.indexOf(CRLF) > -1 ? CRLF : LF;
            var data = txt.split(lineSeparator).filter(Boolean);
            return data;
        }
    };
    //return fileUtils;
}));