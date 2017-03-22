export const formatUrl = (sourceUrl, isStringTwitterHandler = false) => {
    let returned = {
        url: '',
        displayAs: ''
    };

    if(sourceUrl) {
        if(typeof sourceUrl === 'string') {
            if(sourceUrl.indexOf('@') === 0) {                                         // Twitter handle passed
                returned.url = 'https://twitter.com/' + sourceUrl.substring(1);
                returned.displayAs = sourceUrl;
            } else if(isStringTwitterHandler) {
                if(sourceUrl.indexOf('@') === 0) {                                         // Twitter handle passed
                    returned.url = 'https://twitter.com/' + sourceUrl.substring(1);
                    returned.displayAs = sourceUrl;
                } else {
                    returned.url = 'https://twitter.com/' + sourceUrl;
                    returned.displayAs = '@' +sourceUrl;
                }
            } else {
                if(sourceUrl.indexOf('http://') !== -1) {
                    returned.url = sourceUrl;
                    returned.displayAs = sourceUrl.substring(7);
                } else if(sourceUrl.indexOf('https://') !== -1) {
                    returned.url = sourceUrl;
                    returned.displayAs = sourceUrl.substring(8);
                } else {
                    returned.url = 'http://' + sourceUrl;
                    returned.displayAs = sourceUrl;
                }
            }
        }
    }

    return returned;
};