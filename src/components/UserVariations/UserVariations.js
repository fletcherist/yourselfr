import React from 'react';

import User from '../User';
import WriteBox from '../WriteBox';
import Posts from '../Posts';
import Preferences from '../Preferences';

class UserVariations extends React.Component {
    render () {
      var children;

      var type = 'user';
      switch (type) {
        case 'preferences':
                children = (
                    <Preferences/>
                )

          break;
        case 'user':
                children = (
                    <div>
                        <WriteBox/>
                        <Posts/>
                    </div>
                )
          break;
      }

      return (
            <div>
                <div className='responsive_crop'></div>
                <User>
                    {children}
                </User>
            </div>
        );
    }
}
export default UserVariations;
