// 'use server';

// import { connectDB } from "@/database/db";
// import { VoiceSession } from "@/database/models/voice-session.model";
// import { EndSessionResult, StartSessionResult } from "@/types";
// import { getCurrentBillingPeriodStart } from "../subscription-constants";


// export const startVoiceSession = async (clerkId: string, bookId: string): Promise<StartSessionResult> => {

//     try {
//         await connectDB();

//         // limit/plan to see whether a session is allowed

//         const session = await VoiceSession.create({
//             clerkId,
//             bookId,
//             startedAt: new Date(),
//             billingPeriodStart: getCurrentBillingPeriodStart(),
//             durationSeconds: 0,
//         })

//         return {
//             success: true,
//             sessionId: session._id.toString(),
//             // maxDurationMinutes: check.maxDurationMinutes
//         }
//     }
//     catch (e) {
//         console.error("Error starting the voice session:", e);
//         return {
//             success: false,
//             error: "Failed to start voice session, please try again later"
//         }
//     }

// }   



// export const endVoiceSession = async (sessionId: string, durationSeconds: number): Promise<EndSessionResult> => {
//     try {
//         await connectDB();

//         const result = await VoiceSession.findByIdAndUpdate(sessionId, {
//             endedAt: new Date(),
//             durationSeconds,
//         });

//         if(!result) return { success: false, error: 'Voice session not found.' }

//         return { success: true }
//     } catch (e) {
//         console.error('Error ending voice session', e);
//         return { success: false, error: 'Failed to end voice session. Please try again later.' }
//     }
// }




'use server';

import { connectDB } from '@/database/db';
import { VoiceSession } from '@/database/models/voice-session.model';
import { EndSessionResult, StartSessionResult } from '@/types';
import { getCurrentBillingPeriodStart, PLAN_LIMITS } from '../subscription-constants';
import { getUserPlan } from '../subscription-utils';

export const startVoiceSession = async (
    clerkId: string,
    bookId: string,
): Promise<StartSessionResult> => {
    try {
        await connectDB();

        // ── Subscription enforcement ──────────────────────────────────────
        const plan = await getUserPlan();
        const limits = PLAN_LIMITS[plan];

        // Count sessions in the current billing period (calendar month)
        const billingPeriodStart = getCurrentBillingPeriodStart();
        const sessionCount = await VoiceSession.countDocuments({
            clerkId,
            startedAt: { $gte: billingPeriodStart },
        });

        if (sessionCount >= limits.maxSessionsPerMonth) {
            return {
                success: false,
                isBillingError: true,
                error:
                    limits.maxSessionsPerMonth === Infinity
                        ? 'Session limit reached.'
                        : `Your ${plan} plan allows ${limits.maxSessionsPerMonth} sessions/month. You've used ${sessionCount}. Upgrade to continue.`,
            };
        }
        // ─────────────────────────────────────────────────────────────────

        const session = await VoiceSession.create({
            clerkId,
            bookId,
            startedAt: new Date(),
            billingPeriodStart,
            durationSeconds: 0,
        });

        return {
            success: true,
            sessionId: session._id.toString(),
            maxDurationMinutes: limits.maxDurationPerSession,
        };
    } catch (e) {
        console.error('Error starting the voice session:', e);
        return {
            success: false,
            error: 'Failed to start voice session, please try again later',
        };
    }
};

export const endVoiceSession = async (
    sessionId: string,
    durationSeconds: number,
): Promise<EndSessionResult> => {
    try {
        await connectDB();

        const result = await VoiceSession.findByIdAndUpdate(sessionId, {
            endedAt: new Date(),
            durationSeconds,
        });

        if (!result) return { success: false, error: 'Voice session not found.' };

        return { success: true };
    } catch (e) {
        console.error('Error ending voice session', e);
        return { success: false, error: 'Failed to end voice session. Please try again later.' };
    }
};