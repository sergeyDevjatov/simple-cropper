import Template from './template/template';


export default class App {

    private element: Element;

    constructor(selector: string) {
        const element = document.querySelector(selector);
        if(element === null) {
            throw new Error('Element ' + selector + ' is undefined.');
        }
        this.element = element;

        this.render();
    }

    private classSelector(className: string): Element | null {
        return this.classSelectorAll(className)[0];
    }

    private classSelectorAll(className: string): HTMLCollectionOf<Element> {
        const obfuscatedClassName = Template.styles[className] || className;
        return this.element.getElementsByClassName(obfuscatedClassName);
    }

    private render(): void {
        this.element.innerHTML = Template.template;
    }

    set source(source: string) {
        const imageElement = this.classSelector('cropper__image');
        if(imageElement !== null) {
            imageElement.setAttribute('src', source);
        }
    }
}
