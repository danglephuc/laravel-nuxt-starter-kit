<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\Request;

class SinglePageAppController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show the application dashboard.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function index(Request $request)
    {
        if (config('nuxt.enable_ssr')) {
            $ssrServerUrl = config('nuxt.ssr_server_url');
            return file_get_contents("{$ssrServerUrl}{$request->getRequestUri()}");
        }

        return file_get_contents("http://localhost:3000" . $request->getRequestUri());
    }
}
