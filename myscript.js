


let MIDA = 70; // tamaño de cada celda en píxeles
let MARGE = 30;
let AMPLADA = 492;

function dibuixar() {
    let canvas = document.getElementById('calendari');

    let imatges = document.querySelectorAll('img');
    [].forEach.call(imatges, function (item) {
        item.addEventListener('dragstart', gestionarIniciDrag, false);
        item.addEventListener('dragend', gestionarFinalDrag, false);


    });

    let texto = document.querySelectorAll('div');
    [].forEach.call(texto, function (item) {
        item.addEventListener('dragstart', gestionarIniciDrag2, false);
        item.addEventListener('dragend', gestionarFinalDrag2, false);


    });

    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        for (let i = 0; i < 31; i++) {
            let x = (i % 7) * MIDA; // x-coordenada de la celda
            let y = Math.floor(i / 7) * MIDA; // y-coordenada de la celda
            ctx.strokeRect(x, y, MIDA, MIDA);
        }

        // Escribe el número de cada día en cada celda
        for (let i = 0; i < 31; i++) {
            let x = (i % 7) * MIDA + MIDA / 2; // x-coordenada del centro de la celda
            let y = Math.floor(i / 7) * MIDA + MIDA / 2; // y-coordenada del centro de la celda
            ctx.fillText(i + 1, x, y);
            console.log(x, y);
        }
    }
}

function dibuixarFigura(ctx, figura, fila, columna) {
    console.log(ctx, figura, fila, columna);
    let img = new Image();
    img.src = figura;
    /* let x = (i % 7) * MIDA + MIDA / 2;
    let y = Math.floor(i / 7) * MIDA + MIDA / 2; */
    img.onload = function () {
        ctx.drawImage(img, fila * MIDA, columna * MIDA, MIDA, MIDA);
    }
}

function dibuixarText(ctx, text, fila, columna) {
    console.log(ctx, text, fila, columna);
    let img = new Text();
    img.src = text;
    /* let x = (i % 7) * MIDA + MIDA / 2;
    let y = Math.floor(i / 7) * MIDA + MIDA / 2; */
    img.onload = function () {
        ctx.drawImage(img, fila * MIDA, columna * MIDA, MIDA, MIDA);
    }
}

function gestionarIniciDrag(ev) {
    ev.dataTransfer.setData("imatge", ev.target.src);
    console.log('ini');
}

function gestionarFinalDrag(ev) {
    ev.preventDefault();
    let canvas = document.getElementById('calendari');
    let ctx = canvas.getContext('2d');

    let rect = canvas.getBoundingClientRect();
    let x = ev.clientX - rect.left;
    let y = ev.clientY - rect.top;
    console.log(x, y);
    console.log("x: " + Math.round(x / MIDA) + " y: " + Math.round(y / MIDA));
    dibuixarFigura(ctx, ev.target.src, Math.round(x / MIDA) - 1, Math.round(y / MIDA) - 1);



}

function gestionarIniciDrag2(ev) {
    ev.dataTransfer.setData("imatge", ev.target.src);
    console.log('ini');
}

function gestionarFinalDrag2(ev) {
    ev.preventDefault();
    let canvas = document.getElementById('calendari');
    let ctx = canvas.getContext('2d');

    let rect = canvas.getBoundingClientRect();
    let x = ev.clientX - rect.left;
    let y = ev.clientY - rect.top;
    console.log(x, y);
    console.log("x: " + Math.round(x / MIDA) + " y: " + Math.round(y / MIDA));
    dibuixarText(ctx, ev.target.src, Math.round(x / MIDA) - 1, Math.round(y / MIDA) - 1);



}


window.addEventListener('load', dibuixar, false);