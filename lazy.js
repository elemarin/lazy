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

                if (entry.isIntersecting) {
                    entry.target.className += " " + entry.target.getAttribute('data-class');;
                    observer.unobserve(entry.target);
                }

            }

        }, options);

        for (var index = 0; index < lazyClassImages.length; index++) {
            var image = lazyClassImages[index];
            observer.observe(image);

        }
    } else {
        for (var index = 0; index < lazyClassImages.length; index++) {
            var image = lazyClassImages[index];
            image.className += " " + image.getAttribute('data-class');;
        }
    }


}

function loadImageTags(config) {
    var lazyImages = document.querySelectorAll(".nhs_Lazy");



    var options = {
        rootMargin: config.margin,
        root: null
    };

    var observer = new IntersectionObserver(function (entries) {
        for (var index = 0; index < entries.length; index++) {
            var entry = entries[index];

            if (entry.isIntersecting) {
                entry.target.src += " " + entry.target.getAttribute('data-src');;
                observer.unobserve(entry.target);
            }

        }
    }, options)

    lazyImages.forEach(img => observer.observe(img));
}

function loadPictures(config) {
    var pictures = document.querySelectorAll("picture > source");
    let lazyImageObserver =
        new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.srcset = lazyImage.dataset.srcset;
                    // lazyImage.nextElementSibling.srcset = lazyImage.dataset.srcset;
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

    pictures.forEach(function (lazyImage) {
        lazyImageObserver.observe(lazyImage);
    });
}

var config = {
    css: true,
    images: true,
    pictures: true,
    margin: "150px"
}

function lazy(config) {
    if (config.css) {
        loadCSSImages(config);
    }

    if (config.images) {
        loadImageTags(config);
    }

    if (config.pictures) {
        loadPictures(config);
    }
}

lazy(config);