import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * useVisitStats — nombre de pages vues (total / aujourd'hui / ce mois-ci),
 * réservé au back-office (nécessite d'être connecté en admin, cf. RLS de
 * site_visits dans supabase/003_site_visits.sql).
 */
export function useVisitStats() {
  const [stats, setStats] = useState({ total: 0, today: 0, month: 0, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      const [totalRes, todayRes, monthRes] = await Promise.all([
        supabase.from('site_visits').select('*', { count: 'exact', head: true }),
        supabase.from('site_visits').select('*', { count: 'exact', head: true }).gte('created_at', startOfToday),
        supabase.from('site_visits').select('*', { count: 'exact', head: true }).gte('created_at', startOfMonth),
      ]);

      if (cancelled) return;

      const firstError = totalRes.error || todayRes.error || monthRes.error || null;
      setStats({
        total: totalRes.count ?? 0,
        today: todayRes.count ?? 0,
        month: monthRes.count ?? 0,
        loading: false,
        error: firstError,
      });
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
}
