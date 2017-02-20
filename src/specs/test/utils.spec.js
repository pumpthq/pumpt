require('jasmine-co').install();
import {
    formatUrl
} from './../../utils';

const expect = chai.expect;

describe('Utils methods', () => {
    describe('Formatters', () => {
        describe('URL formatter', () => {
            it('HTTP link', () => {
                let source = 'http://www.softwear.finance';
                let expected = {
                    url: 'http://www.softwear.finance',
                    displayAs: 'www.softwear.finance'
                };

                let returned = formatUrl(source);
                console.log(returned);
                expect(returned).to.be.an('object');
                expect(returned).to.deep.equal(expected);
            });

            it('HTTPS link', () => {
                let source = 'https://www.softwear.finance';
                let expected = {
                    url: 'https://www.softwear.finance',
                    displayAs: 'www.softwear.finance'
                };

                let returned = formatUrl(source);

                expect(returned).to.be.an('object');
                expect(returned).to.deep.equal(expected);
            });

            it('Link without any protocol and without "www"', () => {
                let source = 'softwear.finance';
                let expected = {
                    url: 'http://softwear.finance',
                    displayAs: 'softwear.finance'
                };

                let returned = formatUrl(source);

                expect(returned).to.be.an('object');
                expect(returned).to.deep.equal(expected);
            });

            it('Link without any protocol and with "www"', () => {
                let source = 'www.softwear.finance';
                let expected = {
                    url: 'http://www.softwear.finance',
                    displayAs: 'www.softwear.finance'
                };

                let returned = formatUrl(source);

                expect(returned).to.be.an('object');
                expect(returned).to.deep.equal(expected);
            });

            it('Starting with "@" string', () => {
                let source = '@softwearfinance';
                let expected = {
                    url: 'https://twitter.com/softwearfinance',
                    displayAs: '@softwearfinance'
                };

                let returned = formatUrl(source);

                expect(returned).to.be.an('object');
                expect(returned).to.deep.equal(expected);
            });

            it('Forced twitter handler and string with "@"', () => {
                let source = '@softwearfinance';
                let expected = {
                    url: 'https://twitter.com/softwearfinance',
                    displayAs: '@softwearfinance'
                };

                let returned = formatUrl(source, true);

                expect(returned).to.be.an('object');
                expect(returned).to.deep.equal(expected);
            });

            it('Forced twitter handler and string without "@"', () => {
                let source = 'softwearfinance';
                let expected = {
                    url: 'https://twitter.com/softwearfinance',
                    displayAs: '@softwearfinance'
                };

                let returned = formatUrl(source, true);

                expect(returned).to.be.an('object');
                expect(returned).to.deep.equal(expected);
            });

            it('Correct object on empty string', () => {
                let source = '';
                let expected = {
                    url: '',
                    displayAs: ''
                };

                let returned = formatUrl(source);

                expect(returned).to.be.an('object');
                expect(returned).to.deep.equal(expected);
            });

            it('Correct object on Object', () => {
                let source = {};
                let expected = {
                    url: '',
                    displayAs: ''
                };

                let returned = formatUrl(source);

                expect(returned).to.be.an('object');
                expect(returned).to.deep.equal(expected);
            });

            it('Correct object on Array', () => {
                let source = [];
                let expected = {
                    url: '',
                    displayAs: ''
                };

                let returned = formatUrl(source);

                expect(returned).to.be.an('object');
                expect(returned).to.deep.equal(expected);
            });

            it('Correct object on Undefined', () => {
                let expected = {
                    url: '',
                    displayAs: ''
                };

                let returned = formatUrl();

                expect(returned).to.be.an('object');
                expect(returned).to.deep.equal(expected);
            });
        });
    });
});