<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Token
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Token newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Token newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Token query()
 * @mixin \Eloquent
 */
class Token extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'token',
        'user_id',
        'last_used',
    ];
}
