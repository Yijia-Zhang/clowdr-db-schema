import * as Schema from "../Schema";
import { PromisesRemapped } from "../WholeSchema";
import { StaticCachedBase, StaticBaseImpl, LocalDataT, CachedBase } from "./Base";
import { Conference, ProgramSession, TextChat, VideoRoom, YouTubeFeed, ZoomRoom } from ".";

type SchemaT = Schema.ContentFeed;
type K = "ContentFeed";
const K_str: K = "ContentFeed";

export default class Class extends CachedBase<K> implements SchemaT {
    constructor(
        conferenceId: string,
        data: LocalDataT[K],
        parse: Parse.Object<PromisesRemapped<SchemaT>> | null = null) {
        super(conferenceId, K_str, data, parse);
    }

    get originatingID(): string | undefined {
        return this.data.originatingID;
    }

    get name(): string {
        return this.data.name;
    }

    get conference(): Promise<Conference> {
        return this.uniqueRelated("conference");
    }

    get textChat(): Promise<TextChat | undefined> {
        return this.uniqueRelated("textChat").catch(() => undefined);
    }

    get videoRoom(): Promise<VideoRoom | undefined> {
        return this.uniqueRelated("videoRoom").catch(() => undefined);
    }

    get youtube(): Promise<YouTubeFeed | undefined> {
        return this.uniqueRelated("youtube").catch(() => undefined);
    }

    get zoomRoom(): Promise<ZoomRoom | undefined> {
        return this.uniqueRelated("zoomRoom").catch(() => undefined);
    }

    get textChatId(): string | undefined {
        return this.data.textChat;
    }

    get videoRoomId(): string | undefined {
        return this.data.videoRoom;
    }

    get youtubeId(): string | undefined {
        return this.data.youtube;
    }

    get zoomRoomId(): string | undefined {
        return this.data.zoomRoom;
    }

    get sessions(): Promise<Array<ProgramSession>> {
        return StaticBaseImpl.getAllByField("ProgramSession", "feed", this.id, this.conferenceId);
    }


    static get(id: string, conferenceId: string): Promise<Class | null> {
        return StaticBaseImpl.get(K_str, id, conferenceId);
    }

    static getAll(conferenceId: string): Promise<Array<Class>> {
        return StaticBaseImpl.getAll(K_str, conferenceId);
    }

    static getAllByVideoRoom(videoRoomId: string, conferenceId: string): Promise<Array<Class>> {
        return StaticBaseImpl.getAllByField(K_str, "videoRoom", videoRoomId, conferenceId);
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
