import { MembersEntity } from '@app/members/members.entity';

export type MembersType = Omit<MembersEntity, 'updateTimestamp'>;
