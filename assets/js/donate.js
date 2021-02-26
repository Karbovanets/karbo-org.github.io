(function () {
		
			"use strict";

			//===== Prealoder

			window.onload = function () {
				window.setTimeout(fadeout, 200);
			}

			function fadeout() {
				document.querySelector('.preloader').style.opacity = '0';
				document.querySelector('.preloader').style.display = 'none';
			}


			/*=====================================
			Sticky
			======================================= */
			window.onscroll = function () {
				var header_navbar = document.querySelector(".navbar-area");
				var sticky = header_navbar.offsetTop;

				if (window.pageYOffset > sticky) {
					header_navbar.classList.add("sticky");
				} else {
					header_navbar.classList.remove("sticky");
				}

				// show or hide the back-top-top button
				var backToTo = document.querySelector(".scroll-top");
				if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
					backToTo.style.display = "block";
				} else {
					backToTo.style.display = "none";
				}
			};
		
			//WOW Scroll Spy
			var wow = new WOW({
				//disabled for mobile
				mobile: false
			});
			wow.init();
		

			//===== close navbar-collapse when a  clicked
			let navbarToggler = document.querySelector(".navbar-toggler");
			var navbarCollapse = document.querySelector(".navbar-collapse");

			document.querySelectorAll(".page-scroll").forEach(e =>
				e.addEventListener("click", () => {
					navbarToggler.classList.remove("active");
					navbarCollapse.classList.remove('show')
				})
			);
			navbarToggler.addEventListener('click', function () {
				navbarToggler.classList.toggle("active");
			}) 

			new QRCode(document.getElementById("qrcode_krb"), "karbowanec:"+document.getElementById('address_krb').textContent);
			
			
			// =============== localize =============== //
	
			function localize (language) {
				document.querySelectorAll("[lang]").forEach((el) => {	
					if (el.getAttribute("lang") == language) 
						el.style.display = "unset";
					else
						el.style.display = "none";			
				});
			}

			let lang = window.navigator.languages ? window.navigator.languages[0] : null;
			lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;

			let shortLang = lang;
			if (shortLang.indexOf('-') !== -1)
				shortLang = shortLang.split('-')[0];

			if (shortLang.indexOf('_') !== -1)
				shortLang = shortLang.split('_')[0];
			
			let langSelector = document.getElementById('language_selector');
			langSelector.onchange = function() {
				localize(langSelector.options[langSelector.selectedIndex].value);
			}
			
			let langs = ["en", "de", "es", "pl", "uk", "ru", "cn", "jp", "kr"];
			if (!langs.includes(shortLang)) {
				shortLang = en;
			}

			localize(shortLang);
			
			var langOpts = langSelector.options;
			for (var opt, j = 0; opt = langOpts[j]; j++) {
				if (opt.value == shortLang) {
					langSelector.selectedIndex = j;
					break;
				}
			}
			
})();