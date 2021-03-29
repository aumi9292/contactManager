/*
Problem
Implement a Contact Manager web application
All features from example application must be present

Additional features
  Tagging feature:
    Contacts can have attached tags.
    You can select/deselect tags when you add/edit a contact.
    On the main page, you can click on a tag, which will return all contacts for whom that tag is selected

  Use an API server to store and retrieve contacts:
    This API server is given to us

Starting approach
 1. Examine the existing example application, noting behaviors
 2. Hypothesize how the API works, using RESTful principles, then test

Existing example application
Appearance
  Main sections that appear when page is loaded
    1) header, 2) search/add contact, 3) contact list

    Header
      a) <header> section with nest container div
        1. <h1> heading with text "Contact Manager"
        2. <p> heading with text "Using Backbone.js, Localstorage, RequireJS, Handlebar and Bootstrap"
        3. centered <h1> and <p> content
        4. modern, sans-serif font
        4. mild purple background

      b) <container> div holds remaining 2 and 3 elements
        1. In first nested container, there is a button "Add Contact", on top of a short text box, the box has a placeholder value of "Search". Content is centered
        2. Empty UL with 3 classes--media-list, row, and contacts-container
          2a. When Contacts exist, they become <li> elements in this list, with their name, phone, and email displayed.
          2b. Each li also has two buttons--edit and delete. 
          2c. When edit is clicked, it brings up the same rendering for "Add Contact", but with pre-filled values
        3. div with class empty-contacts-placeholder, with <h3> text "There is no contacts". Then, a button with "Add Contact"
        4. empty div with empty-search-contacts-placeholder
        5. Centered footer

Behaviors
  1. Blue border added to search box when selected
  2. Typing in search box:
    a. When you type a letter of a contact that does not exist, a message is added to div with empty-search-contacts-placeholder class
    b. Each keyup event for alphanumberical chars adds each letter to the characters on the bottom message
    c. Backspace character removes the last character, other meta chars aren't registered
    d. tab moves focus to the next "Add Contact" box

    e. If the characters do match the name of a contact, other contacts are removed. 
    f. *When a character matches multiple contacts, the contact at the top of the list is selected, others are removed. 
  3. Add Contact
    a. When this button is clicked, a form slides up from the bottom of the page. 
    b. The form has divs for name, email, and phone number
    c. When clicked into focus, all of these forms gain a blue border and shadow. When they lose focus, they lose the border
      Validation
        a. Validation occurs on submit event, for all three fields
        b. border and label are turned red
        c. When clicked into again, they remain red, but still emit a shadow when in focus
        d. The red remains until a successful submit
        e. No validation against the same set of information being entered multiple times
        f. browser validation for email input
        g. name can be one or two words, can be only numbers, dashes, !@#, any special chars
    d. There are submit and cancel buttons at the bottom of the page. 
    e. After a successful submit or cancel, the form slides up and out of the viewport
  4. Edit Contact: very similar to "Add Contact" form
  5. Delete button: 
    a. When clicked, alert/prompt appears on browser "Do you want to delete the contact?"
*/