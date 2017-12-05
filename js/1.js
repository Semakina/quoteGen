var text;
var pic = document.getElementById("pic"),
			    ctx = pic.getContext('2d');
			    pic.width = 700;
			    pic.height = 800;
  
	var img = new Image();
				ctx.fillStyle = "#fff";
				ctx.font = 'bold 40px Century Gothic';
				ctx.shadowColor = "#000";
   		 		ctx.shadowOffsetX = 2;
    			ctx.shadowOffsetY = 1;
   				ctx.shadowBlur = 5;
       			ctx.textAlign = "center";

function getQuote(){
		$.ajax({
		url: 'https://api.forismatic.com/api/1.0/',  
		dataType : "jsonp", 
		data: "method=getQuote&format=jsonp&lang=ru&jsonp=?",
		success: function (data) { 
		text = data.quoteText;
		} 
		});
}
function getPic(){
	img.src = "https://placeimg.com/"+pic.width+"/"+pic.height+"/any?" + Math.floor(Math.random() * (100000));
	img.onload = function(){
	ctx.drawImage(img, 0, 0, pic.width, pic.height); 
	cropText(text, pic.width);
	}
} 
				getQuote();
				getPic(); 

$('#but').click(function(){  
	getQuote();
	getPic();
});

function cropText(text, width){
	var lineHeight = 80;
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