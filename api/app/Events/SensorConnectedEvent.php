<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SensorConnectedEvent implements ShouldBroadcastNow
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    public string $sensor_name;
    public string $sensor_token;
    public bool $authorized;

    public function __construct($data)
    {
        $this->sensor_name = $data->sensor_name;
        $this->sensor_token = $data->sensor_token;
        $this->authorized = $data->authorized;
    }

    public function broadcastOn(): Channel
    {
        return new Channel('connection-channel');
    }
}
