'use strict';

var MIN_CONFIG_VERSION = 108; // this gui can manage versions in this range
var MAX_CONFIG_VERSION = 108;

$(document).ready(function() {
    
    //$.i18n.debug = true;
    
    var lang = "ru";
    
    $.i18n({
        locale: lang
    });

    $.i18n().load( './i18n/'+lang+'.json', lang ).done(
           function() {
               $("*").i18n();
    });
    
    PortHandler.initialize();
    CONTENT.welcome.initialize();

    $('#navigation li').click(function() {
        var self = this;
        var content = $(self).attr('data-name');

        $("#navigation").removeClass("active-menu");

        function content_ready() {
            GUI.contentSwitchInProgress = false;
        }

        if ($(self).hasClass('unlocked') && GUI.activeContent != content) {
            GUI.contentSwitchInProgress = true;
            GUI.contentSwitchCleanup(function() {
                CONTENT[content].initialize();
            });
        }
    });

    $(".navigation-menu-button").on("click", function() {
        $("#navigation").toggleClass("active-menu");
    });
});

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};
