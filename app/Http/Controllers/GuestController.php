<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GuestController extends Controller
{
    // show the guest dashboard
    public function index()
    {
        return view('guest');
    }
}
