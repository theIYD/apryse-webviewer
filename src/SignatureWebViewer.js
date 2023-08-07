import React, { useEffect } from 'react';
import { useSignatureWebViewer } from './useSignatureWebViewer';

const SignatureWebViewer = ({ pdfUrl }) => {
        const { initializeWebViewer, viewer } = useSignatureWebViewer();

        useEffect(() => {
            initializeWebViewer(pdfUrl);
        }, [pdfUrl])

        return <>
            <div style={{ height: "80vh" }} id="webviewer" ref={viewer}></div>
        </>
}

export default SignatureWebViewer