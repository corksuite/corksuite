export type AuthenticatedUser = {
  id: string;
  email: string;
  displayName: string;
  organizationId?: string;
  roles: string[];
};
