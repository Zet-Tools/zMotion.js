angular.module('zMotionProject', []).
controller('main', function ($scope, $http, $sce, $timeout) {
    $scope.svgArr = ["add-square-button.svg","adjust-contrast.svg","align-justify.svg","align-to-left.svg","align-to-right.svg","ambulance.svg","anchor-shape.svg","android-character-symbol.svg","angle-arrow-down.svg","angle-arrow-pointing-to-right.svg","angle-pointing-to-left.svg","apple-logo.svg","archive-black-box.svg","arrow-angle-pointing-down.svg","arrow-down-on-black-circular-background.svg","arrow-pointing-down.svg","arrow-pointing-right-in-a-circle.svg","arrow-pointing-to-left.svg","arrow-pointing-to-right.svg","arrow-up-on-a-black-circle-background.svg","arrow-up.svg","arrowhead-pointing-to-the-right.svg","arrowhead-pointing-up-inside-a-square-box-outline.svg","arrowheads-pointing-to-the-left.svg","asterisk.svg","ban-circle-symbol.svg","bar-graph-on-a-rectangle.svg","barcode.svg","beaker.svg","beer-jar-black-silhouette.svg","bell-musical-tool.svg","bitbucket-logotype-camera-lens-in-perspective.svg","bitbucket-sign.svg","bitcoin-logo.svg","blank-file.svg","bold-text-option.svg","book.svg","bookmark-black-shape.svg","bookmark-white.svg","branch-with-leaves-black-shape.svg","briefcase.svg","bug.svg","building-front.svg","bull-horn-announcer.svg","bullseye.svg","calendar-page-empty.svg","calendar-with-spring-binder-and-date-blocks.svg","camera-retro.svg","caret-arrow-up.svg","caret-down.svg","center-text-alignment.svg","certificate-shape.svg","check-box-empty.svg","check-mark.svg","check-sign-in-a-rounded-black-square.svg","check.svg","checked-symbol.svg","checkered-raised-flag.svg","chevron-arrow-down.svg","chevron-arrow-up.svg","chevron-pointing-to-the-left.svg","chevron-sign-down.svg","chevron-sign-left.svg","chevron-sign-to-right.svg","chevron-up.svg","circle-shape-outline.svg","circle-with-an-arrow-pointing-to-left.svg","circular-shape-silhouette.svg","cloud-storage-download.svg","cloud-storage-uploading-option.svg","cocktail-glass.svg","code-fork-symbol.svg","code.svg","coffee-cup-on-a-plate-black-silhouettes.svg","cog-wheel-silhouette.svg","collapse-window-option.svg","comment-black-oval-bubble-shape.svg","comment-white-oval-bubble.svg","comments.svg","compass-circular-variant.svg","computer-tablet.svg","copy-document.svg","correct-symbol.svg","couple-of-arrows-changing-places.svg","credit-card.svg","crop-symbol.svg","cross-mark-on-a-black-circle-background.svg","css-3-logo.svg","cursor.svg","cut.svg","dashboard.svg","delivery-truck-silhouette.svg","desktop-monitor.svg","dollar-symbol.svg","dot-and-circle.svg","double-angle-pointing-to-right.svg","double-left-chevron.svg","double-sided-eraser.svg","double-strikethrough-option.svg","down-arrow.svg","download-symbol.svg","download-to-storage-drive.svg","dribbble-logo.svg","dropbox-logo.svg","earth-globe.svg","edit-interface-sign.svg","eject-symbol.svg","envelope-of-white-paper.svg","envelope.svg","euro-currency-symbol.svg","exchange-arrows.svg","exclamation-sign.svg","exclamation.svg","external-link-square-with-an-arrow-in-right-diagonal.svg","external-link-symbol.svg","eye-open.svg","eye-with-a-diagonal-line-interface-symbol-for-invisibility.svg","facebook-logo-1.svg","facebook-logo.svg","facetime-button.svg","fast-forward-arrows.svg","female-silhouette.svg","fighter-jet-silhouette.svg","file.svg","film-strip-with-two-photograms.svg","filter-tool-black-shape.svg","finger-of-a-hand-pointing-to-right-direction.svg","fire-extinguisher.svg","fire-symbol.svg","flag-black-shape.svg","flickr-website-logo-silhouette.svg","fluffy-cloud-silhouette.svg","folder-closed-black-shape.svg","folder-white-shape.svg","font-selection-editor.svg","font-symbol-of-letter-a.svg","fork-and-knife-silhouette.svg","forward-button.svg","four-black-squares.svg","foursquare-button.svg","frown.svg","fullscreen-symbol.svg","gamepad-console.svg","gift-box.svg","github-character.svg","github-logo.svg","github-sign.svg","gittip-website-logo.svg","google-plus-symbol-1.svg","google-plus-symbol.svg","great-britain-pound.svg","group-profile-users.svg","half-star-shape.svg","hand-finger-pointing-down.svg","hand-pointing-to-left-direction.svg","hand-pointing-upward.svg","hard-drive.svg","heart-shape-outline.svg","heart-shape-silhouette.svg","home.svg","horizontal-resize-option.svg","hostpital-building.svg","hotel-letter-h-sign-inside-a-black-rounded-square.svg","html-5-logo.svg","inbox.svg","increase-size-option.svg","indent-right.svg","information-button.svg","information-symbol.svg","instagram-symbol.svg","italicize-text.svg","keyboard.svg","left-arrow-1.svg","left-arrow.svg","left-indentation-option.svg","legal-hammer.svg","lemon.svg","leter-a-inside-a-black-circle.svg","letter-p-symbol.svg","level-up.svg","light-bulb.svg","lightning-bolt-shadow.svg","link-symbol.svg","linkedin-letters.svg","linkedin-sign.svg","linux-logo.svg","list-on-window.svg","list-with-dots.svg","list.svg","listing-option.svg","long-arrow-pointing-to-left.svg","long-arrow-pointing-to-the-right.svg","long-arrow-pointing-up.svg","magic-wand.svg","magnifying-glass.svg","man.svg","map-marker.svg","maxcdn-website-logo.svg","medical-kit.svg","meh-face-emoticon.svg","microphone-black-shape.svg","microphone-off.svg","minus-button.svg","minus-sign-inside-a-black-circle.svg","minus-sign-inside-a-black-rounded-square-shape.svg","minus-sign-on-a-square-outline.svg","minus-symbol.svg","mobile-phone.svg","moon-phase-outline.svg","move-option.svg","music-headphones.svg","music-note-black-symbol.svg","musical-bell-outline.svg","nine-black-tiles.svg","numbered-list.svg","open-folder-outline.svg","open-folder.svg","open-laptop-computer.svg","open-padlock-silhouette.svg","open-wrench-tool-silhouette.svg","padlock-unlock.svg","padlock.svg","paper-bill.svg","paper-clip-outline.svg","paper-push-pin.svg","paste-from-clipboard.svg","pause-symbol.svg","pencil.svg","photo-camera.svg","picture.svg","pinterest-logo.svg","pinterest-sign.svg","plane.svg","plant-leaf-with-white-details.svg","play-button.svg","play-circle.svg","play-sign.svg","play-video-button.svg","plus-black-symbol.svg","plus-sign-in-a-black-circle.svg","plus-symbol-in-a-rounded-black-square.svg","power-button-off.svg","printing-tool.svg","puzzle-piece-silhouette.svg","qr-code.svg","question-mark-on-a-circular-black-background.svg","question-sign.svg","quote-left.svg","reduced-volume.svg","refresh-arrow.svg","refresh-page-option.svg","remove-button.svg","remove-symbol.svg","renren-social-network-of-china-logotype.svg","reorder-option.svg","reply-arrow.svg","reply.svg","resize-option.svg","retweet-arrows-symbol.svg","rewind-button.svg","right-arrow-in-a-circle.svg","right-chevron.svg","right-quotation-mark.svg","road-perspective.svg","rounded-black-square-shape.svg","rss-feed-button.svg","rss-symbol.svg","rupee-indian.svg","save-file-option.svg","screenshot.svg","settings.svg","share-option.svg","share-post-symbol.svg","share-symbol.svg","shield.svg","shopping-cart-black-shape.svg","sign-in.svg","sign-out-option.svg","signal-bars.svg","sitemap.svg","skype-logo.svg","small-rocket-ship-silhouette.svg","smile.svg","sort-arrows-couple-pointing-up-and-down.svg","sort-by-alphabet.svg","sort-by-attributes-interface-button-option.svg","sort-by-attributes.svg","sort-by-numeric-order.svg","sort-by-order.svg","sort-down.svg","sort-reverse-alphabetical-order.svg","sort-up.svg","speech-bubbles-comment-option.svg","spinner-of-dots.svg","square-shape-shadow.svg","stack-exchange-logo.svg","stack-exchange-symbol.svg","star-1.svg","star-half-empty.svg","star.svg","step-backward.svg","step-forward.svg","stethoscope.svg","strikethrough.svg","suitcase-with-white-details.svg","sun.svg","superscript-text-formatting.svg","table-grid.svg","tag-black-shape.svg","tags.svg","tasks-list.svg","telephone-handle-silhouette.svg","telephone-symbol-button.svg","terminal.svg","text-file-1.svg","text-file.svg","text-height-adjustment.svg","text-width.svg","thin-arrowheads-pointing-down.svg","three-small-square-shapes.svg","thumb-down.svg","thumbs-down-silhouette.svg","thumbs-up-hand-symbol.svg","thumbs-up.svg","ticket.svg","time.svg","tint-drop.svg","trash.svg","trello-website-logo.svg","trophy.svg","tumblr-logo-1.svg","tumblr-logo.svg","turkish-lire-symbol.svg","twitter-black-shape.svg","twitter-sign.svg","two-columns-layout.svg","u-shaped-thick-magnet.svg","umbrella-black-silhouette.svg","underline-text-option.svg","undo-arrow.svg","unlink-symbol.svg","up-arrow.svg","up-chevron-button.svg","upload-button.svg","upload.svg","user-md-symbol.svg","user-shape.svg","vertical-ellipsis.svg","vertical-resizing-option.svg","video-play-square-button.svg","vimeo-square-logo.svg","vintage-key-outline.svg","vk-social-network-logo.svg","volume-off.svg","volume-up-interface-symbol.svg","warning-sign-on-a-triangular-background.svg","weibo-website-logo.svg","wheelchair.svg","white-flag-symbol.svg","windows-logo-silhouette.svg","x2-symbol-of-a-letter-and-a-number-subscript.svg","xing-logo.svg","xing-logotype.svg","yen-symbol.svg","youtube-logo-1.svg","youtube-logo-2.svg","youtube-logo.svg","zoom-in.svg","zoom-out.svg"];

    $scope.hideSvg = true;
    $scope.previewSvg = "";
    $scope.loadSvg = function (svgName) {
        request();
        request(svgName);
    }
    $scope.motion = null;

    var request = function (svgName) {
        var url = '/src/svg/' + (svgName ? svgName : '');
        $http({
          method: 'GET',
          url: url
        }).then(function successCallback(response) {
            if(svgName){
                $scope.previewSvg = $sce.trustAsHtml(response.data);
                initMotion();
            }else{
                $scope.svgArr = response.data;
            }
          }, function errorCallback(response) {
              console.log("Something went wrong, what a bummer")
          });
    }

    var initMotion = function () {
        $timeout(function(){
            var svg = document.querySelector('.preview svg');
            $scope.motion = new zMotion(svg,{
                duration    : '5s',
                delay       : 500,
                shuffle     : false,
                clearStroke : true,
                clearFill   : true,
                drawStroke  : true,
                drawFill    : false,
                terminus    : false,
                reverse     : false,
                easing      : "ease"
            });

            $scope.motion.clear();
            $timeout(function(){$scope.motion.draw(); $scope.hideSvg = false},50)
        },0);

    }

    // request();
    request('tripadvisor.svg');


});
