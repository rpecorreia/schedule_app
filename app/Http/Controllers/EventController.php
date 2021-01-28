<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\DB; 

class EventController extends Controller
{
    public function add(Request $request){

        $event = new Event();
        $event->text = $request->text;
        $event->start = $request->start;
        $event->end = $request->end;
        $event->backColor = $request->backColor;
        $event->save();

        return ['status' => 'success', 'msg' => $request->text];
    }

    public function remove(Request $request){
        DB::table('events')
            ->where('start', $request->start)
            ->where('end', $request->end)
            ->where('text', $request->text)
            ->delete();

        return ['status' => 'success', 'msg' => $request->text];
    }

    public function get(){

        $events = Event::all('text', 'start', 'end', 'backColor');
        return ['status' => 'success', 'data' => $events];
    }


    

    public function teste(){

        $events = Event::all('text', 'start', 'end');
        echo $events;        
    }


}
