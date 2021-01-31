import { VFC } from 'react';
import { TransformControlsSpace } from '../store';
export interface TransformControlsSpaceSelectProps {
    value: TransformControlsSpace;
    onChange: (value: TransformControlsSpace) => void;
}
declare const TransformControlsSpaceSelect: VFC<TransformControlsSpaceSelectProps>;
export default TransformControlsSpaceSelect;
