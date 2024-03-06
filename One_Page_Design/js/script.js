$(document).ready(function () {
	// Transition effect for navbar 
	$(window).scroll(function () {
		// checks if window is scrolled more than 500px, adds/removes solid class
		if ($(this).scrollTop() > 500) {
			$('.navbar').addClass('solid');
		} else {
			$('.navbar').removeClass('solid');
		}
	});
});
$(document).ready(function () {
	// Transition effect for navbar 
	$(window).scroll(function () {
		// checks if window is scrolled more than 500px, adds/removes solid class
		if ($(this).scrollTop() > 500) {
			$('.nav-link').addClass('active');
		} else {
			$('.nav-link').removeClass('active');
		}
	});
});
// jQuery counterUp (used in Whu Us section)
$('[data-toggle="counter-up"]').counterUp({
	delay: 10,
	time: 1000
});

// Clients carousel (uses the Owl Carousel library)
$(".clients-carousel").carousel - inner({
	autoplay: true,
	dots: true,
	loop: true,
	responsive: {
		0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 }
	}
});

}) (jQuery);

function openModal() {
	document.getElementById("myModal").style.display = "block";
}

function closeModal() {
	document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("demo");
	var captionText = document.getElementById("caption");
	if (n > slides.length) { slideIndex = 1 }
	if (n < 1) { slideIndex = slides.length }
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
	captionText.innerHTML = dots[slideIndex - 1].alt;
}

$(window).scroll(function () {
	var height = $(window).scrollTop();
	if (height > 100) {
		$('#scrollUp').fadeIn();
	} else {
		$('#scrollUp').fadeOut();
	}
});
$(document).ready(function () {
	$("#scrollUp").click(function (event) {
		event.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

});

$(window).scroll(function (event) {
	function footer() {
		var scroll = $(window).scrollTop();
		if (scroll > 50) {
			$(".footer-nav").fadeIn("slow").addClass("show");
		}
		else {
			$(".footer-nav").fadeOut("slow").removeClass("show");
		}

		clearTimeout($.data(this, 'scrollTimer'));
		$.data(this, 'scrollTimer', setTimeout(function () {
			if ($('.footer-nav').is(':hover')) {
				footer();
			}
			else {
				$(".footer-nav").fadeOut("slow");
			}
		}, 2000));
	}
	footer();
});

new WOW().init();

//Counting numberz
jQuery(window).scroll(startCounter);
function startCounter() {
	var hT = jQuery('.counters').offset().top,
		hH = jQuery('.counters').outerHeight(),
		wH = jQuery(window).height();
	if (jQuery(window).scrollTop() > hT + hH - wH) {
		jQuery(window).off("scroll", startCounter);
		jQuery('.counter').each(function () {
			var $this = jQuery(this);
			jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
				duration: 4000,
				easing: 'swing',

			});
		});
	}
}
 //Validation form

function validate() {
	var name = document.getElementById('name');
	if (!name.value) {
		alert('Fill the Input name');
		name.focus();
		return false;
	}

	var email = document.getElementById('email');
	if (!email.value) {
		alert('Fill the Input email');
		email.focus();
		return false;
	}

	// No need to check if (email.value) again
	if (!checkEmail(email.value)) {
		alert('Please specify your correct Email!');
		email.focus();
		return false;
	}

	var subject = document.getElementById('title');
	if (!subject.value) {
		alert('Fill the Input title');
		subject.focus();
		return false;
	}

	var message = document.getElementById('comment');
	if (!message.value) {
		alert('Fill the Input comment');
		message.focus();
		return false;
	}

	// No need for an else here
	return true;
}
