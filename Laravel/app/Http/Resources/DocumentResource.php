<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap='document';
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->resource->id,
            'filename'=>$this->resource->filename,
            'user'=>$this->user->name,
        ];
    }
}
