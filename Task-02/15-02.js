//Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 


let btn = document.querySelector(".btn");
console.log(btn);


btn.addEventListener('click', function(){

    const widthScreen = window.screen.width;
    const heightScreeen = window.screen.height;
    alert("Размер вашего экрана:" + " " + widthScreen + "px" + " х"  + " " + heightScreeen + "px")
    
})



