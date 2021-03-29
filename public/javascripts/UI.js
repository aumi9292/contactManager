import { Template } from './Template.js';

export class UI {
  constructor() {
    this.editContactTemplator = new Template().editContactTemplator;
    this.bind();
  }

  bind() {
    this.contactUL = document.querySelector("#contacts-list");
    this.addContactForm = document.querySelector("#create-block");
    this.createContactForm = document.querySelector("#create-contact");
    this.contactsPlaceholder = document.querySelector(".contacts-placeholder");
    this.editModal = document.querySelector("#edit-block");
    this.addBtns = [...document.querySelectorAll(".add-contact")];
  }

  hideAddContact() {
    this.addContactForm.classList.add("slidedown");
    //addContactForm.classList.remove('slideup')
    this.contactUL.classList.remove("hide");
    this.createContactForm.reset();
  }
  displayAddContact() {
    this.addContactForm.classList.remove("slidedown");
    this.addContactForm.classList.add("slideup");
    this.contactUL.classList.add("hide");
  }

  displayEditContact(contactAndTags) {
    this.editModal.classList.remove("start");
    this.editModal.classList.remove("slidedown");
    this.editModal.classList.add("slideup");
    this.contactUL.classList.add("hide");
    this.editModal.innerHTML = this.editContactTemplator(contactAndTags);
  }

  hideEditContact() {
    this.editModal.classList.add("slidedown");
    this.contactUL.classList.remove("hide");
  }
}