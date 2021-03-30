export class Detailer {
  constructor() {
    this.id = this.generateId;
  }

  static VALID_DETAILS = ['id', 'full_name', 'phone_number', 'email', 'tags']

  stringifySubmittedTags(submission) {
    submission.tags = [];
    for (let name in submission) {
      if (!(Detailer.VALID_DETAILS.includes(name) || name === 'other')) {
        submission.tags.push(submission[name]);
      }
    }
    submission.tags = submission.tags.join(',') || null;
  }

  removeUnnecessaryDetails(submission) {
    for (let detail in submission) {
      if (!Detailer.VALID_DETAILS.includes(detail)) {
        delete submission[detail];
      }
    }
  }

  formatContact(submission) {
    submission.append('id', this.id());
    let newContact = Object.fromEntries([...submission.entries()]);
    this.cleanContact(newContact);
    return newContact;
  }

  formatContactToCheck(submittedEdits) {
    let newContactInfo = Object.fromEntries([...submittedEdits.entries()]);
    this.cleanContact(newContactInfo);
    return newContactInfo;
  }

  validEditSubmit(newDetails, btnId) {
    return !(this.invalidInput(newDetails)) &&
    btnId === 'submit-edit';
  }

  updateLocalContactInfo(contact, newContactInfo) {
    for (let detail in newContactInfo) {
      contact[detail] = newContactInfo[detail];
    }
  }

  cleanContact(newContact) {
    this.stringifySubmittedTags(newContact);
    this.removeUnnecessaryDetails(newContact);
  }

  nameIsInvalid(name) {
    return !/^[a-z]+\s?[a-z]+$/i.test(name.trim());
  }

  emailIsInvalid(email) {
    return !/.+@.+\..+/.test(email);
  }

  numberIsInvalid(number) {
    return !/^\d{7,10}$/.test(number);
  }

  invalidInput(newContact) {
    let {full_name, email, phone_number} = newContact;

    if (this.nameIsInvalid(full_name)) {
      alert("Please enter your name");
    } else if (this.emailIsInvalid(email)) {
      alert("Please enter a valid email");
    } else if (this.numberIsInvalid(phone_number)) {
      alert("Please enter a valid phone number");
    } else {
      return false;
    }
    return true;
  }
}

Detailer.prototype.generateId = function generateId() {
  let id = 1000;
  return function() {
    id += 1;
    return id;
  };
}();