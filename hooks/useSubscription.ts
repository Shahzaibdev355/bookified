'use client';

import { useAuth } from '@clerk/nextjs';
import { PLAN_LIMITS, PLANS, PlanType } from '@/lib/subscription-constants';

/**
 * CLIENT-SIDE: Returns the user's current plan and limits.
 * Uses Clerk's has() from useAuth().
 */
export function useSubscription() {
    const { has, isLoaded } = useAuth();

    const plan: PlanType = !isLoaded
        ? PLANS.FREE
        : has?.({ plan: 'pro' })
        ? PLANS.PRO
        : has?.({ plan: 'standard' })
        ? PLANS.STANDARD
        : PLANS.FREE;

    return {
        plan,
        limits: PLAN_LIMITS[plan],
        isLoaded,
        isPro: plan === PLANS.PRO,
        isStandard: plan === PLANS.STANDARD,
        isFree: plan === PLANS.FREE,
    };
}