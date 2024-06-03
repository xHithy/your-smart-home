<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RoomDataLogEvent implements ShouldBroadcastNow
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    public $data;
    public $room_id;

    public function __construct($data, $room_id)
    {
        $this->data = $data;
        $this->room_id = $room_id;
    }

    public function broadcastOn(): Channel
    {
        $channel = 'room-data-channel-'.$this->room_id;
        return new Channel($channel);
    }
}
