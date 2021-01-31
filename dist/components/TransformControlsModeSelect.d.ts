import { VFC } from 'react';
import { TransformControlsMode } from '../store';
export interface TransformControlsModeSelectProps {
    value: TransformControlsMode;
    onChange: (value: TransformControlsMode) => void;
}
declare const TransformControlsModeSelect: VFC<TransformControlsModeSelectProps>;
export default TransformControlsModeSelect;
