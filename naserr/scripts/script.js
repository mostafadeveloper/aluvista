// jquery my code
var codeStationJq = {
	ready: function () {
		$("section.container > .down").wrapAll("<section id='con'></section>");

		/* ajax load ! */
		$ajaxPath = [ /* this path load in #con => section.container > .down > #con ;)*/ 
			"header .down nav li a",
			"footer .down nav li a"
		];
		for (i = 0; i < $ajaxPath.length; i++)
		$($ajaxPath[i]).click(function (e) {
			e.preventDefault();
			(function (response) {
				$("#con").hide().load(response).fadeIn("normal");
				//The pushState(data, title, url) method adds a state object entry to the history.
				window.history.pushState(response, "", response.substring(6));
			})($(this).attr("href"));
			window.onpopstate = function (e) {
				e.state && $("#con").hide().load(e.state).fadeIn("normal");
			};
		});

		var $pathMenu = [ /* this path can active menu in page ;)*/
			"header .right .down nav a",
			"section.container .top nav a",
			"footer .down nav a"
		], $pos;

		/* active menu ! */
		/* if click on links active its ! */
		for (i = 0; i <= 2; i++) /* 0=>top menu header, 2=> down menu footer */
		(function ($arg) {
			$($pathMenu[$arg]).bind('click', function () {
				$index = $($pathMenu[$arg]).index(this);
				$($pathMenu[$arg]).removeClass("active").eq($index).addClass("active");
				$pos = $index;
			});
		})(i); /* mouse hover ! */
		/* if mouse enter on links ;) */
		for (i = 0; i <= 2; i += 2) /* 0=>top menu header, 2=> down menu footer */
		(function ($arg) {
			$($pathMenu[$arg]).bind('mouseenter', function () {
				$index = $($pathMenu[$arg]).index(this);
				$($pathMenu[0]).removeClass("active").eq($index).addClass("active");
				$($pathMenu[2]).removeClass("active").eq($index).addClass("active");
			});
		})(i); /* if mouse leave links ;) */
		$($pathMenu[0] + ", " + $pathMenu[2]).bind('mouseleave', function () {
			$($pathMenu[0] + ", " + $pathMenu[2]).removeClass("active");
			$($pathMenu[0]).eq($pos).addClass("active");
			$($pathMenu[2]).eq($pos).addClass("active");
		}); 
		/* my work on banner and relation it with menu ;) */
		/*Slider basic work ;)*/
		var imgsInBanner = {
			"home"  : {/* for page Home ! */
				pics : [
					"images/gallery/sliderpic1.jpg",
					"images/gallery/sliderpic2.jpg",
					"images/gallery/sliderpic3.jpg",
					"images/gallery/sliderpic4.jpg",
					"images/gallery/sliderpic5.jpg"
				]
			}
		};
		var inx_img = 0, $dummy = -1;
		$(".container .slider section > .middle").css('position', 'relative')
			.addClass("view")
				.html("<img width='430' height='300' src='images/gallery/sliderpic1.jpg' alt='image pic slider' >");
		$(".view img").css({
			'z-index': '-1',
			'position': 'absolute',
			'left': '0'
		});
		efct_banner = function ($newpos) {
			$(".view img").hide().attr("src", imgsInBanner["home"].pics[$newpos]).fadeIn();
		}
		$("section.container .top nav a").bind('click', function (event) {
			event.preventDefault();
			efct_banner($pos);
			$dummy = $pos === imgsInBanner["home"].pics.length - 1 ? -1 : $pos;
		});
		(change_image = function () {
			efct_banner(++$dummy);
			$("section.container .top nav a").removeClass("active").eq($dummy).addClass("active");
			$dummy = $dummy >= imgsInBanner["home"].pics.length - 1 ? -1 : $dummy;
			setTimeout(change_image, 3000);
		})();
		for (var i = 0; i < document.links.length; i++) {
			document.links[i].onfocus = function () {
				this.blur();
			};
		}
	}
};

$(document).ready(codeStationJq.ready);