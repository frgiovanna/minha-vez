import { Athlete } from '@shared/types';

export type LoginProps = {
  onSubmit: (athlete: Athlete) => void;
};

export type UserProvidedAthlete = Pick<Athlete, 'name' | 'gender'>;
