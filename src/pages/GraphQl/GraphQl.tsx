import { ApiEndpointBtn } from '../../components/ApiEndpointBtn/ApiEndpointBtn';
import { Documentation } from '../../components/Documentation/Documentation';
import { QueryEditor } from '../../components/Editor/QueryEditor';

export const GraphQl: React.FC = () => {
  return (
    <div className="playground">
      <ApiEndpointBtn />
      <Documentation />
      <QueryEditor key="editor" mode="editor" />
      <QueryEditor key="viewer" mode="viewer" />
    </div>
  );
};
