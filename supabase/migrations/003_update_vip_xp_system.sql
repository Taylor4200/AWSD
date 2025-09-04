-- Migration 003: Update XP system to match VIP tiers and add SC/GC XP rewards
-- This migration updates the level calculation to match the VIP system requirements

-- Update the calculate_level function to match VIP tiers
CREATE OR REPLACE FUNCTION public.calculate_level(exp INTEGER)
RETURNS INTEGER AS $$
BEGIN
  -- Level calculation based on VIP tiers
  -- Level 0: Unranked (0 XP)
  -- Level 1: Bronze (5,001 XP)
  -- Level 2: Silver (20,001 XP)
  -- Level 3: Gold (50,001 XP)
  -- Level 4: Platinum (150,001 XP)
  -- Level 5: Diamond (400,001 XP)
  -- Level 6: Elite (1,200,001 XP)
  -- Level 7: Legend (3,000,001 XP)
  RETURN CASE 
    WHEN exp < 5001 THEN 0
    WHEN exp < 20001 THEN 1
    WHEN exp < 50001 THEN 2
    WHEN exp < 150001 THEN 3
    WHEN exp < 400001 THEN 4
    WHEN exp < 1200001 THEN 5
    WHEN exp < 3000001 THEN 6
    ELSE 7
  END;
END;
$$ LANGUAGE plpgsql;

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

-- Update existing user levels to match new VIP system
UPDATE public.user_stats 
SET level = public.calculate_level(experience)
WHERE level IS NOT NULL;
