<!DOCTYPE html>
<html>
<head>
    <title>Appointments</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/main.css')}}">
    <script src="{{asset('js/jquery-3.2.1.min.js')}}"></script>
    <script src="{{asset('js/bootstrap.min.js')}}"></script>
    <script src="{{asset('js/moment.min.js')}}"></script>
</head>
<body>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="<?php echo URL::to('/');?>">Appointments</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
        </div>
    </div>
</nav>
<div class="container container-main">
    @yield('content')
</div>
<script src="{{asset('js/main.js')}}"></script>
<script src="{{asset('js/confirm.js')}}"></script>
<script src="{{asset('js/edit.js')}}"></script>
</body>
</html>
