<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\SubSectionCategory
 *
 * @property int $id
 * @property string $name
 * @property string $image_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|SubSectionCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubSectionCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubSectionCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|SubSectionCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubSectionCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubSectionCategory whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubSectionCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubSectionCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class SubSectionCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image_path',
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'image_path' => 'string',
    ];
}
