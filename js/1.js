var text;
var pic = document.getElementById("pic"),
			    ctx = pic.getContext('2d');
			    pic.width = 550;
			    pic.height = 550;
  
	var img = new Image();
				ctx.fillStyle = "#fff";
				ctx.font = 'bold 35px Century Gothic';
				ctx.shadowColor = "#000";
   		 		ctx.shadowOffsetX = 2;
    			ctx.shadowOffsetY = 1;
   				ctx.shadowBlur = 5;
       			ctx.textAlign = "center";

function getQuote(){
		$.ajax({
		url: 'http://api.forismatic.com/api/1.0/',  
		dataType : "jsonp", 
		data: "method=getQuote&format=jsonp&lang=ru&jsonp=?",
		success: function (data) { 
		text = data.quoteText;
		} 
		});
}
function getPic(){
	img.src = "https://placeimg.com/"+pic.width+"/"+pic.height+"/any?" + Math.floor(Math.random() * (100000));
		console.log(img.src);
	img.onload = function(){
		console.log("onload");
		console.log("clear");
	ctx.drawImage(img, 0, 20, pic.width, pic.height); 
		console.log("draw");
	cropText(text, pic.width);
		console.log("crop");
	}
} 
				getQuote();
				getPic(); 

$('#but').click(function(){  
	getQuote();
	getPic();
});

function cropText(text, width){
	var lineHeight = 60;
	var marginTop = 90;
	var words = text.split(" ");
        var count = words.length;
        var line = "";
        for (var i = 0; i < count; i++) {
            var testLine = line + words[i] + " ";
            var testWidth = ctx.measureText(testLine).width;
            if (testWidth > width) {
                ctx.fillText(line, pic.width/2, marginTop);
                line = words[i] + " ";
                marginTop += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        ctx.fillText(line, pic.width/2, marginTop);
    }