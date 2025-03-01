import type { RequestParameters } from "./ajax";

/**
 * A type of MapLibre resource.
 */
export const enum ResourceType {
    Glyphs = "Glyphs",
    Image = "Image",
    Source = "Source",
    SpriteImage = "SpriteImage",
    SpriteJSON = "SpriteJSON",
    Style = "Style",
    Tile = "Tile",
    Unknown = "Unknown",
}

/**
 * This function is used to tranform a request.
 * It is used just before executing the relevant request.
 * It can be either a sync or async function.
 */
export type RequestTransformFunction = (
    url: string,
    resourceType?: ResourceType
) => RequestParameters | undefined;

export type AsyncRequestTransformFunction = (
    url: string,
    resourceType?: ResourceType
) => Promise<RequestParameters> | undefined;

export class RequestManager {
    _transformRequestFn: RequestTransformFunction;
    _asyncTransformRequestFn: AsyncRequestTransformFunction;
    constructor(
        transformRequestFn?: RequestTransformFunction,
        asyncTransformRequestFn?: AsyncRequestTransformFunction
    ) {
        this._transformRequestFn = transformRequestFn;
        this._asyncTransformRequestFn = asyncTransformRequestFn;
    }

    transformRequest(url: string, type: ResourceType): RequestParameters {
        if (this._transformRequestFn) {
            return this._transformRequestFn(url, type) || { url };
        }

        return { url };
    }

    async asyncTransformRequest(
        url: string,
        type: ResourceType
    ): Promise<RequestParameters> {
        if (this._asyncTransformRequestFn) {
            return (await this._asyncTransformRequestFn(url, type)) || { url };
        }

        return { url };
    }

    setTransformRequest(transformRequest: RequestTransformFunction) {
        this._transformRequestFn = transformRequest;
    }

    setAsyncTransformRequest(
        asyncTransformRequest: AsyncRequestTransformFunction
    ) {
        this._asyncTransformRequestFn = asyncTransformRequest;
    }
}
