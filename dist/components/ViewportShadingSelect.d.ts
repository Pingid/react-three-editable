import { VFC } from 'react';
import { ViewportShading } from '../store';
export interface ViewportShadingSelectProps {
    value: ViewportShading;
    onChange: (value: ViewportShading) => void;
}
declare const ViewportShadingSelect: VFC<ViewportShadingSelectProps>;
export default ViewportShadingSelect;
