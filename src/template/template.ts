// @ts-ignore
import styles from './template.css?module';
// @ts-ignore
import template from './template.html';


function replaceClassNamesWithLocals(processedTemplate: string): string {
    let resultTemplate = processedTemplate;
    for (const className in styles) {
        if (styles.hasOwnProperty(className)) {
            const normalizedClassName = className.replace(/["' ]/, '');
            if(normalizedClassName) {
                const regexp = new RegExp(`(['" ]|class=)(${normalizedClassName})(['" >])`, 'g');
                const newClassName = styles[className];
                resultTemplate = resultTemplate.replace(regexp, `$1${newClassName}$3`);
            }
        }
    }
    return resultTemplate;
}

const preparedTemplate: string = replaceClassNamesWithLocals(template);


export default {
    styles,
    template: preparedTemplate,
};
