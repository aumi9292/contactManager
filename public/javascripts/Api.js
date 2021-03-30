export class Api {
  constructor() {
    this.listUrl = "/api/contacts";
    this.errorMessage = "Sorry, ContactManager had trouble processing your request";
  }

  formatError(err) {
    return `${this.errorMessage}\n${String(err)}`;
  }

  fetchList() {
    return fetch(this.listUrl)
      .then( resp => resp.json())
      .catch( err => alert(this.formatError(err)));
  }

  updateInfoOnServer(contact) {
    fetch(`${this.listUrl}/${contact.id}`, this.updateOpts(contact));
  }

  addToServer(contact) {
    return fetch(this.listUrl, this.addOpts(contact))
      .then(resp => resp.json())
      .catch(err => alert(this.formatError(err)));
  }

  removeFromServer(contact) {
    fetch(`${this.listUrl}/${contact.id}`, { method: 'delete'} )
      .then((null), (err => alert(this.formatError(err))));
  }

  updateOpts(contact) {
    return {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    };
  }

  addOpts(contact) {
    return {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    };
  }
}