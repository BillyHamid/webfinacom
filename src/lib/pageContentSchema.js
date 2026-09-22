// ============================================================================
// Schéma du contenu éditable des pages publiques (table Supabase page_content)
// Chaque page a un onglet dans l'admin (Contenu des pages). Les libellés de
// sections/champs ci-dessous pilotent l'interface d'édition.
// ============================================================================

export const PAGE_CONTENT_SCHEMA = [
  {
    page: 'home',
    label: 'Accueil',
    sections: [
      {
        title: 'Hero (bandeau principal)',
        note: "Le grand titre animé (\"Faire grandir vos projets, ensemble.\") n'est pas éditable ici — seuls le petit label, le texte d'accompagnement, la citation et les photos de fond le sont. Jusqu'à 3 photos = carrousel en fondu enchaîné ; laisse les suivantes vides pour moins de photos.",
        fields: [
          { key: 'hero_image_1', label: 'Photo de fond (1ère)', type: 'image' },
          { key: 'hero_image_2', label: 'Photo de fond (2e, carrousel — optionnel)', type: 'image' },
          { key: 'hero_image_3', label: 'Photo de fond (3e, carrousel — optionnel)', type: 'image' },
          { key: 'hero_kicker', label: 'Petit label au-dessus du titre', type: 'input' },
          { key: 'hero_body', label: 'Paragraphe sous le titre', type: 'textarea' },
          { key: 'hero_quote', label: 'Citation (encart latéral)', type: 'textarea' },
        ],
      },
      {
        title: 'Section "À propos"',
        fields: [
          { key: 'about_heading', label: 'Titre', type: 'input' },
          { key: 'about_body', label: 'Paragraphe', type: 'textarea' },
          { key: 'about_quote', label: 'Citation (carte flottante sur la photo)', type: 'textarea' },
        ],
      },
      {
        title: 'Section "Produits et services"',
        fields: [{ key: 'services_heading', label: 'Titre', type: 'input' }],
      },
      {
        title: 'Section "Banque digitale"',
        fields: [
          { key: 'digital_kicker', label: 'Badge ("100% Digital")', type: 'input' },
          { key: 'digital_heading', label: 'Titre', type: 'input' },
          { key: 'digital_body', label: 'Paragraphe', type: 'textarea' },
        ],
      },
      {
        title: 'Section "Témoignages"',
        fields: [
          { key: 'testimonials_heading', label: 'Titre', type: 'input' },
          { key: 'testimonials_body', label: 'Sous-titre', type: 'textarea' },
        ],
      },
      {
        title: 'Section "Appel à l\'action" (bas de page)',
        fields: [
          { key: 'cta_badge', label: 'Badge', type: 'input' },
          { key: 'cta_heading', label: 'Titre', type: 'input' },
          { key: 'cta_body', label: 'Paragraphe', type: 'textarea' },
        ],
      },
    ],
  },
  {
    page: 'about',
    label: 'À propos',
    sections: [
      {
        title: 'Hero (bandeau principal)',
        note: "Jusqu'à 3 photos = carrousel en fondu enchaîné. Laisse les suivantes vides pour moins de photos.",
        fields: [
          { key: 'hero_image_1', label: 'Photo de fond (1ère)', type: 'image' },
          { key: 'hero_image_2', label: 'Photo de fond (2e, carrousel — optionnel)', type: 'image' },
          { key: 'hero_image_3', label: 'Photo de fond (3e, carrousel — optionnel)', type: 'image' },
          { key: 'hero_kicker', label: 'Petit label', type: 'input' },
          { key: 'hero_title', label: 'Titre (partie normale)', type: 'input' },
          { key: 'hero_highlight', label: 'Titre (partie dorée)', type: 'input' },
          { key: 'hero_description', label: 'Sous-titre', type: 'textarea' },
        ],
      },
      {
        title: 'Section "Notre mission"',
        fields: [
          { key: 'mission_heading', label: 'Titre', type: 'input' },
          { key: 'mission_body', label: 'Paragraphe', type: 'textarea' },
          { key: 'mission_quote', label: 'Slogan officiel (carte)', type: 'textarea' },
          { key: 'mission_ancrage_heading', label: 'Titre — Ancrage institutionnel', type: 'input' },
          { key: 'mission_ancrage_body', label: 'Paragraphe — Ancrage institutionnel', type: 'textarea' },
        ],
      },
      {
        title: 'Section "Notre histoire"',
        fields: [
          { key: 'history_heading', label: 'Titre', type: 'input' },
          { key: 'history_body', label: 'Paragraphe', type: 'textarea' },
        ],
      },
      {
        title: 'Citation de la direction',
        fields: [
          { key: 'leader_quote', label: 'Citation', type: 'textarea' },
          { key: 'leader_name', label: 'Signature', type: 'input' },
        ],
      },
      {
        title: 'Section "Nos valeurs"',
        fields: [
          { key: 'values_heading', label: 'Titre', type: 'input' },
          { key: 'values_body', label: 'Paragraphe', type: 'textarea' },
        ],
      },
      {
        title: 'Section "Notre structure" (gouvernance)',
        fields: [
          { key: 'governance_heading', label: 'Titre', type: 'input' },
          { key: 'governance_body', label: 'Paragraphe', type: 'textarea' },
        ],
      },
      {
        title: 'Section "Axes stratégiques"',
        fields: [{ key: 'axes_heading', label: 'Titre', type: 'input' }],
      },
      {
        title: 'Section "Zones d\'intervention"',
        fields: [
          { key: 'regions_heading', label: 'Titre', type: 'input' },
          { key: 'regions_body', label: 'Paragraphe', type: 'textarea' },
        ],
      },
      {
        title: 'Appel à l\'action (bas de page)',
        fields: [
          { key: 'cta_heading', label: 'Titre', type: 'input' },
          { key: 'cta_body', label: 'Paragraphe', type: 'textarea' },
        ],
      },
    ],
  },
  {
    page: 'services',
    label: 'Produits & Services',
    sections: [
      {
        title: 'Hero (bandeau principal)',
        note: "Jusqu'à 3 photos = carrousel en fondu enchaîné. Laisse les suivantes vides pour moins de photos.",
        fields: [
          { key: 'hero_image_1', label: 'Photo de fond (1ère)', type: 'image' },
          { key: 'hero_image_2', label: 'Photo de fond (2e, carrousel — optionnel)', type: 'image' },
          { key: 'hero_image_3', label: 'Photo de fond (3e, carrousel — optionnel)', type: 'image' },
          { key: 'hero_kicker', label: 'Petit label', type: 'input' },
          { key: 'hero_title', label: 'Titre (partie normale)', type: 'input' },
          { key: 'hero_highlight', label: 'Titre (partie dorée)', type: 'input' },
          { key: 'hero_description', label: 'Sous-titre', type: 'textarea' },
        ],
      },
      {
        title: 'Introduction',
        fields: [
          { key: 'intro_heading', label: 'Titre', type: 'input' },
          { key: 'intro_body', label: 'Paragraphe', type: 'textarea' },
        ],
      },
      {
        title: 'Section "Comment ça marche"',
        fields: [
          { key: 'process_heading', label: 'Titre', type: 'input' },
          { key: 'process_body', label: 'Paragraphe', type: 'textarea' },
        ],
      },
      {
        title: 'Section FAQ',
        fields: [{ key: 'faq_heading', label: 'Titre', type: 'input' }],
      },
    ],
  },
  {
    page: 'blog',
    label: 'Blog',
    sections: [
      {
        title: 'Hero (bandeau principal)',
        note: "Jusqu'à 3 photos = carrousel en fondu enchaîné (optionnel).",
        fields: [
          { key: 'hero_image_1', label: 'Photo de fond (1ère)', type: 'image' },
          { key: 'hero_image_2', label: 'Photo de fond (2e, carrousel — optionnel)', type: 'image' },
          { key: 'hero_image_3', label: 'Photo de fond (3e, carrousel — optionnel)', type: 'image' },
          { key: 'hero_kicker', label: 'Petit label', type: 'input' },
          { key: 'hero_title', label: 'Titre (partie normale)', type: 'input' },
          { key: 'hero_highlight', label: 'Titre (partie dorée)', type: 'input' },
          { key: 'hero_description', label: 'Sous-titre', type: 'textarea' },
        ],
      },
      {
        title: 'Section "Dernières nouvelles"',
        fields: [{ key: 'news_heading', label: 'Titre', type: 'input' }],
      },
    ],
  },
  {
    page: 'media',
    label: 'Médiathèque',
    sections: [
      {
        title: 'Hero (bandeau principal)',
        note: "Jusqu'à 3 photos = carrousel en fondu enchaîné (optionnel).",
        fields: [
          { key: 'hero_image_1', label: 'Photo de fond (1ère)', type: 'image' },
          { key: 'hero_image_2', label: 'Photo de fond (2e, carrousel — optionnel)', type: 'image' },
          { key: 'hero_image_3', label: 'Photo de fond (3e, carrousel — optionnel)', type: 'image' },
          { key: 'hero_kicker', label: 'Petit label', type: 'input' },
          { key: 'hero_title', label: 'Titre (partie normale)', type: 'input' },
          { key: 'hero_highlight', label: 'Titre (partie dorée)', type: 'input' },
          { key: 'hero_description', label: 'Sous-titre', type: 'textarea' },
        ],
      },
      {
        title: 'En-tête de la médiathèque',
        fields: [
          { key: 'media_heading', label: 'Titre', type: 'input' },
          { key: 'media_body', label: 'Paragraphe', type: 'textarea' },
        ],
      },
    ],
  },
  {
    page: 'contact',
    label: 'Contact',
    sections: [
      {
        title: 'Hero (bandeau principal)',
        note: "Jusqu'à 3 photos = carrousel en fondu enchaîné (optionnel).",
        fields: [
          { key: 'hero_image_1', label: 'Photo de fond (1ère)', type: 'image' },
          { key: 'hero_image_2', label: 'Photo de fond (2e, carrousel — optionnel)', type: 'image' },
          { key: 'hero_image_3', label: 'Photo de fond (3e, carrousel — optionnel)', type: 'image' },
          { key: 'hero_kicker', label: 'Petit label', type: 'input' },
          { key: 'hero_title', label: 'Titre (partie normale)', type: 'input' },
          { key: 'hero_highlight', label: 'Titre (partie dorée)', type: 'input' },
          { key: 'hero_description', label: 'Sous-titre', type: 'textarea' },
        ],
      },
      {
        title: 'En-tête "Nos agences"',
        fields: [
          { key: 'info_heading', label: 'Titre', type: 'input' },
          { key: 'info_body', label: 'Paragraphe', type: 'textarea' },
        ],
      },
      {
        title: 'Section réseau (bas de page)',
        fields: [{ key: 'network_heading', label: 'Titre', type: 'input' }],
      },
    ],
  },
];
