import * as React from 'react';
import { useStorage } from '../hooks/useStorage';
import classes from './Layout.module.scss';

const logoUrl = 'https://andrejground.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAG.cf308384.png&w=64&q=75';
const andrejgroundUrl = 'https://andrejground.com/';

const Layout = ({ children }: React.PropsWithChildren) => {
  const [dark, setDark] = useStorage('dark-mode', true);

  React.useEffect(() => {
    document.body.classList[dark ? 'add' : 'remove']('dark');
  }, [dark]);

  return (
    <React.Fragment>
      <header>
        <a href={andrejgroundUrl} target='_blank' className={classes.logo}>
          <img src={logoUrl} alt="AndrejGround logo" width={50} height={50} />
        </a>
        
        <span>
          <a href={andrejgroundUrl} target='_blank'>
            Andrej<span className="color-primary">Ground</span>
          </a> | Select
        </span>

        <button
          className={classes['dark-toggle']}
          onClick={() => setDark(prev => !prev)}
        >
          <span className={dark ? '' : classes.active}>Day</span>
          <span>|</span>
          <span className={dark ? classes.active : ''}>Night</span>
        </button>
      </header>

      <main>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
