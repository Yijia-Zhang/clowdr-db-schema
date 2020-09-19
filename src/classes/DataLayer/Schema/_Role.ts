import { Base } from ".";
import { _Role, _User, Conference } from "../Interface";

export type RoleNames = "admin" | "manager" | "attendee";

export default interface Schema extends Base {
    name: string;

    conference: Promise<Conference>;
    roles: Promise<Array<_Role>>;
    users: Promise<Array<_User>>;
}
