Modal
=====

The Best customizable Modal you've ever seen.

This plugin is based on Twitter Bootstrap Modal and has been modified a lot.

Dependencies
------------

[jQuery](http://jquery.com/)

Browser support
---------------

Sorry guys, haven't been time yet to test enough.

Right now I can say that it works on

* Firefox 22
* Chrome 28

Usage
-----

### Javascript plugin

Load the modal plugin after loading jQuery library.

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
    <script src="scripts/modal.js"></script>

### Styles

Include core styles of the modal in order to make it work.

    <link rel="stylesheet" href="styles/modal.css">

In addition create your custom styles that your modal look as you want them to.

### Modal

All you need is one html tag to add a modal to your page.

    <div id="myModal" class="modal fade" tabindex="-1"></div>

In addition you can add button to close a modal or switch between different ones.

    <button data-dismiss="modal">Close</button>
    <button data-target="#myModal2" data-switch="modal">Switch to modal2</button>

### Open button

Give attributes `data-toggle="modal"` and `data-target="#myModalID"` to the button in order to open specific modal.

    <input type="button" data-target="#myModal" data-toggle="modal" value="Modal1">
    <input type="button" data-target="#myModal2" data-toggle="modal" value="Modal2">

### Backdrop

Add backdrop element somewhere in your page between `<body></body>` tags.

    <div id="modal-backdrop" class="modal-backdrop fade"></div>

### Fade or not to fade

You can remove `fade` class from backdrop and modal elements if you don't want that effect.

### Delay between actions

Modal tag can have `data-delay-modal` and `data-delay-backdrop` attributes to customize delay time when doing transitions. The values must be non-negative integer e.g. `data-delay-modal="0"` when you don't want any delay. If you customize the delays, don't forget to overwrite the css transitions.

Default values are `data-delay-modal="300"` and `data-delay-backdrop="150"`

    <div id="myModal" class="modal fade" tabindex="-1" data-delay-modal="300" data-delay-backdrop="150"></div>

### Center modal vertically

You can center modal vertically by adding attribute `data-center-vertically="true"` to the modal element.

    <div id="myModal" class="modal fade" tabindex="-1" data-center-vertically="true"></div>

All attributes
--------------

### Open button

* `data-toggle="modal"` - button will open modal on click
* `data-target="#myModal"` - button opens modal with `id="myModal"`

### Modal element

* `data-delay-modal="300"` - number of milliseconds of css transition duration (with modal div with `class="fade"`, otherwise the delay between showing backdrop and modal)
* `data-delay-backdrop="150"` - number of milliseconds of css transition duration (with backdrop div with `class="fade"`, otherwise no effect)
* `data-center-vertically="true"` - calculates margin-top with javascript to center modal vertically (calculation happens when modal is initialized and on window resize)

### Close button

* `data-dismiss="modal"` - closes open modal on click

### Switch button

* `data-switch="modal"` - button will close open modal and open another
* `data-target="#myModal"` - button opens modal with `id="myModal"`

Licence
-------

[Apache 2.0 license](http://www.apache.org/licenses/LICENSE-2.0.html)
