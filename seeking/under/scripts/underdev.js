// Zepto/jQuery fadeLoop plugin for fade slide show effects by ali.md and Edited Bye newStyle team.
(function ($) {
	$.extend($.fn, {
		fadeLoop: function (options) {

			options = $.extend({
				duration: 2500,
				delay: 2000,
				startIndex: -1,
				fadeFirstImage: true
			}, options);

			var nextPic, pics = this,
				indx = options.startIndex,
				plen = this.length,
				fadeIn = {
					opacity: 1
				},
				fadeOut = {
					opacity: 0
				},
				ease = !! window.Zepto ? 'ease-in-out' : 'swing';
			pics.css(fadeOut);
			options.fadeFirstImage || pics.eq(0).css(fadeIn);
			(nextPic = function () {
				pics.eq(indx).animate(fadeOut, options.duration, ease);
				indx = indx < plen - 1 ? indx + 1 : 0;
				//$(".progress").css("display",!indx ? "block":"none");
				pics.eq(indx).animate(fadeIn, options.duration, ease, function () {
					setTimeout(nextPic, options.delay);
				});
			})();
		}
	});
})($)

$(function () {
	$('.backimg > div').fadeLoop();
	$('.backimg > div').eq(0).html('<div class="progress"><p class="indent">7%</p></div>');
});