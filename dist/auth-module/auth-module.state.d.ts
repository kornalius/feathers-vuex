import { AuthState } from './types';
export default function setupAuthState({ userService, serverAlias, responseEntityField, entityIdField }: {
    userService: any;
    serverAlias: any;
    responseEntityField?: string;
    entityIdField?: string;
}): AuthState;
