# Intro to JavaScript for accessibility

This is the first part of a small internal course of **2 sessions of ~3 hours each**. It is aimed at accessibility testers who will not necessarily have to code for themselves, but who require an understanding of JavaScript and modern techniques to give appropriate recommendations. The intended audience is a tech-savvy group who know some basic HTML and CSS, but that do not necessarily have any prior knowledge of programming at all.

## First session

- the very basics of JavaScript
    - what it is, how it behaves
    - instructions: operations, variables, conditions, loops, functions;
    - a very quick, dumbed down explanation of objects (e.g. what the dot syntax means)
- how it relates to HTML, and how to interact between the two (selecting elements etc);
- modifying properties and attributes of HTML elements from JS;
- using event handlers for keyboard, mouse and touch;
- moving focus programmatically, and how this affects screen readers and other assistive technologies
- we will briefly touch on the basics of ARIA: what it is, what it can do well, what it can do but shouldn't be used to do, and apply it on some examples with JavaScript by changing specific states (building an accordion, and a modal dialog).


## Second session

The second session will focus on more advanced ARIA roles: which ones exist, when they are necessary, and we will practice implementing some more complex design patterns: sliders, faux checkboxes, dropdowns; and see, step-by-step, what is generally missing for accessibility and how to advise our clients best on how to fix these behaviours.

## Credits

Some examples are taken from [OpenClassrooms](https://openclassrooms.com/courses/learn-the-basics-of-javascript/introduction-to-programming) (CC BY-NC-SA), and some from [Mozilla Developer Network](http://developer.mozilla.org) (CC BY-SA). The Codepen-like editor is [a forked version](https://github.com/victorloux/jotted) of Jotted by ghinda -- the fork is a WIP to have a slightly better support of screen readers.

This is the first of a series of interactive training sessions. This platform for interactive slides with built-in editors will be released separately at some point in the future, to make the creation of new courses easier.
