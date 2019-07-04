(function () {
    function Game(map) {
        //Game对象要有事物和蛇对象；同时大家都是在地图上操作
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
    }
    Game.prototype.start=function(){
        //在地图上渲染食物和蛇
        this.food.render(this.map);
        this.snake.render(this.map);
    }

    window.Game = Game;
})();

var map=document.getElementById('map');
var game=new Game(map);
game.start();