//https://yandex.ru/maps/?pt=30.335429,59.944869&z=18&l=map

const wsUri = "wss://echo.websocket.org/"; //чат на основе эхо-сервера

function pageLoaded (){
    //ищем элементы для чата
    const infoOutput = document.querySelector(".info_output");//div для информации
    console.log(infoOutput);

    const messageOutput = document.querySelector("#message");//div для сообщений
    console.log(messageOutput);

    const input = document.querySelector("#input");//окно для ввода сообщения
    console.log(input);

    const btn = document.querySelector("#btn");//кнопка отправки сообщения
    console.log(btn);


    //ищем элементы для гео-локации
    const btnGeo = document.querySelector("#btn-geo");//кнопка определения местоположения
    console.log(btnGeo);

    const messageGeo = document.querySelector("#message-geo");//место для ссылки на карту
    console.log(messageGeo);

    //-----------ЧАТ------------
    let socket = new WebSocket(wsUri);//объект WebSocket и url
    console.log(socket);

    socket.onopen = () => { //событие WebSocket - соединение установлено, записываем в div сообщение     
        infoOutput.innerText = "Соединение установлено";
    }

    socket.onerror = () => {//если произошла ошибка выводится сообщение
        infoOutput.innerText = "При передаче данных произошла ошибка";
      }

    socket.onmessage = (event) => {//функция получения сообщения
        writeToChat(event.data, true);
      }

    function writeToChat(message, isRecieved) {//в div вставляются сообщения с разным стилем
        let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;//если сообщение отправленное, то класс recieved
        messageOutput.innerHTML += messageHTML;// к текущиму сообщению +добавляем новое
      }


    //кнопка для отправки сообщений
    btn.addEventListener('click', sendMessage);

    //функция отправки сообщения для кнопки
    function sendMessage() {
        if (!input.value) return;//если инпут пустой, то выходим из функции
        socket.send(input.value);//отправлянм то, что в инпуте
        writeToChat(input.value, false);//отображаем само сообщение, которое отправили внутри div
        input.value === "";//очистка инпута
      }


    //-----------ОПРЕДЕЛЕНИЕ МЕСТОПОЛОЖЕНИЯ------------
    function getLocation(){ //Определяем, есть ли доступ к этому API
        if ("geolocation" in navigator) {/* местоположение доступно */
            
            let locationOptions = {
                enableHighAccuracy: true
              };
            navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);


          } else {/* местоположение недоступно */
            writeMessageGeo("Ваш браузер не поддерживает функцию определения местоположения");
          }
    }

    //функция для сообщений
    function writeMessageGeo(messadge){ 
        messageGeo.innerHTML = `<p>${messadge}</p>`;
    }

    //функция определения местоположения
    function locationSuccess(data){//получилось определить местоположение
        let link = `https://yandex.ru/maps/?pt=${data.coords.longitude},${data.coords.latitude}&z=18&l=map`;
        writeMessageGeo(`<a href="${link}" target="_blank">Вы находитесь здесь</a>`); //Ссылка на карту
    }
    function locationError(){//не получилось определить местоположение
        writeMessageGeo("Произошла ошибка.");
    }

    //кнопка гео-локация
    btnGeo.addEventListener('click', function(){
        getLocation();
    })
    //---------------

}

document.addEventListener('DOMContentLoaded', pageLoaded);
