import { styled, css } from 'styled-components'
import { Link } from 'react-router-dom'

const actionStyles = css`
  min-height: 48px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background: var(--primary);
  color: var(--on-primary);
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  transition: transform .2s, filter .2s;
  &:hover:not(:disabled) { filter: brightness(1.12); transform: translateY(-2px); }
`

export const Button = styled.button`${actionStyles}`
export const ActionLink = styled(Link)`${actionStyles}`
export const AnchorButton = styled.a`${actionStyles}`
