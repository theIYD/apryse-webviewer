import { useEffect, useRef, useState } from 'react';
import WebViewer from '@pdftron/webviewer';

export const useSignatureWebViewer = () => {
    const viewer = useRef(null)
    const [webViewer, setWebViewer] = useState();

    useEffect(() => {
        if (!webViewer) {
			return;
		}
		const { documentViewer } = webViewer.Core;

        documentViewer.addEventListener("documentLoaded", onDocumentLoaded);
    }, [webViewer])

    const initializeWebViewer = async (pdfUrl) => {
              if(viewer.current && !webViewer) {
            const instance = await WebViewer(
                {
                  path: '/webviewer/lib',
                  initialDoc: '',
                  licenseKey: ''  // sign up to get a free trial key at https://dev.apryse.com
                },
                viewer.current,
              );
            setWebViewer(instance);
          }

          if(pdfUrl && pdfUrl.length > 0) {
            webViewer.UI.loadDocument(pdfUrl);
          }
        
    }

    const performTextSearch = async () => {
		if (!webViewer.Core) {
			return;
		}

		const { Search, documentViewer } = webViewer.Core;

		const searchRegex = "\\[\\[(?:\\s*([a-zA-Z])\\s*\\|\\s*([-]?\\d)\\s*)+\\]\\]|\\[\\[(\\w)\\|(([-]?\\d))\\|([^|\\]]+)(?:\\|([^|\\]]+))?(\\|([^|\\]]+)(?:\\|([^|\\]]+))?)*]\\]";
		const mode =
			Search.Mode.PAGE_STOP | Search.Mode.HIGHLIGHT | Search.Mode.REGEX;
		documentViewer.textSearchInit(searchRegex, mode, {
			fullSearch: true,
			onError: error => {
				console.error(error);
			},
			// The callback function that is called when the search returns a result.
			onResult: result => {
                console.log("result", result);
            }
		});
	};

    const onDocumentLoaded = async () => {
        console.info("DOCUMENT LOADED");

        const { PDFNet } = webViewer.Core;
        await PDFNet.initialize();

        await performTextSearch();
        
    }

    return {
        initializeWebViewer,
        viewer
    }
}