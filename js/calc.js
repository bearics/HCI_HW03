	// 그래프 그리기

	var data =[];
	var tp=[];

	var dot = {
		name: "meet",
		type: 'scatter',
		x: [],
		y: [],
		mode: 'markers',
		marker: {
		    color: 'rgba(156, 165, 196, 0.95)',
		    line: {
		      color: 'rgba(156, 165, 196, 1.0)',
		      width: 1,
			},
			symbol: 'circle',
			size: 8
			}
		};
	data.push(dot);
	function beautifyGraph(num, shape, boldSize) {
		data[num].line.width = boldSize;
		data[num].line.shape = shape;
	    Plotly.newPlot('plot', data);
	}

	function drawMeet() {
		var i;
		for(i=0; i<data[1].x.length-1; i++ ) {
			var temp = [];
			for(var trace in data) {
				if(trace == 0 || trace == data.length-1 )
					continue;
				trace = parseInt(trace);
				var j;
				for(j=0; j<data.length-trace-1; j++) {
					var line1 = turf.lineString([[data[trace].x[i], data[trace].y[i]], [data[trace].x[i+1], data[trace].y[i+1]]]);
					var line2 = turf.lineString([[data[trace+1+j].x[i], data[trace+1+j].y[i]], [data[trace+1+j].x[i+1], data[trace+1+j].y[i+1]]]);
					var intersects = turf.lineIntersect(line1, line2);
					if( intersects.features.length != 0)
					{
						data[0].x.push(intersects.features[0].geometry.coordinates[0]);
						data[0].y.push(intersects.features[0].geometry.coordinates[1]);
					}
				}

			}
		}
	}

	function drawGrap(ex, range) {

	    try {
	        // compile the expression once
	        var expression = ex;
	        var expr = math.compile(expression);
	        // evaluate the expression repeatedly for different values of x
	        var xValues = math.range(range*(-1), range, 0.5).toArray();
	        var yValues = xValues.map(function(x) {
	            return expr.eval({
	                x: x
	            });
	        });
	        // render the plot using plotly
	        var trace1 = {
	        	ex: expression,
	        	name: "graph"+data.length.toString(),
	            x: xValues,
	            y: yValues,
	            type: 'scatter',
	            line: {
	            	width: 2,
	            	shape: "linear"
	            }
	        };

	        data.push(trace1);
	        drawMeet();
	        var layout = {showlegend: true};
	        Plotly.newPlot('plot', data, layout, {displayModeBar: true});
	    } catch (err) {}
	}

		function ChangeGrap(range, repeat) {
	    try {
	    	var bak = data;
	    	var ran = parseInt(range);
	    	data = [];
	    	for(var trace in bak) {
	    		if(trace == 0)
	    		{
	    			var dots = {
						name: "meet",
						type: 'scatter',
						x: [],
						y: [],
						mode: 'markers',
						marker: {
						    color: 'rgba(156, 165, 196, 0.95)',
						    line: {
						      color: 'rgba(156, 165, 196, 1.0)',
						      width: 1,
							},
							symbol: 'circle',
							size: 8
							}
						};
    				data.push(dots);
    				continue;
	    		}
	    		var expression = bak[trace].ex;
	    		var expr = math.compile(expression);
	    		// evaluate the expression repeatedly for different values of x
		        var xValues = math.range(ran*(-1), ran, repeat).toArray();
		        var yValues = xValues.map(function(x) {
		            return expr.eval({
		                x: x
		            });
		        });
		        var trace1 = {
		        	ex: expression,
		        	name: "graph"+data.length.toString(),
		            x: xValues,
		            y: yValues,
		            type: 'scatter',
		            line: {
	            		width: 2,
	            		shape: "linear"
	            	}
		        };
		        data.push(trace1)
	    	}
	    	drawMeet();
	        var layout = {showlegend: true};
	        Plotly.newPlot('plot', data, layout, {displayModeBar: true});
	    } catch (err) {}
	}

	drawGrap();
	var trigFunc = ['sin', 'cos', 'tan'];
	var page = 0;
	var favNum = 0;
	var saveNum = 0;

	function contains(target, pattern) {
	    var value = 0;
	    pattern.forEach(function(word) {
	        value = value + target.includes(word);
	    });
	    return (value === 1)
	}
	String.prototype.format = function() {
	    a = this;
	    for (k in arguments) {
	        a = a.replace("{" + k + "}", arguments[k])
	    }
	    return a
	}
	$(document).ready(function() {
	    var parser = math.parser();
	    $('#graph').click(function() {
	        var ex = $('#screentext').text();
	        event.preventDefault();
	        $('#graphInfo').text("그래프가 추가 되었습니다.");
	        drawGrap(ex, 10);
	    });
	    var displayValue = '0';
	    $('#result').text(displayValue);
	    $('#latex').html('$$' + math.parse(displayValue).toTex() + '$$');
	    $('.page').click(function() {
	        var page = $(this).attr('class');
	        if ($(this).text() == "기본") {
	            $('.crow .ch').each(function(index, element) {
	                $(this).text($(this).attr('dis1'));
	                $(this).attr('key', $(this).attr('key1'));
	            });
	            $('.page.pcb').html("비교연산자<br>벡터");
	            $('.page.pf').html("함수<br>변수");
	        } else {
	            if (page.lastIndexOf("pcb") >= 0) {
	                $('.crow .ch').each(function(index, element) {
	                    $(this).text($(this).attr('dis2'));
	                    $(this).attr('key', $(this).attr('key2'));
	                });
	                $(this).text("기본");
	                $('.page.pf').html("함수<br>변수");
	            } else if (page.lastIndexOf("pf") >= 0) {
	                $('.crow .ch').each(function(index, element) {
	                    $(this).text($(this).attr('dis3'));
	                    $(this).attr('key', $(this).attr('key3'));
	                });
	                $(this).text("기본");
	                $('.page.pcb').html("비교연산자<br>벡터");
	            }
	        }
	    });
	    $('.fbtn').click( // 즐겨찾기 추가 
	        function() {
	            var fb = $('#screentext').text();
	            $('.favorite').eq(favNum % 4).attr("key", fb);
	            $('.favorite').eq(favNum % 4).text(fb);
	            favNum += 1;
	        });
	    $('.key').each(function(index, key) {
	        $(this).click(function(e) {
	            if (displayValue == '0') displayValue = '';
	            var key = $(this).attr("key");
	            if (key == 'EV') {
	                var eq = '<div class="mrow"><div class="mb save eq s' + saveNum + '">' + displayValue + '</div>';
	                try {
	                    if (contains(displayValue, trigFunc)) { // 삼각 함수 예외 처리
	                        displayValue = math.eval(displayValue).toString();
	                    } else {
	                        displayValue = parser.eval(displayValue).toString();
	                    }
	                    var tokens = displayValue.split(' ');
	                    if (tokens[0] == 'function') {
	                        displayValue = tokens[0];
	                    }
	                    var res = '<div class="mb save res s' + saveNum + '">' + displayValue + '</div></div>';
	                    $(".memory").append(eq + res);
	                    saveNum += 1;
	                    $('.save').click( // 메모리 클릭 시 핸들러 등록
	                        function() {
	                            var mem;
	                            if ($('#screentext').text() == "0" || $('#screentext').text() == $(this).text()) {
	                                mem = $(this).text();
	                            } else {
	                                mem = $('#screentext').text() + $(this).text();
	                            }
	                            displayValue = mem;
	                            $('#screentext').text(mem);
	                        });
	                    $('#screentext').text(displayValue);
	                    displayValue = '0';
	                } catch (e) {
	                    displayValue = '0';
	                    if (displayValue != 'function') {
	                        $('#screentext').text(e);
	                    }
	                }
	            } else {
	                if (key == 'CL') {
	                    displayValue = '0';
	                    $('#screentext').text(displayValue);
	                } else if (key == 'C') {
	                    displayValue = displayValue.slice(0, -1);
	                    $('#screentext').text(displayValue);
	                } else {
	                    displayValue += key;
	                    $('#screentext').text(displayValue);
	                }
	                var node = math.parse(displayValue);
	                var latex = node.toTex({
	                    parenthesis: 'keep',
	                    implicit: 'hide'
	                });
	                var elem = MathJax.Hub.getAllJax('latex')[0];
	                MathJax.Hub.Queue(['Text', elem, latex]);
	            }
	            e.preventDefault()
	        })
	    })
	})


