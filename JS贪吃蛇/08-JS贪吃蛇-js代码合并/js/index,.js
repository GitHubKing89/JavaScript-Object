
//合并代码注意代码顺序
var Tools={
	//获取随机数
	getRandom: function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
}; //代码合并注意结尾添加分号

/** ---------------------------------- Food对象-----------------------------*/
//自调用函数 ----开启新的作用域，避免命名冲突问题
(function () {
	//当前作用域的成员属性
	var position = 'absolute';
	//食物对象构造函数
	function Food(options) {
		options = options || {};//如果传参对象为null或者undefined就给一个默认空参对象
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.color = options.color || 'green';
	}

	var aguments = [];
	//用对象原型追加方法
	//渲染
	Food.prototype.render = function (map) {
		//下次刷新先移除之前渲染在地图上的食物
		remove();
		//随机设置x和Y的坐标值
		this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
		this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;
		
		//动态创建div 页面上显示的食物
		var div = document.createElement('div');
		map.appendChild(div);
		aguments.push(div);
		//设置div的样式
		div.style.position = position;//绝对定位（子绝父相）
		div.style.left = this.x + 'px';
		div.style.top = this.y + 'px';
		div.style.width = this.width + 'px';
		div.style.height = this.height + 'px';
		div.style.backgroundColor = this.color;
	}

	//移除之前地图上的食物元素
	function remove(){
		for (var index = aguments.length-1; index >= 0; index--) {
			aguments[index].parentNode.removeChild(aguments[index]);

			aguments.splice(index,1);
		}
	}

	//把Food构造暴露给外部可以访问
	window.Food = Food;
})(); //代码合并注意结尾添加分号 因为用了构造函数自调用

/** --------------------------Snake对象-------------------------------------- */

//函数自调用
(function () {
	var position = 'absolute';
	//蛇对象构造函数
	function Snake(options) {
		options = options || {};//如果传参对象为null或者undefined就给一个默认空参对象
		//蛇节大小
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.direction = options.direction || 'right';

		//蛇身（由三节组成） 第一个元素是蛇头
		this.body = [
			// 这个对象里面的参数x,y不是坐标值
			{ x: 3, y: 2, color: 'red' },
			{ x: 2, y: 2, color: 'blue' },
			{ x: 1, y: 2, color: 'blue' }

		];

	}
	//记录之前创建的蛇节
	var elements = [];
	//渲染蛇节在地图上
	Snake.prototype.render = function (map) {
		remove();
		//遍历蛇身
		for (var index = 0; index < this.body.length; index++) {
			//每个蛇节
			var object = this.body[index];

			var div = document.createElement('div');
			map.appendChild(div);
			//每创建一个就添加一个记录
			elements.push(div);
			//设置样式
			div.style.position = position;
			div.style.width = this.width + 'px';
			div.style.height = this.height + 'px';
			div.style.left = object.x * this.width + 'px';
			div.style.top = object.y * this.height + 'px';
			div.style.backgroundColor = object.color;
		}
	}
	//移除之前的数据重新加载新的
	function remove() {
		for (var index = elements.length - 1; index >= 0; index--) {
			elements[index].parentNode.removeChild(elements[index]);
			elements.splice(index, 1);

		}
	}
	//控制蛇移动的方法
	Snake.prototype.move = function (food,map) {//这里需要用到food和map 所以更改前面的代码新增加参数
		//控制蛇身位置移动 当前的蛇节移动到下一个蛇节的位置
		for (var index = this.body.length - 1; index > 0; index--) {
			//循环只会赋值给第三和第二个蛇节的数据
			this.body[index].x = this.body[index - 1].x;
			this.body[index].y = this.body[index - 1].y;
		}
		//控制蛇头的方向和位置
		var head = this.body[0];
		//判断蛇头方向
		switch (this.direction) {
			case 'top':
				head.y -= 1;
				break;
			case 'right':
				head.x += 1;
				break;
			case 'bottom':
				head.y += 1;
				break;
			case 'left':
				head.x -= 1;
				break;

		}
		//蛇移动判断蛇头是否与食物的坐标重合
		var headX = head.x * this.width;
		var headY = head.y * this.height;
		if (headX === food.x && headY === food.y) {
			//获取蛇的最后一节
			var last = this.body[this.body.length - 1];
			//新增加一节，下次移动的时候就会在最后
			this.body.push({
				x: last.x,
				y: last.y,
				color: last.color

			});

			food.render(map);//重新随机生成food
		}

	}
	window.Snake = Snake;
})(); //代码合并注意结尾添加分号 因为用了构造函数自调用

/** --------------------------Game对象-------------------------------------- */
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
})(); //代码合并注意结尾添加分号 因为用了构造函数自调用

/** -----------------------入口-------------------- */
(function () {
    var map = document.getElementById('map');
    var game = new Game(map);
    game.start();
})()


