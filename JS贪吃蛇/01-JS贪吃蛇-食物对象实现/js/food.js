
//自调用函数 ----开启新的作用域，避免命名冲突问题
(function(){
	//当前作用域的成员属性
	var position='absolute';
	//食物对象构造函数
	function Food(options){
		options=options||{};//如果传参对象为null或者undefined就给一个默认空参对象
		this.x=options.x||0;
		this.y=options.y||0;
		this.width=options.width||20;
		this.height=options.height||20;
		this.color=options.color||'green';
	}

	//用对象原型追加方法
	//渲染
	Food.prototype.render=function(map){

		//随机设置x和Y的坐标值
		this.x=Tools.getRandom(0,map.offsetWidth/this.width-1)*this.width;
		this.y=Tools.getRandom(0,map.offsetHeith/this.height-1)*this.height;
		//动态创建div 页面上显示的食物
		var div=document.createElement('div');
		map.appendChild(div);

		//设置div的样式
		div.style.position=position;//绝对定位（子绝父相）
		div.style.left=this.x+'px';
		div.style.top=this.y+'px';
		div.style.width=this.width+'px';
		div.style.height=this.height+'px';
		div.style.backgroundColor=this.color;
	}


	//把Food构造暴露给外部可以访问
	window.Food=Food;
})()



//测试
var map=document.getElementById('map');
var food=new Food();
food.render(map);
