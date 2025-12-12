<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;

class CorsMiddleware
{
    public function handle($request, Closure $next)
    {
        // Get origin header (if present)
        $origin = $request->headers->get('Origin') ?: '*';

        // If you will use credentials (cookies / Authorization), don't use '*'
        // and set $allowCredentials = true. If you don't need credentials, you
        // can set $allowCredentials = false and use '*'.
        $allowCredentials = true;
        if ($allowCredentials && $origin === '*') {
            // fallback — don't allow credentials with wildcard origin
            $origin = $request->server('HTTP_ORIGIN') ?: $origin;
        }

        $headers = [
            'Access-Control-Allow-Origin'      => $allowCredentials ? $origin : '*',
            'Access-Control-Allow-Methods'     => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers'     => 'Origin, Content-Type, Accept, Authorization, X-Requested-With',
            'Access-Control-Allow-Credentials' => $allowCredentials ? 'true' : 'false',
            'Vary'                              => 'Origin',
        ];

        // Respond to preflight request
        if ($request->getMethod() === 'OPTIONS') {
            return response('', 200, $headers);
        }

        // For normal requests, let the app handle the request then add headers
        $response = $next($request);

        // If $response is not an instance with header methods, convert it
        if (! $response instanceof Response && method_exists($response, 'header')) {
            foreach ($headers as $key => $value) {
                $response->header($key, $value);
            }
            return $response;
        }

        // Works for Illuminate\Http\Response / Symfony response
        foreach ($headers as $key => $value) {
            $response->headers->set($key, $value);
        }

        return $response;
    }
}
