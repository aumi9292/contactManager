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
    let newContact = Object.fromEntries(submission);
    this.cleanContact(newContact);
    return newContact;
  }

  updateContactInfoInList(contact, submittedEdits) {
    let newContactInfo = Object.fromEntries([...submittedEdits]);
    this.cleanContact(newContactInfo);
    this.updateContactInfo(contact, newContactInfo);
  }

  updateContactInfo(contact, newContactInfo) {
    for (let detail in newContactInfo) {
      contact[detail] = newContactInfo[detail];
    }
  }

  cleanContact(newContact) {
    this.stringifySubmittedTags(newContact);
    this.removeUnnecessaryDetails(newContact);
  }
}

Detailer.prototype.generateId = function generateId() {
  let id = 10;
  return function() {
    id += 1;
    return id;
  };
}();