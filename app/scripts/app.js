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
    app.baseUrl = '/Website/';
  }

  app.displayInstalledToast = function () {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      Polymer.dom(document).querySelector('#caching-complete').show();
    }
  };

  app.renderCal = function () {
    var calendar = Polymer.dom(document).querySelector('fullcalendar-calendar');
    calendar.changeView('month');
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

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  window.addEventListener('paper-header-transform', function (e) {
    var appName = Polymer.dom(document).querySelector('#mainToolbar .app-name');
    var middleContainer = Polymer.dom(document).querySelector('#mainToolbar .middle-container');
    var bottomContainer = Polymer.dom(document).querySelector('#mainToolbar .bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    // appName max size when condensed. The smaller the number the smaller the condensed size.
    var maxMiddleScale = 0.50;
    var auxHeight = heightDiff - detail.y;
    var auxScale = heightDiff / (1 - maxMiddleScale);
    var scaleMiddle = Math.max(maxMiddleScale, auxHeight / auxScale + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });

  // Scroll page to top and expand header
  app.scrollPageToTop = function () {
    app.$.headerPanelMain.scrollToTop(true);
  };

  app.closeDrawer = function () {
    app.$.paperDrawerPanel.closeDrawer();
  };

  app.setTitle = function (event) {
    this.title = event.detail.view.title;
  };

  app.isEqual = function (x, y) {
    var calendar = Polymer.dom(document).querySelector('fullcalendar-calendar');
    calendar.changeView('month');
    return x === y;
  };

  app.formSubmit = function (event) {
    event.localTarget.parentElement.submit();
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