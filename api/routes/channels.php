<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('temperature-channel', function () {
    return true;
});

Broadcast::channel('connection-channel', function () {
    return true;
});

Broadcast::channel('connection-attempt-channel', function () {
    return true;
});
