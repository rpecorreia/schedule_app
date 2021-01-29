<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\DB; 

class EventController extends Controller
{
    // to add a new event in the schedule
    public function add(Request $request){

        $event = new Event();
        $event->text = $request->text;
        $event->start = $request->start;
        $event->end = $request->end;
        $event->backColor = $request->backColor;
        $event->save();

        return ['status' => 'success', 'msg' => $request->text];
    }

    //to remove a event from the schedule
    public function remove(Request $request){
        DB::table('events')
            ->where('start', $request->start)
            ->where('end', $request->end)
            ->where('text', $request->text)
            ->delete();

        return ['status' => 'success', 'msg' => $request->text];
    }

    //to get all events from the schedule
    public function get(){

        $events = Event::all('text', 'start', 'end', 'backColor');
        return ['status' => 'success', 'data' => $events];
    }


}
