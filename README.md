Modal
=====

The Best customizable Modal you've ever seen.

This plugin is based on Twitter Bootstrap Modal and has been modified a lot.

Dependencies
------------

[jQuery](http://jquery.com/)

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

    <div id="myModal" class="modal fade delay" tabindex="-1"></div>

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

_coming soon_

Licence
-------

[Apache 2.0 license](http://www.apache.org/licenses/LICENSE-2.0.html)
