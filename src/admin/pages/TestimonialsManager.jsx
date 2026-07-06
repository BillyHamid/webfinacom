import GenericCollectionManager from '../components/GenericCollectionManager';

const COLOR_OPTIONS = [
  { value: 'bg-primary-500', label: 'Vert' },
  { value: 'bg-accent-500', label: 'Or' },
  { value: 'bg-blue-500', label: 'Bleu' },
  { value: 'bg-emerald-500', label: 'Émeraude' },
];

export default function TestimonialsManager() {
  return (
    <GenericCollectionManager
      table="testimonials"
      title="Témoignages"
      subtitle="Avis clients affichés sur le site public"
      orderBy="sort_order"
      columns={['name', 'role', 'rating']}
      fields={[
        { key: 'name', label: 'Nom', type: 'text', required: true },
        { key: 'role', label: 'Rôle / Ville', type: 'text' },
        { key: 'content', label: 'Témoignage', type: 'textarea', required: true },
        { key: 'rating', label: 'Note (1 à 5)', type: 'number', default: 5 },
        { key: 'initials', label: 'Initiales', type: 'text' },
        { key: 'color', label: 'Couleur', type: 'select', options: COLOR_OPTIONS, default: COLOR_OPTIONS[0].value },
        { key: 'sort_order', label: 'Ordre d\'affichage', type: 'number', default: 0 },
      ]}
    />
  );
}
