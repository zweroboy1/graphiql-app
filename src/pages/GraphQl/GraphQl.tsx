import { ApiEndpointBtn } from '../../components/ApiEndpointBtn/ApiEndpointBtn';
// import { Documentation } from '../../components/Documentation/Documentation';
import { QueryEditor } from '../../components/Editor/QueryEditor';

export const GraphQl: React.FC = () => {
  return (
    <div className="playground">
      <ApiEndpointBtn />
      {/* <Documentation /> */}
      <div className="playground__content">
        <div className="playground__editor">
          <QueryEditor key="editor" mode="editor" />
        </div>
        <div className="playground__tools">
          <button
            className="button button_tool button_tool-docs"
            disabled
            title="Show API documentation"
          ></button>
          <button
            className="button button_tool button_tool-reset"
            title="Reset query"
          ></button>
          <button
            className="button button_tool button_tool-format"
            title="Prettify query"
          ></button>
          <button
            className="button button_tool button_tool-play"
            disabled
            title="Execute query"
          ></button>
        </div>
        <div className="playground__viewer">
          <QueryEditor key="viewer" mode="viewer" />
        </div>
      </div>
    </div>
  );
};
