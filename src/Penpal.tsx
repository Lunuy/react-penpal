
import React, { createRef, HTMLAttributeReferrerPolicy, IframeHTMLAttributes, useEffect, useState } from "react";
import { connectToChild } from "penpal";
import { AsyncMethodReturns, Methods } from "penpal/lib/types";

function Postmate(
    {
        setChild,
        methods = {},
        childOrigin,
        timeout,
        debug,
        ...iframeOptions
    }
:
    ({
        setChild : React.Dispatch<React.SetStateAction<AsyncMethodReturns<any>>>,
        methods? : Methods,
        childOrigin? : string,
        timeout? : number,
        debug? : boolean
    } & {
        [K in keyof React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>]?: React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>[K]
    })
) {

    const ref = createRef<HTMLIFrameElement>();
    
    useEffect(() => {
        const connection = connectToChild({
            iframe: ref.current,
            methods,
            childOrigin,
            timeout,
            debug
        });

        connection.promise.then(child => {
            setChild(child);
        })
    }, []);

    return (
        <iframe
            ref={ref}
            {...iframeOptions}
        />
    );
};

export default Postmate;