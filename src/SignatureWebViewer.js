import React, { useEffect } from 'react';
import { useSignatureWebViewer } from './useSignatureWebViewer';

const SignatureWebViewer = () => {
        const { initializeWebViewer, viewer } = useSignatureWebViewer();

        useEffect(() => {
            initializeWebViewer();
        }, [])

        return <>
            <div style={{ height: "80vh" }} id="webviewer" ref={viewer}></div>
        </>
}

export default SignatureWebViewer