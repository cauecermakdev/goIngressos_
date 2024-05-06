import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  text-decoration: none;
  color: #222;
  padding: 20px 0px;
  &:hover {
    text-decoration: underline;
  }
`;
