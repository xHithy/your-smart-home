<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\Sensor
 *
 * @property int $id
 * @property string $sensor_name
 * @property string $sensor_token
 * @property int $authorized
 * @property int $last_auth_attempt
 * @property int $last_data_update
 * @method static \Illuminate\Database\Eloquent\Builder|Sensor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sensor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sensor query()
 * @method static \Illuminate\Database\Eloquent\Builder|Sensor whereAuthorized($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sensor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sensor whereLastAuthAttempt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sensor whereLastDataUpdate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sensor whereSensorName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sensor whereSensorToken($value)
 * @property int $sub_section_id
 * @method static \Illuminate\Database\Eloquent\Builder|Sensor whereSubSectionId($value)
 * @mixin \Eloquent
 */
class Sensor extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $casts = [
        'id' => 'integer',
        'sub_section_id' => 'integer',
        'authorized' => 'boolean',
        'last_auth_attempt' => 'integer',
        'last_data_update' => 'integer',
    ];

    protected $fillable = [
        'sensor_name',
        'sensor_token',
        'sub_section_id',
        'authorized',
        'last_auth_attempt',
        'last_data_update',
    ];
}
