
import React, { createRef, HTMLAttributeReferrerPolicy, IframeHTMLAttributes, useEffect, useState } from "react";
import { connectToChild } from "penpal";
import { AsyncMethodReturns, Methods } from "penpal/lib/types";

type Options = {
    /**
     * Function created by useState() to set state.
     */
    setChild : React.Dispatch<React.SetStateAction<AsyncMethodReturns<any>>>,
    /**
     * Methods that may be called by the iframe.
     */
    methods? : Methods,
    /**
     * The child origin to use to secure communication. If
     * not provided, the child origin will be derived from the
     * iframe's src or srcdoc value.
     */
    childOrigin? : string,
    /**
     * The amount of time, in milliseconds, Penpal should wait
     * for the iframe to respond before rejecting the connection promise.
     */
    timeout? : number,
    /**
     * Whether log messages should be emitted to the console.
     */
    debug? : boolean
};

type ReactHTMLIframeProps = React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;


/**
 * Penpal Component
 */
function Penpal(
    {
        setChild,
        methods = {},
        childOrigin,
        timeout,
        debug,
        ...iframeOptions
    }
:
    (Options & ReactHTMLIframeProps)
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
        });

        return () => {
            connection.destroy();
            setChild(undefined);
        };
    }, []);

    return (
        <iframe
            ref={ref}
            {...iframeOptions}
        />
    );
};

export default Penpal;