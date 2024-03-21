'use server';
import type { QueryData } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

const getServiceAccess = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

export async function updateElement(progress: {
  id: number;
  course_id: string;
  owner_id: string;
  progress: {
    [key: string]: {
      [key: string]: {
        ended: boolean;
        notes: string;
      };
    };
  };
}) {
  const supabase = getServiceAccess();

  const updateDataQuery = supabase.from('courses_progress').update(progress).eq('id', progress.id);

  type UpdateData = QueryData<typeof updateDataQuery>;

  const { data, error } = await updateDataQuery;
  if (error) throw error;

  return data as UpdateData;
}
