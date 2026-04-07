/** Shared password for all Sauce Demo accounts. */
export const SAUCE_DEMO_PASSWORD = 'secret_sauce';

export const Users = {
  standard: 'standard_user',
  lockedOut: 'locked_out_user',
  problem: 'problem_user',
  performanceGlitch: 'performance_glitch_user',
  error: 'error_user',
  visual: 'visual_user',
} as const;

/** Usernames that can sign in and reach the inventory page (excludes locked_out_user). */
export const USERS_THAT_REACH_INVENTORY: readonly string[] = [
  Users.standard,
  Users.problem,
  Users.performanceGlitch,
  Users.error,
  Users.visual,
];
