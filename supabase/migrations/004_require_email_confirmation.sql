-- Migration 004: Configure email confirmation requirement
-- This migration ensures that email confirmation is required for authentication

-- Update auth settings to require email confirmation
-- Note: This needs to be done in Supabase Dashboard under Authentication > Settings
-- Set "Enable email confirmations" to ON

-- Create a function to check if user is confirmed
CREATE OR REPLACE FUNCTION public.is_user_confirmed(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_confirmed BOOLEAN;
BEGIN
  SELECT email_confirmed_at IS NOT NULL INTO user_confirmed
  FROM auth.users
  WHERE id = user_id;
  
  RETURN COALESCE(user_confirmed, FALSE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a policy to only allow confirmed users to access protected resources
-- This is an example policy that can be applied to tables that require authentication
-- DROP POLICY IF EXISTS "Only confirmed users can access" ON public.profiles;
-- CREATE POLICY "Only confirmed users can access" ON public.profiles
--   FOR ALL USING (public.is_user_confirmed(auth.uid()));

-- Update user_stats policy to require confirmation
DROP POLICY IF EXISTS "Users can view own stats" ON public.user_stats;
DROP POLICY IF EXISTS "Users can update own stats" ON public.user_stats;
DROP POLICY IF EXISTS "Users can insert own stats" ON public.user_stats;

CREATE POLICY "Users can view own stats" ON public.user_stats
  FOR SELECT USING (auth.uid() = id AND public.is_user_confirmed(auth.uid()));

CREATE POLICY "Users can update own stats" ON public.user_stats
  FOR UPDATE USING (auth.uid() = id AND public.is_user_confirmed(auth.uid()));

CREATE POLICY "Users can insert own stats" ON public.user_stats
  FOR INSERT WITH CHECK (auth.uid() = id AND public.is_user_confirmed(auth.uid()));

-- Update profiles policy to require confirmation
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id AND public.is_user_confirmed(auth.uid()));

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id AND public.is_user_confirmed(auth.uid()));

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id AND public.is_user_confirmed(auth.uid()));
