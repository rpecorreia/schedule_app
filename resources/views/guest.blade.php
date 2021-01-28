@extends('layouts.app')


@section('content')

<div class="container">

    <!-- React root DOM -->
    <div id="user" data="Guest">


    </div>
</div>

    <!-- React JS -->
    <script src="{{ asset('js/src/index.js') }}" defer></script>


@endsection
