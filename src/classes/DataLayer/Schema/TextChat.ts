import { Base } from ".";
import { Conference } from "../Interface";

export default interface Schema extends Base {
    autoWatch: boolean;
    mirrored: boolean;
    name: string;
    twilioID: string;

    conference: Promise<Conference>;
}
