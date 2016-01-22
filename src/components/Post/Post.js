import React from 'react';
import Like from '../Like';

import s from './Post.scss';
import cx from 'classnames/bind';

import withStyles from '../../decorators/withStyles';

@withStyles(s)

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = '';

        this.state = {
            id: this.props._id,
            created_at: this.props.created_at,
            createdPronounce: "сейчас",
            isHot: false
        }
    }

    static propTypes = {
        text: React.PropTypes.string.isRequired
    }

    tickTime(){
        var time = new Date(this.state.created_at);

        var now = new Date();

        var passed = ((now - time) / 1000).toFixed(0); // Seconds
        var result;
        if (passed < 5)
            result = 'сейчас'
        else if(passed < 60)
            result = passed + 'сек'
        else if (passed < 60*60)
            result = (passed / 60).toFixed(0) + 'мин';
        else if(passed < 60*60*24)
            result = (passed / (60*60)).toFixed(0) + 'ч'
        else if(passed < 60*60*24*7)
            result = (passed / (60*60*24)).toFixed(0) + 'дн'
        else if(passed < 60*60*24*7*4)
            result = (passed / (60*60*24*7)).toFixed(0) + 'нед'
        else if(passed < 60*60*24*7*4*12)
            result = (passed / (60*60*24*7*4)).toFixed(0) + 'мес'
        else if(passed < 60*60*24*7*30*12)
            result = 'давно'

        //posts, posted <5s ago will show coloured.
        var isHot = false;
        if(passed < 5){
            isHot = true;
        }

        this.setState({
            createdPronounce: result,
            isHot: isHot
        })
    }
    componentDidMount(){
        setInterval(this.tickTime.bind(this), 1000);
    }
    componentWillUnmount(){
        clearInterval(this.tickTime);
    }
    componentWillMount(){
        this.tickTime();
    }

    render() { 
        let ccx = cx.bind(s);
        let postClasses = ccx({
            post: true,
            hot: this.state.isHot
        })

        return (
        	<div className={postClasses}>
                <div className={s.time}>
                    <span>{this.state.createdPronounce}</span>
                </div>
                <div className={s.text}>
                    {this.props.text}
                </div>
                <Like
                    count={this.props.likes}
                    object={this.props.id}
                />
        	</div>
        );
    }
}

export default Post;
