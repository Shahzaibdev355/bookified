// lib/subscription-utils.ts
import { auth } from '@clerk/nextjs/server';
import { PLAN_LIMITS, PLANS, PlanType } from './subscription-constants';

/**
 * SERVER-SIDE: Get the user's current plan using Clerk's has() method.
 * Plans are read from Clerk Billing with slugs "standard" and "pro".
 * Falls back to "free" if neither is found.
 */
export async function getUserPlan(): Promise<PlanType> {
    const { has } = await auth();

    if (has({ plan: 'pro' })) return PLANS.PRO;
    if (has({ plan: 'standard' })) return PLANS.STANDARD;
    return PLANS.FREE;
}

/**
 * SERVER-SIDE: Get the full plan limits for the current user.
 */
export async function getUserPlanLimits() {
    const plan = await getUserPlan();
    return {
        plan,
        limits: PLAN_LIMITS[plan],
    };
}