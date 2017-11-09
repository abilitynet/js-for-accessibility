// Polyfills for IE
Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value;
};
if (Number.parseInt === undefined)
    Number.parseInt = window.parseInt;

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// ACTUAL CODE!

document.addEventListener("DOMContentLoaded", function() {
    var slides = document.querySelectorAll("main > article");

    // initialise elements
    var currentSlideCounter = document.getElementById("current-slide-counter");
    var totalSlideCounter = document.getElementById("total-slide-counter");
    var prevButton = document.getElementById("previous-slide");
    var nextButton = document.getElementById("next-slide");

    // Auto-resizes the height of iframe elements to fit the window height
    // '#iframeheight' is a <style> tag.
    var updateJSBinHeight = function() {
      var nh = window.innerHeight - 130;
      document.getElementById("iframeheight").innerHTML = 'iframe { height: ' + nh + 'px !important; }';
    };
    updateJSBinHeight();
    window.addEventListener("resize", updateJSBinHeight);

    // initialise the current slide
    var currentSlide = 1;

    // update the total number of slides "Slide n of X"
    totalSlideCounter.innerHTML = slides.length;

    history.pushState({slide: 1}, null, '#slide-1');

    prevButton.addEventListener("click", function() {
        moveToSlide(currentSlide - 1);

        // Add to history
        history.pushState({slide: currentSlide}, null, '#slide-' + currentSlide);
    });

    nextButton.addEventListener("click", function() {
        moveToSlide(currentSlide + 1);

        // Add to history
        history.pushState({slide: currentSlide}, null, '#slide-' + currentSlide);
    });

    // Click to go to slide
    // @TODO: make keyboard accessible
    currentSlideCounter.addEventListener("click", function() {
       var pageNumber = prompt("Enter a slide number to skip to:");
       if(pageNumber) moveToSlide(Number.parseInt(pageNumber, 10));
    });


    function moveToSlide(slideId) {
        // check slide exists
        if(!Number.isInteger(slideId) || slideId < 1 || slideId > slides.length) {
            alert("This slide number does not exist");
            return false;
        }

        // make slide visible
        slides[currentSlide - 1].setAttribute("hidden", "hidden");
        currentSlide = slideId;
        slides[currentSlide - 1].removeAttribute("hidden");

        // change current slide ID
        currentSlideCounter.innerHTML = currentSlide;

        // if first or last slide, disable buttons
        prevButton.removeAttribute("disabled");
        nextButton.removeAttribute("disabled");

        // Disable next/prev button if we're on the first or last slide
        if (slideId == 1) {
            prevButton.setAttribute("disabled", "disabled");
        } else if(slideId == slides.length) {
            nextButton.setAttribute("disabled", "disabled");
        }

        // Initialise the consolejs in the slide if there's one
        // and it's not been initialised already
        var consoleInSlide = slides[currentSlide - 1].querySelector('.console');
        if(consoleInSlide && !consoleInSlide.classList.contains('jsconsole')) {
            var repl = new Console(consoleInSlide);
            repl.wrapLog(console);
        }

        // give focus to first heading
        // slides[currentSlide - 1].tabIndex = -1;
        // slides[currentSlide - 1].focus();
    }

    // Handle the browser state on change
    window.addEventListener("popstate", function(e) {
        var slideId = location.hash.replace("#slide-", "");
        moveToSlide(parseInt(slideId, 10));
    });

    // Handler for Skip to slide link
    var skipLink = document.querySelectorAll(".skip")[0];
    skipLink.addEventListener("click", function(e) {
        // give focus to first heading in slide
        slides[currentSlide - 1].tabIndex = -1;
        slides[currentSlide - 1].focus();

        e.preventDefault();
    })


    // SLIDE SPECIFIC CODE
    var jsEventSlide = document.getElementById('example-JS-event');
    jsEventSlide.querySelector('button').addEventListener("click", function() {
        var toggleButton = jsEventSlide.querySelector('button');
        var toggledBox = jsEventSlide.querySelector('.toggled-box');
        var marks = jsEventSlide.querySelectorAll('mark');

        if(toggledBox.classList.contains('red')) {
            toggledBox.classList.remove('red');
            toggledBox.classList.add('blue');
            toggledBox.innerHTML = 'This box is blue';
            marks.forEach(function(el) {
                el.innerHTML = 'blue';
            });
        } else {
            toggledBox.classList.remove('blue');
            toggledBox.classList.add('red');
            toggledBox.innerHTML = 'This box is red';
            marks.forEach(function(el) {
                el.innerHTML = 'red';
            });
        }
    });

    var jsControlSlide = document.getElementById('example-controlflow');
    var ageInput = jsControlSlide.querySelector('input[name="value"]');
    var cflowEventListener = function() {
        var messageResult = jsControlSlide.querySelector('#message-result');
        var ifTrue = jsControlSlide.querySelector('mark#if-true');
        var ifFalse = jsControlSlide.querySelector('mark#if-false');

        var age = Number.parseInt(ageInput.value, 10);
        if(age >= 18) {
            message = "You are an adult!";
            ifTrue.classList.remove('no-flow');
            ifFalse.classList.add('no-flow');
        } else {
            message = "Hang on there kiddo, you can't buy alcohol";
            ifTrue.classList.add('no-flow');
            ifFalse.classList.remove('no-flow');
        }

        messageResult.innerHTML = message;
    };
    ageInput.addEventListener("change", cflowEventListener);
    ageInput.addEventListener("input", cflowEventListener);
    ageInput.addEventListener("keyup", cflowEventListener);
    cflowEventListener();
});
