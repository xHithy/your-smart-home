<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Temperature
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Temperature newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Temperature newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Temperature query()
 * @property int $id
 * @property int $sub_section_id
 * @property float|null $value
 * @property int $timestamp
 * @method static \Illuminate\Database\Eloquent\Builder|Temperature whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Temperature whereSubSectionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Temperature whereTimestamp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Temperature whereValue($value)
 * @mixin \Eloquent
 */
class Temperature extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'sub_section_id',
        'value',
        'timestamp',
    ];
}
