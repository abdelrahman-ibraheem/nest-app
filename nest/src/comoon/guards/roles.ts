import { SetMetadata } from '@nestjs/common';

// The metadata key used by the RolesGuard
export const ROLES_KEY = 'roles';

// Custom decorator for attaching roles to route handlers
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
export default Roles;