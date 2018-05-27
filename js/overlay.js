	// overlay popup
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var changeRange = document.getElementById("changeRange");

changeRange.onclick = function() {
	var range = $('#range').val();
	if(range == null)
		range = 10;
	var repeat = $('#repeat').val();
	if(repeat == null)
		repeat = 2;
	if(repeat <0.001)
	{
		alert("간격이 0.001 이하는 할 수 없습니다.");
		return;
	}
	ChangeGrap(range, repeat);
}

var beautifyGrap = document.getElementById("beautifyGrap");
// 그래프 두껍게 하기
beautifyGrap.onclick = function() {
	var name = $('#trace').val();
	var shape = "linear";
	var boldSize = $('#boldSize').val();
	if(boldSize == null)
		boldSize = 2;
	var num = null;
	for(var graph in data)
	{
		if(graph == 0)
			continue;
		if(data[graph].name == name)
		{
			num = graph;
			break;
		}
	}
	if( num != null)
		beautifyGraph(num, shape, boldSize);
}

// var graphDelete = document.getElementById("graphDelete");

// graphDelete.onclick = function() {
// 	var range = $('#range').val();
// 	var repeat = $('#repeat').val();
// 	if(repeat <0.001)
// 	{
// 		alert("간격이 0.001 이하는 할 수 없습니다.");
// 		return;
// 	}
// 	ChangeGrap(range, repeat);
// }

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
    $('.traces').remove();
    for(var trace in data)
    {
    	if(trace == 0)
    	{
    		continue;
    	}
    	try {
    		$('#trace').append('<option class="traces" value="' + data[trace].name + '">' + data[trace].name  + '</option>')
    	}
    	catch (err) {}
    }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}