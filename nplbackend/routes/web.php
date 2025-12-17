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
    $router->post('/allplyer', 'RegistrationController@allPlayer');
    $router->post('/accept', 'RegistrationController@accept');
    $router->post('/login', 'LoginController@login');
    $router->post('/addteam', 'TeamController@addteam');
    $router->post('/viewTeam', 'TeamController@viewTeam');
    $router->post('/updateTeam', 'TeamController@updateTeam');
    $router->post('/giveAmount', 'TeamController@giveAmount');
    $router->post('/mypointandhistry', 'TeamController@mypointandhistry');
    $router->post('/assignRole', 'TeamController@assignRole');
    $router->post('/deletePlyer', 'TeamController@deletePlyer');
    $router->post('/updatePlayer', 'RegistrationController@updatePlayer');




    // routes/web.php or routes/api.php

});
