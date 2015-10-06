This is a quick project I built to explore deeper some Angular features, libraries, and best practices.


There's a few things of note in here: 

No server just yet: I have simply been running 

	python -m SimpleHttpServer 

from the CL in the project's root dir. Server incoming, perhaps with more functionality, keeping the users in firebase



In main.controller.js, there is an example of using a controller as a class by leveraging "Controller As" and angular.extend. This really gives the feeling of modules/exports and keeping some methods private.

In the user_list.html, there is an example of utilizing "controllerAs" syntax for easier scope access (avoids $parent). Grabbing the value using "UC.*" and "MC.*" is really convenient for scoping issues and easier to read (I think), especially if you are not modularizing the templates.


Use of resolve in the app.js "main.users" state just showing it's use and understanding of render/load blocking. To note is the event listener in main.controller.js that is waiting for a "stateChangeStart" event so it can add the text while the state load is pending (blocked by the resolve).


Also in main.controller.js is a strange way of capturing/updating the "user" obj. This is a side effect or quirk of the "vm = this" syntax


Exploring use of $asyncValidators and $validators in components/directives/*.directives.js. These directives check to make sure entered passwords match and checks the DB to see if the email address is already stored.

The userDisplay directive actually modifies the DOM using a template, angular methods, and isolate scope and is a great example of the tremendous ability to modularize and stay DRY using Angular.