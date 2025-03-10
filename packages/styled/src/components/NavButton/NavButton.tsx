import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components'
import {
  width,
  WidthProps,
  height,
  HeightProps,
  background,
  BackgroundProps,
  space,
  SpaceProps,
  borders,
  BordersProps,
  compose,
} from 'styled-system'
import CaretIcon from '../../icons/CaretIcon'
// eslint-disable-next-line import/no-unresolved
import {NavButtonTheme} from '../../@types/theme'
import useThemeProps from '../../hooks/useThemeProps'
import globalStyles from '../../globalStyles'
import getThemeProp from '../../utils/getThemeProp'

interface StyledNavButtonProps
  extends HeightProps,
    WidthProps,
    BackgroundProps,
    SpaceProps,
    BordersProps {}

const composeSyles = compose(width, height, background, space, borders)

const StyledNavButton = styled('button')<StyledNavButtonProps>`
  ${composeSyles}
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
`

interface NavButtonProps {
  type: 'next' | 'prev'
  onClick(): void
  vertical: boolean
  rtl: boolean
  ariaLabel: string
}

function NavButton({type, onClick, vertical, rtl, ariaLabel}: NavButtonProps) {
  const themeContext = useContext(ThemeContext)
  const theme: NavButtonTheme = useThemeProps({
    navButtonWidth: vertical ? '48px' : '30px',
    navButtonHeight: vertical ? '48px' : '30px',
    navButtonBackground: getThemeProp('white', globalStyles.colors.white, themeContext),
    navButtonBorder: `1px solid ${getThemeProp(
      'silverCloud',
      globalStyles.colors.silverCloud,
      themeContext,
    )}`,
    navButtonPadding: '0',
    navButtonIconHeight: vertical ? '18px' : '11px',
    navButtonIconWidth: vertical ? '28px' : '18px',
    navButtonIconColor: getThemeProp('greey', globalStyles.colors.greey, themeContext),
  })

  function handleMouseUp(e: React.MouseEvent) {
    // @ts-ignore
    e.currentTarget.blur()
  }

  function getDirection() {
    if (type === 'next' && !vertical) {
      return 'right'
    } else if (type === 'next' && vertical) {
      return 'down'
    } else if (type === 'prev' && !vertical) {
      return 'left'
    }

    return 'up'
  }

  return (
    <StyledNavButton
      width={theme.navButtonWidth}
      height={theme.navButtonHeight}
      background={theme.navButtonBackground}
      border={theme.navButtonBorder}
      borderRight={getDirection() === 'up' && !rtl ? 'unset' : theme.navButtonBorder}
      borderLeft={getDirection() === 'up' && rtl ? 'unset' : theme.navButtonBorder}
      p={theme.navButtonPadding}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseUp={handleMouseUp}
      data-testid="DatepickerNavButton"
    >
      <CaretIcon
        // @ts-ignore
        width={theme.navButtonIconWidth}
        // @ts-ignore
        height={theme.navButtonIconHeight}
        // @ts-ignore
        color={theme.navButtonIconColor}
        direction={getDirection()}
      />
    </StyledNavButton>
  )
}

export default NavButton
