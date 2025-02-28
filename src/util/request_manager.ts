import type {RequestParameters} from './ajax';

/**
 * A type of MapLibre resource.
 */
export const enum ResourceType {
    Glyphs = 'Glyphs',
    Image = 'Image',
    Source = 'Source',
    SpriteImage = 'SpriteImage',
    SpriteJSON = 'SpriteJSON',
    Style = 'Style',
    Tile = 'Tile',
    Unknown = 'Unknown',
}

/**
 * This function is used to tranform a request.
 * It is used just before executing the relevant request.
 * It can be either a sync or async function.
 */
export type RequestTransformFunction = (url: string, resourceType?: ResourceType) => RequestParameters | Promise<RequestParameters> | undefined;

export class RequestManager {
    _transformRequestFn: RequestTransformFunction;

    constructor(transformRequestFn?: RequestTransformFunction) {
        this._transformRequestFn = transformRequestFn;
    }

    async transformRequest(url: string, type: ResourceType) {
        if (this._transformRequestFn) {
            if(this._transformRequestFn.constructor.name == "AsyncFunction") {
                return await this._transformRequestFn(url, type) || {url}
            }
            return this._transformRequestFn(url, type) || {url};
        }

        return {url};
    }

    setTransformRequest(transformRequest: RequestTransformFunction) {
        this._transformRequestFn = transformRequest;
    }
}

