/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  useSnackbar,
  VariantType,
  WithSnackbarProps,
  SnackbarProvider as SSnackbarProvider
} from 'notistack';

interface IProps {
  setUseSnackbarRef: (showSnackbar: WithSnackbarProps) => void;
}

const InnerSnackbarUtilsConfigurator: React.FC<IProps> = (props: IProps) => {
  props.setUseSnackbarRef(useSnackbar());
  return null;
};

let useSnackbarRef: WithSnackbarProps;
const setUseSnackbarRef = (useSnackbarRefProp: WithSnackbarProps) => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarProvider = SSnackbarProvider;

export const SnackbarUtilsConfigurator = () => {
  return (
    <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
  );
};

export const Toast = {
  success(msg: string, cb?: any) {
    this.toast(msg, 'success', cb);
  },
  warning(msg: string, cb?: any) {
    this.toast(msg, 'warning', cb);
  },
  info(msg: string, cb?: any) {
    this.toast(msg, 'info', cb);
  },
  error(msg: string, cb?: any) {
    this.toast(msg, 'error', cb);
  },
  toast(msg: string, variant: VariantType = 'default', cb?: any) {
    useSnackbarRef.enqueueSnackbar(msg, {
      variant,
      onClose: cb,
      resumeHideDuration: 6000,
      transitionDuration: { enter: 300, exit: 300 }
    });
  }
};
