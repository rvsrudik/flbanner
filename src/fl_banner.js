function flBanner(banner_options) {
    
    //tmp 
    console.log('disable banner included by cdn');
    return;
    
    var fl_options = {
        banner_id: 'fl_default',
        hidden_delay: 365*24*60*60*1000,
        title: 'Option [title] was not set',
        text: 'Option [text] was not set',
        imgSrc: '',
        styles: ''
    }

    for (var key in banner_options) {
        fl_options[key] = banner_options[key];
    }

    if (!getCookie('fl_closed_'+fl_options.banner_id)) {
        generateHtml();
    }



    function generateHtml() {
        // create main container
        var fl_banner = document.createElement('div');
        fl_banner.classList.add('fl-banner');
        fl_banner.id = 'fl_banner' + fl_options.banner_id;
        fl_banner.setAttribute("style", " z-index: 99999; display: flex; box-shadow: 0px 0px 6px 1px #0000004f; height: 200px; position: fixed; background: white; bottom: 0; left: 0; width: 100%;")

        // create image
        if (fl_options.imgSrc.length > 0) {
            var fl_banner_image_container = document.createElement('div');
            fl_banner_image_container.classList.add('fl-banner-image');
            fl_banner_image_container.setAttribute("style", "height: 200px; max-width: 50vw;")
            var fl_banner_image = document.createElement('img');
            fl_banner_image.classList.add('fl-banner-image');
            fl_banner_image.src = fl_options.imgSrc;
            fl_banner_image.setAttribute("style", "height: 200px; max-width: 50vw;")
            fl_banner_image_container.append(fl_banner_image);
            fl_banner.append(fl_banner_image_container);
        }

        //create content
        var fl_banner_content = document.createElement('div');
        fl_banner_content.classList.add('fl-banner-content');
        fl_banner_content.setAttribute("style", "padding: 20px;")

        fl_banner.append(fl_banner_content);

        // create title
        var fl_banner_title = document.createElement('div');
        fl_banner_title.classList.add('fl-banner-title');
        fl_banner_title.innerHTML = fl_options.title;
        fl_banner_title.setAttribute("style", "font-weight: 600; font-size: 19px;")
        fl_banner_content.append(fl_banner_title);


        //create text
        var fl_banner_text = document.createElement('div');
        fl_banner_text.classList.add('fl-banner-text');
        fl_banner_text.innerHTML = fl_options.text;
        fl_banner_text.setAttribute("style", " margin-top: 10px;")
        fl_banner_content.append(fl_banner_text);


        //create close btn
        var fl_close_btn = document.createElement('div');
        fl_close_btn.classList.add('fl-close-banner');
        fl_close_btn.innerHTML = '×';
        fl_close_btn.setAttribute('data-cookie-id', fl_options.banner_id);
        fl_close_btn.setAttribute('data-delay', fl_options.hidden_delay);
        fl_close_btn.setAttribute("style", "padding: 5px; position: absolute; top: 10px; right: 10px; cursor: pointer;")

        fl_banner.append(fl_close_btn);


        document.body.appendChild(fl_banner);


        for (var selectors in fl_options.styles) {
            var el = document.querySelector('#fl_banner' + fl_options.banner_id + ' ' + selectors);
            if (el === null) {
                var el = document.querySelector('#fl_banner' + fl_options.banner_id  + selectors);
            }
            var style_str = el.getAttribute('style');
            for (var style in fl_options.styles[selectors]) {

                style_str += style+':'+fl_options.styles[selectors][style]+';';
            }
            el.setAttribute("style", style_str);

        }
    }
}

window.addEventListener("click", function (event) {
    var banner_id = event.target.getAttribute('data-cookie-id');
    var delay = event.target.getAttribute('data-delay');
    setCookie('fl_closed_'+banner_id, true, delay);
    document.querySelector('#fl_banner'+banner_id).remove();
    return;
});


function setCookie(cname, cvalue, expire_seconds) {
    var d = new Date();
    d.setTime(d.getTime() + (expire_seconds));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

    console.log(cname);
    console.log(cvalue);
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
