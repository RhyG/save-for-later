import styled from 'styled-components/native';

type Props = {
  flex?: number;
  units?: number;
  horizontal?: boolean;
};

/**
 * A generic component for adding empty space to a layout.
 */
const Space = styled.View<Props>`
  flex: ${props => props.flex ?? '0 1 auto'};
  height: ${props =>
    props.horizontal ? 0 : props.theme.spacing(props.units || 1)};
  width: ${props =>
    props.horizontal ? props.theme.spacing(props.units || 1) : 0};
`;

export { Space };
