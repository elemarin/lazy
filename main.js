require(['lazy'], function (lazy) {

    var config = {
        css: true,
        images: true,
        pictures: true,
        margin: "150px",
        types: {
            imgs: "lazy_image",
            css: "lazy_background",
            pictures: "lazy_picture"
        }
    }

    lazy(config);

})