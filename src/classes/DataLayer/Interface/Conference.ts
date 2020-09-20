import * as Schema from "../Schema";
import { StaticCachedBase, StaticBaseImpl, CachedBase, LocalDataT } from "./Base";
import { PrivilegedConferenceDetails, TextChat, _User } from ".";
import { PromisesRemapped } from "../WholeSchema";

type SchemaT = Schema.Conference;
type K = "Conference";
const K_str: K = "Conference";

export default class Class extends CachedBase<K> implements SchemaT {
    constructor(
        conferenceId: string,
        data: LocalDataT[K],
        parse: Parse.Object<PromisesRemapped<SchemaT>> | null = null) {
        super(conferenceId, K_str, data, parse);
    }

    get headerImage(): Parse.File | undefined {
        return this.data.headerImage;
    }

    get welcomeText(): string {
        return this.data.welcomeText;
    }

    get name(): string {
        return this.data.name;
    }

    get shortName(): string {
        return this.data.shortName;
    }

    get lastProgramUpdateTime(): Date {
        return this.data.lastProgramUpdateTime;
    }

    get details(): Promise<Array<PrivilegedConferenceDetails>> {
        return StaticBaseImpl.getAllByField("PrivilegedConferenceDetails", "conference", this.id);
    }

    get autoSubscribeToTextChats(): Promise<Array<TextChat>> {
        return StaticBaseImpl.getAllByField("TextChat", "autoSubscribe", true);
    }

    static get(id: string): Promise<Class | null> {
        return StaticBaseImpl.get(K_str, id);
    }

    static getAll(): Promise<Array<Class>> {
        return StaticBaseImpl.getAll(K_str);
    }

    static onDataUpdated(conferenceId: string) {
        return StaticBaseImpl.onDataUpdated(K_str, conferenceId);
    }

    static onDataDeleted(conferenceId: string) {
        return StaticBaseImpl.onDataDeleted(K_str, conferenceId);
    }
}

// The line of code below triggers type-checking of Class for static members
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _: StaticCachedBase<K> = Class;
