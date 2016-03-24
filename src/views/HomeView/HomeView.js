import React from 'react';
import s from '../../components/AuthComponents/Login.scss';
import EndlessFeed from '../../components/EndlessFeed';
import Slideshow from '../../components/Slideshow/Slideshow';

class HomeView extends React.Component {
  render () {
    return (
      <div className={s.root}>
        <Slideshow/>
        <div className={s.container}>
          <div className={s.left}>
            <div className={s.title}>Мнения о ваших друзьях. <br/> В реальном времени.</div>
            <div className={s.feedBox}>
                <EndlessFeed/>
            </div>
          </div>
          <div className={s.right}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

HomeView.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default HomeView;
