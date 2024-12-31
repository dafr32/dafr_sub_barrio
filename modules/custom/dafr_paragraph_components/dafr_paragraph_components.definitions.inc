<?php

// Globalna tablica z konfiguracją paragrafów.
$paragraph_definitions = [
    'paragraph_section' => [
        'label' => 'Sekcja',
        'description' => 'Komponent dodający sekcję',
        'fields' => ['field_container','field_id','field_classes','field_bg_color','field_bg_image',
        'field_mt','field_mb','field_ml','field_mr','field_pt','field_pb','field_pl','field_pr' ],
    ],
    'paragraph_banner' => [
        'label' => 'Banner',
        'description' => 'Komponent dodający banner',
        'fields' => ['field_animate', 'field_animate_duration', 'field_animate_delay',        
        'field_animate_content', 'field_animate_duration_content', 'field_animate_delay_content',
        'field_title','field_title_span','field_title2','field_subtitle','field_body','field_bg_image', 'field_text_color',
        'field_blenda','field_id','field_classes','field_parallax','field_container','field_align','field_valign',
        'field_mt','field_mb','field_ml','field_mr','field_pt','field_pb','field_pl','field_pr',
        'field_max_width','field_height' ],
    ],
    'paragraph_text' => [
        'label' => 'Edytor tekstu',
        'description' => 'Komponent dodający tekst za pomomocą edytora',
        'fields' => ['field_animate', 'field_animate_duration', 'field_animate_delay',
        'field_body','field_id','field_classes','field_align','field_valign',
        'field_mt','field_mb','field_ml','field_mr','field_pt','field_pb','field_pl','field_pr'],
    ],
    'paragraph_image' => [
        'label' => 'Obraz',
        'description' => 'Komponent wstawiający zdjęcie',
        'fields' => ['field_bg_image', 'field_align', 'field_animate', 'field_animate_duration', 'field_animate_delay'],
    ],
    'paragraph_video' => [
        'label' => 'Video',
        'description' => 'Komponent wstawiający video',
        'fields' => ['field_bg_image', 'field_video_url', 'field_height'],
    ],
    'paragraph_block' => [
        'label' => 'Block',
        'description' => 'Komponent wstawiający block',
        'fields' => ['field_block', 
        'field_animate', 'field_animate_duration', 'field_animate_delay',
        'field_id','field_classes','field_container',
        'field_mt','field_mb','field_ml','field_mr','field_pt','field_pb','field_pl','field_pr' ],
    ],
    'paragraph_parallax' => [
        'label' => 'Images Parallax',
        'description' => 'Komponent dodający images Parallax',
        'fields' => ['field_image1', 'field_image2',
        'field_animate', 'field_animate_duration', 'field_animate_delay',
        'field_animate_content', 'field_animate_duration_content', 'field_animate_delay_content',
        'field_title','field_title_span','field_title2','field_subtitle','field_body',
        'field_text_color','field_container','field_align','field_valign','field_text_position',
        'field_mt','field_mb','field_ml','field_mr','field_pt','field_pb','field_pl','field_pr',
        'field_id','field_classes',],
    ],
    'paragraph_news' => [
        'label' => 'Aktualności',
        'description' => 'Komponent dodający blok artykuły',
        'fields' => ['field_container','field_widok','field_id','field_classes',
        'field_animate', 'field_animate_duration', 'field_animate_delay',
        'field_mt','field_mb','field_ml','field_mr','field_pt','field_pb','field_pl','field_pr'],
    ],
];


// Globalna tablica z definicją pól.
$field_definitions = [
    'field_title' => [
        'type' => 'string',
        'label' => 'Tytuł',        
        'settings' => [
            'max_length' => 255,
            'text_processing' => 0,
        ],
    ],
    'field_title_span' => [
        'type' => 'string',
        'label' => 'Tytuł wyróżniony',
        'settings' => [
            'max_length' => 255,
            'case_sensitive' => FALSE,
            'is_ascii' => FALSE,
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],    
    'field_title2' => [
        'type' => 'string',
        'label' => 'Tytuł 2',        
        'settings' => [
            'max_length' => 255,
            'text_processing' => 0,
        ],
    ],
    'field_subtitle' => [
        'type' => 'string',
        'label' => 'Tytuł dodatkowy',        
        'settings' => [
            'max_length' => 255,
            'text_processing' => 0,
        ],
    ],
    'field_bg_image' => [
        'type' => 'image',
        'label' => 'Obraz tła',
        'settings' => [
            'file_extensions' => 'png jpg jpeg svg webp',
            'file_directory' => 'inline-images',
            'max_resolution' => '2000x2000',
            'max_filesize' => '2 MB',
        ],
    ],
    'field_image1' => [
        'type' => 'image',
        'label' => 'Obraz 1 plan',
        'settings' => [
            'file_extensions' => 'png jpg jpeg svg webp',
            'file_directory' => 'inline-images',
            'max_resolution' => '1000x1000',
            'max_filesize' => '2 MB',
        ],
    ],
    'field_image2' => [
        'type' => 'image',
        'label' => 'Obraz 2 plan',
        'settings' => [
            'file_extensions' => 'png jpg jpeg svg webp',
            'file_directory' => 'inline-images',
            'max_resolution' => '1000x1000',
            'max_filesize' => '2 MB',
        ],
    ],
    'field_video_url' => [
        'type' => 'string',
        'label' => 'URL wideo',
        'settings' => [
            'max_length' => 255,
            'case_sensitive' => FALSE,
            'is_ascii' => FALSE,
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],    
    'field_body' => [
        'type' => 'text_long',
        'label' => 'Treść',                
        'default_value' => '',
        'default_value_callback' => '',
        'settings' => [
            'allowed_formats' => [
                'basic_html',                
                'full_html',
            ],
        ],
    ],
    'field_bg_color' => [
        'type' => 'color_field_type',
        'label' => 'Kolor tła',
        'settings' => [
            'opacity' => 1,
        ],
        'default_value' => [
            [
                'color' => '#ffffff',
                'opacity' => 0.0,
            ],
        ],
        'translatable' => TRUE,
    ],
    'field_blenda' => [
        'type' => 'boolean',
        'label' => 'Blenda',
        'settings' => [],
        'default_value' =>  [1],
        'translatable' => TRUE,
    ],
    'field_text_color' => [
        'type' => 'color_field_type',
        'label' => 'Kolor tekstu',
        'settings' => [
            'opacity' => 1,
        ],
        'default_value' => [
            [
                'color' => '#000000',
                'opacity' => 1.0,
            ],
        ],
        'translatable' => TRUE,
    ],    
    'field_id' => [
        'type' => 'string',
        'label' => 'ID',
        'settings' => [
            'max_length' => 50,
            'case_sensitive' => FALSE,
            'is_ascii' => FALSE,
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],    
    'field_classes' => [
        'type' => 'string',
        'label' => 'Klasy CSS',
        'settings' => [
            'max_length' => 255,
            'case_sensitive' => FALSE,
            'is_ascii' => FALSE,
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],    
    'field_container' => [
        'type' => 'list_string',
        'label' => 'Kontener',
        'settings' => [
            'allowed_values' => [
                'container' => 'container (1320px)',
                'container-xl' => 'container-XL (1520px)',
                'container-xxl' => 'container-XXL (1820px)',
                'container-fluid' => 'full-width',
            ],
            'allowed_values_function' => '',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    
    'field_display' => [
        'type' => 'boolean',
        'label' => 'Display',
        'settings' => [],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    'field_height' => [
        'type' => 'string',
        'label' => 'Wysokość',
        'settings' => [
            'max_length' => 255,
            'case_sensitive' => FALSE,
            'is_ascii' => FALSE,
        ],
        'default_value' => ['600px'],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    'field_max_width' => [
        'type' => 'string',
        'label' => 'Max Width',
        'settings' => [
            'max_length' => 255,
            'case_sensitive' => FALSE,
            'is_ascii' => FALSE,
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    'field_mb' => [
        'type' => 'integer',
        'label' => 'Margin Bottom',
        'settings' => [
            'unsigned' => FALSE,
            'size' => 'normal',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],    
    'field_mt' => [
        'type' => 'integer',
        'label' => 'Margin Top',
        'settings' => [
            'unsigned' => FALSE,
            'size' => 'normal',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],    
    'field_ml' => [
        'type' => 'integer',
        'label' => 'Margin Left',
        'settings' => [
            'unsigned' => FALSE,
            'size' => 'normal',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    
    'field_mr' => [
        'type' => 'integer',
        'label' => 'Margin Right',
        'settings' => [
            'unsigned' => FALSE,
            'size' => 'normal',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    
    'field_pt' => [
        'type' => 'integer',
        'label' => 'Padding Top',
        'settings' => [
            'unsigned' => FALSE,
            'size' => 'normal',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    
    'field_pb' => [
        'type' => 'integer',
        'label' => 'Padding Bottom',
        'settings' => [
            'unsigned' => FALSE,
            'size' => 'normal',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    
    'field_pr' => [
        'type' => 'integer',
        'label' => 'Padding Right',
        'settings' => [
            'unsigned' => FALSE,
            'size' => 'normal',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    
    'field_pl' => [
        'type' => 'integer',
        'label' => 'Padding Left',
        'settings' => [
            'unsigned' => FALSE,
            'size' => 'normal',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    'field_parallax' => [
        'type' => 'boolean',
        'label' => 'Parallax',
        'settings' => [],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    'field_text_color' => [
        'type' => 'color_field_type',
        'label' => 'Kolor tekstu',
        'settings' => [
            'format' => '#HEXHEX',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    'field_text_position' => [
        'type' => 'list_string',
        'label' => 'Pozycja tekstu',
        'settings' => [
            'allowed_values' => [                 
                'left' => 'left',
                'right' => 'right',
            ],
        ],
        'default_value' => ['left'],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    'field_widok' => [
        'type' => 'viewsreference',
        'label' => 'Widok',
        'settings' => [
            'target_type' => 'view',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    'field_animate' => [
        'type' => 'list_string',
        'label' => 'Animacja',
        'settings' => [
            'allowed_values' => [
                'fade' => 'Fade',
                'fade-up' => 'Fade Up',
                'fade-down' => 'Fade Down',
                'fade-left' => 'Fade Left',
                'fade-right' => 'Fade Right',
                'fade-up-right' => 'Fade Up Right',
                'fade-up-left' => 'Fade Up Left',
                'fade-down-right' => 'Fade Down Right',
                'fade-down-left' => 'Fade Down Left',
                'flip-up' => 'Flip Up',
                'flip-down' => 'Flip Down',
                'flip-left' => 'Flip Left',
                'flip-right' => 'Flip Right',
                'slide-up' => 'Slide Up',
                'slide-down' => 'Slide Down',
                'slide-left' => 'Slide Left',
                'slide-right' => 'Slide Right',
                'zoom-in' => 'Zoom In',
                'zoom-in-up' => 'Zoom In Up',
                'zoom-in-down' => 'Zoom In Down',
                'zoom-in-left' => 'Zoom In Left',
                'zoom-in-right' => 'Zoom In Right',
                'zoom-out' => 'Zoom Out',
                'zoom-out-up' => 'Zoom Out Up',
                'zoom-out-down' => 'Zoom Out Down',
                'zoom-out-left' => 'Zoom Out Left',
                'zoom-out-right' => 'Zoom Out Right',
            ],
            'allowed_values_function' => '',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    'field_animate_title' => [
        'type' => 'list_string',
        'label' => 'Animacja tytułu',
        'settings' => [
            'allowed_values' => [
                'fade' => 'Fade',
                'fade-up' => 'Fade Up',
                'fade-down' => 'Fade Down',
                'fade-left' => 'Fade Left',
                'fade-right' => 'Fade Right',
                'fade-up-right' => 'Fade Up Right',
                'fade-up-left' => 'Fade Up Left',
                'fade-down-right' => 'Fade Down Right',
                'fade-down-left' => 'Fade Down Left',
                'flip-up' => 'Flip Up',
                'flip-down' => 'Flip Down',
                'flip-left' => 'Flip Left',
                'flip-right' => 'Flip Right',
                'slide-up' => 'Slide Up',
                'slide-down' => 'Slide Down',
                'slide-left' => 'Slide Left',
                'slide-right' => 'Slide Right',
                'zoom-in' => 'Zoom In',
                'zoom-in-up' => 'Zoom In Up',
                'zoom-in-down' => 'Zoom In Down',
                'zoom-in-left' => 'Zoom In Left',
                'zoom-in-right' => 'Zoom In Right',
                'zoom-out' => 'Zoom Out',
                'zoom-out-up' => 'Zoom Out Up',
                'zoom-out-down' => 'Zoom Out Down',
                'zoom-out-left' => 'Zoom Out Left',
                'zoom-out-right' => 'Zoom Out Right',
            ],
            'allowed_values_function' => '',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],    
    'field_animate_subtitle' => [
        'type' => 'list_string',
        'label' => 'Animacja sub tytułu',
        'settings' => [
            'allowed_values' => [
                'fade' => 'Fade',
                'fade-up' => 'Fade Up',
                'fade-down' => 'Fade Down',
                'fade-left' => 'Fade Left',
                'fade-right' => 'Fade Right',
                'fade-up-right' => 'Fade Up Right',
                'fade-up-left' => 'Fade Up Left',
                'fade-down-right' => 'Fade Down Right',
                'fade-down-left' => 'Fade Down Left',
                'flip-up' => 'Flip Up',
                'flip-down' => 'Flip Down',
                'flip-left' => 'Flip Left',
                'flip-right' => 'Flip Right',
                'slide-up' => 'Slide Up',
                'slide-down' => 'Slide Down',
                'slide-left' => 'Slide Left',
                'slide-right' => 'Slide Right',
                'zoom-in' => 'Zoom In',
                'zoom-in-up' => 'Zoom In Up',
                'zoom-in-down' => 'Zoom In Down',
                'zoom-in-left' => 'Zoom In Left',
                'zoom-in-right' => 'Zoom In Right',
                'zoom-out' => 'Zoom Out',
                'zoom-out-up' => 'Zoom Out Up',
                'zoom-out-down' => 'Zoom Out Down',
                'zoom-out-left' => 'Zoom Out Left',
                'zoom-out-right' => 'Zoom Out Right',
            ],
            'allowed_values_function' => '',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    'field_animate_body' => [
        'type' => 'list_string',
        'label' => 'Animacja body',
        'settings' => [
            'allowed_values' => [
                'fade' => 'Fade',
                'fade-up' => 'Fade Up',
                'fade-down' => 'Fade Down',
                'fade-left' => 'Fade Left',
                'fade-right' => 'Fade Right',
                'fade-up-right' => 'Fade Up Right',
                'fade-up-left' => 'Fade Up Left',
                'fade-down-right' => 'Fade Down Right',
                'fade-down-left' => 'Fade Down Left',
                'flip-up' => 'Flip Up',
                'flip-down' => 'Flip Down',
                'flip-left' => 'Flip Left',
                'flip-right' => 'Flip Right',
                'slide-up' => 'Slide Up',
                'slide-down' => 'Slide Down',
                'slide-left' => 'Slide Left',
                'slide-right' => 'Slide Right',
                'zoom-in' => 'Zoom In',
                'zoom-in-up' => 'Zoom In Up',
                'zoom-in-down' => 'Zoom In Down',
                'zoom-in-left' => 'Zoom In Left',
                'zoom-in-right' => 'Zoom In Right',
                'zoom-out' => 'Zoom Out',
                'zoom-out-up' => 'Zoom Out Up',
                'zoom-out-down' => 'Zoom Out Down',
                'zoom-out-left' => 'Zoom Out Left',
                'zoom-out-right' => 'Zoom Out Right',
            ],
            'allowed_values_function' => '',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],
    'field_animate_content' => [
        'type' => 'list_string',
        'label' => 'Animacja sekcji treści',
        'settings' => [
            'allowed_values' => [
                'fade' => 'Fade',
                'fade-up' => 'Fade Up',
                'fade-down' => 'Fade Down',
                'fade-left' => 'Fade Left',
                'fade-right' => 'Fade Right',
                'fade-up-right' => 'Fade Up Right',
                'fade-up-left' => 'Fade Up Left',
                'fade-down-right' => 'Fade Down Right',
                'fade-down-left' => 'Fade Down Left',
                'flip-up' => 'Flip Up',
                'flip-down' => 'Flip Down',
                'flip-left' => 'Flip Left',
                'flip-right' => 'Flip Right',
                'slide-up' => 'Slide Up',
                'slide-down' => 'Slide Down',
                'slide-left' => 'Slide Left',
                'slide-right' => 'Slide Right',
                'zoom-in' => 'Zoom In',
                'zoom-in-up' => 'Zoom In Up',
                'zoom-in-down' => 'Zoom In Down',
                'zoom-in-left' => 'Zoom In Left',
                'zoom-in-right' => 'Zoom In Right',
                'zoom-out' => 'Zoom Out',
                'zoom-out-up' => 'Zoom Out Up',
                'zoom-out-down' => 'Zoom Out Down',
                'zoom-out-left' => 'Zoom Out Left',
                'zoom-out-right' => 'Zoom Out Right',
            ],
            'allowed_values_function' => '',
        ],
        'cardinality' => 1,
        'translatable' => TRUE,
    ],

    'field_animate_duration' => [
        'type' => 'integer',
        'label' => 'Czas animacji',
        'settings' => [
            'unsigned' => FALSE,
            'size' => 'normal',
        ],
        'default_value' => [1500],        
    ],
    'field_animate_duration_title' => [
        'type' => 'integer',
        'label' => 'Czas animacji tytułu',
        'settings' => [
            'unsigned' => FALSE,
            'size' => 'normal',
        ],
        'default_value' => [1500],        
    ],    
    'field_animate_duration_subtitle' => [
        'type' => 'integer',
        'label' => 'Czas animacji sub tytułu',
        'settings' => [
            'unsigned' => FALSE,
            'size' => 'normal',
        ],
        'default_value' => [1500],        
    ],
    'field_animate_duration_body' => [
        'type' => 'integer',
        'label' => 'Czas animacji body',
        'settings' => [
            'unsigned' => FALSE,
            'size' => 'normal',
        ],
        'default_value' => [1500],        
    ],
    'field_animate_duration_content' => [
        'type' => 'integer',
        'label' => 'Czas animacji sekcji',
        'settings' => [
            'unsigned' => FALSE,
            'size' => 'normal',
        ],
        'default_value' => [1500],        
    ],   

    'field_animate_delay' => [
        'type' => 'integer',
        'label' => 'Opóźnienie animacji',
        'settings' => [
            'unsigned' => FALSE, // Określa, że wartość nie jest bez znaku
            'size' => 'normal',  // Rozmiar pola (np. normal, large)
        ],
        'cardinality' => 1,   // Tylko jedna wartość
        'translatable' => TRUE, // Pole jest tłumaczalne
    ],
    'field_animate_delay_title' => [
        'type' => 'integer',
        'label' => 'Opóźnienie tytułu',
        'settings' => [
            'unsigned' => FALSE, // Określa, że wartość nie jest bez znaku
            'size' => 'normal',  // Rozmiar pola (np. normal, large)
        ],
        'cardinality' => 1,   // Tylko jedna wartość
        'translatable' => TRUE, // Pole jest tłumaczalne
    ],    
    'field_animate_delay_subtitle' => [
        'type' => 'integer',
        'label' => 'Opóźnienie sub tytułu',
        'settings' => [
            'unsigned' => FALSE, // Określa, że wartość nie jest bez znaku
            'size' => 'normal',  // Rozmiar pola (np. normal, large)
        ],
        'cardinality' => 1,   // Tylko jedna wartość
        'translatable' => TRUE, // Pole jest tłumaczalne
    ],
    'field_animate_delay_body' => [
        'type' => 'integer',
        'label' => 'Opóźnienie body',
        'settings' => [
            'unsigned' => FALSE, // Określa, że wartość nie jest bez znaku
            'size' => 'normal',  // Rozmiar pola (np. normal, large)
        ],
        'cardinality' => 1,   // Tylko jedna wartość
        'translatable' => TRUE, // Pole jest tłumaczalne
    ],
    'field_animate_delay_content' => [
        'type' => 'integer',
        'label' => 'Opóźnienie sekcji',
        'settings' => [
            'unsigned' => FALSE, // Określa, że wartość nie jest bez znaku
            'size' => 'normal',  // Rozmiar pola (np. normal, large)
        ],
        'cardinality' => 1,   // Tylko jedna wartość
        'translatable' => TRUE, // Pole jest tłumaczalne
    ],
    'field_align' => [
        'type' => 'list_string',
        'label' => 'Wyrównanie w poziomie',
        'settings' => [
            'allowed_values' => [
                'left' => 'left',
                'center' => 'center',
                'right' => 'end',
            ],                        
        ],
        'default_value' => ['left'],
        'cardinality' => 1,
        'translatable' => true,        
    ],
    'field_valign' => [
        'type' => 'list_string',
        'label' => 'Wyrównanie w pionie',
        'settings' => [
            'allowed_values' => [
                'top' => 'top',
                'center' => 'center',
                'end' => 'end',
            ],                        
        ],
        'default_value' => ['center'],
        'cardinality' => 1,
        'translatable' => true,        
    ],
    'field_block' => [
        'type' => 'entity_reference',
        'label' => 'Block',
        'settings' => [
            'target_type' => 'block_content',
        ],
        'cardinality' => 1,
        'translatable' => true,        
    ],

];


