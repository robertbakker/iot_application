<!DOCTYPE HTML>
<html ng-app="iotApp">
<head>
    <title>IOT Application</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="images/fav-icon.png"/>
    <script type="application/x-javascript"> addEventListener("load", function () {
            setTimeout(hideURLbar, 0);
        }, false);
        function hideURLbar() {
            window.scrollTo(0, 1);
        } </script>
    <!----//webfonts---->

    <link href="css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="{{ asset("css/bootstrap.css") }}">
    <link rel="stylesheet" href="{{ elixir("css/app.css") }}">

    <link rel="stylesheet" href="/css/odometer-theme-default.css">
    <link rel="stylesheet" href="/vendor/angular-chart/angular-chart.css">
</head>
<body>


<!----start-bg---->
<div class="bg">
    <!----start-container---->
    <div class="container">
        <!---- start-header---->
        <div class="row header">
            <div class="row">
                <div class="col-md-6">
                    <!----start-logo---->
                    <div class="well logo">
                        <a href="#">Internet of Things</a>
                    </div>
                    <!----//End-logo---->
                </div>
            </div>
        </div>
        <!---- //End-header---->
        <!-----slide-banner---->
        <div class="well slide-banner row">
            <div class="slide-banner-left col-md-8">
                <h1 ng-controller="WebSocketController">Current temperature
            <span odometer="@{{ WebSocketData.last.temperature }}"
                  odometer-options="{theme: 'default', duration: 3000, format: '(.ddd),dd'}"></span> &deg;C
                </h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. </p>
                <p><a class="btn btn-primary btn-lg b-btn" href="#"> Read More</a></p>
            </div>
            <div class="well slide-banner-right col-md-4">
                <img src="images/temperature.png" class="img-responsive" alt=""/>
            </div>
            <div class="clearfix"></div>
        </div>
        <!-----//slide-banner---->
    </div>
</div>
<!----start-top-grids---->
<div class="top-grids">
    <div class="container">

        <div class="top-grid-center col-md-12" ng-controller="TemperatureChartController">
            <h2>Average temperature per hour</h2>
            <canvas id="line" class="chart chart-line" chart-data="data"
                    chart-labels="labels" chart-legend="true" chart-series="series" ng-show="loaded">
            </canvas>
            <button class="btn btn-primary btn-lg b-btn" ng-click="loadChart()" ng-hide="loaded">Load Data</button>
        </div>

    </div>
</div>
<!----//End-top-grids---->
<!----start-mid-grids--->
<div class="mid-grids">
    <div class="container">
        <h3> The Modern Era of Web Designing </h3>
        <p>We make wireframe ultra fast,leak proof</p>
        <!-- Carousel -->
        <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
            <!-- Wrapper for slides -->
            <div class="carousel-inner">
                <div class="item active">
                    <img src="images/slide2.png" alt="First slide">
                </div>
                <div class="item">
                    <img src="images/slide2.png" alt="Second slide">
                </div>
                <div class="item">
                    <img src="images/slide2.png" alt="three slide">
                </div>
            </div>
            <!-- Controls -->
            <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
            <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right"></span>
            </a>
        </div><!-- /carousel -->
    </div>
</div>

<!----start-price-tables----->
<div class="pricetables">
    <div class="container">
        <div class="pricetables-head">
            <h2>A wireframe is the primitive skeleton of your website.</h2>
            <p>Pick a plan from below to get started! Already 20000+ websites and webprojects have been successfully
                wireframed with HotGloo.</p>
        </div>
        <div class="col-md-4 pricetable">
            <h3>Free</h3>
            <ul>
                <li><a class="frist-fea" href="#">$0/Month</a></li>
                <li><a href="#">1 Project</a></li>
                <li><a href="#">5 Members</a></li>
                <li><a href="#">5 GB</a></li>
            </ul>
            <a class="price-btn1 popup-with-zoom-anim" href="#small-dialog">Sign Up</a>
        </div>
        <div class="col-md-4 pricetable pricetable1">
            <h3>Professional</h3>
            <span> </span>
            <ul>
                <li><a class="frist-fea" href="#">$50/Month</a></li>
                <li><a href="#">20 Project</a></li>
                <li><a href="#">50 Members</a></li>
                <li><a href="#">100 GB</a></li>
            </ul>
            <a class="price-btn1 popup-with-zoom-anim" href="#small-dialog">Sign Up</a>
        </div>
        <div class="col-md-4 pricetable pricetable2">
            <h3>Enterprise</h3>
            <ul>
                <li><a class="frist-fea" href="#">$90/Month</a></li>
                <li><a href="#">1 Project</a></li>
                <li><a href="#">5 Members</a></li>
                <li><a href="#">5 GB</a></li>
            </ul>
            <a class="price-btn1 popup-with-zoom-anim" href="#small-dialog">Sign Up</a>
        </div>
    </div>
</div>
<!----//End-price-tables----->
<!---start-video----->
<div class="video">
    <div class="container">
        <h4>A wireframe is the primitive skeleton of your website.</h4>
    </div>
    <div class="video-bg">
        <!----start-model-box---->
        <a data-toggle="modal" data-target=".bs-example-modal-lg" href="#"> </a>
        <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content light-box-info">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span
                                class="glyphicon glyphicon-remove"></span></button>
                    <h3>Place Yours content here</h3>
                    <iframe src="//player.vimeo.com/video/37191080" webkitallowfullscreen mozallowfullscreen
                            allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <!----start-model-box---->
    </div>
</div>
<!---//End-video----->
<!----start-contact---->
<div class="contact">
    <div class="container">
        <p><i> </i></p>
        <div class="row">
            <form>
                <div class="col-md-6 contact-text-box">
                    <div>
                        <span>Name<label>*</label></span>
                        <input type="text" required/>
                    </div>
                    <div>
                        <span>Email<label>*</label></span>
                        <input type="text" required/>
                    </div>
                </div>
                <div class="col-md-6 contact-text-textarea">
                    <div>
                        <span>Message<label>*</label></span>
                        <textarea> </textarea>
                    </div>
                    <input class="btn btn-danger btn-lg" type="submit" Value="send"/>
                </div>
            </form>
        </div>
    </div>
</div>

@yield('content')
<!----//End-contact---->
<!----start-footer--->
<div class="footer">
    <div class="container">
        <div class="row">
            <div class="col-md-6 footer-left">
                <ul>
                    <li><a href="#"><img src="images/footer-logo.png" title="logo"/></a></li>
                    <li><p>Template by <a href="http://w3layouts.com/">W3layouts</a></p></li>
                </ul>
            </div>
            <div class="col-md-6 footer-right">
                <ul>
                    <li><a class="twitter" href="#"><span> </span></a></li>
                    <li><a class="facebook" href="#"><span> </span></a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<script src="/vendor/jquery.min.js"></script>
<script src="/vendor/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.1.1/Chart.js"></script>
<script src="/vendor/angular.js"></script>
<script src="/vendor/angular-websocket.min.js"></script>
<script src="/vendor/angular-chart/angular-chart.js"></script>
<script src="/vendor/odometer.min.js"></script>
<script src="/vendor/angular-odometer.js"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>
<script src="/js/app.js"></script>
@yield("scripts")
</body>
</html>

