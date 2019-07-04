
//函数自调用
(function(){
var position='absolute';
//蛇对象构造函数
function Snake(options){
	options=options||{};//如果传参对象为null或者undefined就给一个默认空参对象
	//蛇节大小
	this.width=options.width||20;
	this.height=options.height||20;
	this.direction=options.direction||'right';

	//蛇身（由三节组成） 第一个元素是蛇头
	this.body=[
		// 这个对象里面的参数x,y不是坐标值
	{x:3,y:2,color:'red'},
	{x:2,y:2,color:'blue'},
	{x:1,y:2,color:'blue'}

	];

}

//渲染蛇节在地图上
Snake.prototype.render=function(map){
	//遍历蛇身
	for (var index = 0; index < this.body.length; index++) {
		//每个蛇节
		var object=this.body[index];
		console.log(object);
		var div=document.createElement('div');
		map.appendChild(div);
		console.log(div);
		//设置样式
		div.style.position=position;
		div.style.width=this.width+'px';
		div.style.height=this.height+'px';
		div.style.left=object.x*this.width+'px';
		div.style.top=object.y*this.height+'px';
		div.style.backgroundColor=object.color;
	}
}
window.Snake=Snake;
})()

//测试代码
// var map=document.getElementById('map');
// var snake=new Snake();
// snake.render(map);