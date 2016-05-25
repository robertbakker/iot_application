@extends('layouts.flat')

@section('content')
    <div class="meter">
        <div id="temperature"></div>
    </div>
    <div class="meter">
        <div id="humidity"></div>
    </div>
    <div id="curve_chart" style="width: 900px; height: 500px"></div>
@endsection

@section('scripts')

    <!--Load the AJAX API-->

    <style>
        .meter {
            font-size: 6em;
        }

        .odometer .odometer-inside .odometer-digit:last-child {
            display: none
        }

        #temperature.odometer .odometer-inside:after {
            content: "°"
        }

        #humidity.odometer .odometer-inside:after {
            content: "%"
        }
    </style>
    <script type="text/javascript">

        //        google.charts.load('current', {'packages': ['corechart']});
        //        google.charts.setOnLoadCallback(init);

        function init() {


            var data = google.visualization.arrayToDataTable([
                ['Element', 'Value', {role: 'style'}, {role: 'annotation'}],
                ['Temperature', 20.01, '#b87333', 'In Celsius'],
                ['Humidity', 50.01, 'silver', 'Percentage']
            ]);


            var temperatureMeter = new Odometer({
                el: document.getElementById('temperature'),
                value: 20,
                format: '(.ddd),dd',
                duration: 500,
                theme: 'default'
            });
            var humidityMeter = new Odometer({
                el: document.getElementById('humidity'),
                value: 50,
                format: '(.ddd),dd',
                duration: 500,
                theme: 'default'
            });
            temperatureMeter.render();
            humidityMeter.render();

            var chart = new google.visualization.ColumnChart(document.getElementById('curve_chart'));

            var options = {
                title: 'Temperature + humidity',
                bar: {groupWidth: "95%"},
                width: 600,
                height: 400,
                legend: {position: "none"},
                vAxis: {
                    'minValue': 0,
                    'maxValue': 100
                }
            };

            function drawChart() {
                chart.draw(data, options);
            }

            var socket = new WebSocket('ws://192.168.137.66:1880/ws/temp+humidity');
            socket.onopen = function (event) {
                drawChart();
            };
            socket.onmessage = function (event) {
                var message = JSON.parse(event.data);
                var temp = parseFloat(message.temperature);
                var humidity = parseFloat(message.humidity);
                data.setValue(0, 1, temp);
                data.setValue(1, 1, humidity);
                temperatureMeter.update(temp + 0.01);
                humidityMeter.update(humidity + 0.01);
                drawChart();
            };


        }

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Hour', 'Temperature'],
                    @foreach($temperatures as $temp)
                ['{{ $temp->hour }}', {{$temp->value}}],
                @endforeach
            ]);

            var options = {
                title: 'Temperatures',
                curveType: 'function',
                legend: { position: 'bottom' },
                hAxis: {
                    slantedText: true,
                    slantedTextAngle: 45 // here you can even use 180
                }
            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

            chart.draw(data, options);
        }
    </script>
@endsection
