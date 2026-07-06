import GenericCollectionManager from '../components/GenericCollectionManager';
import { ICON_OPTIONS, COLOR_OPTIONS } from '../../lib/iconMap';

export default function MetricsManager() {
  return (
    <GenericCollectionManager
      table="key_metrics"
      title="Chiffres-clés"
      subtitle="Statistiques affichées sur la page d'accueil"
      orderBy="sort_order"
      columns={['label', 'value', 'suffix']}
      fields={[
        { key: 'label', label: 'Libellé', type: 'text', required: true },
        { key: 'description', label: 'Description', type: 'text' },
        { key: 'value', label: 'Valeur', type: 'number', required: true },
        { key: 'suffix', label: 'Suffixe (ex: +, Mds)', type: 'text' },
        { key: 'icon', label: 'Icône', type: 'select', options: ICON_OPTIONS, default: ICON_OPTIONS[0].value },
        { key: 'color', label: 'Couleur', type: 'select', options: COLOR_OPTIONS, default: COLOR_OPTIONS[0].value },
        { key: 'sort_order', label: 'Ordre d\'affichage', type: 'number', default: 0 },
      ]}
    />
  );
}
