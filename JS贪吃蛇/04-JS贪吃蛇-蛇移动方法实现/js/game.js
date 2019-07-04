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
        //测试代码
        //要先移除之前创建在地图上的蛇节，否则会一直自增长
        // this.snake.move();
        // this.snake.render(this.map);
        // this.snake.move();
        // this.snake.render(this.map);
        // this.snake.move();
        // this.snake.render(this.map);
        // this.snake.move();
        // this.snake.render(this.map);
        // this.snake.move();
        // this.snake.render(this.map);
        // this.snake.move();
    }

    window.Game = Game;
})();

var map=document.getElementById('map');
var game=new Game(map);
game.start();