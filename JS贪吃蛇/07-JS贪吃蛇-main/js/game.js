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
        //开始游戏的逻辑
        //移动蛇
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
        //键盘控制移动方向
        bindKey();
    }

    //键盘方向键控制蛇移动的方向
    function bindKey() {
        //键盘事件
        // document.onkeydown=function(){};
        document.addEventListener('keydown', function (e) {
            // console.log(e.keyCode);
            // 37 - left
            // 38 - top
            // 39 - right
            // 40 - bottom
            switch (e.keyCode) {
                case 37:
                    that.snake.direction='left';
                break;
                case 38:
                    that.snake.direction='top';
                break;
                case 39:
                    that.snake.direction='right';
                break;
                case 40:
                    that.snake.direction='bottom';
                break;

            }

        });

    }

    //移动蛇对象
    function runSnake() {
        var timerId = setInterval(function () {
            this.snake.move(that.food,that.map);//移动
            that.snake.render(that.map);//渲染
            //x方向可以移动的最大数
            var maxX = this.map.offsetWidth / that.snake.width;
            //y方向可以移动的最大数
            var maxY = this.map.offsetHeight / that.snake.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;

            //判断超出边界就结束游戏
            if (headX < 0 || headX >= maxX) {
                alert('Game Over');
                clearInterval(timerId);
            }
            if (headY < 0 || headY >= maxY) {
                alert('Game Over');
                clearInterval(timerId);
            }
        }.bind(that), 150);
    }

    window.Game = Game;
})();


//测试代码
// var map = document.getElementById('map');
// var game = new Game(map);
// game.start();