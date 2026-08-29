import React from 'react'
import {styled} from '@linaria/react'
import {MOBILE_WIDTH} from '../constants'
import {colors} from '../styling/theme'

const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 14px 30px 20px;
  background: linear-gradient(180deg, rgba(10, 31, 56, 0.95), rgba(4, 16, 31, 0.98));
  border-top: 1px solid ${colors.edge};
  box-shadow: 0 -6px 24px rgba(35, 150, 220, 0.18);
  color: ${colors.textDim};
  font-size: 14px;
  & a {
    color: ${colors.edgeBright};
    text-decoration: none;
    &:hover {
      text-shadow: 0 0 8px ${colors.glowStrong};
      text-decoration: underline;
    }
  }
  @media (max-width: ${MOBILE_WIDTH}px) {
    padding: 4px;
    & * {
      font-size: 8px;
    }
  }
`
const Title = styled.h4`
  color: ${colors.amber};
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 8px;
`

const Footer = () => (
  <Container>
    <div>
      <Title>Icons by</Title>
      <div>
        Icons made by{' '}
        <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">
          Pixel perfect
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <div>
        Icons made by{' '}
        <a href="" title="srip">
          srip
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <div>
        Icons made by{' '}
        <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">
          Smashicons
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <div>
        Icons made by{' '}
        <a href="https://www.flaticon.com/authors/photo3idea-studio" title="photo3idea_studio">
          photo3idea_studio
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <div>
        Icons made by{' '}
        <a href="http://www.freepik.com" title="Freepik">
          Freepik
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <div>
        Icons made by{' '}
        <a href="https://www.flaticon.com/authors/google" title="Google">
          Google
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <div>
        Icons made by{' '}
        <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">
          Icongeek26
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <div>
        Icons made by{' '}
        <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">
          smalllikeart
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <div>
        Icons made by{' '}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <div>
        Icons made by{' '}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
    <div>
      <Title>Art by</Title>
      <div>
        Xel`naga Wallpaper by <a href="https://suwalls.com/games/xelnaga-starcraft-ii-26724">odissey</a>
      </div>
      <div>
        Unit images by <a href="https://tl.net/forum/starcraft-2/526722-co-op-commander-guide-raynor">Team Liquid</a>
      </div>
    </div>
  </Container>
)

export default Footer
