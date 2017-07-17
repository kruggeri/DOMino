# DOMino

DOMino is a JavaScript DOM interaction library inspired by jQuery. Using DOMino, users can:

- Select, manipulate, and traverse DOM elements

- Register callbacks once DOM is fully loaded

- Create new DOMNodeCollection objects from     HTMLElements and strings

### Getting Started

To use DOMino, download this library into your project with the webpack output DOMino.js in your source code.

    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="./css/reset.css">
      <script type="text/javascript" src="../lib/DOMino.js"></script>
      ...
    </head>

Or, run webpack in the command line to use the documents in the src folder

### API

Selection

- $l

DOM Manipulation

- html
- empty
- append
- attr
- addClass
- removeClass
- remove

DOM Traversal

- children
- parent
- find

Event Listeners

- on
- off
