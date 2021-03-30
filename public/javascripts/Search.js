import { Template } from './Template.js';

export class Search {
  constructor() {
    this.searchStr = '';
    this.selectedTags = [];
    this.tagTemplator = new Template().tagTemplator;
    this.bind();
  }

  bind() {
    this.tagSearchDisplay = document.querySelector('#tag-search-display');
    this.searchField = document.querySelector("#search");
    this.searchByTag = document.querySelector(".search-by-tag");
  }

  selectTag(tag) {
    this.selectedTags.push(tag.value);
    tag.setAttribute('checked', true);
  }

  deselectTag(tag) {
    this.removeTag(tag.value);
    tag.removeAttribute('checked');
  }

  isNotSelected(tag) {
    return !this.selectedTags.includes(tag.value);
  }

  includesTags(tags) {
    return this.selectedTags.every(tag => {
      return tags.includes(tag);
    });
  }

  removeTag(toRemove) {
    this.selectedTags = this.selectedTags.filter(tag => toRemove !== tag);
  }

  removeLastCharacter() {
    this.searchStr = this.searchStr.slice(0, this.searchStr.length - 1);
  }

  keyShouldBeIgnored(key) {
    return /[^a-z0-9]/i.test(key) || (key !== 'Backspace' && key.length > 1);
  }

  addToSearchStr(char) {
    this.searchStr += char;
  }

  updateSearchForTag(tag) {
    this.isNotSelected(tag) ? this.selectTag(tag) : this.deselectTag(tag);
  }

  updateSearchForText(char) {
    if (this.keyShouldBeIgnored(char)) return;
    char === 'Backspace' ? this.removeLastCharacter() : this.addToSearchStr(char);
  }

  desensitizeCase() {
    this.searchStr = this.searchStr.toUpperCase();
  }
}