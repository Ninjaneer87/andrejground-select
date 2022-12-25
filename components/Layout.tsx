import * as React from 'react';
import { useStorage } from '../hooks/useStorage';
import classes from './Layout.module.scss';

const logoUrl = 'https://andrejground.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAG.cf308384.png&w=64&q=75';
const andrejgroundUrl = 'https://andrejground.com/';

const Layout = ({ children }: React.PropsWithChildren) => {
  const [dark, setDark] = useStorage('dark-mode', true);
  

  // sync the theme with AndrejGround website
  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      const darkAGWebsite = message.value;
      if(darkAGWebsite === true) setDark(true);
      if(darkAGWebsite === false) setDark(false);
    };

    window.addEventListener('message', handleMessage);
    return () => { window.removeEventListener('message', handleMessage) };
  }, []);

  React.useEffect(() => {
    document.body.classList[dark ? 'add' : 'remove']('dark');
  }, [dark]);

  return (
    <React.Fragment>
      <header>
        <div className={classes.container}>
          <a href={andrejgroundUrl} target='_blank' className={classes.logo}>
            <div className={classes['logo-img']}>
              <img src={logoUrl} alt="AndrejGround logo" width={50} height={50} />
            </div>
            <div className={classes['logo-caption']}>
              <span className="color-primary">Andrej</span>Ground
            </div>
          </a>
          
          <button
            className={classes['dark-toggle']}
            onClick={() => setDark(prev => !prev)}
          >
            <span className={dark ? '' : classes.active}>Day</span>
            <span>|</span>
            <span className={dark ? classes.active : ''}>Night</span>
          </button>
        </div>
      </header>

      <main>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
