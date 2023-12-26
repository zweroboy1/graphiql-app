import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ApiEndpointBtn } from '../../components/ApiEndpointBtn/ApiEndpointBtn';
import { Documentation } from '../../components/Documentation/Documentation';
import { QueryEditor } from '../../components/Editor/QueryEditor';
import { useFetchGraphQlResponseMutation } from '../../store/api/api';
import { setEditorValue } from '../../store/slices/editorSlice';
import { setViewerValue } from '../../store/slices/viewerSlice';
import { formatter } from '../../utils/queryEditor';

export const GraphQl: React.FC = () => {
  const [docsOpen, setDocsOpen] = useState(false);
  const dispatch = useDispatch();
  const editorValue = useSelector((state: RootState) => state.editor.value);
  const apiEndpoint = useSelector((state: RootState) => state.apiEndpoint.api);

  const [fetchResponse /* , { isLoading } */] =
    useFetchGraphQlResponseMutation();

  const toggleMenu = useCallback(async () => {
    setDocsOpen(!docsOpen);
  }, [docsOpen]);

  const executeQuery = async () => {
    if (docsOpen) {
      toggleMenu();
    }

    await fetchResponse({
      query: editorValue,
      url: apiEndpoint,
    })
      .unwrap()
      .then((payload) => {
        // const jsonCode = formatter(JSON.stringify(payload)).trim();
        const jsonCode = JSON.stringify(payload, null, 3).trim();
        dispatch(setViewerValue(jsonCode));
      })
      .catch((error) => {
        const jsonCode = JSON.stringify(error, null, 3).trim();
        dispatch(setViewerValue(jsonCode));
      });
  };

  const handleReset = () => {
    dispatch(setEditorValue(''));
    dispatch(setViewerValue(''));
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
          <QueryEditor key="editor" mode="editor" />
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
