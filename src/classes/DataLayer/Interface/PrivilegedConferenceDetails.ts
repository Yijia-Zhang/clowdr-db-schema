import * as Schema from "../Schema";
import { PromisesRemapped } from "../WholeSchema";
import { StaticCachedBase, StaticBaseImpl, CachedBase, LocalDataT } from "./Base";
import { Conference } from ".";

type SchemaT = Schema.PrivilegedConferenceDetails;
type K = "PrivilegedConferenceDetails";
const K_str: K = "PrivilegedConferenceDetails";

export default class Class extends CachedBase<K> implements SchemaT {
    constructor(
        conferenceId: string,
        data: LocalDataT[K],
        parse: Parse.Object<PromisesRemapped<SchemaT>> | null = null) {
        super(conferenceId, K_str, data, parse);
    }

    get key(): string {
        return this.data.key;
    }

    set key(value) {
        this.data.key = value;
    }

    get value(): string {
        return this.data.value;
    }

    get conference(): Promise<Conference> {
        return this.uniqueRelated("conference");
    }

    set value(value) {
        this.data.value = value;
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
