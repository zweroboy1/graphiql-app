import React, { lazy, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ApiEndpointBtn } from '../../components/ApiEndpointBtn/ApiEndpointBtn';
import { QueryEditor } from '../../components/Editor/QueryEditor';
import { useFetchGraphQlResponseMutation } from '../../store/api/api';
import { setEditorValue } from '../../store/slices/editorSlice';
import { setViewerValue } from '../../store/slices/viewerSlice';
import { formatter } from '../../utils/queryEditor';
import { QueryFields } from '../../components/Editor/QueryFields';
import { toast } from 'react-toastify';
import { setHeaders, setVariables } from '../../store/slices/queryFields.slice';

const Documentation = lazy(
  () => import('../../components/Documentation/Documentation')
);

export const GraphQl: React.FC = () => {
  const [docsOpen, setDocsOpen] = useState(false);
  const editorValue = useSelector((state: RootState) => state.editor.value);
  const apiEndpoint = useSelector((state: RootState) => state.apiEndpoint.api);
  const vars = useSelector((state: RootState) => state.queryFields.variables);
  const headers = useSelector((state: RootState) => state.queryFields.headers);
  const [fetchResponse] = useFetchGraphQlResponseMutation();
  const dispatch = useDispatch();

  const toggleMenu = useCallback(async () => {
    setDocsOpen(!docsOpen);
  }, [docsOpen]);

  const executeQuery = async () => {
    if (docsOpen) {
      toggleMenu();
    }

    try {
      const parsedVars = vars && JSON.parse(vars);
      const parsedHeaders = headers && JSON.parse(headers);

      await fetchResponse({
        query: editorValue,
        url: apiEndpoint,
        variables: parsedVars,
        headers: parsedHeaders,
      })
        .unwrap()
        .then((payload) => {
          const jsonCode = JSON.stringify(payload, null, 3).trim();
          dispatch(setViewerValue(jsonCode));
        })
        .catch((error) => {
          const jsonCode = JSON.stringify(error, null, 3).trim();
          dispatch(setViewerValue(jsonCode));
        });
    } catch (error) {
      const errorCode = error instanceof Error ? error.message : null;
      toast.error(errorCode, {
        className: 'toast-error',
      });
    }
  };

  const handleReset = () => {
    dispatch(setViewerValue(''));
    dispatch(setHeaders(''));
    dispatch(setEditorValue(''));
    dispatch(setVariables(''));
    if (docsOpen) {
      toggleMenu();
    }
  };

  const handlePrettify = () => {
    if (!editorValue) {
      return;
    }
    dispatch(setEditorValue(formatter(editorValue).trim()));
    if (docsOpen) {
      toggleMenu();
    }
  };

  return (
    <div className="playground">
      <ApiEndpointBtn />
      <div className="playground__content">
        <div className="playground__editor">
          <div>
            <QueryEditor key="editor" mode="editor" />
            <QueryFields />
          </div>
        </div>
        <div className="playground__tools">
          <button
            className="button button_tool button_tool-docs"
            title="Show API documentation"
            onClick={toggleMenu}
          ></button>
          <button
            className="button button_tool button_tool-reset"
            title="Reset query"
            onClick={handleReset}
          ></button>
          <button
            className="button button_tool button_tool-format"
            title="Prettify query"
            onClick={handlePrettify}
          ></button>
          <button
            className="button button_tool button_tool-play"
            title="Execute query"
            onClick={executeQuery}
          ></button>
        </div>
        <div className="playground__viewer">
          <QueryEditor key="viewer" mode="viewer" />
          <Documentation isOpen={docsOpen} />
        </div>
      </div>
    </div>
  );
};
