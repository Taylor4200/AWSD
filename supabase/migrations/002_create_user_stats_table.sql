-- Create user_stats table to handle XP, levels, and progression
CREATE TABLE IF NOT EXISTS public.user_stats (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  experience INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  total_wagered DECIMAL(15,2) DEFAULT 0,
  total_won DECIMAL(15,2) DEFAULT 0,
  games_played INTEGER DEFAULT 0,
  games_won INTEGER DEFAULT 0,
  biggest_win DECIMAL(15,2) DEFAULT 0,
  longest_win_streak INTEGER DEFAULT 0,
  current_win_streak INTEGER DEFAULT 0,
  achievements_earned INTEGER DEFAULT 0,
  referral_bonuses_earned INTEGER DEFAULT 0,
  daily_login_streak INTEGER DEFAULT 0,
  last_daily_login DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for user_stats table
DROP POLICY IF EXISTS "Users can view own stats" ON public.user_stats;
DROP POLICY IF EXISTS "Users can update own stats" ON public.user_stats;
DROP POLICY IF EXISTS "Users can insert own stats" ON public.user_stats;

CREATE POLICY "Users can view own stats" ON public.user_stats
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own stats" ON public.user_stats
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own stats" ON public.user_stats
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to handle new user stats creation
CREATE OR REPLACE FUNCTION public.handle_new_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_stats (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user stats on user signup
DROP TRIGGER IF EXISTS on_auth_user_stats_created ON auth.users;
CREATE TRIGGER on_auth_user_stats_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_stats();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_user_stats_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on user_stats changes
DROP TRIGGER IF EXISTS on_user_stats_updated ON public.user_stats;
CREATE TRIGGER on_user_stats_updated
  BEFORE UPDATE ON public.user_stats
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_stats_updated_at();

-- Create function to calculate level from experience
CREATE OR REPLACE FUNCTION public.calculate_level(exp INTEGER)
RETURNS INTEGER AS $$
BEGIN
  -- Level calculation: each level requires more XP
  -- Level 1: 0 XP, Level 2: 100 XP, Level 3: 300 XP, etc.
  RETURN CASE 
    WHEN exp < 100 THEN 1
    WHEN exp < 300 THEN 2
    WHEN exp < 600 THEN 3
    WHEN exp < 1000 THEN 4
    WHEN exp < 1500 THEN 5
    WHEN exp < 2100 THEN 6
    WHEN exp < 2800 THEN 7
    WHEN exp < 3600 THEN 8
    WHEN exp < 4500 THEN 9
    WHEN exp < 5500 THEN 10
    WHEN exp < 6600 THEN 11
    WHEN exp < 7800 THEN 12
    WHEN exp < 9100 THEN 13
    WHEN exp < 10500 THEN 14
    WHEN exp < 12000 THEN 15
    WHEN exp < 13600 THEN 16
    WHEN exp < 15300 THEN 17
    WHEN exp < 17100 THEN 18
    WHEN exp < 19000 THEN 19
    WHEN exp < 21000 THEN 20
    WHEN exp < 23100 THEN 21
    WHEN exp < 25300 THEN 22
    WHEN exp < 27600 THEN 23
    WHEN exp < 30000 THEN 24
    WHEN exp < 32500 THEN 25
    WHEN exp < 35100 THEN 26
    WHEN exp < 37800 THEN 27
    WHEN exp < 40600 THEN 28
    WHEN exp < 43500 THEN 29
    WHEN exp < 46500 THEN 30
    WHEN exp < 49600 THEN 31
    WHEN exp < 52800 THEN 32
    WHEN exp < 56100 THEN 33
    WHEN exp < 59500 THEN 34
    WHEN exp < 63000 THEN 35
    WHEN exp < 66600 THEN 36
    WHEN exp < 70300 THEN 37
    WHEN exp < 74100 THEN 38
    WHEN exp < 78000 THEN 39
    WHEN exp < 82000 THEN 40
    WHEN exp < 86100 THEN 41
    WHEN exp < 90300 THEN 42
    WHEN exp < 94600 THEN 43
    WHEN exp < 99000 THEN 44
    WHEN exp < 103500 THEN 45
    WHEN exp < 108100 THEN 46
    WHEN exp < 112800 THEN 47
    WHEN exp < 117600 THEN 48
    WHEN exp < 122500 THEN 49
    WHEN exp < 127500 THEN 50
    ELSE 50
  END;
END;
$$ LANGUAGE plpgsql;

-- Create function to add experience and auto-update level
CREATE OR REPLACE FUNCTION public.add_experience(user_id UUID, exp_amount INTEGER)
RETURNS TABLE(new_level INTEGER, new_experience INTEGER) AS $$
DECLARE
  current_exp INTEGER;
  new_exp INTEGER;
  calculated_level INTEGER;
BEGIN
  -- Get current experience
  SELECT experience INTO current_exp FROM public.user_stats WHERE id = user_id;
  
  -- Calculate new experience
  new_exp := COALESCE(current_exp, 0) + exp_amount;
  
  -- Calculate new level
  calculated_level := public.calculate_level(new_exp);
  
  -- Update user stats
  UPDATE public.user_stats 
  SET 
    experience = new_exp,
    level = calculated_level,
    updated_at = NOW()
  WHERE id = user_id;
  
  -- Return new values
  RETURN QUERY SELECT calculated_level, new_exp;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to add XP from SC/GC earnings
CREATE OR REPLACE FUNCTION public.add_coin_experience(user_id UUID, sweepstakes_coins INTEGER, gold_coins INTEGER)
RETURNS TABLE(new_level INTEGER, new_experience INTEGER, xp_gained INTEGER) AS $$
DECLARE
  current_exp INTEGER;
  sc_xp INTEGER;
  gc_xp INTEGER;
  total_xp_gained INTEGER;
  new_exp INTEGER;
  calculated_level INTEGER;
BEGIN
  -- Calculate XP from coins
  sc_xp := sweepstakes_coins * 1;  -- 1 XP per SC
  gc_xp := FLOOR(gold_coins * 0.1); -- 0.1 XP per GC (rounded down)
  total_xp_gained := sc_xp + gc_xp;
  
  -- Get current experience
  SELECT experience INTO current_exp FROM public.user_stats WHERE id = user_id;
  
  -- Calculate new experience
  new_exp := COALESCE(current_exp, 0) + total_xp_gained;
  
  -- Calculate new level
  calculated_level := public.calculate_level(new_exp);
  
  -- Update user stats
  UPDATE public.user_stats 
  SET 
    experience = new_exp,
    level = calculated_level,
    updated_at = NOW()
  WHERE id = user_id;
  
  -- Return new values
  RETURN QUERY SELECT calculated_level, new_exp, total_xp_gained;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
