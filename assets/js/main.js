//Preloader
$(document).ready(function () {
  setTimeout(function () {
    $('#preloader').remove();
    countNumbers();
  }, 1000);
});

//Marker
console.log("%cExclusive Qurylys with Iskandarov Timur", "color:#fff; background-color:#7eb621; padding: 8px 15px; font-size: 14px; border-radius: 4px; text-align:center")

//Numbers
function countNumbers() {
  var show = true;
  var countbox = '.number';
  if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
  var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
  var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
  var w_height = $(window).height(); // Высота окна браузера
  var d_height = $(document).height(); // Высота всего документа
  var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
  if (
    w_top + 500 >= e_top ||
    w_height + w_top == d_height ||
    e_height + e_top < w_height
  ) {
    $('.countNumber').css('opacity', '1');
    $('.countNumber').spincrement({
      thousandSeparator: '',
      duration: 3000,
    });

    show = false;
  }
}

//Slider
$('.owl-slider').owlCarousel({
  loop: true,
  margin: 25,
  nav: true,
  autoWidth:true,
  autoplay: $(this).attr('data-autoplay'),
  responsive: {
    0: {
      items: 4, margin: 15
    },
    600: {
      items: 4, margin: 25
    },
    1000: {
      items: 4, margin: 25
    },
  },
});

//Steps
$('.owl-steps').owlCarousel({
  loop: false,
  margin: 10,
  nav: true, dots: false,
  autoplay: false,
  autoWidth:false,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 1
    },
    1000: {
      items: 1
    },
  },
});

function renderSteps() {
    let steps = $('.owl-steps')
    let items = $(steps).find('.owl-item')

    $(items).each(
        function () {
            let a = $(this).find('a')
            $(a).height($(a).width()*0.8)
        }
    )

}

renderSteps()

//Plans
$('.owl-plans').owlCarousel({
  loop: false,
  margin: 10,
  nav: false,
  autoplay: true,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

//appartaments
function getRooms(offers, filters) {
    //console.log(offersAll)
    let roomsBtnHtml = ""
    let roomsNumberArray = []
    for (var offer in offersAll) {
        if (!roomsNumberArray.includes(offersAll[offer].rooms)) {
            roomsNumberArray.push(offersAll[offer].rooms)
            roomsBtnHtml = roomsBtnHtml + '<a class="btn btn-outline-shahar me-2 mb-3 rooms" data-filter="'+offersAll[offer].rooms+'" href="#">'+offersAll[offer].rooms+'-х комнатные</a>'
        }
    }
    let rooms = document.getElementById('roomButtons')
    rooms.innerHTML = roomsBtnHtml
    if (filters.room == '') {
        let activeRoom = document.querySelector('#roomButtons [data-filter="1"]')
        activeRoom.classList.add("active")
    } else {
        let activeRoom = document.querySelector('#roomButtons [data-filter="'+filters.room+'"]')
        activeRoom.classList.add("active")
    }
}

function getFloors(offers, filters) {
    let floorsBtnHtml = ""
    let floorsNumberArray = []
    for (var offer in offers) {
        for (var floor in offers[offer].floors) {
            if (!floorsNumberArray.includes(offers[offer].floors[floor])) {
                floorsNumberArray.push(offers[offer].floors[floor])
                floorsBtnHtml = floorsBtnHtml + '<a class="btn btn-outline-shahar gold me-2 mb-3 sections" data-filter="'+offers[offer].floors[floor]+'" href="#">'+offers[offer].floors[floor]+'</a>'
            }
        }
    }
    let floors = document.getElementById('floorButtons')
    floors.innerHTML = floorsBtnHtml
    if (filters.floor != '') {
        let activeFloor = document.querySelector('#floorButtons [data-filter="'+filters.floor+'"]')
        if (activeFloor) {
            activeFloor.classList.add("active")
        } else {
            floors.firstElementChild.classList.add("active")
        }
    }
}

function getSquare(offers, filters) {
    let squareBtnHtml = ""
    let squareNumberArray = []
    for (var offer in offers) {
        if (!squareNumberArray.includes(offers[offer].square)) {
            squareNumberArray.push(offers[offer].square)
            squareBtnHtml = squareBtnHtml + '<a class="btn btn-outline-shahar me-2 mb-3 square" data-filter="'+offers[offer].square+'" href="#">'+offers[offer].square+' м2</a>'
        }
    }
    let square = document.getElementById('squareButtons')
    square.innerHTML = squareBtnHtml
    if (filters.square != '') {
        let activeSquare = document.querySelector('#squareButtons [data-filter="'+filters.square+'"]')
        if (activeSquare) {
            activeSquare.classList.add("active")
        } else {
            square.firstElementChild.classList.add("active")
        }
    }
}

function filterOffers (offersAll) {

    let offers = []
    for (let key in offersAll) {
        offers[key] = offersAll[key];
    }

    //
    // console.log(offers)

    let filters = {
        room: document.querySelector('#roomButtons a.active').getAttribute('data-filter'),
        floor: document.querySelector('#floorButtons a.active') != null ? document.querySelector('#floorButtons a.active').getAttribute('data-filter') : '',
        square: document.querySelector('#squareButtons a.active') != null ? document.querySelector('#squareButtons a.active').getAttribute('data-filter') : ''
    }

    getRooms(offers, filters)
    if (filters.room != '') {
        for (var offer in offers) {
            if (offers[offer].rooms != filters.room) {
                delete offers[offer]
            }
        }
    }
    getFloors(offers, filters)

    if (filters.floor != '') {
        for (var offer in offers) {
            if (!offers[offer].floors.includes(filters.floor)) {
                delete offers[offer]
            }
        }
    }
    getSquare(offers, filters)

    if (filters.square != '') {
        for (var offer in offers) {
            if (offers[offer].square != filters.square) {
                delete offers[offer]
            }
        }
    }

    renderOffers(offers)
    sortButtons('#roomButtons a')
    sortButtons('#floorButtons a')
    sortButtons('#squareButtons a')

}

function sortButtons(selector) {
    var nodeList = document.querySelectorAll(selector);
    var itemsArray = [];
    var parent = nodeList[0].parentNode;
    for (var i = 0; i < nodeList.length; i++) {
        itemsArray.push(parent.removeChild(nodeList[i]));
    }
    itemsArray.sort(function(nodeA, nodeB) {
        var textA = nodeA.getAttribute('data-filter');
        var textB = nodeB.getAttribute('data-filter');
        var numberA = parseInt(textA);
        var numberB = parseInt(textB);
        if (numberA < numberB) return -1;
        if (numberA > numberB) return 1;
        return 0;
    })
        .forEach(function(node) {
            parent.appendChild(node)
        });
}

function renderOffers(offers) {
    var offersHtml = '';
    offersHtml += '<div class="owl-carousel owl-theme owl-plans" data-autoplay="true">';
    offers.forEach(function (el) {
        offersHtml += '		<div class="item">';
        offersHtml += '        <div class="rounded-7 bg-light w-100 h-100 p-4">';
        offersHtml += '          <div class="row h-100">';
        offersHtml +=
            '            <div class="col-md-5 floot-info d-flex flex-wrap">';
        offersHtml += '              <div class="floor-data align-items-start mt-2">';
        offersHtml += '                <h4>' + el.title + '-комнатная</h4>';
        offersHtml += '                <p>Площадь: <b>' + el.square + ' м2</b></p>';
        offersHtml += '                <a class="downloadPlan" data-fancybox data-caption="' + el.title + '" href="https://cms.abpx.kz/' + el.plan.path + '">Скачать планировку</a>';
        //offersHtml += '                <div class="mb-3">';
        //offersHtml += '                  <span>Стоимость от: </span>';
        //offersHtml += '                  <h6>18 530 000 тг</h6>';
        //offersHtml += '                  <b>от 306 280 за м2</b>';
        //offersHtml += '                </div>';
        offersHtml += '              </div>';
        offersHtml +=
            '              <div class="orderBottons mt-auto align-items-end">';
        offersHtml +=
            '                <a href="" class="btn btn-gradient mb-3" data-bs-toggle="modal" data-bs-target="#callbackModal">Обратная связь <i class="fas fa-chevron-right"></i></a>';
        offersHtml += '              </div>';
        offersHtml += '            </div>';
        offersHtml += '            <div class="col-md-7 p-3 floor-plan d-flex">';
        //offersHtml +=
        //    '              <a href="https://cms.abpx.kz/' + el.plan.path + '" data-fancybox data-caption="' + el.title + '">';
        offersHtml += '                <img src="https://cms.abpx.kz/' + el.plan.path + '">';
        offersHtml += '              </a>';
        offersHtml += '            </div>';
        offersHtml += '          </div>';
        offersHtml += '        </div>';
        offersHtml += '      </div>';
    });
    offersHtml += '</div>';
    let offersCarousel = document.querySelector('.plansCarousel')
    offersCarousel.innerHTML = offersHtml
    startOwlCarousel()
}

function startOwlCarousel () {
    $('.owl-plans').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
    });
}

$('body').on('click', '#roomButtons a[data-filter]', function () {
    $(this).parent().children('.active').removeClass('active')
    $(this).addClass('active')
    $('#floorButtons').children('.active').removeClass('active')
    $('#squareButtons').children('.active').removeClass('active')
    filterOffers(offersAll)
    return false
})

$('body').on('click', '#floorButtons a[data-filter]', function () {
    $(this).parent().children('.active').removeClass('active')
    $('#squareButtons').children('.active').removeClass('active')
    $(this).addClass('active')
    filterOffers(offersAll)
    return false
})

$('body').on('click', '#squareButtons a[data-filter]', function () {
    $(this).parent().children('.active').removeClass('active')
    $(this).addClass('active')
    filterOffers(offersAll)
    return false
})

filterOffers(offersAll)

//Infrastructure
$(document).ready(function () {
  $('.stucture-card').each(function () {
    $(this).height($(this).width() + $(this).width() * 0.25);
  });
  var bottom =
    0 -
    ($('.stucture-card .info').height() -
      0 -
      $('.stucture-card .info h5').height());
  $('.stucture-card .info').css({ bottom: bottom });
});

/* Карта */
function init() {
  searchMap = new ymaps.Map('map', {
    center: [43.318978, 76.897165], //43.318978, 76.897165
    zoom: 15,
    controls: [],
  });

    cildrenCollection = new ymaps.GeoObjectCollection(null)
    medicalShopCollection = new ymaps.GeoObjectCollection(null)
    medicalCollection = new ymaps.GeoObjectCollection(null)
    schoolCollection = new ymaps.GeoObjectCollection(null)
    sportCollection = new ymaps.GeoObjectCollection(null)
    shopCollection = new ymaps.GeoObjectCollection(null)

    let cildren = [[43.327464, 76.896974], [43.311123, 76.902510], [43.315549, 76.910670], [43.320427, 76.911147], [43.317535, 76.912817], [43.322482, 76.915108], [43.326001, 76.916873], [43.315270, 76.923220], [43.309068, 76.921788],
        [43.303840, 76.921072],[43.318315, 76.894036],[43.313030, 76.875275],]
    let medicalShop = [[43.316631, 76.887716], [43.311558, 76.897726], [43.326375, 76.909213], [43.323740, 76.911510], [43.315513, 76.911838],
    [43.320984, 76.917034], [43.325776, 76.922778], [43.319786, 76.929123], [43.307684, 76.923379], [43.313502, 76.879851], [43.311701, 76.876569], [43.304750, 76.880836]]
    let medical = [[43.320752, 76.916157], [43.313940, 76.875500], [43.305558, 76.923475], [43.316502, 76.938783], [43.338820, 76.908290], [43.296187, 76.870736]]
    let school = [[43.322503, 76.885417], [43.337250, 76.882315], [43.337250, 76.882315], [43.335508, 76.913173], [43.335508, 76.913173],
    [43.317568, 76.910230], [43.304384, 76.899812], [43.308043, 76.922478], [43.321516, 76.930669], [43.300725, 76.872533], [43.297182, 76.861160]]
    let sport = [[43.326937, 76.909533], [43.329120, 76.922178], [43.322187, 76.913993], [43.303451, 76.924644], [43.305252, 76.940753]]
    let shop = [[43.301133, 76.871379], [43.311474, 76.876906], [43.302668, 76.899015], [43.307872, 76.894447], [43.316811, 76.883256],
    [43.311208, 76.898284], [43.318279, 76.903308], [43.321580, 76.916692], [43.321580, 76.916692], [43.306304, 76.924092],
    [43.317345, 76.930943]]
    for (var i = 0, l = cildren.length; i < l; i++) {
        cildrenCollection.add(new ymaps.Placemark(cildren[i], {hintContent: 'Детский сад',balloonContent: ''},{iconLayout: 'default#image',
            iconImageHref: 'assets/img/map/childrens.svg',iconImageSize: [40, 54.6],iconImageOffset: [-20, -54.6],}));
    }
    for (var i = 0, l = medicalShop.length; i < l; i++) {
        medicalShopCollection.add(new ymaps.Placemark(medicalShop[i], {hintContent: 'Аптека',balloonContent: ''},{iconLayout: 'default#image',
            iconImageHref: 'assets/img/map/medical_shop.svg',iconImageSize: [40, 54.6],iconImageOffset: [-20, -54.6],}));
    }
    for (var i = 0, l = medical.length; i < l; i++) {
        medicalCollection.add(new ymaps.Placemark(medical[i], {hintContent: 'Поликлиника',balloonContent: ''},{iconLayout: 'default#image',
            iconImageHref: 'assets/img/map/medical_red.svg',iconImageSize: [40, 54.6],iconImageOffset: [-20, -54.6],}));
    }
    for (var i = 0, l = school.length; i < l; i++) {
        schoolCollection.add(new ymaps.Placemark(school[i], {hintContent: 'Школа',balloonContent: ''},{iconLayout: 'default#image',
            iconImageHref: 'assets/img/map/school.svg',iconImageSize: [40, 54.6],iconImageOffset: [-20, -54.6],}));
    }
    for (var i = 0, l = sport.length; i < l; i++) {
        sportCollection.add(new ymaps.Placemark(sport[i], {hintContent: 'Фитнес-центр',balloonContent: ''},{iconLayout: 'default#image',
            iconImageHref: 'assets/img/map/sport.svg',iconImageSize: [40, 54.6],iconImageOffset: [-20, -54.6],}));
    }
    for (var i = 0, l = shop.length; i < l; i++) {
        shopCollection.add(new ymaps.Placemark(shop[i], {hintContent: ' Супермаркет',balloonContent: ''},{iconLayout: 'default#image',
            iconImageHref: 'assets/img/map/shop.svg',iconImageSize: [40, 54.6],iconImageOffset: [-20, -54.6],}));
    }

  (marker = new ymaps.Placemark([43.31518969543139,76.89723940238693],
    {
      hintContent: 'Shahar City',
      balloonContent: 'Shahar City',
    },
    {
      iconLayout: 'default#image',
      iconImageHref: 'assets/img/map/shahar.png',
      iconImageSize: [130, 178.87],
      iconImageOffset: [-65, -178.87],
    }
  )),
    searchMap.geoObjects.add(cildrenCollection);
    searchMap.geoObjects.add(medicalShopCollection);
    searchMap.geoObjects.add(medicalCollection);
    searchMap.geoObjects.add(schoolCollection);
    searchMap.geoObjects.add(sportCollection);
    searchMap.geoObjects.add(shopCollection);
    searchMap.geoObjects.add(marker);
    searchMap.behaviors.disable('scrollZoom');

}

ymaps.ready(init);


/* SIDEBAR */

function sidebarToggle() {
    if ($('body').hasClass('sidebarOpen')) {
        $('body').removeClass('sidebarOpen')
        $('.sidebar').removeClass('open')
    } else {
        $('body').addClass('sidebarOpen')
        $('.sidebar').addClass('open')
    }
    let bars = document.querySelector('.ham5')
    bars.classList.toggle('active')
}

$('.sidebar a').click(function(){
    sidebarToggle()
})

$(function($){
    $(document).mouseup(function (e){
        var div = $(".sidebar")
        if (!div.is(e.target) && div.hasClass('open')
            && div.has(e.target).length === 0) {
            sidebarToggle()
        }
    })
})

$('#sidebarToggle').click(function () {
    sidebarToggle()
    return false
})






var sendForm = $('.sendFormButton')
var query = ""
var formQuery = new Object()


sendForm.click(function(){

    var form = $(this).parents('form')
    var errors = false

    form.find('input, textarea').each(function(){
        if ($(this).is("[required]") && $(this).val() != "" || !$(this).is("[required]") && $(this).val() != "") {
            var id = $(this).attr("id")
            var name = $(this).attr('placeholder')
            var data = $(this).val()
            formQuery[''+id] = {name, data}
            //errors = false
        } else if ($(this).is("[required]")) {
            $(this).css({'border':'2px solid red'})
            $(this).click(function () {
                $(this).removeAttr('style')
            })
            errors = true
            //break;
        }
    })

    if (!errors) {
        send_data(formQuery, form)
    }

    return false

});

function send_data(formQuery, form) {
    jQuery.ajax({
        url: "/?form=send_form",
        type: "POST",
        data: "formData="+JSON.stringify(formQuery),

        beforeSend: function() {
            //$(form).find('.preloader').show();
        },
        error: function() {
            alert("error");
        },
        success: function( html ) {
            form.html(html)

        }
    });
}

$(document).ready(function () {
    $('[name="phone"]').inputmask("+7 (999) 999 99 99")
})