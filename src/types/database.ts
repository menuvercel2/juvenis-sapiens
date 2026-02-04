// Database Types
export interface Volume {
    id: string;
    title: string;
    number: string;
    year: string;
    cover_url?: string;
    pdf_url?: string;
    content?: string;
    order: number;
    published: boolean;
    created_at: string;
}

export interface News {
    id: string;
    title: string;
    category: string;
    extract?: string;
    content?: string;
    image_url?: string;
    published_date?: string;
    status: 'draft' | 'published';
    order: number;
    created_at: string;
}

export interface Admin {
    id: string;
    email?: string;
    role: string;
    created_at: string;
}

// Form Types
export interface VolumeFormData {
    title: string;
    number: string;
    year: string;
    cover_url?: string;
    pdf_url?: string;
    content?: string;
    published: boolean;
}

export interface NewsFormData {
    title: string;
    category: string;
    extract?: string;
    content?: string;
    image_url?: string;
    published_date?: string;
    status: 'draft' | 'published';
}
