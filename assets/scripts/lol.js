var page;
function $( el ) {
	return document.getElementById( el );
}
function t(code, time){
	return setTimeout( code , time );
}

function clearActiveNav() {
	var a = $( 'navigation' ).getElementsByTagName( 'a' );
	for (b in a) {
		a[b].className = '';
	}
	var allPages = document.getElementsByClassName( 'contentBox' );
	for ( mark in allPages ){
		( function( vv ) {
			if ( typeof(vv) === 'object' ) {
				vv.className = vv.className.replace( 'o1' , 'o0' );
				vv.className = vv.className.replace( 'front' , 'back' );						
			}
		} )( allPages[mark] );
	}
}

function switchContact (key) {
	if (key === 'fb') {
		$('contactCard').innerHTML = "<span id='f154f125'>fb.com/thezillion</span>";
		$('f154f125').className = 'fbblue';
	}
	else if (key === 'mail') {
		$('contactCard').innerHTML = "<span id='f154f125'>thezillion@mail.com</span>";
		$('f154f125').className = 'mailgrey';
	}
	else if (key === 'tw') {
		$('contactCard').innerHTML = "<span id='f154f125'>@thezillion</span>";
		$('f154f125').className = 'twblue';
	}
	else if (key === 'gp') {
		$('contactCard').innerHTML = "<span id='f154f125'>gplus.to/thezillion</span>";
		$('f154f125').className = 'gpred';
	}
	else {
		$('contactCard').innerHTML = ".";
	}
}

function open( el ) {
	with ( el ) {
		className = className.replace( 'o0' , 'o1' );
		className = className.replace( 'back' , 'front' );
		var thetitle = (el.getAttribute('data-window-title') !== '') ? (el.getAttribute('data-window-title') + ' \u2014 Prince Mathew \u00B7 Web Developer, Designer & Blogger') : 'Prince Mathew \u00B7 Web Developer, Designer & Blogger';
		window.title = thetitle;
		var Imgs = getElementsByTagName( 'img' );
		for ( dude in Imgs ) {
			(function(k) {
				if ( typeof(k) === 'object' ) {
					if ( !k.src ) {
						k.setAttribute( 'src' , k.getAttribute( 'data-src' ) );
					}
				}
			})(  Imgs[dude]  );
		}
	}
}

function setPointer( el , sect ) {
	clearActiveNav();
	page = sect;
	open( $( page ) );
	el.className = 'active';
	( function( __radA , __radB ) {
	__radA.borderWidth = '0px';
	with ( __radB ) {
		top = ( el.offsetTop + el.offsetHeight - 3 ) + 'px';
		left = ( el.offsetLeft ) + 'px';
		width = ( el.offsetWidth ) + 'px';
	}
	setTimeout( function() {
		__radB.opacity = '1';
		__radA.borderWidth = '5px';
	}, 500);
	} )( $( 'backPointer' ).style , $( 'navPointer' ).style );
}

function isPage( hash ) {
	var hash = hash.replace( '#!/' , '' );
	if ( $( hash ) ) {
		if ( $( hash ).className.indexOf( 'contentBox' ) !== -1 ) {
			return true;
		}
	}
	return false;
}

function loadPage( pg , sect ) {
	setPointer( $( pg ) , sect );
}

function ageTimer() {
	var usdin = (new Date("July 22, 1997 03:49:44")).getTime();
	setInterval(function() {
		var aaj = (new Date()).getTime(),
			passed = aaj - usdin,
			ss = parseInt((passed / (1000)) % 60),
			mm = parseInt((passed / (1000*60)) % 60),
			hh = parseInt((passed / (1000*60*60)) % 24),
			dd = parseInt((passed / (1000*60*60*24)) % 30.5),
			mo = parseInt((passed / (1000*60*60*24*30.5)) % 12),
			yy = parseInt(passed / (1000*60*60*24*30.5*12));
		ss = (ss < 10) ? 0 + ss.toString() : ss;
		mm = (mm < 10) ? 0 + mm.toString() : mm;
		hh = (hh < 10) ? 0 + hh.toString() : hh;
		dd = (dd < 10) ? 0 + dd.toString() : dd;
		mo = (mo < 10) ? 0 + mo.toString() : mo;
		yy = (yy < 10) ? 0 + yy.toString() : yy;
		$('myAge').innerHTML = "I'm " + yy + ' years, ' + mo + ' months, ' + dd + ' days, ' + hh + ' hours, ' + mm + ' minutes, ' + ss + ' seconds old.';
	}, 500);
}

window.addEventListener( 'load', function() {
	ageTimer();
	if ( window.location.hash ) {
		if ( isPage( window.location.hash ) ) {
			page = window.location.hash.replace( '#!/' , '' );
		}
	} else {
		page = 'home';
	}

	var a = document.getElementById( 'navigation' ).childNodes;
	for ( aa in a ) {
		( function ( k ){
		if ( typeof( k ) === 'object' ) {
			k.addEventListener( 'click' , function(){
				loadPage( this.id , this.id.replace( ':' , '' ) );
			}, false );
		}
		} )( a[aa] );
	}

	var anchors = $( 'wrapper' ).getElementsByTagName( 'a' );
	for ( anch in anchors ){
		( function ( anchor ) {
			if ( anchor.hash ){
				if ( isPage( anchor.hash ) ) {
					anchor.addEventListener( 'click', function() {
						
						hash = this.hash.replace( '#!/', '' );

						if (hash.indexOf('/') !== -1) {
							loadPage( ':'+hash.split( '/' )[0] , hash );
						} else {
							loadPage( ':'+hash , hash );
						}
					}, false );
				}
			} else {
				( function( k ){
					if ( typeof(k) === 'object' ) {
						k.setAttribute( 'target' , '_blank' );
					}
				} )( anchor );
			}
		} )( anchors[anch] );
	}


	loadPage( ':'+page.split('/')[0] , page );

	$('contact_fb').addEventListener('mouseover', function(){switchContact('fb')});
	$('contact_fb').addEventListener('mouseout', switchContact);
	$('contact_mail').addEventListener('mouseover', function(){switchContact('mail')});
	$('contact_mail').addEventListener('mouseout', switchContact);
	$('contact_gp').addEventListener('mouseover', function(){switchContact('gp')});
	$('contact_gp').addEventListener('mouseout', switchContact);

}, false );

window.addEventListener( 'resize', function() {
	loadPage( ':'+page , page );
}, false );