import { action, makeObservable, observable } from "mobx";

import { IOpenModalArgs, ModalEnum } from "./types";

export class ModalStore {
  isOpen: boolean;
  type: ModalEnum | null;
  props: any;

  constructor() {
    this.isOpen = false;
    this.type = null;
    this.props = {};

    makeObservable(this, {
      isOpen: observable,
      type: observable,
      props: observable,
      openModal: action,
      closeModal: action
    });
  }

  openModal = ({ type: modalType, props }: IOpenModalArgs) => {
    this.type = modalType;
    this.isOpen = true;
    if (props) this.props = props;
  };

  closeModal = () => {
    this.type = null;
    this.isOpen = false;
  };
}
