import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<(Role | string)[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) {
      throw new ForbiddenException('User context missing or unauthenticated');
    }

    const userRole = String(user.role).toUpperCase();
    const isPM = userRole === 'PM' || userRole === 'PROJECT_MANAGER';
    const isSE = userRole === 'SE' || userRole === 'SITE_ENGINEER';
    const isSA = userRole === 'SA' || userRole === 'SUPER_ADMIN';

    const hasRole = requiredRoles.some((r) => {
      const target = String(r).toUpperCase();
      if (target === 'PM' || target === 'PROJECT_MANAGER') return isPM || isSA;
      if (target === 'SE' || target === 'SITE_ENGINEER') return isSE;
      if (target === 'SA' || target === 'SUPER_ADMIN') return isSA;
      return target === userRole;
    });

    if (!hasRole) {
      throw new ForbiddenException(
        `Insufficient permissions. Role '${user.role}' cannot perform this action.`,
      );
    }

    return true;
  }
}
