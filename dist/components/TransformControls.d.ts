import { Object3D, Event } from 'three';
import React from 'react';
import { ReactThreeFiber, Overwrite } from 'react-three-fiber';
import { TransformControls as TransformControlsImpl } from 'three/examples/jsm/controls/TransformControls';
import { OrbitControls } from '@react-three/drei';
declare type R3fTransformControls = Overwrite<ReactThreeFiber.Object3DNode<TransformControlsImpl, typeof TransformControlsImpl>, {
    target?: ReactThreeFiber.Vector3;
}>;
export interface TransformControlsProps extends R3fTransformControls {
    object: Object3D;
    orbitControlsRef?: React.MutableRefObject<OrbitControls | undefined>;
    onObjectChange?: (event: Event) => void;
    onDraggingChange?: (event: Event) => void;
}
declare const TransformControls: React.ForwardRefExoticComponent<Pick<TransformControlsProps, "object" | "attach" | "attachArray" | "attachObject" | "args" | "children" | "key" | "onUpdate" | "position" | "up" | "scale" | "rotation" | "matrix" | "quaternion" | "layers" | "dispose" | "domElement" | "camera" | "enabled" | "axis" | "mode" | "translationSnap" | "rotationSnap" | "space" | "size" | "dragging" | "showX" | "showY" | "showZ" | "isTransformControls" | "mouseButtons" | "detach" | "getMode" | "setMode" | "setTranslationSnap" | "setRotationSnap" | "setScaleSnap" | "setSize" | "setSpace" | "id" | "uuid" | "name" | "type" | "parent" | "modelViewMatrix" | "normalMatrix" | "matrixWorld" | "matrixAutoUpdate" | "matrixWorldNeedsUpdate" | "visible" | "castShadow" | "receiveShadow" | "frustumCulled" | "renderOrder" | "userData" | "customDepthMaterial" | "customDistanceMaterial" | "isObject3D" | "onBeforeRender" | "onAfterRender" | "applyMatrix4" | "applyQuaternion" | "setRotationFromAxisAngle" | "setRotationFromEuler" | "setRotationFromMatrix" | "setRotationFromQuaternion" | "rotateOnAxis" | "rotateOnWorldAxis" | "rotateX" | "rotateY" | "rotateZ" | "translateOnAxis" | "translateX" | "translateY" | "translateZ" | "localToWorld" | "worldToLocal" | "lookAt" | "add" | "remove" | "getObjectById" | "getObjectByName" | "getObjectByProperty" | "getWorldPosition" | "getWorldQuaternion" | "getWorldScale" | "getWorldDirection" | "raycast" | "traverse" | "traverseVisible" | "traverseAncestors" | "updateMatrix" | "updateMatrixWorld" | "updateWorldMatrix" | "toJSON" | "clone" | "copy" | "addEventListener" | "hasEventListener" | "removeEventListener" | "dispatchEvent" | "onClick" | "onContextMenu" | "onDoubleClick" | "onPointerUp" | "onPointerDown" | "onPointerOver" | "onPointerOut" | "onPointerMove" | "onWheel" | "target" | "orbitControlsRef" | "onObjectChange" | "onDraggingChange"> & React.RefAttributes<unknown>>;
export default TransformControls;
