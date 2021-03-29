export class Template {
  constructor() {
    this.templates = this.findAndCompileTemplates();
    this.tagTemplator = this.templates.tagTemplator;
    this.contactTemplator = this.templates.contactTemplator;
    this.editContactTemplator = this.templates.editContactTemplator;
  }
  findAndCompileTemplates() {
    let templates = {};
    let scripts = [...document.querySelectorAll("script[id$='templator']")];
    let names = ['tagTemplator', 'contactTemplator', 'editContactTemplator'];
    scripts.forEach((temp, idx) => {
      templates[names[idx]] = Handlebars.compile(temp.innerHTML);
    });
    return templates;
  }
}