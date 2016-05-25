var elixir = require('laravel-elixir');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

require('laravel-elixir-webpack');

elixir(function (mix) {
    mix.copy('resources/assets/images', 'public/build/images');
    mix.less('bootstrap.less');
    mix.less('AdminLTE.less');
    mix.less('app.less');
    mix.version('css/app.css');
    mix.copy('resources/assets/vendor', 'public/vendor');
    // mix.scripts(['angular/websocket.js', 'angular/chart.js', 'angular/app.js']);
    mix.browserify('app.js');
});

