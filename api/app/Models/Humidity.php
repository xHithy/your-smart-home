<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Humidity
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Humidity newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Humidity newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Humidity query()
 * @property int $id
 * @property int $sub_section_id
 * @property float|null $value
 * @property int $timestamp
 * @method static \Illuminate\Database\Eloquent\Builder|Humidity whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Humidity whereSubSectionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Humidity whereTimestamp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Humidity whereValue($value)
 * @mixin \Eloquent
 */
class Humidity extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'sub_section_id',
        'value',
        'timestamp',
    ];
}
