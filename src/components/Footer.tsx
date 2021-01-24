import React from 'react'
import {styled} from '@linaria/react'

const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px 20px;
  background: #031e3a;
  color: white;
  font-size: 14px;
  & a {
    color: #0b71db;
  }
`
const Title = styled.h4`
  color: white;
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
