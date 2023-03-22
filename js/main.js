$(document).ready(function () {
    localstorageLoad();
    addRow();
    removeRow();
});

//! chyba zrobione !
// problem z window.localstorage jest taki że długość tego żeby wczytało trzeba reloada strony zrobić
// a długośc zmienia się z każdym usuniętym przedmiotem dlatego później mamy undefined

// załadowanie z Localstorage na stronie

let idVal = window.localStorage.length;

// szukanie najwyzszego klucza i robieie z tego tablicy 

let HighestKey = [];
for (let l = 0; l < window.localStorage.length; l++) {
    console.log(window.localStorage.key(l))
    HighestKey.push(window.localStorage.key(l));
}
Array.prototype.max = function () {
    return Math.max.apply(null, this);
}

function reloadLocalStorage() { // przeładowanie localstorage od nowa numeruje key

    let tab = [];
    for (let i = 0; i <= HighestKey.max() + 1; i++) { // tablica 1
        tab.push(window.localStorage.getItem(i));
        console.log(tab[i]);
    }
    window.localStorage.clear();
    let tab2 = tab.filter(e => e != null) // filtruje nulle
    console.log(tab2);

    for (let j = 0; j < idVal; j++) { // tablica 2 która tworzy nowy localstorage
        window.localStorage.setItem(j, tab2[j]);
        console.log(tab2[j], ":", window.localStorage.getItem(j));
    }
}

let localstorageLoad = () => { // dodaje wartości z localstorage do html
    reloadLocalStorage()

    for (let i = 0; i < idVal; i++) {
        console.log("Lece")
        $(".app").append(`
            <div class="app-quest">
                <div class="app-quest__row">
                    <p class="app-quest__paragraph">${window.localStorage.getItem(i)}</p>
                </div>
                <div class="app-toolbar__btn-remove">
                    <input id="Remove" type="button" value="-">
                </div>
            </div>
        `)
    }
}

// Dodawanie taska

let addRow = () => {
    $("#Add").on("click", () => {
        window.localStorage.setItem(idVal, $(".app-toolbar__input").val());
        $(".app").append(`
        <div class="app-quest">
            <div class="app-quest__row">
                <p class="app-quest__paragraph">${$(".app-toolbar__input").val()}</p>
            </div>
            <div class="app-toolbar__btn-remove">
                <input id="Remove" type="button" value="-">
            </div>
        </div>
        `)
        $(".app-toolbar__input").val('');
        idVal++;
    });
}

// usuwanie taska
// e - Element aktualnie klikniety

let removeRow = () => {
    $(window).on("click", (e) => {
        // console.log($(e.target).parent().prev().children().text());
        if ($(e)[0].target.defaultValue == "-") {
            $(e.target).parent().parent().css("animation", "removeAnimation 1s ease-in-out"); // dodawanie animacji usuniecia 
            setTimeout(() => $(e.target).parent().parent().remove(), 800); // usuwanie elementu nadrzędnego czyli app-quest

            for (let i = 0; i <= idVal + 2; i++) {
                console.log(window.localStorage.length, " Dlugosc");
                if (window.localStorage.getItem(i) == $(e.target).parent().prev().children().text()) {
                    window.localStorage.removeItem(i);
                    console.log("usuwa");
                }
            }
        }
    })
}