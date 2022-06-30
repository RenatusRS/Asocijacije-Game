// Uputstvo

var asocijacije = [];

function dodajAsocijaciju(a1, a2, a3, a4, a, b1, b2, b3, b4, b, c1, c2, c3, c4, c, d1, d2, d3, d4, d, k) {
    asocijacije.push({
        a1: a1,
        a2: a2,
        a3: a3,
        a4: a4,
        a: a,

        b1: b1,
        b2: b2,
        b3: b3,
        b4: b4,
        b: b,

        c1: c1,
        c2: c2,
        c3: c3,
        c4: c4,
        c: c,

        d1: d1,
        d2: d2,
        d3: d3,
        d4: d4,
        d: d,

        k: k,
    });
}

function inicijalizujUputstvo() {
    // if (localStorage.getItem("asocijacije") != null) return;

    dodajAsocijaciju(
        "KUHINJA", "SLANO", "NATRIJUM", "HLOR", "SO",
        "KISEONIK", "VODONIK", "ŽEĐ", "ČAŠA", "VODA",
        "NOĆ", "UDOVICA", "ZLATO", "HUMOR", "CRNO",
        "PESAK", "SUNCOBRAN", "OBALA", "ODBOJKA", "PLAŽA",
        "MORE"
    );

    dodajAsocijaciju(
        "BRAZIL", "ETIOPIJA", "JUTRO", "ŠOLJA", "KAFA",
        "TRI", "KOORDINATE", "PIKSEL", "INTERPUNKCIJA", "TAČKA",
        "RUNO", "VUNA", "SPAVANJE", "ASKA", "OVCA",
        "VUDU", "VRAČARA", "ČAROBNJAK", "LJUBAV", "MAGIJA",
        "CRNA"
    );

    dodajAsocijaciju(
        "FESTIVAL", "FOTO-APARAT", "TABLETA", "MJUZIKL", "FILM",
        "ODELO", "NAVIKA", "BERZA", "HONORAR", "RAD",
        "HEMIJA", "LANAC", "ALERGIJA", "ODGOVOR", "REAKCIJA",
        "STADION", "UEFA", "FIFA", "PESAK", "FUDBAL",
        "AKCIJA"
    );

    dodajAsocijaciju(
        "NOVOSTI", "ŠKOLJ", "ŠKOLA", "MATURA", "VEČE",
        "SASTANAK", "SPORT", "ŠEF", "KONGRES", "SALA",
        "PAR", "NOGE", "ŠTIKLA", "KOŽA", "CIPELE",
        "BOŽNJA", "SKIJANJE", "LETENJE", "BAJAGA", "INSTRUKTOR",
        "PLES"
    );

    dodajAsocijaciju(
        "RIO", "VENECIJA", "ATMOSFERA", "POVORKA", "KARNEVAL",
        "RUSIJA", "VIZANTIJA", "JAPAN", "NEBO", "CARSTVO",
        "ŠATOR", "KLOVN", "AKROBATA", "SMEH", "CIRKUS",
        "STOKA", "ŽIVINA", "RIJALITI", "GAZDINSTVO", "FARMA",
        "ŽIVOTINJA"
    );

    localStorage.setItem("asocijacije", JSON.stringify(asocijacije));
}

function zapocniIgru() {
    let igraciImena = [
        (document.getElementById("igrac1").value).trim(),
        (document.getElementById("igrac2").value).trim(),
    ];

    regex = /^[a-zA-Z]+$/;

    if (!regex.test(igraciImena[0]) || !regex.test(igraciImena[1])) return;

    var igraci = [{
        ime: igraciImena[0],
        boja: "blue",
    }, {
        ime: igraciImena[1],
        boja: "red",
    }];

    let kombinacija = Math.floor(Math.random() * 5);
    let asocijacija = JSON.parse(localStorage.getItem("asocijacije"))[kombinacija];

    localStorage.setItem("asocijacija", JSON.stringify(asocijacija));
    localStorage.setItem("igraci", JSON.stringify(igraci));

    window.location.href = "asocijacije-igra.html";
}

// Igra

let timeIgra = 0;
let timePotez = 0;

let poeni = [0, 0]

let hendlerIgra;
let hendlerPotez;

let asocijacija;

let igraci;
let igrac = 0;

let info;
let potez;
let prikazPoeni;
let otvoreno = 0;

let kraj = 0;

function inicijalizujIgru() {
    info = document.getElementById("info");
    potez = document.getElementById("potez");
    prikazPoeni = [document.getElementById("igrac1"), document.getElementById("igrac2")];

    igraci = JSON.parse(localStorage.getItem("igraci"));
    asocijacija = JSON.parse(localStorage.getItem("asocijacija"));

    info.innerHTML = igraci[igrac].ime + " je na potezu.";
    prikazPoeni[0].innerHTML = igraci[0].ime + ": 0";
    prikazPoeni[1].innerHTML = igraci[1].ime + ": 0";

    hendlerPotez = setInterval(timerPotez, 1000);
    hendlerIgra = setInterval(timerIgra, 1000);
}

function klik() {
    elem = event.target;

    if (elem.innerHTML != "???" || otvoreno == 1) return;

    otvoreno = 1;
    elem.innerHTML = asocijacija[elem.id];
}

function enter() {
    if (event.key != 'Enter') return;

    elem = event.target;

    if (elem.value.toUpperCase() == asocijacija[elem.id]) {
        if (elem.id == "k") {
            elem.style.backgroundColor = igraci[igrac].boja;
            poeni[igrac] += 10 + otkrijOdgovor('a') + otkrijOdgovor('b') + otkrijOdgovor('c') + otkrijOdgovor('d');
            zavrsiIgru();
        } else {
            poeni[igrac] += 5 + otkrijOdgovor(elem.id)
        }

        prikazPoeni[igrac].innerHTML = igraci[igrac].ime + ": " + poeni[igrac];
    } else {
        elem.value = "";
    }

    zavrsiPotez();
}

function oktrijPolje(id) {
    elem = document.getElementById(id);

    if (!kraj) elem.style.backgroundColor = igraci[igrac].boja;
    if (elem.innerHTML != "???") return 0;

    elem.innerHTML = asocijacija[id];

    return 1;
}

function otkrijOdgovor(id) {
    elem = document.getElementById(id);

    elem.value = asocijacija[id];
    if (!kraj) elem.style.backgroundColor = igraci[igrac].boja;
    elem.disabled = true;

    return oktrijPolje(id + '1') + oktrijPolje(id + '2') + oktrijPolje(id + '3') + oktrijPolje(id + '4');
}

function zavrsiIgru() {
    clearInterval(hendlerPotez);
    clearInterval(hendlerIgra);

    kraj = 1;

    otkrijOdgovor('a');
    otkrijOdgovor('b');
    otkrijOdgovor('c');
    otkrijOdgovor('d');

    final = document.getElementById('k');
    final.value = asocijacija['k'];
    final.disabled = true;

    if (poeni[0] == poeni[1]) info.innerHTML = "Nerešeno!";
    else {
        pobednik = igraci[poeni[0] > poeni[1] ? 0 : 1];
        info.innerHTML = "Pobednik je " + pobednik.ime + "!";
    }

    timePotez = 0;
    setInterval(timerKraj, 1000);
}

function zavrsiPotez() {
    if (kraj == 1) return;
    clearInterval(hendlerPotez);

    igrac ^= 1;
    otvoreno = 0;

    info.innerHTML = igraci[igrac].ime + " je na potezu.";

    timePotez = 0;
    potez.value = timePotez;
    hendlerPotez = setInterval(timerPotez, 1000);
}

function timerIgra() {
    timeIgra++;
    if (timeIgra == 240) zavrsiIgru();
    document.getElementById("igra").value = timeIgra;
}

function timerPotez() {
    timePotez++;
    if (timePotez == 10) zavrsiPotez();

    potez.value = timePotez;
}

function timerKraj() {
    timePotez++;
    if (timePotez == 6) window.location.href = "index.html";
}
