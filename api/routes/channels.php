<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('logs-channel', function () {
    return true;
});

Broadcast::channel('main-data-channel', function () {
    return true;
});

Broadcast::channel('room-data-channel-{room_id}', function () {
    return true;
});

Broadcast::channel('connection-channel', function () {
    return true;
});

Broadcast::channel('connection-attempt-channel', function () {
    return true;
});
