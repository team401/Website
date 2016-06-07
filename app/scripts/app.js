(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  app.baseUrl = '/';
  if (window.location.port === '') { // if production
    // Uncomment app.baseURL below and
    // set app.baseURL to '/your-pathname/' if running from folder in production
    app.baseUrl = '/';
  }

  app.renderCal = function () {
    var calendar = Polymer.dom(document).querySelector('fullcalendar-calendar');
    calendar.changeView('month');
  };

  app.handleCalEvent = function (polEvent, calEvent) {
    calEvent.jsEvent.preventDefault();

    var start = new Date(calEvent.event.start._i);
    var end = new Date(calEvent.event.end._i);

    var startTime = moment(start).format('h:mm a');
    var endTime = moment(end).format('h:mm a');

    var startDay = start.toDateString();
    var endDay = end.toDateString();

    if (startDay != endDay) {
      startTime = moment(start).format('dddd MMM Do, h:mm a');
      endTime = moment(end).format('dddd MMM Do h:mm a');
    }

    app.eventTitle = calEvent.event.title;
    app.eventTime = startTime + " - " + endTime;
    app.eventLoc = calEvent.event.location;
    app.eventDesc = calEvent.event.description;
    app.eventLink = calEvent.event.url;
    app.$.eventDialog.open();
  };


  // imports are loaded and elements have been registered
  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function () {
    var calendar = Polymer.dom(document).querySelector('fullcalendar-calendar');
    var notification = Polymer.dom(document).querySelector('paper-toast');

    app.previous = function () {
      calendar.previous();
    }
    app.next = function () {
      calendar.next();
    }
    app.setTitle = function (event) {
      this.title = event.detail.view.title;
    };
    app.changeView = function (event) {
      calendar.changeView(event.target.attributes.getNamedItem('view').value);
    }
  });

  app.resTitle = "General";

  app.itemSelected = function (event) {
    app.resTitle = event.target.textContent.replace(/\s/g, "");
  };

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function () {
    // imports are loaded and elements have been registered
  });

  // Scroll page to top and expand header
  app.scrollPageToTop = function () {
    app.$.headerPanelMain.scroll(top);
  };

  app.closeDrawer = function () {
    app.$.appDrawer.resetLayout();
  };

  app.setTitle = function (event) {
    this.title = event.detail.view.title;
  };

  app.isEqual = function (x, y) {
    var calendar = Polymer.dom(document).querySelector('fullcalendar-calendar');
    calendar.changeView('month');
    return x === y;
  };

  app.formSubmit = function () {
    app.$.contactForm.submit();
    app.$.email.value = "";
    app.$.name.value = "";
    app.$.comments.value = "";
    app.$.toast.text = 'Message sent!';
    app.$.toast.show();
  };

  app.selected = 0;

  app.calOptions = {
    header: false,
    googleCalendarApiKey: 'AIzaSyBm2W3ShYxxYKi0thYZsrQzSaXXslLO9NM',
    events: {
      googleCalendarId: 'nnjousubqta8t6i1cgggohrkmo@group.calendar.google.com'
    },
    eventColor: '#D35400'
  };

  app.rowTapped = function (ev) {
    location.href = ev.detail.item.link;
  };
})(document);
