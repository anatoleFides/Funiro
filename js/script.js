
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

		if (targetElement.classList.contains('products__more')) {
			getProducts(targetElement);
			e.preventDefault();
	}

	// Header
	const headerElement = document.querySelector('.header');

	const callback = function(entries, observer) {
		if (entries[0].isIntersecting) {
			headerElement.classList.remove('_scroll');
		} else {
			headerElement.classList.add('_scroll');
		}
		
	}

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(headerElement);
}
}

$(document).ready(function(){
	//Burger
	$('.icon-menu').click(function(event) {
		$('.icon-menu, .menu__body').toggleClass('_open');
		//$('body').toggleClass('lock');
	});

	// Spoller header
	$('.menu__arrow').click(function(event) {
		if (window.innerWidth < 768 && isMobile.any()){
			$(this).toggleClass('_open').next().slideToggle(300);
			}
		$(window).resize(function() {
			location.reload();
		});
	});

	// Spoller footer
	$('.menu-footer__title, .menu-footer__arrow').click(function(e) {
		e.preventDefault();
		var
			$this = $(this),
			item = $this.closest('.menu-footer__column'),
			list = $this.closest('.menu-footer'),
			items = list.find('.menu-footer__column'),
			content = item.find('.menu-footer__list'),
			otherContent = list.find('.menu-footer__list'),
			duration = 300;

		if (window.innerWidth < 768 && isMobile.any()){
			if (!item.hasClass('init')){
				items.removeClass('init');
				item.addClass('init');
				otherContent.slideUp(duration);
				content.slideDown(duration);
			} else {
				content.slideUp(duration);
				item.removeClass('init');
			}
		}
		$(window).resize(function() {
			location.reload();
		});
	});
});

//Swiper
if (document.querySelector('.slider-main__body')){
	new Swiper ('.slider-main__body', {
		observer: true,
		observerParents: true,
		slidesPerView: 1,
		spaceBetween: 32,
		watchOverflow: true,
		speed: 1200,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		pagination: {
			el: '.controls-slider-main__dots',
			clickable: true,
		},
		navigation:{
			nextEl: '.slider-main .slider-arrow_next',
			prevEl: '.slider-main .slider-arrow_prev',
		}
	});
}

//Load more Products
async function getProducts(button){
	if(!button.classList.contains('_hold')) {
		button.classList.add('_hold');
		const file = "json/products.json";
		let response = await fetch(file, {
			method: "GET"
		});
		if (response.ok) {
			let result = await response.json();
			loadProducts(result);
			button.classList.remove('_hold');
			button.remove();
		} else {
			alert("Ошибка");
		}
	}
}

function loadProducts(data){
	const productsItems = document.querySelector('.products__items');

	data.products.forEach(item => {
		const productID = item.id;
		const productUrl = item.url;
		const productImage = item.image;
		const productTitle = item.title;
		const productText = item.text;
		const productPrice = item.price;
		const productOldPrice = item.priceOld;
		const productShareUrl = item.shareUrl;
		const productLikeUrl = item.likeUrl;
		const productLables = item.lables;

		let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
		let productTemplateEnd = `</article>`;

		let productTemplateLabels = '';
		if (productLabels) {
			let productTemplateLabelsStart = `<div class="item-product__labels">`;
			let productTemplateLabelsEnd = `</div>`;
			let productTemplateLabelsContent = '';

			productLabels.forEach(labelItem => {
				productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
			});

			productTemplateLabels += productTemplateLabelsStart;
			productTemplateLabels += productTemplateLabelsContent;
			productTemplateLabels += productTemplateLabelsEnd;
			}

			let productTemplateImage = `
		<a href="${productUrl}" class="item-product__image _ibg">
			<img src="img/products/${productImage}" alt="${productTitle}">
		</a>
	`;

			let productTemplateBodyStart = `<div class="item-product__body">`;
			let productTemplateBodyEnd = `</div>`;

			let productTemplateContent = `
		<div class="item-product__content">
			<h3 class="item-product__title">${productTitle}</h3>
			<div class="item-product__text">${productText}</div>
		</div>
	`;

			let productTemplatePrices = '';
			let productTemplatePricesStart = `<div class="item-product__prices">`;
			let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
			let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
			let productTemplatePricesEnd = `</div>`;

			productTemplatePrices = productTemplatePricesStart;
			productTemplatePrices += productTemplatePricesCurrent;
			if (productOldPrice) {
				productTemplatePrices += productTemplatePricesOld;
			}
			productTemplatePrices += productTemplatePricesEnd;

			let productTemplateActions = `
		<div class="item-product__actions actions-product">
			<div class="actions-product__body">
				<a href="" class="actions-product__button btn btn_white">Add to cart</a>
				<a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
				<a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
			</div>
		</div>
	`;

			let productTemplateBody = '';
			productTemplateBody += productTemplateBodyStart;
			productTemplateBody += productTemplateContent;
			productTemplateBody += productTemplatePrices;
			productTemplateBody += productTemplateActions;
			productTemplateBody += productTemplateBodyEnd;

			let productTemplate = '';
			productTemplate += productTemplateStart;
			productTemplate += productTemplateLabels;
			productTemplate += productTemplateImage;
			productTemplate += productTemplateBody;
			productTemplate += productTemplateEnd;

			productsItems.insertAdjacentHTML('beforeend', productTemplate);
	});
}
