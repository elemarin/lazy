define([], function () {
    "use strict";

    function loadCSSImages(config) {
        var lazyClassImages = document.querySelectorAll("[data-type = '" + config.types.css + "']");

        var options = {
            rootMargin: config.margin,
            root: null
        };

        if (!window.IntersectionObserver) {
            for (var index = 0; index < lazyClassImages.length; index++) {
                var image = lazyClassImages[index];
                image.className += " " + image.getAttribute('data-class');;
            }

            return;
        }

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

    }

    function loadImageTags(config) {
        var lazyImages = document.querySelectorAll("[data-type = '" + config.types.imgs + "']");



        var options = {
            rootMargin: config.margin,
            root: null
        };

        if (!window.IntersectionObserver) {
            for (var index = 0; index < lazyImages.length; index++) {
                var image = lazyImages[index];
                image.src = image.getAttribute('data-src');;
            }

            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            for (var index = 0; index < entries.length; index++) {
                var entry = entries[index];

                if (entry.isIntersecting) {
                    entry.target.src = entry.target.getAttribute('data-src');;
                    observer.unobserve(entry.target);
                }

            }
        }, options)

        for (var index = 0; index < lazyImages.length; index++) {
            const img = lazyImages[index];
            observer.observe(img)

        }
        // lazyImages.forEach(img => observer.observe(img));
    }

    function loadPictures(config) {
        var pictures = document.querySelectorAll("[data-type = '" + config.types.pictures + "']" + " > source");

        if(!window.IntersectionObserver){
            for (var index = 0; index < pictures.length; index++) {
                var image = pictures[index];
                image.srcset = image.getAttribute('data-srcset');;
            }

            return;
        }

        var observer =
            new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target;
                        lazyImage.srcset = lazyImage.dataset.srcset;
                        // lazyImage.nextElementSibling.srcset = lazyImage.dataset.srcset;
                        observer.unobserve(lazyImage);
                    }
                });
            });

        pictures.forEach(function (lazyImage) {
            observer.observe(lazyImage);
        });
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

    return lazy;

})