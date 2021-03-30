# Notes

1. The jQuery and handlebars `.js` files in this folder are 3rd party libraries given by LS. jQuery was not used.
2. The primary class is `ContactManager`, with supporting classes of `Template`, `Api`, `Search`, `UI`, and `Detailer`.
3. Validation is weak. I just used alerts rather than the UI on the example Contact Manager.

# Issues

1. Sometimes, multiple clicks need to happen for an event to fire (especially on the `Edit` button on the main contact list)
2. One shortcoming is how I handle checkbox form data, which is mainly abstracted away by the `Detailer` class. If I were to spend more time on this, I would reformat the `html` for the checkboxes/tags.
3. Even though `DELETE` requests do remove a contact from the server, I'm seeing a notification in Chrome devtools that shows because of `XHR Logging` that says `Fetch failed loading`. I'm not sure why this is, but `DELETE` requests do work.
4. This code feels very verbose. If I redo this project in the future, I'm sure it could be more concise.

# Strengths

1. Purposefully, only one `GET` request for the list is made, when it is instantiated. Then, all further read-only references to items on the list use an internal structure for rendering and rerendering. CREATE, UPDATE, and DELETE operations still make additional http requests.
2. `fetch` API is used, which was good to further separate api requests and application logic, as well as have a cleaner syntax for error handling.
3. Some level of separation was attempted, though the code is still just too verbose.
4. I wrote all html, css, and JS for this application.
