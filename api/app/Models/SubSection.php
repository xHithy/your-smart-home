<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\SubSection
 *
 * @method static \Illuminate\Database\Eloquent\Builder|SubSection newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubSection newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubSection query()
 * @property int $id
 * @property string $name
 * @property int $section_id
 * @property int $category_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|SubSection whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubSection whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubSection whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubSection whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubSection whereSectionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubSection whereUpdatedAt($value)
 * @property-read \App\Models\SubSectionCategory|null $category
 * @property bool $pinned
 * @property-read \App\Models\Section|null $section
 * @method static \Illuminate\Database\Eloquent\Builder|SubSection wherePinned($value)
 * @mixin Eloquent
 */
class SubSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'section_id',
        'category_id',
        'pinned',
    ];

    protected $casts = [
        'id' => 'integer',
        'section_id' => 'integer',
        'category_id' => 'integer',
        'pinned' => 'boolean',
    ];

    public function category(): HasOne
    {
        return $this->hasOne(SubSectionCategory::class, 'id', 'category_id');
    }

    public function section(): HasOne
    {
        return $this->hasOne(Section::class, 'id', 'section_id');
    }
}
