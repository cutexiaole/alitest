/*通用函数*/
var g = function(id){
	return document.getElementById(id);
}
var g_tpl = function(id){
	return g('tpl_'+id).innerHTML;
}



 var the_len = 2;

 /*window.onresize = function(){
    var timeline_width =  document.getElementById('timeline_conent').clientWidth;
    var timeline_box_num =  Math.floor(timeline_width*0.96/130);
     the_len = timeline_box_num -2;
 }
 */
  /*********检测页面的timeline块的宽度，用clientWidth直接取失败，可以考虑用document.body.offsetWidth等一个个计算，但是要一层层获取？***********/

  

/*格式化数据*/
/*
{
	'second':{
		'minute':{
			date: '2014-2-28 21:32:26',
			year : '2014'，
			month : '2',
			day : '28',
			hour : '21',
			minute : '32',
			second : '26',
			num :'28'
		}
	}	
		...//	
}
*/

var list = {};
for(var i = 0;i<data.length;i++){
		
	var date = new Date(data[i].date);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();	
	
	var minutes = 1000*60;
	var hours = minutes*60;
	var days = hours*24;
	var months = days * 30;
	var years = days*365;
	var d = new Date();
	var t = d.getTime()-date.getTime();
	var y = Math.floor(t/years);
	var mth = Math.floor(t/months);
	var dd = Math.floor(t/days);
	var h = Math.floor(t/hours);	
	var min = Math.floor(t/minutes);
	
	/*计算与现在的时间差*/	
	var currentYear = d.getFullYear() - year;
	var timeStamp;
	
	if(currentYear==0||y == 0){
		var the_m = d.getMonth()+1 - month;
		var currentMonth = (currentYear==0)? the_m : (the_m + 12);
		if(currentMonth == 0||mth == 0){
			var the_dd = d.getDate() - day;
			var currentDay = (currentMonth==0)? the_dd : dd;					
			if(currentDay == 0|| dd == 0){
				var the_h = d.getHours() - hour;
				var currentHour = (dd == 0)? (the_h +24) : the_h;
				if(currentHour == 0||h == 0){
					var the_min = d.getMinutes() - minute;
					var currentMinute = (currentHour == 0) ? the_min : (the_min + 60); 
					if(currentMinute == 0||min == 0){
						var the_s = d.getSeconds() - second;
						var currentSecond = (currentMinute == 0) ? the_s : (the_s + 60); 
						if(currentSecond == 0){
							timeStamp = 'just now';							
						}else{
							timeStamp = (currentSecond == 1)?'1 second ago' : (currentSecond +' seconds ago');
						}
					}else{
						timeStamp = (currentMinute == 1)?'1 minute ago' : (currentMinute +' minutes ago');
					}
				}else{
					timeStamp = (currentHour == 1)?'1 hour ago' : ( currentHour +' hours ago');
				}
			}else{
				timeStamp = (currentDay == 1)?'1 day ago' : (currentDay +' days ago');
			}
		}else{
			timeStamp = (currentMonth == 1)?'1 month ago' : (currentMonth +' months ago');
		}		
	}else{
		timeStamp = (currentYear == 1)?'1 year ago' : (currentYear +' years ago');
	}
	
	if(!list[timeStamp]){ list[timeStamp] = []};	
	
	var item = data[i];
	item.year = year;
	item.month = month;
	item.day = day;
	item.hour = hour;
	item.minute = minute;
	item.second = second;
	item.timeStamp = timeStamp;
	list[timeStamp].push(item); //push添加的数组位置取反，插入头部
	
}

	/*时光轴HTML生成*/
	var html_timeline_list = [];
	var tpl_timeStamp = g_tpl('timeline_timeStamp');
	var the_type="between", the_method='Receive Quotes';
	
var i=0;
for( timeStamp in list){
	var the_num = list[timeStamp].length;
	/*设置不同样式*/	
	if(i==0){			
		the_type = 'current'; the_method = 'Get more Contacts';
	}else if(i > the_len-1){
		the_type = 'hide'; 
	}else{
		the_type = 'between'; 
	}

	var html_timeStamp = tpl_timeStamp.replace(/\{timeStamp\}/g, timeStamp)
										.replace(/\{num\}/g,the_num)
										.replace(/\{type\}/g,the_type)
										.replace(/\{method\}/g,the_method);
	html_timeline_list.unshift(html_timeStamp);
	i += 1;
}
	var html_last =  g_tpl('timeline_last');
	html_timeline_list.push(html_last);
	g('timeline_content').innerHTML = html_timeline_list.join('');
	
	/********此处180应该由页面获取得到**************/
	 g('current_length').style.width  = (the_len-1)*180 + 'px';  
	