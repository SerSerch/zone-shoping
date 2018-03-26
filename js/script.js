/**
    фиксированная менюшка с иконками
*/

window.onscroll = function() {
  let headerE = document.querySelector('.header');
  let sb = document.querySelector('.header-sb');
  let bot = headerE.getBoundingClientRect().bottom;
  if (bot <= 50 && (!document.querySelector('.sb-item__button._active') || window.innerWidth > 991)) {
    sb.classList.add("_fix");
  } else if (sb.classList.contains("_fix") && (bot > 50 || window.innerWidth <= 991)) {
    sb.classList.remove("_fix");
  }
};

//управление высотой категорий с галереей

function menuHeight(n) {
  let gallery = document.querySelector('.nav-gallery-container');
  
  if (gallery) {
    let menu = document.querySelector('.top-menu-c');
    let nn = +n? n : 0;
    if (window.innerWidth > 991 && gallery.offsetHeight != menu.offsetHeight) {
      document.querySelector('.top-menu-c').style.height = gallery.offsetHeight + 'px';
    } else if (window.innerWidth <= 991) {
      document.querySelector('.top-menu-c').style.height = 'auto';
    }

    //вызываем повтор для исключения глюков
    if (nn < 2) {
      setTimeout('menuHeight(' + ++nn + ')', 500);
    }
  }
}

window.onresize = menuHeight;
window.onload = menuHeight;

/**
    возврат по категориям
*/

function topMenuBack(event) {
  event = event || window.event;
  let activSub = document.querySelectorAll('.top-menu-list._sub');
  let firstBack = document.querySelector('.top-menu__link._first');
  let l = activSub.length;

  if (firstBack.classList.contains('_back') && l > 0) {
    //удаляем последний активный
    activSub[l-1].querySelector('.top-menu-list._a').classList.remove('_a');
    //удаляем последний sub
    activSub[l-1].classList.remove('_sub');
  }
  if (l > 1) {
    //ставим на кнопку возврата название раздела
    firstBack.innerText = activSub[l-1].parentElement.querySelector('.top-menu-list__btn').innerText;
  } else {
    //удаляем класс для отображения в моб.
    document.querySelector('.top-menu').classList.remove('_sub');

    //возвращаем кнопку категорий
    firstBack.innerText = "категории товаров";
    firstBack.classList.remove('_back');
  }

  //отодвигаем фильтры от категорий
  if (document.querySelector('.lm-colum')) {
    lmColumHeight(activSub[l-1]);
  }
}

document.querySelector('.top-menu__link._first').addEventListener("click", topMenuBack);


/**
    переход по категориям
*/

function topMenuSub(event) {
  event = event || window.event;
  let parClass = event.currentTarget.parentElement.parentElement.classList;
  let subNext = event.currentTarget.nextElementSibling;
  let firstBack = document.querySelector('.top-menu__link._first');

  if (subNext != null) {

    if (!firstBack.classList.contains('_back')) {
      //добавляем стрелку возврата
      firstBack.classList.add('_back');
      //добавляем класс для отображения в моб.
      document.querySelector('.top-menu').classList.add('_sub');
    }

    //ставим на кнопку возврата название раздела
    firstBack.innerText = event.currentTarget.innerText;
    //добавляем второму родителю модификатор
    parClass.add("_sub");
    //добавляем вложенному списку активный модификатор
    subNext.classList.add("_a");
  }

  //отодвигаем фильтры от категорий
  if (document.querySelector('.lm-colum')) {
    lmColumHeight(subNext);
  }
}

function lmColumHeight(elem) {
  let heightItem = elem.children[0].offsetHeight;
  document.querySelector('.top-menu-c').style.height = elem.children.length * heightItem + 'px';
  document.querySelector('.lm-colum').style.height = elem.children.length * heightItem + 'px';
}

var menubtn = document.querySelectorAll('.top-menu-list__btn');

for (let l = menubtn.length - 1; l >= 0; l--) {
  menubtn[l].addEventListener("click", topMenuSub);
}

menubtn = null;

/**
    sb-item__button-t
    скроллинг вверх
*/

function scrollTop() {

  let scrolled = window.pageYOffset || document.documentElement.scrollTop;
  let step = 0;
  let t = setInterval(
    function() {
      scrolled -= step;
      if ( scrolled <= 0 ) {
        clearInterval(t);
        window.scrollTo(0,0);
      } else {
        window.scrollBy(0,-step);
      }
      step += 5;
    }

    ,1000/60);
}

var sbtop = document.querySelectorAll('.sb-item__button-t');

for (let l = sbtop.length - 1; l >= 0; l--) {
  sbtop[l].addEventListener("click", scrollTop);
}

sbtop = null;



/**
    sb
    открыть / закрыть окна
*/

function sbOpenClose(event) {
  event = event || window.event;
  let itemActive = document.querySelector(".sb-item__button._active");
  let menuActive = document.querySelector(".top-menu._active");
  let filterActive = document.querySelector(".filter-goods._active");
  let serchActive = document.querySelector(".header._serch");
  let eClass = event.currentTarget.classList;

  // для левого меню

  if (eClass.contains("_menu") && !eClass.contains("_active")) {

    //убираем скролинг body
    document.querySelector("body").classList.add("_menu-overflow");

    //добавляем стрелку
    document.querySelector(".body__background").classList.add("_menu");

    //добавляем меню active
    document.querySelector(".top-menu").classList.add("_active");
  } else if (menuActive) {

    //возвращаем скролинг body
    document.querySelector("body").classList.remove("_menu-overflow");

    //удаляем стрелку
    document.querySelector(".body__background").classList.remove("_menu");

    //удаляем меню active
    menuActive.classList.remove("_active");
  }

  // для правого фильтра

  if (eClass.contains("_filter") && !eClass.contains("_active")) {

    //убираем скролинг body
    document.querySelector("body").classList.add("_menu-overflow");

    //добавляем стрелку
    document.querySelector(".body__background").classList.add("_filter");

    //добавляем меню active
    document.querySelector(".filter-goods").classList.add("_active");
  } else if (filterActive) {

    //возвращаем скролинг body
    document.querySelector("body").classList.remove("_menu-overflow");

    //удаляем стрелку
    document.querySelector(".body__background").classList.remove("_filter");

    //удаляем меню active
    filterActive.classList.remove("_active");
  }

  if (eClass.contains("_search") && !serchActive) {

    //добавление отступа для строки поиска
    document.querySelector(".header").classList.add("_serch");
  } else if (serchActive) {

    //удаление отступа для строки поиска
    document.querySelector(".header").classList.remove("_serch");
  }

  if (eClass.contains("_active")) {

    //удаляем текущий active
    eClass.remove("_active");

    //удаляем серый фон
    document.querySelector(".body__background").classList.remove("_active");


  } else if (itemActive) {

    //удаляем все active
    itemActive.classList.remove("_active");

    //добавляем текущий active
    eClass.add("_active");

    document.querySelector(".body__background").classList.add("_active");
  } else {

    //добавляем текущий active
    eClass.add("_active");

    //добавляем серый фон
    document.querySelector(".body__background").classList.add("_active");
  }
}

var hssb = document.querySelectorAll('.sb-item__button');

for (let l = hssb.length - 1; l >= 0; l--) {
  hssb[l].addEventListener("click", sbOpenClose);
}

// закрытие sb окон

function sbClose(event) {
  event = event || window.event;
  document.querySelector(".sb-item__button._active").classList.remove("_active");
  document.querySelector(".body__background").classList.remove("_active");

}

let modalClose = document.querySelectorAll(".sb-modal__close");
for (let l = modalClose.length - 1; l >= 0; l--) {
  modalClose[l].addEventListener("click", sbClose);
}

// закрытие серого фона

function sbBgClose(event) {
  event = event || window.event;


  event.currentTarget.classList.remove("_active");
  if (event.currentTarget.classList.contains("_menu")) {
    event.currentTarget.classList.remove("_menu");
    document.querySelector(".top-menu._active").classList.remove("_active");

    document.querySelector("body").classList.remove("_menu-overflow");
  }

  if (event.currentTarget.classList.contains("_filter")) {
    event.currentTarget.classList.remove("_filter");
    document.querySelector(".filter-goods._active").classList.remove("_active");

    document.querySelector("body").classList.remove("_menu-overflow");
  }

  if (document.querySelector(".header._serch")) {
    document.querySelector(".header._serch").classList.remove("_serch");
  }
  document.querySelector(".sb-item__button._active").classList.remove("_active");
}

document.querySelector(".body__background").addEventListener("click", sbBgClose);

// списки окон

function selctModal(event) {
  event = event || window.event;
  let modalSelect = event.currentTarget;
  let selectValue = modalSelect.options[modalSelect.selectedIndex].value;
  let selecttext = modalSelect.options[modalSelect.selectedIndex].text;

  //меняем текущий span
  event.currentTarget.previousElementSibling.innerText = selecttext;

  if ( modalSelect.classList.contains("_currency")) {
    //меняем валюту значка
    document.querySelector(".sb-item__icon._lang").setAttribute('data-content', selectValue);

    //меняем значение списка в подвале
    document.querySelector(".block-selr__select._currency").selectedIndex = modalSelect.selectedIndex;

    //меняем значение span списка в подвале
    document.querySelector(".block-selr__selected._currency").innerText = document.querySelector(".block-selr__select._currency").options[modalSelect.selectedIndex].value;
  } else if ( modalSelect.classList.contains("_lang")) {
    //меняем флаг значка
    document.querySelector(".sb-item__icon._lang").className = "sb-item__icon _lang _lang-" + selectValue;

    //меняем значение списка в подвале
    document.querySelector(".block-selr__select._lang").selectedIndex = modalSelect.selectedIndex;

    //меняем флаг в подвале
    document.querySelector(".block-selr__selected._lang").querySelector(".block-selr__icon").className = 'block-selr__icon _' + selectValue;
  }
}

let modalAllSelect = document.querySelectorAll(".sb-modal-selr__select");
for (let l = modalAllSelect.length - 1; l >= 0; l--) {
  modalAllSelect[l].addEventListener("change", selctModal);
}

// списки подвала

function selectFooter(event) {
  event = event || window.event;
  let modalSelect = event.currentTarget;
  let selectValue = modalSelect.options[modalSelect.selectedIndex].value;

  if (event.currentTarget.classList.contains("_lang")) {
    //меняем язык в футере
    event.currentTarget.previousElementSibling.querySelector(".block-selr__icon").className = 'block-selr__icon _' + selectValue;

    //меняем флаг значка
    document.querySelector(".sb-item__icon._lang").className = "sb-item__icon _lang  _lang-" + selectValue;

    //меняем значение списка в окне
    document.querySelector(".sb-modal-selr__select._lang").selectedIndex = modalSelect.selectedIndex;

    //меняем значение span списка в окне
    document.querySelector(".sb-modal-selr__selected._lang").innerText =       document.querySelector(".sb-modal-selr__select._lang").options[modalSelect.selectedIndex].text;
  } else {
    //меняем валюту в футере
    event.currentTarget.previousElementSibling.innerText = selectValue;

    //меняем валюту значка
    document.querySelector(".sb-item__icon._lang").setAttribute('data-content', selectValue);

    let selectCurrency = document.querySelector(".sb-modal-selr__select._currency");

    //меняем значение списка в окне
    selectCurrency.selectedIndex = modalSelect.selectedIndex;

    //меняем значение span списка в окне
    document.querySelector(".sb-modal-selr__selected._currency").innerText =       selectCurrency.options[modalSelect.selectedIndex].text;
  }
}

let footerSelect = document.querySelectorAll(".block-selr__select");
for (let l = footerSelect.length - 1; l >= 0; l--) {
  footerSelect[l].addEventListener("change", selectFooter);
}

// скртие пароля

function passwordShow(event) {
  event = event || window.event;
  var inputType = event.currentTarget.previousElementSibling;
  if (inputType.type == "text") {
    inputType.type = "password";
  } else {
    inputType.type = "text";
  }
}

let inputPassword = document.querySelectorAll(".sb-modal__input._show");
for (let l = inputPassword.length - 1; l >= 0; l--) {
  inputPassword[l].addEventListener("click", passwordShow);
}

hssb = null;
modalClose = null;
modalAllSelect = null;
footerSelect = null;
inputPassword = null;

/**
/* gallery */

new Swiper('.nav-gallery-swiper', {
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

/** 
    slider
*/

var swiperCol6 = ['.gfwomen-new',
                  '.gfmen-new',
                  '.best-shops',
                  '.new-shops'];

for (let l = swiperCol6.length - 1; l >= 0; l--) {
  new Swiper(swiperCol6[l] + '-swiper', {
    slidesPerView: 6,
    slidesPerGroup: 6,
    grabCursor: true,
    navigation: {
      nextEl: swiperCol6[l] + '-next',
      prevEl: swiperCol6[l] + '-prev',
    },
    spaceBetween: 6,
    breakpoints: {
      1199: {
        slidesPerView: 5,
        slidesPerGroup: 5
      },
      1011: {
        slidesPerView: 4,
        slidesPerGroup: 4
      },
      823: {
        slidesPerView: 3,
        slidesPerGroup: 3
      },
      635: {
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      447: {
        slidesPerView: 1,
        slidesPerGroup: 1
      }
    },
  });

}

var swiperCol4 = ['.gfwomen-popular',
                  '.gfwomen-discounts',
                  '.gfmen-popular',
                  '.gfmen-discounts'];
for (let l = swiperCol4.length - 1; l >= 0; l--) {
  new Swiper(swiperCol4[l] + '-swiper', {
    slidesPerView: 4,
    slidesPerGroup: 4,
    grabCursor: true,
    navigation: {
      nextEl: swiperCol4[l] + '-next',
      prevEl: swiperCol4[l] + '-prev',
    },
    spaceBetween: 6,
    breakpoints: {
      1199: {
        slidesPerView: 3,
        slidesPerGroup: 3
      },
      1011: {
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      991: {
        slidesPerView: 4,
        slidesPerGroup: 4
      },
      823: {
        slidesPerView: 3,
        slidesPerGroup: 3
      },
      635: {
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      447: {
        slidesPerView: 1,
        slidesPerGroup: 1
      }
    },
  });

}

swiperCol6 = null;
swiperCol4 = null;



new Swiper('.sb-basket-swiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  grabCursor: true,
  navigation: {
    nextEl: '.sb-basket-next',
    prevEl: '.sb-basket-prev',
  },
  spaceBetween: 6,
  width: 218,
  height: 260,
});

new Swiper('.sb-nbasket-swiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  grabCursor: true,
  navigation: {
    nextEl: '.sb-nbasket-next',
    prevEl: '.sb-nbasket-prev',
  },
  spaceBetween: 6,
  width: 218,
  height: 260,
});

new Swiper('.sb-like-swiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  grabCursor: true,
  navigation: {
    nextEl: '.sb-like-next',
    prevEl: '.sb-like-prev',
  },
  spaceBetween: 6,
  width: 218,
  height: 260,
});

/**
    filter-spoiler
*/

function spoilerFilter(event) {
  event = event || window.event;
  let eClass = event.currentTarget.parentElement.classList;
  if (document.querySelector('.filter-spoiler._open')) {



    /**
        сюда добавить логику
        отображения выбранных фильтров

        <ul class="ilter-spoiler-s">
          <li class="filter-spoiler-s__item">Гучик</li>
        </ul>
      */


    let check;
    let ss;
    let minV = document.querySelector('.filter-price-range__r._min');
    let maxV = document.querySelector('.filter-price-range__r._max');

    if (eClass.contains("_open")) {
      //берем все checkbox в спойлере
      check = event.currentTarget.parentElement.querySelectorAll('.filter-spoiler-c__check');

      ss = event.currentTarget.parentElement.querySelector('.filter-spoiler-s');

      //удаляем текущий open
      event.currentTarget.classList.remove("_open");
      eClass.remove("_open");
    } else {
      //берем все checkbox из уже открытого спойлера
      check = document.querySelector('.filter-spoiler._open').querySelectorAll('.filter-spoiler-c__check');
      ss = document.querySelector('.filter-spoiler._open').querySelector('.filter-spoiler-s');

      //удаляем предыдущий open
      document.querySelector('.filter-spoiler__name._open').classList.remove("_open");
      document.querySelector('.filter-spoiler._open').classList.remove("_open");

      //добавляем текущий open
      event.currentTarget.classList.add("_open");
      eClass.add("_open");
    }

    //чистим блок для отображения выбранных фильтров

    ss.innerHTML = "";

    if (check.length) {


      //пробегаем по списку checkbox
      for (let n = 0, ch = check.length - 1; n <= ch; n++) {

        //если активный
        if (check[n].checked) {

          //создаем элемент для отображения выбранной опции
          let item = document.createElement('li');
          item.className = 'filter-spoiler-s__item';
          item.innerText = check[n].parentElement.innerText;

          //добавляем в блок отображения
          ss.appendChild(item);
        }
      }
    } else if (+minV.value != +minV.min || +maxV.value != +maxV.max) {

      //для фильтра цены

      let item = document.createElement('li');
      item.className = 'filter-spoiler-s__item';
      item.innerText = minV.value + ' ‒ ' + maxV.value + ' руб.';

      //добавляем в блок отображения
      ss.appendChild(item);
    }

    let reseticon = document.querySelector('.filter-buttons__icon').classList;
    if (!reseticon.contains("_r")) {
      reseticon.add("_r");
    }
  } else {
    event.currentTarget.classList.add("_open");
    eClass.add("_open");
  }
}

var fs = document.querySelectorAll('.filter-spoiler__name');

for (let l = fs.length - 1; l >= 0; l--) {
  fs[l].addEventListener("click", spoilerFilter);
}
fs = null;


/**
    Сбросить все фильтры
*/

function resetFilter() {

  //возвращаем фильтр цены

  let minV = document.querySelector('.filter-price-range__r._min').min;
  let maxV = document.querySelector('.filter-price-range__r._max').max;

  document.querySelector('.filter-price__number._min').value = minV;
  document.querySelector('.filter-price__number._max').value = maxV;

  document.querySelector('.filter-price-range__r._min').value = minV;
  document.querySelector('.filter-price-range__r._max').value = maxV;

  document.querySelector('.filter-price-range__l._min').style.width = '0px';
  document.querySelector('.filter-price-range__l._max').style.width = '0px';

  document.querySelector('.filter-price-range__r-box._min').style.width = '50%';




  //очищаем выбранные checked фильтров
  let checkbox = document.querySelectorAll('.filter-spoiler-c__check');
  for (let i = checkbox.length -1; i >= 0; i--) {
    if (checkbox[i].checked) {
      checkbox[i].checked = false;
    }
  }

  //очищаем выбранные фильтры
  let selected = document.querySelectorAll('.filter-spoiler-s');
  for (let i = selected.length -1; i >= 0; i--) {
    selected[i].innerHTML = '';
  }

  //удаляем класс с кнопки сброса фильтров
  let reseticon = document.querySelector('.filter-buttons__icon').classList;
  if (reseticon.contains("_r")) {
    reseticon.remove("_r");
  }

  if (document.querySelector('.filter-spoiler._open')) {
    //удаляем open
    document.querySelector('.filter-spoiler__name._open').classList.remove("_open");
    document.querySelector('.filter-spoiler._open').classList.remove("_open");
  }
}

if (document.querySelector('.filter-buttons__i-reset')) {
  document.querySelector('.filter-buttons__i-reset').addEventListener('click', resetFilter);
  document.querySelector('.filter-buttons__reset').addEventListener('click', resetFilter);
}

/**
    ползунки фильтра
*/

function rangeMin(event) {
  event = event || window.event;
  let minVal = +event.currentTarget.value;
  let maxVal = +document.querySelector('.filter-price-range__r._max').value;
  let min = +document.querySelector('.filter-price-range__r._min').min;
  let max = +document.querySelector('.filter-price-range__r._max').max;
  let diffVal = (maxVal - minVal) / 2;
  //ширина ползунка, без отступов
  let eWidth = document.querySelector('.filter-price-range__r._min').offsetWidth - 20;

  if (minVal >= maxVal) {
    minVal = maxVal;
    diffVal = 0;
  }

  if (minVal <= min) {
    minVal = 0;
    diffVal = (maxVal - minVal) / 2;
  }
  
  document.querySelector('.filter-price__number._min').value = minVal;
  document.querySelector('.filter-price-range__r._min').value = minVal;
  document.querySelector('.filter-price-range__r-box._min').style.width = (Math.floor((minVal + diffVal) * eWidth / max) + 10 ) + 'px';
  document.querySelector('.filter-price-range__l._min').style.width = (Math.floor(minVal * eWidth / max) ) + 'px';
}

function rangeMax(event) {
  event = event || window.event;
  let minVal = +document.querySelector('.filter-price-range__r._min').value;
  let maxVal = +event.currentTarget.value;
  let min = +document.querySelector('.filter-price-range__r._min').min;
  let max = +document.querySelector('.filter-price-range__r._max').max;
  let diffVal = (maxVal - minVal) / 2;
  //ширина ползунка, без отступов
  let eWidth = document.querySelector('.filter-price-range__r._min').offsetWidth - 20;

  if (minVal >= maxVal) {
    maxVal = minVal;
    diffVal = 0;
  }

  if (maxVal >= max) {
    maxVal = max;
    diffVal = (maxVal - minVal) / 2;
  }
  
  document.querySelector('.filter-price__number._max').value = maxVal;
  document.querySelector('.filter-price-range__r._max').value = maxVal;
  document.querySelector('.filter-price-range__r-box._min').style.width = (Math.floor((minVal + diffVal) * eWidth / max) + 10) + 'px';
  document.querySelector('.filter-price-range__l._max').style.width = (eWidth - Math.floor(maxVal * eWidth / max) ) + 'px';
}

if (document.querySelector('.filter-price-range__r._min')) {
  
  // левый ползунок
  document.querySelector('.filter-price-range__r._min').addEventListener('input', rangeMin);
  
  //правый ползунок
  document.querySelector('.filter-price-range__r._max').addEventListener('input', rangeMax);
  
  //изменение min ввода цифр
  document.querySelector('.filter-price__number._min').addEventListener('change', rangeMin);
  
  //изменение max ввода цифр
  document.querySelector('.filter-price__number._max').addEventListener('change', rangeMax);
}

/**
    swindow-new-goods
    добавление просмотра новых товаров
    
    !!! ТЕСТОВЫЙ !!!
*/

if (document.querySelector('.goods-catalog__more')) {
  let newItem = document.querySelector('.goods-catalog').innerHTML;
  document.querySelector('.goods-catalog__more').addEventListener('click', function () {
    let block = document.querySelector('.goods-catalog');
  block.innerHTML += newItem;
  });
}