(function () {

    var that;
    function Game(map) {
        //Game对象要有事物和蛇对象；同时大家都是在地图上操作
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    Game.prototype.start = function () {
        //在地图上渲染食物和蛇
        this.food.render(this.map);
        this.snake.render(this.map);
        runSnake();
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

    function runSnake() {
        var timerId = setInterval(function () {
            that.snake.move();//移动
            that.snake.render(that.map);//渲染
            //x方向可以移动的最大数
            var maxX = that.map.offsetWidth / that.snake.width;
             //y方向可以移动的最大数
            var maxY = that.map.offsetHeight / that.snake.height;
            var headX = that.snake.body[0].x;
            var headY = that.snake.body[0].y;
            console.log(maxX+'-----'+maxY+'------'+headX);
            if(headX<0||headX>=maxX){
                alert('Game Over');
                clearInterval(timerId);
            }
            if(headY<0||headY>=maxY){
                alert('Game Over');
                clearInterval(timerId);
            }
        }, 150);
    }

    window.Game = Game;
})();

var map = document.getElementById('map');
var game = new Game(map);
game.start();