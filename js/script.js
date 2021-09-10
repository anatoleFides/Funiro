
var isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};

window.onload = function (){
	document.addEventListener("click", documentActions);

	function documentActions(e) {
		const targetElement = e.target;
		if (window.innerWidth > 768 && isMobile.any()) {
			if (targetElement.classList.contains('menu__arrow')) {
				targetElement.closest('.menu__item').classList.toggle('_hover');
			}
			if(!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').lenght >0) {
				_removeClass(document.querySelectorAll('.menu__item._hover'), "._hover");
			}
		}

		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('_active');
		} else if(!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}
	}
}

$(document).ready(function(){
	//Burger
	$('.icon-menu').click(function(event) {
		$('.icon-menu, .menu__body').toggleClass('_open');
		$('body').toggleClass('lock');
	});
	//spoller
	
	$('.menu__arrow').click(function(event) {
		if (window.innerWidth < 768 && isMobile.any()){
			$(this).toggleClass('_open').next().slideToggle(300);
			}
	
	});
	// $('.menu-footer__button').click(function(event) {
	// 	if (window.innerWidth < 768 && isMobile.any()){
	// 		$(this).toggleClass('_init').next().slideToggle(300);
	// 		}
	
	// });

		$('.menu-footer__title').click(function(e) {
		e.preventDefault();
		var
			$this = $(this),
			item = $this.closest('.menu-footer__column'),
			list = $this.closest('.menu-footer'),
			items = list.find('.menu-footer__column'),
			content = item.find('.menu-footer__list'),
			otherContent = list.find('.menu-footer__list'),
			duration = 300;

		if (!item.hasClass('init')){
			items.removeClass('init');
			item.addClass('init');
			otherContent.slideUp(duration);
			content.slideDown(duration);
		} else {
			content.slideUp(duration);
			item.removeClass('init');
		}


	});
});


// $(document).ready(function(){
// 	$('.menu__arrow').click(function(event) {

// 		var
// 			$this = $(this),
// 			item = 

// 	});
// });