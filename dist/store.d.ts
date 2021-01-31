import { Matrix4, Object3D, Scene, WebGLRenderer } from 'three';
import { MutableRefObject } from 'react';
import { OrbitControls } from '@react-three/drei';
export declare type EditableType = 'group' | 'mesh' | 'spotLight' | 'directionalLight' | 'pointLight' | 'perspectiveCamera' | 'orthographicCamera';
export declare type TransformControlsMode = 'translate' | 'rotate' | 'scale';
export declare type TransformControlsSpace = 'world' | 'local';
export declare type ViewportShading = 'wireframe' | 'flat' | 'solid' | 'rendered';
export interface AbstractEditable<T extends EditableType> {
    type: T;
    role: 'active' | 'removed';
    properties: {};
    initialProperties: this['properties'];
}
export interface EditableGroup extends AbstractEditable<'group'> {
    properties: {
        transform: Matrix4;
    };
}
export interface EditableMesh extends AbstractEditable<'mesh'> {
    properties: {
        transform: Matrix4;
    };
}
export interface EditableSpotLight extends AbstractEditable<'spotLight'> {
    properties: {
        transform: Matrix4;
    };
}
export interface EditableDirectionalLight extends AbstractEditable<'directionalLight'> {
    properties: {
        transform: Matrix4;
    };
}
export interface EditablePointLight extends AbstractEditable<'pointLight'> {
    properties: {
        transform: Matrix4;
    };
}
export interface EditablePerspectiveCamera extends AbstractEditable<'perspectiveCamera'> {
    properties: {
        transform: Matrix4;
    };
}
export interface EditableOrthographicCamera extends AbstractEditable<'orthographicCamera'> {
    properties: {
        transform: Matrix4;
    };
}
export declare type Editable = EditableGroup | EditableMesh | EditableSpotLight | EditableDirectionalLight | EditablePointLight | EditablePerspectiveCamera | EditableOrthographicCamera;
export declare type EditableSnapshot<T extends Editable = Editable> = {
    proxyObject?: Object3D | null;
} & T;
export interface AbstractSerializedEditable<T extends EditableType> {
    type: T;
}
export interface SerializedEditableGroup extends AbstractSerializedEditable<'group'> {
    properties: {
        transform: number[];
    };
}
export interface SerializedEditableMesh extends AbstractSerializedEditable<'mesh'> {
    properties: {
        transform: number[];
    };
}
export interface SerializedEditableSpotLight extends AbstractSerializedEditable<'spotLight'> {
    properties: {
        transform: number[];
    };
}
export interface SerializedEditableDirectionalLight extends AbstractSerializedEditable<'directionalLight'> {
    properties: {
        transform: number[];
    };
}
export interface SerializedEditablePointLight extends AbstractSerializedEditable<'pointLight'> {
    properties: {
        transform: number[];
    };
}
export interface SerializedEditablePerspectiveCamera extends AbstractSerializedEditable<'perspectiveCamera'> {
    properties: {
        transform: number[];
    };
}
export interface SerializedEditableOrthographicCamera extends AbstractSerializedEditable<'orthographicCamera'> {
    properties: {
        transform: number[];
    };
}
export declare type SerializedEditable = SerializedEditableGroup | SerializedEditableMesh | SerializedEditableSpotLight | SerializedEditableDirectionalLight | SerializedEditablePointLight | SerializedEditablePerspectiveCamera | SerializedEditableOrthographicCamera;
export interface EditableState {
    editables: Record<string, SerializedEditable>;
}
export declare type EditorStore = {
    scene: Scene | null;
    gl: WebGLRenderer | null;
    allowImplicitInstancing: boolean;
    orbitControlsRef: MutableRefObject<OrbitControls | undefined> | null;
    editables: Record<string, Editable>;
    canvasName: string;
    initialState: EditableState | null;
    selected: string | null;
    transformControlsMode: TransformControlsMode;
    transformControlsSpace: TransformControlsSpace;
    viewportShading: ViewportShading;
    editorOpen: boolean;
    sceneSnapshot: Scene | null;
    editablesSnapshot: Record<string, EditableSnapshot> | null;
    hdrPaths: string[];
    selectedHdr: string | null;
    showOverlayIcons: boolean;
    useHdrAsBackground: boolean;
    showGrid: boolean;
    showAxes: boolean;
    init: (scene: Scene, gl: WebGLRenderer, allowImplicitInstancing: boolean, initialState?: EditableState) => void;
    setOrbitControlsRef: (orbitControlsRef: MutableRefObject<OrbitControls | undefined>) => void;
    addEditable: <T extends EditableType>(type: T, uniqueName: string, initialProperties: Extract<Editable, {
        type: T;
    }>['properties']) => void;
    removeEditable: (uniqueName: string) => void;
    setEditableTransform: (uniqueName: string, transform: Matrix4) => void;
    setSelected: (name: string | null) => void;
    setSelectedHdr: (hdr: string | null) => void;
    setTransformControlsMode: (mode: TransformControlsMode) => void;
    setTransformControlsSpace: (mode: TransformControlsSpace) => void;
    setViewportShading: (mode: ViewportShading) => void;
    setShowOverlayIcons: (show: boolean) => void;
    setUseHdrAsBackground: (use: boolean) => void;
    setShowGrid: (show: boolean) => void;
    setShowAxes: (show: boolean) => void;
    setEditorOpen: (open: boolean) => void;
    createSnapshot: () => void;
    setSnapshotProxyObject: (proxyObject: Object3D | null, uniqueName: string) => void;
    serialize: () => EditableState;
    isPersistedStateDifferentThanInitial: () => boolean;
    applyPersistedState: () => void;
};
export declare const useEditorStore: import("zustand").UseStore<EditorStore>;
export declare type BindFunction = (options?: {
    allowImplicitInstancing?: boolean;
    state?: EditableState;
}) => (options: {
    gl: WebGLRenderer;
    scene: Scene;
}) => void;
export declare const configure: ({ localStorageNamespace, enablePersistence, }?: {
    localStorageNamespace?: string | undefined;
    enablePersistence?: boolean | undefined;
}) => BindFunction;
