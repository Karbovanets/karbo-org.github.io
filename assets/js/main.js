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

	//====== counter up 
	var cu = new counterUp({
		start: 0,
		duration: 2000,
		intvalues: true,
		interval: 100,
	});
	cu.start();

	//============== isotope masonry js with imagesloaded
	imagesLoaded('#container', function () {
		var elem = document.querySelector('.grid');
		var iso = new Isotope(elem, {
			// options
			itemSelector: '.grid-item',
			sortBy: 'random', // to make all partners equal
			masonry: {
				// use outer width of grid-sizer for columnWidth
				columnWidth: '.grid-item'
			}
		});

		let filterButtons = document.querySelectorAll('.partners-btn-wrapper button');
		filterButtons.forEach(e =>
			e.addEventListener('click', () => {

				let filterValue = event.target.getAttribute('data-filter');
				iso.arrange({
					filter: filterValue
				});
			})
		);
	});


	//======= partners-btn active
	var elements = document.getElementsByClassName("partners-btn");
	for (var i = 0; i < elements.length; i++) {
		elements[i].onclick = function () {

			// remove class from sibling

			var el = elements[0];
			while (el) {
				if (el.tagName === "BUTTON") {
					//remove class
					el.classList.remove("active");

				}
				// pass to the new sibling
				el = el.nextSibling;
			}

			this.classList.add("active");
		};
	}


	// for menu scroll 
	var pageLink = document.querySelectorAll('.page-scroll');

	pageLink.forEach(elem => {
		elem.addEventListener('click', e => {
			e.preventDefault();
			document.querySelector(elem.getAttribute('href')).scrollIntoView({
				behavior: 'smooth',
				offsetTop: 1 - 60,
			});
		});
	});

	// section menu active
	function onScroll(event) {
		var sections = document.querySelectorAll('.page-scroll');
		var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		for (var i = 0; i < sections.length; i++) {
			var currLink = sections[i];
			var val = currLink.getAttribute('href');
			var refElement = document.querySelector(val);
			var scrollTopMinus = scrollPos + 73;
			if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
				document.querySelector('.page-scroll').classList.remove('active');
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

	window.document.addEventListener('scroll', onScroll);

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


    //======== height of hero splash screen ==========
	function setSplashHeight() {
		var splashheight = window.innerHeight;
		var splash = document.getElementById("home");
		splash.style.minHeight = splashheight + "px";
	}

	setSplashHeight();

	window.onresize = function(event) {
		setSplashHeight();
	}
	
    //======== stats ==========
	var block, last_block_hash, blocks_time_avg, last_block_height, next_difficulty, next_reward, hashrate;

		function updateText(elementId, text){
			var el = document.getElementById(elementId);
			if (el.textContent !== text){
				el.textContent = text;
			}
			return el;
		}
		
		function formatSupply(coins, digits){
			var amount = (parseInt(coins || 0) / 1000000000000).toFixed(digits || 12);
			return amount;
		}

		function getReadableHashRateString(hashrate){
			var i = 0;
			var byteUnits = [' H/s', ' kH/s', ' MH/s', ' GH/s', ' TH/s', ' PH/s' ];
			while (hashrate > 1024){
				hashrate = hashrate / 1024;
				i++;
			}
			return hashrate.toFixed(2) + byteUnits[i];
		}
		
		function getReadableDifficultyString(difficulty){
			var i = 0;
			var Units = ['', ' k', ' M', ' G', ' T', ' P'];
			while (difficulty > 1000){
				difficulty = difficulty / 1000;
				i++;
			}
			return difficulty.toFixed(2) + Units[i];
		}


	function statsRefresh() {
		var request = new XMLHttpRequest();
		request.open('GET', 'https://karbo.club/services/node_web/getinfo', true);

		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
				var data = JSON.parse(request.responseText);

				last_block_height = data.height;
				updateText('blockchain-height', last_block_height);
				
				next_difficulty = data.difficulty;
				updateText('difficulty', getReadableDifficultyString(next_difficulty));
				
				next_reward = data.next_reward;
				updateText('reward', formatSupply(next_reward) + ' KRB');
				
				hashrate = next_difficulty/240;
				updateText('hashrate', getReadableHashRateString(hashrate));
				
				updateText('emission', data.already_generated_coins + ' KRB');
			   
		  } else {
			// We reached our target server, but it returned an error
		  }
		};

		request.onerror = function() {
		  // There was a connection error of some sort
		};

		request.send();
		}
	// Do the initial pull
	statsRefresh();
	// Refresh every 300000
	setInterval(statsRefresh, 300000);

})();