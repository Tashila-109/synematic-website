
$(window).scroll(function () {
    if ($(this).scrollTop() > 90) {
      $(".navbar").addClass("fixed-top");
      $(".navbar").removeClass("navbar-absolute");
      $(".navbar").removeClass("navbar-transparent");
      $(".navbar").addClass("bg-dark");
      $(".navbar a").addClass("py-2");
      $(".navbar .navbar-brand").css("font-size", "1.1rem");
      $(".navbar .nav-link").css("font-size", "1rem");
      $(".navbar").css({"opacity": "0.9"});
    } else {
      $(".navbar").removeClass("fixed-top");
      $(".navbar").addClass("navbar-absolute");
      $(".navbar").addClass("navbar-transparent");
      $(".navbar").removeClass("bg-dark");
      $(".navbar a").removeClass("py-2");
      $(".navbar .navbar-brand").css("font-size", "1.3rem");
      $(".navbar .nav-link").css("font-size", "1.1rem");
      $(".navbar").removeAttr("style");
    }
  });