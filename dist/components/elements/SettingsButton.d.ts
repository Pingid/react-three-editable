import { ReactElement, ReactNode, VFC } from 'react';
import { IconType } from '@react-icons/all-files';
export interface SettingsButtonProps {
    icon: ReactElement<IconType>;
    label: string;
    children: ReactNode;
}
declare const SettingsButton: VFC<SettingsButtonProps>;
export default SettingsButton;
