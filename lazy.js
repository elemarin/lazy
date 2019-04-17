function loadCSSImages(config) {
    var lazyClassImages = document.querySelectorAll("[data-class]");

    var options = {
        rootMargin: config.margin,
        root: null
    };

    if (window.IntersectionObserver) {

        var observer = new IntersectionObserver(function (entries) {

            for (var index = 0; index < entries.length; index++) {
                var entry = entries[index];

                if(entry.isIntersecting){
                    console.log("loading ", entry.target.dataset.class);
                    entry.target.className += " " + entry.target.dataset.class;
                    observer.unobserve(entry.target);
                }
                
            }
            
        }, options);

        for (var index = 0; index < lazyClassImages.length; index++) {
            var image = lazyClassImages[index];
            observer.observe(image);
            
        }
    }
    else{
        for (var index = 0; index < lazyClassImages.length; index++) {
            var image = lazyClassImages[index];
            image.className += " " + image.dataset.class;
        }
    }
    

}
var config = {
    css: true,
    images: true, 
    margin: "50px"
}

function lazy(config) {
    if (config.css) {
        loadCSSImages(config);
    }

    if (config.images) {
        //loadImages(config);
    }
}

lazy(config);