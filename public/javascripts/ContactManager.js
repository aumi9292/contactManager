import { Template } from './Template.js';
import { Api } from './Api.js';
import { Search } from './Search.js';
import { UI } from './UI.js';
import { Detailer } from './Detailer.js';

class ContactManager {
  constructor() {
    this.search = new Search();
    this.api = new Api();
    this.detailer = new Detailer();

    this.UI = null;
    this.contactsList = null;
  }

  init() {
    this.setupTemplates();
    this.renderFetchedList();
  }

  setupTemplates() {
    this.editContactTemplator = new Template().editContactTemplator;
    this.tagTemplator = new Template().tagTemplator;
    this.contactTemplator = new Template().contactTemplator;
  }

  renderFetchedList() {
    this.api.fetchList().then(list => {
      this.contactsList = list;
      this.UI = new UI();
    }).then(() => {
      this.renderContactList();
      this.hideOrDisplayPlaceholder();
      this.UI.hideAddContact();
      this.registerHandlers();
    }).catch(err => {
      alert(this.api.formatError(err));
    });
  }

  renderContactList(contacts, checkedTags) {
    contacts = contacts || this.contactsList;
    let tags = this.handlify(checkedTags);
    this.search.tagSearchDisplay.innerHTML = this.tagTemplator({tags: tags});
    this.UI.contactUL.innerHTML = this.contactTemplator({contacts: contacts});
  }

  registerHandlers() {
    this.setupTextSearchHandler();
    this.setupTagSearchHandler();
    this.setupListClickHandler();
    this.setupEditHandler();
    this.setupAddHandlers();
    this.setupSubmitHandler();
  }

  setupListClickHandler() {
    this.UI.contactUL.addEventListener("click", e => {
      e.preventDefault();
      this.updateOrDeleteContact(e);
    });
  }

  setupEditHandler() {
    this.UI.editModal.addEventListener('click', e => {
      if (e.target.nodeName === 'BUTTON') {
        this.handleEditClick(e.target);
      }
    });
  }

  handleSubmit() {
    let newContact = this.convertFormForAdd();
    if (this.detailer.invalidInput(newContact)) {
      this.handleAddClick();
    } else {
      this.addNewContact(newContact);
      this.UI.hideAddContact();
    }
  }

  handleEditClick(btn) {
    if (btn.id === 'cancel-edit') {
      this.UI.hideEditContact();
      return;
    }

    let newDetails = this.convertFormForEdit();

    if (this.detailer.validEditSubmit(newDetails, btn.id)) {
      this.submitEdit(newDetails);
    }
  }

  setupAddHandlers() {
    this.UI.addBtns.forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        this.handleAddClick();
      });
    });
  }

  handleAddClick() {
    let cancelBtn = document.querySelector("#cancel-add");
    this.UI.displayAddContact();
    cancelBtn.addEventListener("click", e => this.UI.hideAddContact());
  }

  setupSubmitHandler() {
    this.UI.createContactForm.addEventListener("submit", e => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  setupTextSearchHandler() {
    this.search.searchField.addEventListener('keyup', e => {
      this.search.updateSearchForText(e.key);
      this.reFilterAndReRender();
    });
  }

  setupTagSearchHandler() {
    this.search.searchByTag.addEventListener("change", e => {
      let tag = e.target;
      this.search.updateSearchForTag(tag);
      this.reFilterAndReRender(this.search.selectedTags);
    });
  }

  hideOrDisplayPlaceholder() {
    if (this.contactsList.length) {
      this.UI.contactsPlaceholder.classList.add("hide");
    } else {
      this.UI.contactsPlaceholder.classList.remove("hide");
    }
  }

  populateEditDiv(contact) {
    let tags = this.handlifyForContact(contact);
    console.log(tags);
    this.UI.displayEditContact({contact: contact, tags: tags});
  }

  inputError(newContact) {
    return newContact['full_name'].trim().length === 0;
  }

  convertFormForAdd() {
    let submission = new FormData(this.UI.createContactForm);
    return this.detailer.formatContact(submission);
  }

  addNewContact(newContact) {
    this.api.addToServer(newContact)
      .then(newContact => {
        this.add(newContact);
        this.hideOrDisplayPlaceholder();
      }).then(() => this.renderContactList())
      .catch(err => {
        alert(this.api.formatError(err));
      });
  }

  updateAndReRender(contact, newDetails) {
    this.updateContact(contact, newDetails);
    this.renderContactList();
  }

  updateContact(contact, newDetails) {
    this.detailer.updateLocalContactInfo(contact, newDetails);
    this.api.updateInfoOnServer(contact);
  }

  submitEdit(newDetails) {
    let contact = this.locateContactToEdit();
    this.updateAndReRender(contact, newDetails);
    this.UI.hideEditContact();
  }

  convertFormForEdit() {
    let submittedEdits = new FormData(this.UI.editModal.querySelector('form'));
    return this.detailer.formatContactToCheck(submittedEdits);
  }

  separateTag(tag) {
    return !tag ? null : tag.split(',');
  }

  getSeparatedTags(tags) {
    return tags.map(tag => {
      return this.separateTag(tag);
    });
  }

  getUniqueTags(separatedTags) {
    if (!separatedTags) return [];
    let uniqueTags = [];
    separatedTags.flat().forEach(tag => {
      if (tag && !uniqueTags.includes(tag)) {
        uniqueTags.push(tag);
      }
    });
    return uniqueTags;
  }

  getAllUniqueTags() {
    let allTags = this.contactsList.map(contact => contact.tags);
    let separatedTags = this.getSeparatedTags(allTags);
    return this.getUniqueTags(separatedTags);
  }

  getUniqueTagsForContact(contact) {
    let formattedTags = this.separateTag(contact.tags);
    return this.getUniqueTags(formattedTags);
  }

  check(tag) {
    return { name: tag, checked: true };
  }

  uncheck(tag) {
    return { name: tag };
  }

  handlify(checkedTags = []) {
    let tags = this.getAllUniqueTags();
    return tags.map(tag => {
      return checkedTags.includes(tag) ? this.check(tag) : this.uncheck(tag);
    });
  }

  handlifyForContact(contact) {
    let checkedTags = this.getUniqueTagsForContact(contact);
    return this.handlify(checkedTags);
  }

  removeContactAndDisplayUpdatedList(contact) {
    this.api.removeFromServer(contact);
    this.contactsList = this.contactsList.filter(cont => cont !== contact);
    this.renderContactList();
    this.hideOrDisplayPlaceholder();
  }

  updateOrDeleteContact(e) {
    let btnId = e.target.id;
    let contact = this.locateContact(e);

    if (btnId === 'editContact') {
      this.populateEditDiv(contact);
    } else if (btnId === 'deleteContact') {
      this.removeContactAndDisplayUpdatedList(contact);
    }
  }

  findAddContactId(e) {
    return e.target.parentElement.getAttribute('contact-id');
  }

  findContactBy(id) {
    return this.contactsList.find(contact => String(contact['id']) === id);
  }

  locateContact(e) {
    let id = this.findAddContactId(e);
    return this.findContactBy(id);
  }

  findEditContactId() {
    let fieldSet = this.UI.editModal.querySelector("[contact-id]");
    return fieldSet.getAttribute("contact-id");
  }

  locateContactToEdit() {
    let id = this.findEditContactId();
    return this.findContactBy(id);
  }

  filterByTag() {
    return this.contactsList.filter(contact => {
      if (!contact.tags) return false;
      let contactTags = contact.tags.split(/,/);
      return this.search.includesTags(contactTags);
    });
  }

  applyTagFilter(checkedTags) {
    return checkedTags.length ? this.filterByTag() : this.contactsList;
  }

  applyStringFilter(preFiltered) {
    this.search.desensitizeCase();
    if (this.search.searchStr) preFiltered = preFiltered.filter(contact => {
      return contact['full_name'].toUpperCase().startsWith(this.search.searchStr);
    });
    return preFiltered;
  }

  reFilterAndReRender(checkedTags = []) {
    let filtered = this.applyTagFilter(checkedTags);
    filtered = this.applyStringFilter(filtered);
    this.renderContactList(filtered, checkedTags);
  }

  add(contact) {
    this.contactsList.push(contact);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ContactManager().init();
});