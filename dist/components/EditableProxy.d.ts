import { Object3D } from 'three';
import { VFC } from 'react';
import { EditableType } from '../store';
export interface EditableProxyProps {
    editableName: string;
    editableType: EditableType;
    object: Object3D;
    onChange?: () => void;
}
declare const EditableProxy: VFC<EditableProxyProps>;
export default EditableProxy;
