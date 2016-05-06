/*exports.world = function() {
  console.log('Hello World');
}*/

exports.todoSample = function(){
	var arr1 = ["#abc First abc msg",
	"#def First def msg",
	"aaa First aaa mgs",
	"#abc Second abc msg",
	"#abc Third abc msg",
	"#def Second def msg",
	"#xyz First xyz msg",
	"bbb First bbb msg",
	"#lmn First lmn msg",
	"#lmn Second lmn msg"
	]
	console.log(arr1);
//var qq = arr1[1].substring(0,1);
//console.log(qq);

	var arr2 = [];

	var str= "#";
	//  var hash = /^#/;    
    
	 for(var i=0; i<arr1.length; i++)
	 {
	 //	if(arr1[i].charAt(0) == "#")

	if(arr1[i].substring(0,1) == str)
	 	{
	 		arr2.push(arr1[i]);
	 	}
	 	
	 }console.log(arr2);


	var arr3 = [];
	var item = '';
	for (var i in arr2)
	{
    	item = arr2[i];
    	var msg = item;
    	var ele = item.split(" ",1);
    	msg = msg.slice(ele[0].length + 1);

    	if(typeof arr3[ele] !== "undefined")
    	{	
			
        	arr3[ele]+= 1;
        	console.log(msg);

    	}
    	else
    	{
        	arr3[ele] = 1;
        	console.log(msg);
    	}
	}
console.log( arr3 );

}