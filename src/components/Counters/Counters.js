import React from 'react';
import cx from 'classnames';
import s from './Counters.scss';
import Link from '../Link';
import withStyles from '../../decorators/withStyles';
import {ending} from '../Tools';

@withStyles(s)

class Counters extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Counters';
    }

    static defaultProps = {
        visits: 0,
        followers: 0,
        following: 0
    }
    
    render() {
        var classes = cx(s.counter, s.counter_divider);

        var pronounce = {
            visits: ending(this.props.visits, ['просмотр', 'просмотра', 'просмотров']),
            followers: ending(this.props.followers, ['подписчик', 'подписчика', 'подписчиков']),
            following: ending(this.props.followers, ['подписка', 'подписок', 'подписки'])
        }

        return(

            <div>
                <div className={classes}>
                    <div className={s.counter_count}>{this.props.visits}</div>
                    <div className={s.counter_title}>{pronounce.visits}</div>
                </div>
                <div className={classes}>
                    <Link to="followers">
                        <div className={s.counter_count}>{this.props.followers}</div>
                        <div className={s.counter_title}>{pronounce.followers}</div>
                    </Link>
                </div>
                <div className={s.counter}>
                    <Link to="followers">
                        <div className={s.counter_count}>{this.props.following}</div>
                        <div className={s.counter_title}>{pronounce.following}</div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Counters;