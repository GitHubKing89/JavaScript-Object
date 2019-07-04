
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
	var elements=[];
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
	function remove(){
		for (var index = elements.length - 1; index >= 0; index--) {
			elements[index].parentNode.removeChild(elements[index]);
			elements.splice(index,1);
			
		}
	}
	//控制蛇移动的方法
	Snake.prototype.move = function () {
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
	}
	window.Snake = Snake;
})()

//测试代码
// var map=document.getElementById('map');
// var snake=new Snake();
// snake.render(map);