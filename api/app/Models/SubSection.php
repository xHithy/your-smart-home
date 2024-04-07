<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\SubSection
 *
 * @method static \Illuminate\Database\Eloquent\Builder|SubSection newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubSection newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubSection query()
 * @mixin Eloquent
 */
class SubSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'section_id',
        'category_id',
    ];
}
