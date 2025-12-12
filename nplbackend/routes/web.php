<?php

/** @var \Laravel\Lumen\Routing\Router $router */

use App\Http\Controllers\RegistrationController;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
// echo ';;;';
$router->group(['middleware' => 'cors'], function () use ($router) {
    $router->post('/registration', 'RegistrationController@registration');
    $router->post('/login', 'LoginController@login');
    // routes/web.php or routes/api.php

});
