// Highcharts won't automatically set its height and won't adjust
// its width, so we need to set height and call reflow.
function resizeChart(elem) {
	var $elem = $(elem);
	var $chart = $(elem).find('> div > div');
	$chart.find('> div').height($elem.height());
	Highcharts.charts[$chart.data('highchartsChart')].reflow();
}

// store some chart options for reusability
var chartOptions = {
	plotBackgroundColor: null,
	plotBorderWidth: null,
	plotShadow: false,
	type: 'pie'
};

var chartPlotOptions = {
	pie: {
		allowPointSelect: true,
		cursor: 'pointer',
		dataLabels: {
			enabled: false
		},
		showInLegend: true
	}
};

var chartTooltip = {
	pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
};

function initializeChart() {
	Highcharts.chart('container', {
		chart: chartOptions,
		title: {
			text: 'House Health Care Bill Votes For'
		},
		tooltip: chartTooltip,
		plotOptions: chartPlotOptions,
		series: [{
			name: 'Party',
			colorByPoint: true,
			data: [{
				name: 'Republican',
				y: 100,
				color: '#FF0000'
			}, {
				name: 'Democrat',
				y: 0,
				sliced: true,
				selected: true
			}]
		}]
	});
}

function initializeChartTwo() {
	Highcharts.chart('container2', {
		chart: chartOptions,
		title: {
			text: 'House Health Care Bill Votes Against'
		},
		tooltip: chartTooltip,
		plotOptions: chartPlotOptions,
		series: [{
			name: 'Party',
			colorByPoint: true,
			data: [{
				name: 'Democrat',
				y: 90.61,
				color: '#0000FF'
			}, {
				name: 'Republican',
				y: 9.39,
				sliced: true,
				selected: true,
				color: '#FF0000'
			}]
		}]
	});
}

$(function() {
	$('#grid').gridstack({
		resizable: {
        	handles: 'e, se, s, sw, w'
	    }
	});
	var grid = $('#grid').data('gridstack');
	for (var i = 0; i < $('.chart-container').length; i++) {
		// convert elements to gridstack widgets
		grid.makeWidget($('.chart-container')[i]);
	}

	$('.grid-stack').on('gsresizestop', function(event, elem) {
		// update chart width and height on resize
		resizeChart(elem);
	});

	// Build the charts
	initializeChart();
	initializeChartTwo();

	// set chart size on first load
	var $elems = $('.chart-container');
	for (var j = 0; j < $elems.length; j++) {
		resizeChart($elems[j]);
	}
});