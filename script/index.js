(function () {
  
  var progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    function updateProgress() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateProgress();
          ticking = false; 
        });
        ticking = true;
      }
    });

    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

 
  var backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    function toggleButton() {
      if (window.scrollY > 300) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    }

    var tick2 = false;
    window.addEventListener('scroll', function () {
      if (!tick2) {
        window.requestAnimationFrame(function () {
          toggleButton();
          tick2 = false; // Duhet brenda
        });
        tick2 = true;
      }
    });

    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    toggleButton();
  }

  
  var fadeElements = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    for (var i = 0; i < fadeElements.length; i++) {
      observer.observe(fadeElements[i]);
    }
  } else {
    for (var j = 0; j < fadeElements.length; j++) {
      fadeElements[j].classList.add('visible');
    }
  }


  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.site-nav a');

  if (sections.length && navLinks.length) {
    function updateActiveLink() {
      var current = '';
      var scrollPos = window.scrollY + 120;

      
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 10) {
        current = sections[sections.length - 1].getAttribute('id');
      } else {
        for (var k = 0; k < sections.length; k++) {
          var section = sections[k];
          var sectionTop = section.offsetTop;
          var sectionHeight = section.offsetHeight;
          if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
          }
        }
      }

      for (var l = 0; l < navLinks.length; l++) {
        var link = navLinks[l];
        link.style.color = '';
        link.style.fontWeight = '';

        
        var href = link.getAttribute('href');
        if (href === '#' + current || href === current) {
          link.style.color = '#ffffff';
          link.style.fontWeight = '600';
        }
      }
    }

    var tick3 = false;
    window.addEventListener('scroll', function () {
      if (!tick3) {
        window.requestAnimationFrame(function () {
          updateActiveLink();
          tick3 = false; // Duhet brenda
        });
        tick3 = true;
      }
    });

    updateActiveLink();
  }
})();

window.addEventListener('load', function () {
  var loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(function () { loader.remove(); }, 700);
  }
});
