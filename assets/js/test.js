//appartaments
function getRooms(offers, filters) {
    console.log(offersAll)
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
        if (!floorsNumberArray.includes(offers[offer].floor)) {
            floorsNumberArray.push(offers[offer].floor)
            floorsBtnHtml = floorsBtnHtml + '<a class="btn btn-outline-shahar gold me-2 mb-3 sections" data-filter="'+offers[offer].floor+'" href="#">'+offers[offer].floor+'</a>'
        }
    }
    let floors = document.getElementById('floorButtons')
    floors.innerHTML = floorsBtnHtml
    if (filters.floor != '') {
        let activeFloor = document.querySelector('#floorButtons [data-filter="'+filters.floor+'"]')
        activeFloor.classList.add("active")
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
        }
    }
}

function filterOffers (offersAll) {

    let offers = []
    for (let key in offersAll) {
        offers[key] = offersAll[key];
    }

    console.log(offers)

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

    if (filters.floor != '') {
        for (var offer in offers) {
            if (offers[offer].floor != filters.floor) {
                delete offers[offer]
            }
        }
    }
    getFloors(offers, filters)
    getSquare(offers, filters)

    if (filters.square != '') {
        for (var offer in offers) {
            if (offers[offer].square != filters.square) {
                delete offers[offer]
            }
        }
    }

    renderOffers(offers)

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
        offersHtml += '              <div class="floor-data align-items-start">';
        offersHtml += '                <h4>' + el.title + '</h4>';
        offersHtml += '                <p>Площадь: <b>' + el.square + ' м2</b></p>';
        offersHtml += '                <p>Дата сдачи: <b>2022/первый квартал</b></p>';
        offersHtml += '                <div class="mb-3">';
        offersHtml += '                  <span>Стоимость от: </span>';
        offersHtml += '                  <h6>18 530 000 тг</h6>';
        offersHtml += '                  <b>от 306 280 за м2</b>';
        offersHtml += '                </div>';
        offersHtml += '              </div>';
        offersHtml +=
            '              <div class="orderBottons mt-auto align-items-end">';
        offersHtml +=
            '                <a href="" class="btn btn-gradient">Обратная связь <i class="fas fa-chevron-right"></i></a>';
        offersHtml +=
            '                <a class="downloadPlan" data-fancybox data-caption="3-х комнатная" href="https://cms.abpx.kz/' + el.plan.path + '">Скачать планировку</a>';
        offersHtml += '              </div>';
        offersHtml += '            </div>';
        offersHtml += '            <div class="col-md-7 p-3 floor-plan">';
        offersHtml +=
            '              <a href="https://cms.abpx.kz/' + el.plan.path + '" data-fancybox data-caption="' + el.title + '">';
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
        loop: true,
        margin: 10,
        nav: true,
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