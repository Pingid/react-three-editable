import React, { VFC } from 'react';
import { OrbitControls } from '@react-three/drei';
export interface ProxyManagerProps {
    orbitControlsRef: React.MutableRefObject<OrbitControls | undefined>;
}
declare const ProxyManager: VFC<ProxyManagerProps>;
export default ProxyManager;
