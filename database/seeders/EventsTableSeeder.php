<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class EventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('events')->insert([
            'text' => 'Ingrid',
            'start_date' => '2021-02-01 10:00:00',
            'end_date' => '2021-02-01 14:00:00' 
        ]);

        DB::table('events')->insert([
            'text' => 'Ines',
            'start_date' => '2021-02-02 09:00:00',
            'end_date' => '2021-02-02 13:00:00' 
        ]);

        DB::table('events')->insert([
            'text' => 'Ingrid',
            'start_date' => '2021-02-02 14:00:00',
            'end_date' => '2021-02-02 18:00:00' 
        ]);
    }
}
