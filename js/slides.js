document.addEventListener("DOMContentLoaded", function() {
    var slides = document.querySelectorAll("main > article");

    // initialise elements    
    var currentSlideCounter = document.getElementById("current-slide-counter");
    var totalSlideCounter = document.getElementById("total-slide-counter");
    var prevButton = document.getElementById("previous-slide");
    var nextButton = document.getElementById("next-slide");
    
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

        if (slideId == 1) {
            prevButton.setAttribute("disabled", "disabled");
        } else if(slideId == slides.length) {
            nextButton.setAttribute("disabled", "disabled");
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
    
});
