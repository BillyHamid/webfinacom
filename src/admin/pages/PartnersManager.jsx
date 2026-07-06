import GenericCollectionManager from '../components/GenericCollectionManager';

export default function PartnersManager() {
  return (
    <GenericCollectionManager
      table="partners"
      title="Partenaires"
      subtitle="Logos affichés dans le bandeau de confiance du site"
      orderBy="sort_order"
      columns={['name']}
      fields={[
        { key: 'name', label: 'Nom du partenaire', type: 'text', required: true },
        { key: 'logo_url', label: 'Logo', type: 'image' },
        { key: 'sort_order', label: 'Ordre d\'affichage', type: 'number', default: 0 },
      ]}
    />
  );
}
