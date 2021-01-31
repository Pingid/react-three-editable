import { ReactNode, VFC } from 'react';
interface FormControlProps {
    id?: string;
    children: ReactNode;
}
export declare const FormControl: VFC<FormControlProps>;
export declare const useFormControlContext: () => string | undefined;
export {};
