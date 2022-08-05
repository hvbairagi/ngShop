import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';
import { UsersEntity } from './users.models';

export const buildUserSession = createAction('[Users] Build User Session');

export const buildUserSessionSuccess = createAction(
  '[Users] Users Build Users Session Success',
  props<{ user: User }>()
);

export const buildUserSessionFailed = createAction(
  '[Users] Build User Session Failed'
);
