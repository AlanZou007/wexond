import * as React from 'react';

import { Root } from './styles';

export interface Props {
  onClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    element?: DropdownItem,
  ) => void;
  ripple?: boolean;
  customRippleBehavior?: boolean;
  value: any;
  id?: number;
  selected?: boolean;
}

export default class DropdownItem extends React.Component<Props, {}> {
  public static defaultProps = {
    customRippleBehavior: false,
    ripple: true,
  };

  public onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { onClick } = this.props;

    if (typeof onClick === 'function') {
      onClick(e, this);
    }
  };

  public render() {
    const { children, selected } = this.props;

    return (
      <Root
        selected={selected}
        onClick={this.onClick}
        onMouseDown={e => e.stopPropagation()}
      >
        {children}
      </Root>
    );
  }
}
