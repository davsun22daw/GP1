/*
GP1 per Martí Rodriguez i David suner
05/12/2022
v1.0
 */
let http = require("http");
let fs = require('fs');

let MongoClient = require('mongodb').MongoClient;
let assert = require('assert'); //utilitzem assercions

let ObjectId = require('mongodb').ObjectID;

let crud = {
    afegirDocument: function (alumne, db, err, callback) {

    }
};

function iniciar() {
    function onRequest(request, response) {
        let sortida;
        const baseURL = request.protocol + '://' + request.headers.host + '/';
        const reqUrl = new URL(request.url, baseURL);
        console.log("Petició per a  " + reqUrl.pathname + " rebuda.");
        const ruta = reqUrl.pathname;
        let cadenaConnexio = 'mongodb://127.0.0.1/GP1';

        if (ruta == '/') {
            fs.readFile('./GP1_Inici.html', function (err, sortida) {
                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });
                response.write(sortida);
                response.end();
            });
        }
        else if (ruta == '/login') {
            fs.readFile('./GP1_Login.html', function (err, sortida) {
                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });
                response.write(sortida);
                response.end();
            });
        }

        else if (ruta == '/comproba') {
            MongoClient.connect(cadenaConnexio, function (err, client) {
                assert.equal(null, err);
                var db = client.db('GP1');
                let nomL = reqUrl.searchParams.get('nomLogin');
                let ContrasenyaL = reqUrl.searchParams.get('ContrasenyaLogin');
                db.collection('login').find({ nom: nomL, Contrasenya: ContrasenyaL }).toArray(function (err, result) {
                    if (err) throw err
                    if (!result.length == 0) {
                        fs.readFile('./GP1_Calendari.html', function (err, sortida) {
                            response.writeHead(200, {
                                "Content-Type": "text/html; charset=utf-8"
                            });
                            response.write(sortida);
                            response.end();
                        });

                    } else {
                        fs.readFile('./GP1_ErrorLogin.html', function (err, sortida) {
                            response.writeHead(200, {
                                "Content-Type": "text/html; charset=utf-8"
                            });
                            response.write(sortida);
                            response.end();
                        });
                    }
                });
                assert.equal(err, null);

            });
        }
        else if (ruta == '/crea') {
            fs.readFile('./GP1_CreaUser.html', function (err, sortida) {
                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });
                response.write(sortida);
                response.end();
            });
        }

        else if (ruta == '/imatges/1.png') {
            fs.readFile('./imatges/1.png', function (err, sortida) {
                response.writeHead(200, {
                    "Content-Type": 'image/png'
                });
                response.write(sortida);
                response.end();
            });
        }
        else if (ruta == '/imatges/2.png') {
            fs.readFile('./imatges/2.png', function (err, sortida) {
                response.writeHead(200, {
                    "Content-Type": 'image/png'
                });
                response.write(sortida);
                response.end();
            });
        }
        else if (ruta == '/imatges/3.png') {
            fs.readFile('./imatges/3.png', function (err, sortida) {
                response.writeHead(200, {
                    "Content-Type": 'image/png'
                });
                response.write(sortida);
                response.end();
            });
        }
        else if (ruta == '/imatges/4.png') {
            fs.readFile('./imatges/4.png', function (err, sortida) {
                response.writeHead(200, {
                    "Content-Type": 'image/png'
                });
                response.write(sortida);
                response.end();
            });
        }
        else if (ruta == '/imatges/5.png') {
            fs.readFile('./imatges/5.png', function (err, sortida) {
                response.writeHead(200, {
                    "Content-Type": 'image/png'
                });
                response.write(sortida);
                response.end();
            });
        }
        else if (ruta == '/imatges/6.png') {
            fs.readFile('./imatges/6.png', function (err, sortida) {
                response.writeHead(200, {
                    "Content-Type": 'image/png'
                });
                response.write(sortida);
                response.end();
            });
        }
        else if (ruta == '/imatges/7.png') {
            fs.readFile('./imatges/7.png', function (err, sortida) {
                response.writeHead(200, {
                    "Content-Type": 'image/png'
                });
                response.write(sortida);
                response.end();
            });
        }
        else if (ruta == '/desa') {
            MongoClient.connect(cadenaConnexio, function (err, client) {
                assert.equal(null, err);
                console.log("Connexió correcta");
                var db = client.db('GP1');
                db.collection('login').insertOne({
                    "nom": reqUrl.searchParams.get('nom'),
                    "cognom": reqUrl.searchParams.get('cognom'),
                    "Contrasenya": reqUrl.searchParams.get('Contrasenya')
                });
                assert.equal(err, null);
                console.log("Afegit document a col·lecció login");

            });
        }
        else if (ruta == '/consulta') {
            MongoClient.connect(cadenaConnexio, function (err, client) {
                assert.equal(null, err);
                console.log("Connexió correcta");
                var db = client.db('GP1');

                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });
                console.log("consulta document a col·lecció login");

                let cursor = db.collection('login').find({});

                cursor.toArray((function (err, results) {
                    assert.equal(err, null);
                    if (results != null) {
                        results.forEach((doc) => {
                            response.write(`nom: ${doc.nom} <br>`);
                            response.write(`cognom: ${doc.cognom} <br>`);
                            response.write(`Contrasenya: ${doc.Contrasenya} <br>`);
                        });
                    } else {
                        response.end();
                    }
                }));


            });

        }

        else {
            response.writeHead(404, {
                "Content-Type": "text/html; charset=utf-8"
            });
            sortida = "404 NOT FOUND";
            response.write(sortida);
            response.end();
        }


    }

    http.createServer(onRequest).listen(8888);
    console.log("Servidor iniciat.");
}

exports.iniciar = iniciar;