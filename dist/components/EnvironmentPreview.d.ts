import { VFC } from 'react';
import { ClickableProps } from 'reakit';
export interface EnvironmentPreviewProps extends ClickableProps {
    url: string | null;
    selected: boolean;
}
declare const EnvironmentPreview: VFC<EnvironmentPreviewProps>;
export default EnvironmentPreview;
