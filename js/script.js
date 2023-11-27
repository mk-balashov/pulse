$(document).ready(function(){
	$('.carousel_inner').slick({
		speed: 1200,
		slidesToShow: 1,
		// adaptiveHeight: true,
		// autoplay: true,
		// autoplaySpeed: 2000
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					dots: true,
					arrows: false
				}
			}
		]
	  });

	  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	  });
		/* знак доллара берет элементы по селектору */
	//   $('.catalog-item__link').each(function(i){
	//     $(this).on('click', function(e){
	//         e.preventDefault(); /* отменяем стандартное поведение браузера чтобы при клике на пустую ссылку не кидало вверх */
	//         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
	//         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
	//     })
	//   });
	//   $('.catalog-item__back').each(function(i){
	//     $(this).on('click', function(e){
	//         e.preventDefault(); /* отменяем стандартное поведение браузера чтобы при клике на пустую ссылку не кидало вверх */
	//         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
	//         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active'); /* eq(i) используеться чтобы срабатывала не у всех ссылок а у конкретной */
	//     })
	//   });
	  function toggleSlide(item){
		$(item).each(function(i){
			$(this).on('click', function(e){
				e.preventDefault(); /* отменяем стандартное поведение браузера чтобы при клике на пустую ссылку не кидало вверх */
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active'); /* eq(i) используеться чтобы срабатывала не у всех ссылок а у конкретной */
			})
		  });
	  };
	  toggleSlide('.catalog-item__link');
	  toggleSlide('.catalog-item__back');

	  // madal window
	$('[data-modal=consultation]').on('click', function(){ // кри клике на кнопку с дата атрибутом 
		$('.overlay, #consultation').fadeIn('slow');// ещется оверлей и йд и включаеться
	});
	$('.modal__close').on('click', function(){ // кри клике на кнопку с дата атрибутом 
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');// ещется оверлей и йд и и выключаеться
	});
	// $('.button_mini').on('click', function(){ // кри клике на кнопку с классом(потомучто он у нас один)
	// 	$('.overlay, #order').fadeIn('slow');// ещется оверлей и йд и включаеться
	// });
	$('.button_mini').each(function(i){ // берем класс и each перебирает его и запоминает порядковый номер
		$(this).on('click', function(){// при клике на конкретную кнопку
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text()); //берем модальное окно ордер с класс дескр  и подставляем туда текст из класса который указали(из конкретного)
			$('.overlay, #order').fadeIn('slow');
			
		})
	})
	// $('#consultation-form').validate();
	// $('#consultation form').validate({ // валидация полей формы через плагиг ниже настройки
	// 	rules:{
	// 		name: {
	// 			required: true,
	// 			minlength: 2
	// 		  },
	// 		phone: "required",
	// 		email: {
	// 			required:true,
	// 			email: true
	// 		}
	// 	},
	// 	messages:{
	// 		name: {
	// 			required: "Введите имя",
	// 			minlength: jQuery.validator.format("введите {0} сиволов")
	// 		  },
	// 		phone: "Введите номер телефона",
	// 		email: {
	// 			required:"введите почту",
	// 			email: "неверный формат"
	// 		}
	// 	}
	// }); // берет форму из блока консультация метод из плагина по валидации
	// $('#order form').validate();
	function validateForms(form){ // функция проверки форм, чтобы не дублировать тонну кода
		$(form).validate({ // валидация полей формы через плагиг ниже настройки
			rules:{
				name: {
					required: true,
					minlength: 2
				  },
				phone: "required",
				email: {
					required:true,
					email: true
				}
			},
			messages:{
				name: {
					required: "Введите имя",
					minlength: jQuery.validator.format("введите {0} сиволов")
				  },
				phone: "Введите номер телефона",
				email: {
					required:"введите почту",
					email: "неверный формат"
				}
			}
		});
	};
	validateForms('#consultation-form'); // функция валидации форм
	validateForms('#consultation form');
	validateForms('#order form');
	$('input[name=phone]').mask("+7(999) 999-99-99"); // маски для полей

	$('form').submit(function(e) { // берем все формы и при сабмите выполняем функцию
		e.preventDefault();// отмена перзагрузок
		$.ajax({
			type:"POST",// отдаем данные на сервер
			url:"mailer/smart.php", // обращаемся к файлу смарт
			data: $(this).serialize()
		}).done(function(){
			$(this).find("input").val("");//очищаем инпуты после отправки
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset'); //все формы очищаются
		});
		return false;
	});
	// дальше скрипт для срола и апа вверх
	$(window).scroll(function(){// при скроле будет срабатывать функция
		if($(this).scrollTop()>600){ // если нашу страницу, проскролили больше чем на 1600 px
			$('.pageup').fadeIn() // то кнопка появляеться
		}
		else{
			$('.pageup').fadeOut()// иначе кнопка скрыта
		}
	});
	$("a[href^=#up]").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});
	new WOW().init();
  });