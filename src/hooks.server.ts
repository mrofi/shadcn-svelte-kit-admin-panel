import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as supabase} from '@/supabase';
import { handle as i18n } from '@/i18n/server';

export const handle: Handle = sequence(supabase, i18n);
