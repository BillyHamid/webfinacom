import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * Hook générique de lecture/écriture pour une table Supabase.
 * `eq` (filtres d'égalité simples) est sérialisé en JSON pour rester stable
 * entre les rendus même si l'appelant passe un nouvel objet littéral à chaque fois.
 */
export function useSupabaseTable(table, { orderBy, ascending = true, eq } = {}) {
  const eqKey = JSON.stringify(eq || {});

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    let query = supabase.from(table).select('*');

    Object.entries(JSON.parse(eqKey)).forEach(([column, value]) => {
      query = query.eq(column, value);
    });
    if (orderBy) query = query.order(orderBy, { ascending });

    const { data: rows, error: err } = await query;
    if (err) setError(err);
    else {
      setData(rows || []);
      setError(null);
    }
    setLoading(false);
  }, [table, orderBy, ascending, eqKey]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = async (values) => {
    const { data: rows, error: err } = await supabase.from(table).insert(values).select();
    if (err) throw err;
    await refresh();
    return rows?.[0];
  };

  const update = async (id, values) => {
    const { data: rows, error: err } = await supabase.from(table).update(values).eq('id', id).select();
    if (err) throw err;
    await refresh();
    return rows?.[0];
  };

  const remove = async (id) => {
    const { error: err } = await supabase.from(table).delete().eq('id', id);
    if (err) throw err;
    await refresh();
  };

  return { data, loading, error, create, update, remove, refresh };
}
