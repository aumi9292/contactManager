# Notes

1. The jQuery and handlebars `.js` files in this folder are 3rd party libraries given by LS. jQuery was not used.
2. The primary class is `ContactManager`, with supporting classes of `Template`, `Api`, `Search`, `UI`, and `Detailer`.

# Issues

1. No validation for creating or editing contacts
2. When you search by text and tag, the dual search does not work, nothing is implemented to handle it
3. When you click a contact to edit, only tags that are clicked for that contact are shown (this was a design choice at first, but I realize this is not a friendly UI)
4. Sometimes, multiple clicks need to happen for an event to fire (especially on the `Edit` button on the main contact list)
5. Only text up to the first space shows up in rendered Handlebars templates for the `editModal`. That is, when you have a first and last name, only the first name shows up.
6. The largest shortcoming is how I handle checkbox form data, which is mainly abstracted away by the `Detailer` class.

# Strengths

1. Purposefully, only one request for the list is made, when it is instantiated. Then, all further read-only references to items on the list use an internally saved array `ContactManager.contactsList`. CREATE, UPDATE, and DELETE operations still make additional http requests.
2. `fetch` API is used, which was good to further separate api requests and application logic, as well as have a cleaner syntax for error handling (`catch` versus a listener for different `error`, `timeout`, etc.)
