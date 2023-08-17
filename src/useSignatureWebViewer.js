import { useRef, useState } from 'react';
import WebViewer from '@pdftron/webviewer';

export const useSignatureWebViewer = () => {
    const viewer = useRef(null)
    const [webViewer, setWebViewer] = useState();

    const initializeWebViewer = async () => {
      if(viewer.current && !webViewer) {
        const instance = await WebViewer(
            {
              path: '/webviewer/lib',
              initialDoc: '/files/sample.pdf',
              licenseKey: 'demo:1688980534792:7c60a78b03000000001da33a1a245b69027dfbfba34d81e76179f3d122'  // sign up to get a free trial key at https://dev.apryse.com
            },
            viewer.current,
          );
        setWebViewer(instance);

        const { annotationManager, Annotations } = instance.Core;
        const { WidgetFlags } = Annotations;

        // set flags for multiline and required
        const flags = new WidgetFlags();
        flags.set('Multiline', true);
        flags.set('Required', true);

        // create a form field
        const field = new Annotations.Forms.Field("some text field name", {
          type: 'Tx',
          defaultValue: "some placeholder default text value",
          flags,
        });

        // create a widget annotation
        const widgetAnnot = new Annotations.TextWidgetAnnotation(field);

        // set position and size
        widgetAnnot.PageNumber = 1;
        widgetAnnot.X = 100;
        widgetAnnot.Y = 100;
        widgetAnnot.Width = 150;
        widgetAnnot.Height = 20;

        //add the form field and widget annotation
        annotationManager.getFieldManager().addField(field);
        annotationManager.addAnnotation(widgetAnnot);
        annotationManager.drawAnnotationsFromList([widgetAnnot]);
      }
    }

    return {
        initializeWebViewer,
        viewer
    }
}