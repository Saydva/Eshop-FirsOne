import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
// This decorator can be used to specify roles for route handlers in NestJS applications.
