import React, { ReactElement, ReactNode } from 'react';
import { IconType } from '@react-icons/all-files';
export interface CompactModeSelectProps<Option> {
    value: Option;
    onChange: (value: Option) => void;
    options: {
        option: Option;
        label: string;
        icon: ReactElement<IconType>;
    }[];
    settingsPanel?: ReactNode;
}
declare const CompactModeSelect: <Option extends React.ReactText>({ value, onChange, options, settingsPanel, }: CompactModeSelectProps<Option>) => JSX.Element;
export default CompactModeSelect;
