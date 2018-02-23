$(function () {

    //Elementy HTML//

    var backgroundCover = $(".background_cover");
    var btnRandomize =    $(".randomize");
    var coverURL =        $(".image_cover_poster");
    var title =           $(".card_title");
    var rating =          $(".card_rating");
    var director =        $(".card_director");
    var release =         $(".card_releaseDate");
    var descriptionP =    $(".card_description_info");
    var netflix =         $(".netflix");
    var trailer =         $(".trailer");
    var searchAgain =     $(".anotherRandom");
    var pageHeader =      $(".page-header");
    var backgroundStart = $(".background_start");
    var movieSection =    $(".movie");
    var overFall =        $(".overfall");
    var dataBase = [];
    var randomID = 1;

    function setOneMovie (array){
        randomID= Math.floor(Math.random() * (50 - 1) + 1);
        title.text(array[randomID].title);
        rating.text('Ocena filmu: ' + array[randomID].rating);
        director.text('Reżyser: '+ array[randomID].director);
        release.text('Rok wydania: ' + array[randomID].releaseDate);
        coverURL.attr("src", array[randomID].cover);


        if (array[randomID].netflix === false) {

            netflix.addClass('hidden');
        }else{
            netflix.attr("href", array[randomID].netflix);
        }


        descriptionP.text(array[randomID].description);
        trailer.attr('href', array[randomID].trailer);
        backgroundCover.css({
            backgroundImage: "url("+array[randomID].background+")"
        });
    }

    btnRandomize.on('click', function(e) {

        e.preventDefault();
        setOneMovie(dataBase);
        pageHeader.removeClass('active');
        pageHeader.addClass('hidden');
        backgroundStart.removeClass('active');
        backgroundStart.addClass('hidden');
        movieSection.removeClass('hidden');
        movieSection.addClass('active');
        searchAgain.removeClass('hidden').addClass('active');

    });

    searchAgain.on('click', function(e) {
        e.preventDefault();
        setOneMovie(dataBase);
    });


// Initialize Firebase - config
    var config = {
        apiKey: "AIzaSyBxFwxff3qJ13Xs1FB7E8yhalxdKL0ll0M",
        authDomain: "wookiewhattowatch.firebaseapp.com",
        databaseURL: "https://wookiewhattowatch.firebaseio.com",
        projectId: "wookiewhattowatch",
        storageBucket: "wookiewhattowatch.appspot.com",
        messagingSenderId: "933379021428"
    };

    firebase.initializeApp(config);

// Uzupełnienie CARD_info//

    $.ajax({
        url: "https://wookiewhattowatch.firebaseio.com/movies.json",
        type: 'GET',
        crossDomain: true,
    }).done(function (response) {
        dataBase = response;
    }).fail(function (error) {
        //console.log(error);
    });
});
